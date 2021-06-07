import { Module } from '@nestjs/common';
import { UpholdModule } from '../../libs/uphold/uphold.module';
import { MonitorRepository } from './monitor.repository';
import { MonitorService } from './monitor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitorController } from './monitor.controller';
import { AlertRepository } from '../alerts/repositories/alert.repository';

@Module({
  imports: [
    MonitorModule,
    UpholdModule,
    TypeOrmModule.forFeature([
      MonitorRepository,
      AlertRepository,
    ]),
  ],
  providers: [MonitorService],
  controllers: [MonitorController]
})

export class MonitorModule {}