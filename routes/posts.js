import { Router } from "express";
import { getPosts, createPost } from "../controllers/posts.js";

const router = new Router();

router.get("/", getPosts);
router.post("/", createPost);

export default router;
