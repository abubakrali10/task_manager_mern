import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';


export const register = catchAsyncErrors((req, res, next) => {});
export const login = catchAsyncErrors((req, res, next) => {});
export const logout = catchAsyncErrors((req, res, next) => {});
export const myProfile = catchAsyncErrors((req, res, next) => {});