import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DashboardService } from "src/services/dashboard.service";
import { DashboardController } from "./dashboard.controller";
import { JournalEntry } from "src/shared/entities/JournalEntry";

@Module({
  imports: [],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
