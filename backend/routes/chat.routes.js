
import express from "express";
import { getStreamToken } from "../controllers/chat.controller.js";
import authMiddleware  from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/token", authMiddleware, getStreamToken);

export default router;
