import express from "express";
import { register, login, getMe } from "../controllers/UserController.js";
import authMiddleware from "./authMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/auth/me", authMiddleware, getMe);

export default router;