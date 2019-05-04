import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid', { name: 'id_user' })
    id: number;

    @Column({name: 'first_name'})
    firstName: string;

    @Column({name:'last_name'})
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;
}
