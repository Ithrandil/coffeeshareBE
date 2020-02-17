import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator/decorator/decorators';

import { FriendStatus } from './friendstatus.model';

export class FriendDto {
  @Expose()
  @IsString()
  @ApiModelProperty({ uniqueItems: true })
  id: string;

  @Expose()
  @IsString()
  @ApiModelProperty()
  transmitterId: string;

  @Expose()
  @IsString()
  @ApiModelProperty()
  receiverId: string;

  @Expose()
  @IsString()
  status: FriendStatus;
}
