/* eslint-disable prettier/prettier */
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
    @InjectRepository(JournalEntry)
    private readonly journalEntryRepo: Repository<JournalEntry>
    ) {
  }

  async timeZone() {
    const fromDB = await this.journalEntryRepo.manager.query("select (now() AT TIME ZONE 'pht'::text) as timestamp").then(res=> {
      return res[0]['timestamp'];
    });
    const datePHT_UTC = new Date(new Date("2023-06-28 21:20:29.049").toLocaleString('pht', {timeZone: 'utc'}));
    const datePHT_AM = new Date(new Date("2023-06-28 21:20:29.049").toLocaleString('pht', {timeZone: 'Asia/Manila'}));
    const dateUTC_UTC = new Date(new Date("2023-06-28 21:20:29.049").toLocaleString('utc', {timeZone: 'Asia/Manila'}));
    const dateUTC_AM = new Date(new Date("2023-06-28 21:20:29.049").toLocaleString('utc', {timeZone: 'Asia/Manila'}));
    return {
      fromDB,
      datePHT_UTC,
      datePHT_AM,
      dateUTC_UTC,
      dateUTC_AM,
    }
  }
}
