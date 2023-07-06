import {
  IsNotEmpty,
  IsEmail,
  IsDate,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { ToBoolean } from "src/common/helper/env.helper";

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: string;
}


export class UserProfilePicDto {
  @ApiProperty()
  @IsNotEmpty()
  fileName: string;

  @ApiProperty()
  @IsNotEmpty()
  data: string;
}


export class UpdateUserDto extends UserDto {
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
  @IsOptional()
  @Type(() => UserProfilePicDto)
  @ValidateNested()
  userProfilePic: UserProfilePicDto;
}

export class UpdatePasswordDto extends UserDto {
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class UpdateFirebaseToken extends UserDto {
  @ApiProperty()
  @IsString()
  firebaseToken: string;
}

export class UpdateProfilePictureDto extends UserDto {
  @ApiProperty()
  @IsOptional()
  userProfilePic: any;
}

export class UpdatePetCompanionDto extends UserDto {
  @ApiProperty()
  @IsNotEmpty()
  petCompanionId: string;
}
