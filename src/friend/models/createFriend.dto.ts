import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator/decorator/decorators';

import { FriendStatus } from './friendstatus.model';

export class CreateFriendDto {
  @IsString()
  @ApiModelProperty()
  transmitterId: string;

  @IsString()
  @ApiModelProperty()
  receiverId: string;

  @IsString()
  @ApiModelProperty()
  status: FriendStatus;
}
