import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  sendMessage,
  getMessages,
  getUsers,
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/users", protect, getUsers);

router.get("/:id", protect, getMessages);

router.post("/", protect, sendMessage);

export default router;