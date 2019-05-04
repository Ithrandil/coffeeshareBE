import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiModelProperty } from "@nestjs/swagger";

@Entity()
export class User {
    @ApiModelProperty({uniqueItems: true})
    @PrimaryGeneratedColumn('uuid', { name: 'id_user' })
    id: number;

    @ApiModelProperty()
    @Column({name: 'first_name'})
    firstName: string;

    @ApiModelProperty()
    @Column({name:'last_name'})
    lastName: string;

    @ApiModelProperty({uniqueItems: true})
    @Column()
    email: string;

    @ApiModelProperty()
    @Column()
    password: string;
}
