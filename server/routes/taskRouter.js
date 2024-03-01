import {
    createTask,
    deleteTask,
    getMyTask,
    getTask,
    updateTask,
  } from "../controllers/taskController.js";
  import express from "express";
  import { isAuthenticated } from "../middlewares/authentication.js";
  
  const router = express.Router();
  
  router.post("/post", isAuthenticated, createTask);
  router.delete("/delete/:id", isAuthenticated, deleteTask);
  router.put("/update/:id", isAuthenticated, updateTask);
  router.get("/mytask", isAuthenticated, getMyTask);
  router.get("/task/:id", isAuthenticated, getTask);
  
  export default router;