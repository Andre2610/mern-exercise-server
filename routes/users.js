import { Router } from "express";
import { login, signUp } from "../controllers/users.js";

const router = new Router();

router.post("/login", login);
router.post("/signup", signUp);

export default router;
