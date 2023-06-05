import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import * as moment from 'moment';
import { DateConstant } from 'src/common/constant/date.constant';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { CustomResponse } from 'src/common/helper/customresponse.helpers';
import { JwtAuthGuard } from 'src/core/auth/jwt.auth.guard';
import { CreateHeartRateLogDto } from 'src/core/dto/heart-rate-log/heart-rate-log.create.dto';
import { UserDto } from 'src/core/dto/users/user.update.dto';
import { HeartRateLogService } from 'src/services/heart-rate-log.service';

@ApiTags("heart-rate-log")
@Controller("heart-rate-log")
@ApiBearerAuth("jwt")
export class HeartRateLogController {
    constructor(private readonly heartRateLogService: HeartRateLogService) {}
    
    @Get("findByDate")
    @ApiQuery({ name: "dateFrom", required: false })
    @ApiQuery({ name: "dateTo", required: false })
    @UseGuards(JwtAuthGuard)
    async findByDate(
        // eslint-disable-next-line @typescript-eslint/no-inferrable-types
        @Query("dateFrom") dateFrom = new Date(),
        // eslint-disable-next-line @typescript-eslint/no-inferrable-types
        @Query("dateTo") dateTo = new Date(), 
        @GetUser() user: UserDto
    ) {
        const res: CustomResponse = {};
        try {
        res.data = await this.heartRateLogService.findByDate(
            user.userId,
            new Date(dateFrom),
            new Date(dateTo)
        );
        res.success = true;
        return res;
        } catch (e) {
        res.success = false;
        res.message = e.message !== undefined ? e.message : e;
        return res;
        }
    }
    
    @Get("getHeartRateStatus")
    @ApiQuery({ name: "value", required: false })
    @UseGuards(JwtAuthGuard)
    async getHeartRateStatus(
      @GetUser() user: UserDto,
      // eslint-disable-next-line @typescript-eslint/no-inferrable-types
      @Query("value") value = 0
    ) {
        const res: CustomResponse = {};
        try {
        res.data = await this.heartRateLogService.getHeartRateStatus(
            user.userId,
            value
        );
        res.success = true;
        return res;
        } catch (e) {
        res.success = false;
        res.message = e.message !== undefined ? e.message : e;
        return res;
        }
    }

    @Get(":heartRateLogId")
    @UseGuards(JwtAuthGuard)
    async findOne(@Param("heartRateLogId") heartRateLogId: string) {
      const res: CustomResponse = {};
      try {
        res.data = await this.heartRateLogService.findById(
            heartRateLogId
        );
        res.success = true;
        return res;
      } catch (e) {
        res.success = false;
        res.message = e.message !== undefined ? e.message : e;
        return res;
      }
    }
  
    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createHeartRateLogDto: CreateHeartRateLogDto, @GetUser() user: UserDto) {
      const res: CustomResponse = {};
      try {
        res.data = await this.heartRateLogService.add(
            user.userId,
            createHeartRateLogDto
        );
        res.success = true;
        return res;
      } catch (e) {
        res.success = false;
        res.message = e.message !== undefined ? e.message : e;
        return res;
      }
    }
}
