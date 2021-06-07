import { BadRequestException, HttpService, Injectable } from '@nestjs/common';
import { UpholdService } from '../../libs/uphold/uphold.service';
import { MonitorRepository } from './monitor.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MonitorDto } from './dto/monitor.dto';
import { BigNumber } from "bignumber.js";
import { AlertRepository } from '../alert/repositories/alert.repository';
import { WebhookRepository } from '../alert/repositories/webhook.repository';

@Injectable()
export class MonitorService {
  private supportedCurrencies = []
  private intervals = {}
  private priceTracker = {}
  constructor(
    @InjectRepository(MonitorRepository)
    private monitorRepository: MonitorRepository,

    @InjectRepository(AlertRepository)
    private alertRepository: AlertRepository,

    @InjectRepository(WebhookRepository)
    private webhookRespository: WebhookRepository,

    private upholdService: UpholdService,

    private httpService: HttpService
  ) {
    this.fetchSupportedCurrncies()
    this.startMonitoring()
  }

  async fetchSupportedCurrncies() {
    const currencies = await this.upholdService.getSupportedCurrencies()
    currencies.forEach(currency => this.supportedCurrencies.push(currency.code))
  }

  async addOrUpdateMonitor(monitorDto: MonitorDto): Promise<void> {
    if(!this.supportedCurrencies.includes(monitorDto.purchase)) {
      throw new BadRequestException('Unsupported currency')
    }

    if(!this.supportedCurrencies.includes(monitorDto.sell)) {
      throw new BadRequestException('Unsupported currency')
    }

    await this.monitorRepository.createOrUpdateMonitor(
      monitorDto.purchase,
      monitorDto.sell,
      monitorDto.interval,
      monitorDto.change
    )

    const pair = `${monitorDto.purchase}-${monitorDto.sell}`
    const interval = this.intervals[pair]
    if(interval !== undefined) {
      clearInterval(interval)
    }

    this.intervals[pair] = setInterval(() => this.monitor(pair, monitorDto.change), 1000 * monitorDto.interval)
  }

  async startMonitoring() {
    (await this.monitorRepository.find({})).forEach(monitor => {
      this.intervals[monitor.pair] = setInterval(() => this.monitor(monitor.pair, monitor.change), 1000 * monitor.interval)
    })
  }

  async monitor(currencyPair, change) {
    const rate = await this.upholdService.getExchangeRate(currencyPair)

    if(this.priceTracker[currencyPair] === undefined) {
      this.priceTracker[currencyPair] = rate
      return
    } else {
      let priceChange = (new BigNumber(((new BigNumber(this.priceTracker[currencyPair])).minus(new BigNumber(rate))).dividedBy(
        new BigNumber((new BigNumber(this.priceTracker[currencyPair])).plus(new BigNumber(rate))).dividedBy(2)
      ))).times(100).toFormat(2)

      priceChange = (Math.abs(parseFloat(priceChange))).toString()

      if((new BigNumber(priceChange)).gte(change)) {
        await this.alertRepository.createAlert(
          rate,
          currencyPair,
          parseFloat(priceChange)
        )

        const notifyViaWebhook = async (url, data) => {
          await this.httpService.post(
            url, data
          ).toPromise()
        }
  
        (await this.webhookRespository.find({})).forEach(webhook => notifyViaWebhook(webhook.url, {
          rate,
          currencyPair,
          priceChange: parseFloat(priceChange)
        }))
      }

      this.priceTracker[currencyPair] = rate
    }
  }
}
