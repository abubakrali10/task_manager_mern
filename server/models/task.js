import mongoose from "mongoose";


const task = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    archived: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}); 

export const Task = mongoose.model("Task", task);