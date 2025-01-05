import Express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  updateTask,
} from "../middleware/task";

import { verifyUser } from "../middleware/auth";
const router = Express.Router();

router.get("/get", verifyUser, getTask);
router.post("/create", verifyUser, createTask);
router.put("/update", verifyUser, updateTask);
router.delete("/delete", verifyUser, deleteTask);

export default router;
