import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginIdentifiersDto {
  @IsString()
  @ApiModelProperty({ uniqueItems: true })
  email: string;

  @IsString()
  @ApiModelProperty({ uniqueItems: true })
  password: string;
}
