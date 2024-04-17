import express from "express";
import ChatController from "../controllers/chat.controller.js";
import { chatService } from "../services/index.js";
import isAllowed from "../middlewares/isAllowed.js";

const ChatRouter = express.Router();
const chatController = new ChatController(chatService);

ChatRouter.post("/", isAllowed(["USER"]), chatController.createMessage);

export default ChatRouter;
