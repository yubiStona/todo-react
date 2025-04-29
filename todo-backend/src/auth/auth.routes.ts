import {Router} from 'express';
import * as authController from './auth.controller';
import { validateRequest } from '../middleware/validateRequest';
import {RegisterDto,LoginDto} from '../dtos/auth.dto';


const router = Router();

router.post("/register",validateRequest(RegisterDto),authController.register);
router.post("/login",validateRequest(LoginDto),authController.login);

export default router;