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
    default: moment(new Date()).format(),
  })
  @Type(() => Date)
  @Transform((value) => moment(new Date(value.value)).format())
  timestamp: Date = new Date();

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  heartRateLogId: string;
}