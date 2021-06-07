import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExchangeRate } from './ro/exchange.rate.ro';
import { Currency } from './ro/currency.ro';
@Injectable()
export class UpholdService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService
  ) {}

  async getExchangeRate(pair: string): Promise<string> {
    const response = await this.httpService.get(
      `${this.configService.get(
        'uphold.baseURL',
      )}/v0/ticker/${pair}`
    ).toPromise()

    const body: ExchangeRate = response.data
    return body.ask
  }

  async getSupportedCurrencies(): Promise<Currency[]> {
    const response = await this.httpService.get(
      `${this.configService.get(
        'uphold.baseURL',
      )}/v0/assets`
    ).toPromise()

    const currencies: Currency[] = response.data
    return currencies
  }
}