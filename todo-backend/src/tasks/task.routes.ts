import * as taskController from './task.controller'
import {Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.get("/",authMiddleware,taskController.getAllTaskById);
router.post("/",authMiddleware,taskController.createTask);
router.put("/:taskId",authMiddleware,taskController.updateTask);
router.delete("/:taskId",authMiddleware,taskController.deleteTask);

export default router;