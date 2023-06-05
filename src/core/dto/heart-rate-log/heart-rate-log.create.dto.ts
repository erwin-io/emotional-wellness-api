import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class CreateHeartRateLogDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  value: string;
}