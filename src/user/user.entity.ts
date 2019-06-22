import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

@Entity()
export class User {
  @ApiModelProperty({ uniqueItems: true })
  @PrimaryGeneratedColumn('uuid', { name: 'id_user' })
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
}
