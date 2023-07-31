import { ApiProperty } from "@nestjs/swagger";
import { Type, Transform } from "class-transformer";
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from "class-validator";
import moment from "moment";

export class PetProfilePicDto {
  @ApiProperty()
  @IsNotEmpty()
  fileName: string;

  @ApiProperty()
  @IsNotEmpty()
  data: string;
}

export class PetDto {
  @ApiProperty()
  @IsNotEmpty()
  petName: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => PetProfilePicDto)
  @ValidateNested()
  petProfilePic: PetProfilePicDto;
}