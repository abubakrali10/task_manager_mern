import mongoose from "mongoose";
import Validator from "validator";


const user = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a valid name"],
        minLenght: [3, "Your name must be at least 3 chars"],
        maxLength: [30, "Your name cannot be more that 30 chars"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: [true, "User already exists"],
        validate: [Validator.isEmail, "Enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minLenght: [6, "Your password must be at least 6 chars"],
        maxLength: [30, "Your password cannot be more that 30 chars"],
    },
    profile: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}); 

export const User = mongoose.model("User", user);