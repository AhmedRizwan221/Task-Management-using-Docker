import express from "express";
import { addTask, deleteTask, getSingleTask, updateTask } from "../controllers/task.controller.js";


const router = express();

// static routes 
router.post('/add', addTask);

// semi-static routes 
router.patch('/update/:taskId', updateTask);
router.delete('/delete/:taskId', deleteTask);

// dynamic routes 
router.get('/:taskId', getSingleTask);


export default router;
