import { IsString, IsEmail } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserDto {
  @Expose()
  @ApiModelProperty({ uniqueItems: true })
  id: string;

  @Expose()
  @ApiModelProperty()
  firstName: string;

  @Expose()
  @ApiModelProperty()
  lastName: string;

  @Expose()
  @IsString()
  @ApiModelProperty({ uniqueItems: true })
  email: string;

  @Exclude()
  @ApiModelProperty()
  password: string;
}
