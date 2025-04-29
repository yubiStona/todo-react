
import AppDataSource from "../configs/data-source";
import {User} from '../entities/user.entity'
import bcrypt from "bcryptjs";

const userRepository = AppDataSource.getRepository(User);

export const RegisterUser = async (email:string,password:string)=>{
    const existingUser =await userRepository.findOneBy({email});
    if(existingUser){
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = userRepository.create({email,password:hashedPassword});
    return await userRepository.save(newUser);
}

export const LoginUser = async (email:string,password:string)=>{
    const user = await userRepository.findOneBy({email});
    if(!user){
        throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if (!isPasswordValid) throw new Error("Invalid credentials");
    return user;
}