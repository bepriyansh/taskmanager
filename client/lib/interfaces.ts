import { User as NextAuthUser } from "next-auth";

export interface User extends NextAuthUser {
  id: string;
  username: string;
  email: string;
  token: string;  
}

export interface ITask {
  _id: string;          
  userId: string;          
  title: string;
  description: string;
  dueDate: string;        
  status: string;
  __v?: number;            
}

export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    username: string;
  };
}
