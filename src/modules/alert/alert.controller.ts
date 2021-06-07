import {
  Body,
  Controller,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { WebhookDto } from './dto/webhook.dto';
import { AlertService } from './alert.service';

@Controller('webhook')
export class AlertController {
  constructor(private alertService: AlertService) {}

  @Post()
  monitor(@Body(ValidationPipe) webhookDto: WebhookDto): Promise<void> {
    return this.alertService.addWebhook(webhookDto)
  }
}