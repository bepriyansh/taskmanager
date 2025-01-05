import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { ITask } from '../interfaces';

const API_URL = process.env.NEXT_PUBLIC_TASK_CRUD!;

const getCookie = (name: string): string | undefined => {
    const cookies = parseCookies();
    return cookies[name];
};

export const getTasks = async (): Promise<ITask[]> => { 
    try {
        const token = getCookie('token'); 
        const username = getCookie('username');  

        if (!token || !username) {
            throw new Error('User is not authenticated');
        }

        const response = await axios.get(`${API_URL}/get`, {
            params: { token, username },
            withCredentials: true, 
        });
        console.log(await response.data.data.tasks)
        return response.data.data.tasks as ITask[];  
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error fetching tasks:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'An error occurred while fetching tasks');
        }
        console.error("Unexpected error:", error);
        throw new Error('An unexpected error occurred');
    }
};

export const createTask = async (title: string, description: string, dueDate: string): Promise<ITask> => {
    try {
        const token = getCookie('token');
        const username = getCookie('username');

        if (!token || !username) {
            throw new Error('User is not authenticated');
        }

        const response = await axios.post(
            `${API_URL}/create`,
            { title, description, dueDate },
            {
                params: { token, username },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error creating task:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'An error occurred while creating the task');
        }
        console.error("Unexpected error:", error);
        throw new Error('An unexpected error occurred');
    }
};

export const updateTask = async (taskId: string, title?: string, description?: string, dueDate?: string): Promise<ITask> => {
    try {
        const token = getCookie('token');
        const username = getCookie('username');

        if (!token || !username) {
            throw new Error('User is not authenticated');
        }

        const response = await axios.put(
            `${API_URL}/update`,
            { taskId, title, description, dueDate },
            {
                params: { token, username },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error updating task:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'An error occurred while updating the task');
        }
        console.error("Unexpected error:", error);
        throw new Error('An unexpected error occurred');
    }
};

export const updateTaskStatus = async (taskId: string, status: 'pending' | 'completed'): Promise<ITask> => {
    try {
        const token = getCookie('token');
        const username = getCookie('username');

        if (!token || !username) {
            throw new Error('User is not authenticated');
        }

        const response = await axios.put(
            `${API_URL}/updateStatus`,
            { taskId, status },
            {
                params: { token, username },
                withCredentials: true,
            }
        );
        console.log(await response.data)
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error updating task status:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'An error occurred while updating task status');
        }
        console.error("Unexpected error:", error);
        throw new Error('An unexpected error occurred');
    }
};

export const deleteTask = async (taskId: string): Promise<void> => {
    try {
        const token = getCookie('token');
        const username = getCookie('username');

        if (!token || !username) {
            throw new Error('User is not authenticated');
        }

        const response = await axios.delete(
            `${API_URL}/delete`,
            {
                data: { taskId },
                params: { token, username },
                withCredentials: true,
            }
        );
        return response.data; 
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error deleting task:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'An error occurred while deleting the task');
        }
        console.error("Unexpected error:", error);
        throw new Error('An unexpected error occurred');
    }
};