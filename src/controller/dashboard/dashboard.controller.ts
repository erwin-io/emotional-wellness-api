import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { CustomResponse } from "src/common/helper/customresponse.helpers";
import { JwtAuthGuard } from "src/core/auth/jwt.auth.guard";
import { DashboardService } from "src/services/dashboard.service";
import * as moment from 'moment';
import { DateConstant } from "src/common/constant/date.constant";

@Controller("dashboard")
@ApiTags("dashboard")
// @ApiBearerAuth("jwt")
export class DashboardController {
  constructor(private readonly dashboardServiceService: DashboardService) {}


  @Get("/:date")
  // @UseGuards(JwtAuthGuard)
  async get(@Param("date") date: Date) {
    const res: CustomResponse = {};
    try {
      // date = date??new Date();
      // const daysOfAWeek = Array(7).fill(new Date(date)).map((el, idx) =>
      //     moment(new Date(el.setDate(el.getDate() - el.getDay() + idx)), DateConstant.DATE_LANGUAGE).format("YYYY-MM-DD"))
      // res.data = daysOfAWeek;
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }
}
