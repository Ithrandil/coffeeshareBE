import { IsString, IsEmail } from "class-validator";
import { Expose } from 'class-transformer';
import { ApiModelProperty } from "@nestjs/swagger";

export class UserDto {

    @Expose()
    @IsString()
    @ApiModelProperty()
    id: string;

    @Expose()
    @IsString()
    @ApiModelProperty()
    firstName: string;

    @Expose()
    @IsString()
    @ApiModelProperty()
    lastName: string;

    @Expose()
    @IsString()
    @IsEmail()
    @ApiModelProperty({uniqueItems: true})
    email: string;
}
