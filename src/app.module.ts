  
import { Module } from '@nestjs/common';
import configuration from './config';
import { MonitorModule } from './modules/monitor/monitor.module';
import { AlertModule } from './modules/alert/alert.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    MonitorModule,
    AlertModule
  ],
})
export class AppModule {}