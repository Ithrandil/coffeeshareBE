import { IsString, IsEmail } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @IsString()
    @ApiModelProperty()
    firstName: string;

    @IsString()
    @ApiModelProperty()
    lastName: string;

    @IsString()
    @IsEmail()
    @ApiModelProperty({uniqueItems: true})
    email: string;

    @IsString()
    @ApiModelProperty()
    password: string;
}
