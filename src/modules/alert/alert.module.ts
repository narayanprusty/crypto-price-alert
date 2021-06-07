import { Module } from '@nestjs/common';
import { UpholdModule } from '../../libs/uphold/uphold.module';
import { WebhookRepository } from './repositories/webhook.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertRepository } from './repositories/alert.repository';
import { AlertService } from './alert.service'
import { AlertController } from './alert.controller'

@Module({
  imports: [
    UpholdModule,
    TypeOrmModule.forFeature([
      WebhookRepository,
      AlertRepository,
    ]),
  ],
  providers: [AlertService],
  controllers: [AlertController]
})

export class AlertModule {}