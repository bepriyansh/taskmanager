import Express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./utils/mongoDbUtil";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks";
import { errorHandler } from "./utils/responseUtils";

dotenv.config();

const app = Express();

// Middleware for JSON parsing
app.use(Express.json());

// Connect to MongoDB
ConnectDB();

app.use("/auth", authRoutes);
app.use("/task", taskRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});