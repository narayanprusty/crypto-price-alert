import {
  Body,
  Controller,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { MonitorDto } from './dto/monitor.dto';
import { MonitorService } from './monitor.service';

@Controller('monitor')
export class MonitorController {
  constructor(private monitorService: MonitorService) {}

  @Post()
  monitor(@Body(ValidationPipe) monitorDto: MonitorDto): Promise<void> {
    return this.monitorService.addOrUpdateMonitor(monitorDto)
  }
}