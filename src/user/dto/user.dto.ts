import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { Friend } from 'src/friend/friend.entity';

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
  password: string;

  @Exclude()
  @ApiModelProperty()
  friendReceived: Friend[];

  @Expose()
  @ApiModelProperty()
  friendRequested: Friend[];
}
