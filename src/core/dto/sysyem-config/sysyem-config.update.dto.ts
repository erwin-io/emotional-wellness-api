import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumberString, ValidateNested } from "class-validator";
import { TimestampDto } from "../timestamp/timestamp.dto";

export class SystemConfigDto {
  @ApiProperty()
  @IsNotEmpty()
  key: string;

  @ApiProperty()
  @IsNotEmpty()
  value: string;
}