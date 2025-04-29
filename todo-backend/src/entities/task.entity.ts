
import { Entity,Column,PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
@Entity()
export class Task{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column({ default: false })
    completed: boolean;

    @Column({type:'timestamp',default:()=>'current_timestamp()'})
    createdAt:Date;

    @Column({type:'timestamp',default:()=>'current_timestamp()',onUpdate:'current_timestamp()'})
    updatedAt:Date;
    
    @ManyToOne(()=>User,(user)=>user.tasks,{onDelete:'CASCADE'})
    user:User;
}