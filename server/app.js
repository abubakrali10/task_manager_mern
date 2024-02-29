import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { dbConnection } from './database/dbConnection.js';

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

dbConnection();

export default app;