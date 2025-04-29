import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(()=>Task,(task)=>task.user)
    tasks: Task[];
}