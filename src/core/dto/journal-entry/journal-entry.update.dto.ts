import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsOptional } from "class-validator";

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
}
