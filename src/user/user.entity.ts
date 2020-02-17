import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator/decorator/decorators';
import { Friend } from 'src/friend/friend.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiModelProperty({ uniqueItems: true })
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  @OneToMany(type => Friend, friend => friend.receiverId)
  @OneToMany(type => Friend, friend => friend.transmitterId)
  id: string;

  @IsString()
  @ApiModelProperty()
  @Column({ name: 'first_name' })
  firstName: string;

  @IsString()
  @ApiModelProperty()
  @Column({ name: 'last_name' })
  lastName: string;

  @IsString()
  @IsEmail()
  @ApiModelProperty({ uniqueItems: true })
  @Column()
  email: string;

  @IsString()
  @ApiModelProperty()
  @Column()
  password: string;

  @OneToMany(() => Friend, friend => friend.transmitterId, { eager: true })
  friendRequested: Friend[];

  @OneToMany(() => Friend, friend => friend.receiverId, { eager: true })
  friendReceived: Friend[];
}
