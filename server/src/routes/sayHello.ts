import Express from "express";
const router = Express.Router();
import { Request, Response, NextFunction } from 'express';
import { sendResponse } from "../utils/responseUtils";

const sayHello = (_req:Request, res:Response, _next:NextFunction) =>{
    sendResponse(res, 200, "Hello from server")
}

router.get("/hello", sayHello);

export default router;
