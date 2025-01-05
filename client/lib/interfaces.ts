export interface ITask {
  _id: string;          
  userId: string;          
  title: string;
  description: string;
  dueDate: string;        
  status: string;
  __v?: number;            
}

export  interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    username: string;
  };
}
