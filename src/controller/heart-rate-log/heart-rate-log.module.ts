import { Module } from '@nestjs/common';
import { HeartRateLogController } from './heart-rate-log.controller';
import { HeartRateLogService } from 'src/services/heart-rate-log.service';
import { HeartRateLog } from 'src/shared/entities/HeartRateLog';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([HeartRateLog])],
  controllers: [HeartRateLogController],
  providers: [HeartRateLogService],
  exports: [HeartRateLogService],
})
export class HeartRateLogModule {}
