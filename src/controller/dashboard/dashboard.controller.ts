import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { CustomResponse } from "src/common/helper/customresponse.helpers";
import { JwtAuthGuard } from "src/core/auth/jwt.auth.guard";
import { DashboardService } from "src/services/dashboard.service";
import moment from "moment"
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
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }
}
