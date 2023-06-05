import { Module } from '@nestjs/common';
import { JournalEntryController } from './journal-entry.controller';
import { JournalEntry } from 'src/shared/entities/JournalEntry';
import { JournalEntryService } from 'src/services/journal-entry.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { JournalEntryActivity } from 'src/shared/entities/JournalEntryActivity';
import { HeartRateLog } from 'src/shared/entities/HeartRateLog';
import { HeartRateLogModule } from '../heart-rate-log/heart-rate-log.module';

@Module({
  imports: [HeartRateLogModule, TypeOrmModule.forFeature([JournalEntry, JournalEntryActivity, HeartRateLog])],
  controllers: [JournalEntryController],
  providers: [JournalEntryService],
  exports: [JournalEntryService],
})
export class JournalEntryModule {}
