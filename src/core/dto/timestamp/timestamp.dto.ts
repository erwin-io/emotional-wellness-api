/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Type, Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import moment from "moment";


export class TimestampDto {
    @ApiProperty({
        default: "en-US"
    })
    @IsNotEmpty()
    locale: string = "en-US";

    @ApiProperty({
        default: "Asia/Manila"
    })
    @IsNotEmpty()
    timeZone: string = "Asia/Manila";
    
    @ApiProperty({
      type: Date,
      default: moment.utc(new Date()).format(),
    })
    @Type(() => Date)
    @IsNotEmpty()
    date: Date = new Date();
}