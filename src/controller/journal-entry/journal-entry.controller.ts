import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { request } from 'express';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { CustomResponse } from 'src/common/helper/customresponse.helpers';
import { JwtAuthGuard } from 'src/core/auth/jwt.auth.guard';
import { CreateJournalEntryDto } from 'src/core/dto/journal-entry/journal-entry.create.dto';
import { JournalEntryDto } from 'src/core/dto/journal-entry/journal-entry.update.dto';
import { UserDto } from 'src/core/dto/users/user.update.dto';
import { JournalEntryService } from 'src/services/journal-entry.service';

@ApiTags("journal-entry")
@Controller("journal-entry")
@ApiBearerAuth("jwt")
export class JournalEntryController {
    constructor(private readonly journalEntryService: JournalEntryService) {}
    
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
        res.data = await this.journalEntryService.findByDate(
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
    
    @Get("getDateSummary")
    @ApiQuery({ name: "date", required: false })
    @UseGuards(JwtAuthGuard)
    async getDateSummary(
        // eslint-disable-next-line @typescript-eslint/no-inferrable-types
        @Query("date") date = new Date(),
        @GetUser() user: UserDto
    ) {
        const res: CustomResponse = {};
        try {
        res.data = await this.journalEntryService.getDateSummary(
            user.userId,
            new Date(date),
        );
        res.success = true;
        return res;
        } catch (e) {
        res.success = false;
        res.message = e.message !== undefined ? e.message : e;
        return res;
        }
    }
    
    @Get("getWeeklySummary")
    @ApiQuery({ name: "date", required: false })
    @UseGuards(JwtAuthGuard)
    async getWeeklySummary(
        // eslint-disable-next-line @typescript-eslint/no-inferrable-types
        @Query("date") date = new Date(),
        @GetUser() user: UserDto
    ) {
        const res: CustomResponse = {};
        try {
        res.data = await this.journalEntryService.getWeeklySummary(
            user.userId,
            new Date(date),
        );
        res.success = true;
        return res;
        } catch (e) {
        res.success = false;
        res.message = e.message !== undefined ? e.message : e;
        return res;
        }
    }
    
    @Get("getWeekly")
    @ApiQuery({ name: "date", required: false })
    @UseGuards(JwtAuthGuard)
    async getWeekly(
        // eslint-disable-next-line @typescript-eslint/no-inferrable-types
        @Query("date") date = new Date(),
        @GetUser() user: UserDto
    ) {
        const res: CustomResponse = {};
        try {
        res.data = await this.journalEntryService.getWeekly(
            user.userId,
            new Date(date),
        );
        res.success = true;
        return res;
        } catch (e) {
        res.success = false;
        res.message = e.message !== undefined ? e.message : e;
        return res;
        }
    }

    @Get(":journalEntryId")
    @UseGuards(JwtAuthGuard)
    async findOne(@Param("journalEntryId") journalEntryId: string) {
      const res: CustomResponse = {};
      try {
        res.data = await this.journalEntryService.findById(
            journalEntryId
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
    async create(@Body() createJournalEntryDto: CreateJournalEntryDto, @GetUser() user: UserDto) {
      const res: CustomResponse = {};
      try {
        res.data = await this.journalEntryService.add(
            user.userId,
            createJournalEntryDto
        );
        res.success = true;
        return res;
      } catch (e) {
        res.success = false;
        res.message = e.message !== undefined ? e.message : e;
        return res;
      }
    }
  
    @Put()
    @UseGuards(JwtAuthGuard)
    async update(@Body() dto: JournalEntryDto) {
      const res: CustomResponse = {};
      try {
        res.data = await this.journalEntryService.update(dto);
        res.success = true;
        return res;
      } catch (e) {
        res.success = false;
        res.message = e.message !== undefined ? e.message : e;
        return res;
      }
    }
  
    @Delete(":journalEntryId")
    @UseGuards(JwtAuthGuard)
    async delete(@Param("journalEntryId") journalEntryId: string) {
      const res: CustomResponse = {};
      try {
        const res: CustomResponse = {};
        res.data = await this.journalEntryService.delete(journalEntryId);
        res.success = true;
        return res;
      } catch (e) {
        res.success = false;
        res.message = e.message !== undefined ? e.message : e;
        return res;
      }
    }
  
}
