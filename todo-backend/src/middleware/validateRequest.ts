import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export const validateRequest = (dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction):Promise<any> => {
      const output = plainToInstance(dtoClass, req.body);
      const errors = await validate(output);
  
      if (errors.length > 0) {
        return res.status(400).json({ message: errors.map(err => Object.values(err.constraints || {})).flat() });
      }
  
      next();
    };
  }