import axios, { AxiosError } from 'axios';
import { LoginResponse } from '../interfaces';

const API_URL = process.env.NEXT_PUBLIC_AUTH_URI!; 

export const register = async (username: string, password: string, email: string): Promise<LoginResponse> => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            username,
            password,
            email,
        });

        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            if (error.response) {
                throw new Error(error.response.data.message || 'An error occurred');
            }
            throw new Error('Network error');
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('Unknown error');
    }
};

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password
        });

        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            if (error.response) {
                throw new Error(error.response.data.message || 'An error occurred');
            }
            throw new Error('Network error');
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('Unknown error');
    }
};
