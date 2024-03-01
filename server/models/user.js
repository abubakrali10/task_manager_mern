import mongoose from "mongoose";
import Validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


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

user.pre("save", async function () {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

user.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

user.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });
};

export const User = mongoose.model("User", user);