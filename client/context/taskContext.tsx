"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ITask } from "@/lib/interfaces";
import {
  getTasks as apiGetTasks,
  createTask as apiCreateTask,
  updateTask as apiUpdateTask,
  updateTaskStatus as apiUpdateTaskStatus,
  deleteTask as apiDeleteTask,
} from "@/lib/requests/tasks";

interface ITaskContext {
  tasks: ITask[];
  fetchTasks: () => Promise<void>;
  addTask: (title: string, description: string, dueDate: string) => Promise<void>;
  editTask: (taskId: string, title?: string, description?: string, dueDate?: string) => Promise<void>;
  updateTaskStatus: (taskId: string, status: "pending" | "completed") => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

const TaskContext = createContext<ITaskContext | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { data: session } = useSession();

  const token = session?.user?.token;
  const username = session?.user?.username;

  const fetchTasks = async () => {
    if (!token || !username) return; 
    try {
      const fetchedTasks = await apiGetTasks(token, username);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (title: string, description: string, dueDate: string) => {
    if (!token || !username) return;
    try {
      const newTask = await apiCreateTask(token, username, title, description, dueDate);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const editTask = async (
    taskId: string,
    title?: string,
    description?: string,
    dueDate?: string
  ) => {
    if (!token || !username) return;
    try {
      const updatedTask = await apiUpdateTask(token, username, taskId, title, description, dueDate);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? { ...task, ...updatedTask } : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const updateTaskStatus = async (taskId: string, status: "pending" | "completed") => {
    if (!token || !username) return;
    try {
      const updatedTask = await apiUpdateTaskStatus(token, username, taskId, status);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? { ...task, status: updatedTask.status } : task))
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    if (!token || !username) return;
    try {
      await apiDeleteTask(token, username, taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token, username]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchTasks,
        addTask,
        editTask,
        updateTaskStatus,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): ITaskContext => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
