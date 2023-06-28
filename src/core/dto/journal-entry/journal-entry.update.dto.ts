import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumberString, IsOptional, ValidateNested } from "class-validator";
import { TimestampDto } from "../timestamp/timestamp.dto";

export class JournalEntryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  journalEntryId: string;

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

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  heartRateLogId: string;

  @ApiProperty({
    type: TimestampDto,
    default: {
      locale: "en-US",
      timeZone: "Asia/Manila",
      date: new Date(),
    } as TimestampDto
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TimestampDto)
  timestamp: TimestampDto;
}
