import express from "express";
import ChatController from "../controllers/chat.controller.js";
import services from "../services/factory.js";

const ChatRouter = express.Router();
const chatController = new ChatController(services.chatService);

ChatRouter.post("/", chatController.createMessage);

export default ChatRouter;
