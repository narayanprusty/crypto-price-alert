import { Global, HttpModule, Module, HttpService } from '@nestjs/common';
import { UpholdService } from './uphold.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [UpholdService],
  exports: [UpholdService],
})

export class UpholdModule {}