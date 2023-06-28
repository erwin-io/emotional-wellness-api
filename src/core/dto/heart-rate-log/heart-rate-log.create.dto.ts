import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumberString, ValidateNested } from "class-validator";
import { TimestampDto } from "../timestamp/timestamp.dto";

export class CreateHeartRateLogDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  value: string;
  
  // @ApiProperty({
  //   type: TimestampDto,
  //   default: {
  //     locale: "pht",
  //     timeZone: "Asia/Manila",
  //     date: new Date(),
  //   } as TimestampDto
  // })
  // @IsNotEmpty()
  // @ValidateNested()
  // @Type(() => TimestampDto)
  // timestamp: TimestampDto;
}