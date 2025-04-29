import {Request, Response} from 'express';
import * as authService from './auth.service';
import jwt from 'jsonwebtoken';
export const register = async (req:Request, res:Response):Promise<any>=>{
    try{
        const {email,password}= req.body;
        const user=await authService.RegisterUser(email,password);
        res.status(201).json({status:"success"});
    }catch(error){
        if(error instanceof Error){
            if(error.message==="User already exists"){
               return res.status(409).json({message:error.message});
            }
        }
        return res.status(500).json({message:"Internal server error"});
    }
}

export const login = async (req:Request,res:Response)=>{
    try{
        const {email,password}=req.body;
        const user=await authService.LoginUser(email,password);

        const token = jwt.sign(
            {
                id:user.id,
                email:user.email
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:"1h"
            }
        )
        res.status(200).json({token:token});
    }catch(error){
        if(error instanceof Error){
            if(error.message==="Invalid credentials"){
                res.status(401).json({message:error.message});
            }
        }
        res.status(500).json({message:"Internal server error"});
        
    }
}
