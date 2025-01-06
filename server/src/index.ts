import Express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./utils/mongoDbUtil";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks";
import sayHello from "./routes/sayHello";
import { errorHandler } from "./utils/responseUtils";
import cors from "cors";

dotenv.config();

const app = Express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(Express.json());

ConnectDB();


app.use("/", sayHello)
app.use("/auth", authRoutes);
app.use("/task", taskRoutes);

app.use(errorHandler);


export default app;
