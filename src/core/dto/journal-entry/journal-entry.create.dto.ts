/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from "@nestjs/swagger";
import { Type, Transform } from "class-transformer";
import { IsNotEmpty, IsNumberString, ValidateNested } from "class-validator";
import { DateConstant } from "src/common/constant/date.constant";
import { TimestampDto } from "../timestamp/timestamp.dto";


export class CreateJournalEntryDto {
  @ApiProperty()
  @IsNotEmpty()
  notes: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  moodEntityId: string;

  // @ApiProperty({
  //   type: TimestampDto,
  //   default: {
  //     locale: "en-US",
  //     timeZone: "Asia/Manila",
  //     date: new Date(),
  //   } as TimestampDto
  // })
  // @IsNotEmpty()
  // @ValidateNested()
  // @Type(() => TimestampDto)
  // timestamp: TimestampDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  heartRateLogId: string;
}