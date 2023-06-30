import { Module } from "@nestjs/common";
import { JournalEntryController } from "./journal-entry.controller";
import { JournalEntry } from "src/shared/entities/JournalEntry";
import { JournalEntryService } from "src/services/journal-entry.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JournalEntryActivity } from "src/shared/entities/JournalEntryActivity";
import { HeartRateLog } from "src/shared/entities/HeartRateLog";
import { HeartRateLogModule } from "../heart-rate-log/heart-rate-log.module";
import { Users } from "src/shared/entities/Users";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    UsersModule,
    HeartRateLogModule,
    TypeOrmModule.forFeature([
      Users,
      JournalEntry,
      JournalEntryActivity,
      HeartRateLog,
    ]),
  ],
  controllers: [JournalEntryController],
  providers: [JournalEntryService],
  exports: [JournalEntryService],
})
export class JournalEntryModule {}
