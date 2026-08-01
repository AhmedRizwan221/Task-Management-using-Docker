import ApiError from "../utils/ApiError.js";
import ApiRespond from "../utils/ApiRespond.js";
import { Task } from "../models/task.models.js";
import asynchHandler from "../utils/asyncHandler.js";

// register task
const addTask = asynchHandler(async (req, res) => {
    const { task, description } = req.body;

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

// update task
const updateTask = asynchHandler(async (req, res) => {
    const { task, description } = req.body;
    const { taskId } = req.params;

    if (!taskId) {
        throw new ApiError(400, "Task ID is required to update task");
    }

    const oldTask = await Task.findById(taskId);

    let taskValues = {};

    if (task) taskValues.task = task || oldTask?.task;
    if (description) taskValues.description = description || oldTask?.description;

    const upatedTask = await Task.findByIdAndUpdate(
        taskId,
        {
            taskValues
        },
        { new: true }
    );

    if (!updateTask) {
        throw new ApiError(500, "Something went wrong while updating task")
    }

    return res.status(200).json(
        new ApiRespond(
            200,
            { task: updateTask },
            "Task updated successfully"
        )
    )

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
            {},
            "Task deleted successfully"
        )
    )
})

export {
    addTask,
    getSingleTask,
    updateTask,
    deleteTask
}