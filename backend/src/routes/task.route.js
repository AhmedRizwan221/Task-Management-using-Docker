import express from "express";
import { addTask, deleteTask, getAllTasks, getSingleTask, toggleStatus, updateTask } from "../controllers/task.controller.js";


const router = express();

// static routes 
router.post('/add', addTask);
router.get('/get-all-tasks', getAllTasks);

// semi-static routes 
router.patch('/update/:taskId', updateTask);
router.delete('/delete/:taskId', deleteTask);
router.patch('/toggle-status/:taskId', toggleStatus);

// dynamic routes 
router.get('/:taskId', getSingleTask);



export default router;
