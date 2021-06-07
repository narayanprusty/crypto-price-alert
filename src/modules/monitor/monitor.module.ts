import { HttpModule, Module } from '@nestjs/common';
import { UpholdModule } from '../../libs/uphold/uphold.module';
import { MonitorRepository } from './monitor.repository';
import { MonitorService } from './monitor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitorController } from './monitor.controller';
import { AlertRepository } from '../alert/repositories/alert.repository';
import { WebhookRepository } from '../alert/repositories/webhook.repository';

@Module({
  imports: [
    MonitorModule,
    UpholdModule,
    TypeOrmModule.forFeature([
      MonitorRepository,
      AlertRepository,
      WebhookRepository
    ]),
    HttpModule
  ],
  providers: [MonitorService],
  controllers: [MonitorController]
})

export class MonitorModule {}