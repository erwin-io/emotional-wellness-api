import {
  IsNotEmpty,
  IsEmail,
  IsDate,
  IsOptional,
  IsDateString,
  IsNumber,
  IsArray,
  ValidateNested,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import moment from "moment";
import { PetDto } from "../pet/pet.dto";

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  mobileNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  genderId: string;

  @ApiProperty()
  @IsNotEmpty()
  petCompanionId: string;
}