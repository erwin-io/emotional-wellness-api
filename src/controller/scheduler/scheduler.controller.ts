import { Get, All } from "@nestjs/common";
import { Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CustomResponse } from "src/common/helper/customresponse.helpers";
import { JwtAuthGuard } from "src/core/auth/jwt.auth.guard";
import { SchedulerService } from "src/services/scheduler.service";

@ApiTags("scheduler")
@Controller("scheduler")
@ApiBearerAuth("jwt")
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}
  
  @All("runReminder")
  // @UseGuards(JwtAuthGuard)
  public async runReminder() {
    const res: CustomResponse = {};
    try {
      res.data = await this.schedulerService.runReminder();
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }
}
