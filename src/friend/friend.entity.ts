import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator/decorator/decorators';
import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { FriendStatus } from './models/friendstatus.model';

@Entity()
export class Friend {
  @ApiModelProperty({ uniqueItems: true })
  @PrimaryGeneratedColumn('uuid', { name: 'friend_id' })
  id: string;

  @IsString()
  @ApiModelProperty()
  @JoinColumn({ name: 'transmitter_id' })
  @ManyToOne(() => User, user => user.friendRequested)
  transmitterId: string;

  @IsString()
  @ApiModelProperty()
  @JoinColumn({ name: 'receiver_id' })
  @ManyToOne(() => User, user => user.friendReceived)
  receiverId: string;

  @IsString()
  @ApiModelProperty()
  @Column({ type: 'enum', enum: FriendStatus, default: FriendStatus.PENDING })
  status: FriendStatus;
}
