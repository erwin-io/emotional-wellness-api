/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { CustomResponse } from "src/common/helper/customresponse.helpers";
import { JwtAuthGuard } from "src/core/auth/jwt.auth.guard";
import { SystemConfigDto } from "src/core/dto/sysyem-config/sysyem-config.update.dto";
import { SystemConfigService } from "src/services/system-config.service";

@ApiTags("system-config")
@Controller("system-config")
@ApiBearerAuth("jwt")
export class SystemConfigController {
  constructor(private readonly systemConfigService: SystemConfigService) {}
  
  @Get()
  // @UseGuards(JwtAuthGuard)
  async findAll() {
    const res: CustomResponse = {};
    try {
      res.data = await this.systemConfigService.getAll();
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Put("")
//   @UseGuards(JwtAuthGuard)
  async updateUser(@Body() dto: SystemConfigDto) {
    const res: CustomResponse = {};
    try {
      const res: CustomResponse = {};
      res.data = await this.systemConfigService.update(dto);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }
}
