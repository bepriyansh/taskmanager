import Express from "express";
import { login, register } from "../middleware/auth";
const router = Express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
