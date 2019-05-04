import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';
import { Expose } from 'class-transformer';

@Entity()
export class User {

    @Expose()
    @ApiModelProperty({uniqueItems: true})
    @PrimaryGeneratedColumn('uuid', { name: 'id_user' })
    id: string;

    @Expose()
    @IsString()
    @ApiModelProperty()
    @Column({name: 'first_name'})
    firstName: string;

    @Expose()
    @IsString()
    @ApiModelProperty()
    @Column({name:'last_name'})
    lastName: string;

    @Expose()
    @IsString()
    @IsEmail()
    @ApiModelProperty({uniqueItems: true})
    @Column()
    email: string;

    @IsString()
    @ApiModelProperty()
    @Column()
    password: string;
}
