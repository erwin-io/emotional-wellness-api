import { ApiProperty } from "@nestjs/swagger";
import { Type, Transform } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumberString, IsOptional } from "class-validator";
import * as moment from "moment";
import { DateConstant } from "src/common/constant/date.constant";


export class CreateJournalEntryDto {
  @ApiProperty()
  @IsNotEmpty()
  notes: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  moodEntityId: string;

  // @ApiProperty()
  // @IsOptional()
  // activityTypeIds: string = "";

  @ApiProperty({
    type: Date,
    default: moment(new Date(), DateConstant.DATE_LANGUAGE).format("YYYY-MM-DD HH:mm:ss"),
  })
  @Type(() => Date)
  @Transform((value) => moment(new Date(value.value), DateConstant.DATE_LANGUAGE).format("YYYY-MM-DD HH:mm:ss"))
  timestamp: Date = new Date(moment(new Date(), DateConstant.DATE_LANGUAGE).format("YYYY-MM-DD HH:mm:ss"));

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  heartRateLogId: string;
}