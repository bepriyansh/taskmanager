import Express, { Request, Response } from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./utils/mongoDbUtil";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks";
import sayHello from "./routes/sayHello";
import { errorHandler } from "./utils/responseUtils";
import cors from "cors";  // Import the cors package

dotenv.config();

const app = Express();

// Middleware for CORS (Allow cross-origin requests)
// Allow requests from localhost:3000 and allow credentials
app.use(
  cors({
    origin: ['http://localhost:3000','https://taskmanager_client.vercel.app'],  // Allow only these origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
    credentials: true,  // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Middleware for JSON parsing
app.use(Express.json());

// Connect to MongoDB
ConnectDB();

app.use("/", sayHello)
app.use("/auth", authRoutes);
app.use("/task", taskRoutes);

app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// Export as a function (using ES Modules syntax)
export default (req: Request, res: Response): void => {
  app(req, res);
};
