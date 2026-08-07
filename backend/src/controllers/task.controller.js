import ApiError from "../utils/ApiError.js";
import ApiRespond from "../utils/ApiRespond.js";
import { Task } from "../models/task.models.js";
import asynchHandler from "../utils/asyncHandler.js";

// register task
const addTask = asynchHandler(async (req, res) => {
    const { task, description } = req.body;
    // console.log(task, description);

    if (!task || !description) {
        throw new ApiError(400, "All fields are required");
    }

    const createTask = await Task.create({
        task,
        description,
        status: "pending"
    });

    const createdTask = await Task.findById(createTask._id);

    if (!createdTask) {
        throw new ApiError(500, "Something went wrong while creating task");
    }


    return res.status(201).json(
        new ApiRespond(
            200,
            { task: createdTask },
            "Task created successfully"
        )
    )

});

// get single task
const getSingleTask = asynchHandler(async (req, res) => {
    const { taskId } = req.params;

    if (!taskId) {
        throw new ApiError(400, "Task ID is required to fetch task");
    }

    const task = await Task.findById(taskId);

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    return res.status(200).json(
        new ApiRespond(
            200,
            { task: task },
            "Task fetched successfully"
        )
    )
});

// get all tasks 
const getAllTasks = asynchHandler(async (req, res) => {
    const tasks = await Task.find();
    if (!tasks) {
        throw new ApiError(404, "Tasks not found");
    }

    return res.status(200).json(
        new ApiRespond(
            200,
            { tasks: tasks },
            "All tasks are fetched successfully"
        )
    )
})

// update task
const updateTask = asynchHandler(async (req, res) => {
    const { task, description } = req.body;
    const { taskId } = req.params;

    if (!taskId) {
        throw new ApiError(400, "Task ID is required to update task");
    }

    const oldTask = await Task.findById(taskId);

    if (!oldTask) {
        throw new ApiError(404, "Task not found");
    }

    const taskValues = {};

    if (task !== undefined) {
        taskValues.task = task;
    }

    if (description !== undefined) {
        taskValues.description = description;
    }

    const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        taskValues,
        { returnDocument: "after" }
    );

    if (!updatedTask) {
        throw new ApiError(
            500,
            "Something went wrong while updating task"
        );
    }

    return res.status(200).json(
        new ApiRespond(
            200,
            { task: updatedTask },
            "Task updated successfully"
        )
    );
});

// delete task
const deleteTask = asynchHandler(async (req, res) => {
    const { taskId } = req.params;

    const deleteTask = await Task.findByIdAndDelete(taskId);

    if (!deleteTask) {
        throw new ApiError(500, "Something went wrong while deleting task")
    }

    return res.status(200).json(
        new ApiRespond(
            200,
            { task: taskId },
            "Task deleted successfully"
        )
    )
});

// toggle status 
const toggleStatus = asynchHandler(async (req, res) => {
    const { status } = req.body;
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    if (!["pending", "completed"].includes(status)) {
        throw new ApiError(400, "Invalid status");
    }

    task.status = status;

    await task.save();
    // console.log(task);
    return res.status(200).json(
        new ApiRespond(
            200,
            { task },
            "Status updated successfully"
        )
    );
});

export {
    addTask,
    getSingleTask,
    updateTask,
    deleteTask,
    getAllTasks,
    toggleStatus
}