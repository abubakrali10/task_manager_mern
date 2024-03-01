import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { dbConnection } from './database/dbConnection.js';
import fileUpload from 'express-fileupload';
import { errorMidware } from './middlewares/errorHandler.js';
import userRouter from './routes/userRouter.js';  

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(cors({
  origin: [process.env.UI_URL],
  methods: ["GET", "PUT", "DELETE", "POST"],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
  useTempFile: true,
  tempFileDir: "/tmp/",
}));

app.use(errorMidware);

app.use("/api/v1/user", userRouter);

dbConnection();

export default app;