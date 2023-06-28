import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as moment from "moment";
import { ReservationStatusEnum } from "src/common/enums/reservation-status.enum";
import { forkJoin } from 'rxjs'
import { DateConstant } from "src/common/constant/date.constant";
import { JournalEntry } from "src/shared/entities/JournalEntry";

@Injectable()
export class DashboardService {
  constructor(
    // @InjectRepository(JournalEntry)
    // private readonly journalEntryRepo: Repository<JournalEntry>
    ) {
  }

  // async getDate() {
  //   const dateFrom await this.journalEntryRepo.manager.query("select (now() AT TIME ZONE '" + timeZone + "'::text) as timestamp").then(res=> {
  //     return res[0]['timestamp'];
  //   });
  // }
}
