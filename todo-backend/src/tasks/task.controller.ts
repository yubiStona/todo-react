import {Request, Response} from  'express';
import * as taskService from './task.service';
import AppDataSource from '../configs/data-source';
import { User } from '../entities/user.entity';

const userRepository = AppDataSource.getRepository(User);
export const createTask = async (req:Request,res:Response):Promise<any>=>{
    try{
        const {title} = req.body;
        const userId = (req as any).user.id;
        console.log("task query hit");
        console.log(userId)
        console.log("another hit");
        const user = await userRepository.findOneBy({id:userId});
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        const task = await taskService.createTask(title,userId);
        return res.status(201).json(task);
    }catch(error){
        return res.status(500).json({message:'Internal server error'});
    
    }
}

export const getAllTaskById = async (req:Request,res:Response):Promise<any>=>{
    try{
        const userId=(req as any).user.id;
    
        const tasks = await taskService.getAllTaskById(userId);
        return res.status(200).json(tasks);
    }catch(error){
        return res.status(500).json({message:'Internal server error'});
    }
}

export const updateTask = async (req:Request, res:Response):Promise<any>=>{
    try{
        console.log("update api hit")
        const {completed}=req.body;
        const taskId =Number(req.params.taskId);
        console.log("update api hit",completed);
        console.log("TaskId",taskId);
        const task = await taskService.updateTask(taskId,completed);
        return res.status(201).json(task);
    }catch(error){
        if(error instanceof Error){
            if(error.message === 'Task not found'){
                return res.status(404).json({message:'Task not found'});
            }
        }
        return res.status(500).json({message:'Internal server error'});
    }
}

export const deleteTask = async (req:Request, res:Response):Promise<any>=>{
    try{
        const taskId = Number(req.params.taskId);
        const task = await taskService.deleteTask(taskId);
        return res.status(200).json({message:"Task deleted successfully"});
    }catch(error){
        if(error instanceof Error){
            if(error.message === 'Task not found'){
                return res.status(404).json({message:'Task not found'});
            }
        }
        return res.status(500).json({message:'Internal server error'});
    }
}