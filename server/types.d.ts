// types.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string }; // Adjust the structure of the user from JWT payload
    }
  }
}

// Ensure that the file is treated as a module
export {};
