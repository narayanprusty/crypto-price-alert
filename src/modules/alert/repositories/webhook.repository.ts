import { EntityRepository, Repository } from 'typeorm';
import { Webhook } from '../entities/webhook.entity';

@EntityRepository(Webhook)
export class WebhookRepository extends Repository<Webhook> {
  async addWebhook(
    url: string
  ) {
    const webhook = new Webhook()
    webhook.url = url
    await webhook.save()
  }
}