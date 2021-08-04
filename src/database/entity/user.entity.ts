import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: string;

    @Column()
    name!: string;

    @Column()
    surname!: string;

    @Column()
    username!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;
}
