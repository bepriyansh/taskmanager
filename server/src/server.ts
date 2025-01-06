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

app.use(Express.json());

ConnectDB();

app.use(cors());
app.use("/", sayHello)
app.use("/auth", authRoutes);
app.use("/task", taskRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default (req: Request, res: Response): void => {
  app(req, res);
};
