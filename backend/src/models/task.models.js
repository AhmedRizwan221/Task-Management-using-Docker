import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    task: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
    }
}, { timestamps: true });

export const Task = mongoose.model("Task", taskSchema);