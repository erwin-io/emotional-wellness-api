import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly mobileNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
}
