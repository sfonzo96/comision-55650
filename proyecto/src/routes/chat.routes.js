import express from "express";
import ChatController from "../controllers/chat.controller.js";
import { chatService } from "../services/index.js";

const ChatRouter = express.Router();
const chatController = new ChatController(chatService);

ChatRouter.post("/", chatController.createMessage);

export default ChatRouter;
