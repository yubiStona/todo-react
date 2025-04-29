import AppDataSource from '../configs/data-source';
import {Task} from '../entities/task.entity';

const tasKRepository = AppDataSource.getRepository(Task);

export const createTask= async (title:string,userId:number)=>{
    const task =tasKRepository.create({title,user: { id: userId }});
    return await tasKRepository.save(task);
}

export const getAllTaskById= async (userId:number)=>{
    return await tasKRepository.find({
        where:{user:{id:userId}},
    });
}

export const updateTask =async (id:number, completed:boolean)=>{
    const task = await tasKRepository.findOneBy({id});
    if(!task){
        throw new Error('Task not found');
    }
    task.completed = completed;
    return await tasKRepository.save(task);
}

export const deleteTask = async (id:number)=>{
    const task = await tasKRepository.findOneBy({id});
    if(!task){
        throw new Error('Task not found');
    }
    return await tasKRepository.remove(task);
}