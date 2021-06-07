import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WebhookRepository } from './repositories/webhook.repository';
import { WebhookDto } from './dto/webhook.dto'

@Injectable()
export class AlertService {
  constructor(
    @InjectRepository(WebhookRepository)
    private webhookRespository: WebhookRepository,

  ) {}

  async addWebhook(webhookDto: WebhookDto): Promise<void> {
    return this.webhookRespository.addWebhook(webhookDto.url)
  }
}
