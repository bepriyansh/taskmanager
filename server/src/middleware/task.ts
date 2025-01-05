import { Request, Response, NextFunction } from "express";
import Task from "../models/task"; // Assuming the Task model is in this path
import { createError, sendResponse } from "../utils/responseUtils";

// Get Task
export const getTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const taskId = req.query.taskId; // Get task ID from query params (or body if you prefer)

        if (!taskId) {
            return next(createError(400, "Task ID is required"));
        }

        const task = await Task.findById(taskId);
        if (!task) {
            return next(createError(404, "Task not found"));
        }

        sendResponse(res, 200, "Task retrieved successfully", { task });
    } catch (error) {
        next(createError(500, "Internal Server Error"));
    }
};

// Create Task
export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { title, description, dueDate } = req.body;

    if (!title || !dueDate) {
        return next(createError(400, "Title and Due Date are required"));
    }
    if (!req.user) {
        return next(createError(401, 'User not authenticated'));
    }

    try {
        const newTask = new Task({
            title,
            description,
            dueDate,
            userId: req.user.id, // req.user.id is added by verifyUser middleware
            status: "pending",
        });

        await newTask.save();

        sendResponse(res, 201, "Task added successfully", { task: newTask });
    } catch (error) {
        next(createError(500, "Internal Server Error"));
    }
};

// Update Task
export const updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { taskId, title, description, dueDate } = req.body;

    if (!taskId) {
        return next(createError(400, "Task ID is required"));
    }

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return next(createError(404, "Task not found"));
        }

        // Update task fields
        if (title) task.title = title;
        if (description) task.description = description;
        if (dueDate) task.dueDate = dueDate;

        await task.save();

        sendResponse(res, 200, "Task updated successfully", { task });
    } catch (error) {
        next(createError(500, "Internal Server Error"));
    }
};

// Update Task Status
export const updateTaskStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { taskId, status } = req.body;

    if (!taskId) {
        return next(createError(400, "Task ID is required"));
    }
    if (!status) {
        return next(createError(404, "Status not provided"));
    }

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return next(createError(404, "Task not found"));
        }

        // Update task status
        task.status = status;

        await task.save();

        sendResponse(res, 200, `Task marked as ${status}`, { task });
    } catch (error) {
        next(createError(500, "Internal Server Error"));
    }
};

// Delete Task
export const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { taskId } = req.body;

    if (!taskId) {
        return next(createError(400, "Task ID is required"));
    }

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return next(createError(404, "Task not found"));
        }

        await Task.deleteOne({ _id: taskId });

        sendResponse(res, 200, "Task deleted successfully");
    } catch (error) {
        next(createError(500, "Internal Server Error"));
    }
};
