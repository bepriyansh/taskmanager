import Express from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  updateTaskStatus,
} from "../middleware/task";

import { verifyUser } from "../middleware/auth";
const router = Express.Router();

router.get("/get", verifyUser, getTasks);
router.post("/create", verifyUser, createTask);
router.put("/update", verifyUser, updateTask);
router.put("/updateStatus", verifyUser, updateTaskStatus);
router.delete("/delete", verifyUser, deleteTask);

export default router;
