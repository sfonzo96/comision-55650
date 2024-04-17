import express from "express";
import UsersController from "../controllers/users.controller.js";
import { usersService } from "../services/index.js";
import isAllowed from "../middlewares/isAllowed.js";

const UsersRouter = express.Router();

const usersController = new UsersController(usersService);

UsersRouter.post("/password-change/", usersController.sendPasswordResetEmail);
UsersRouter.put("/password-change/", usersController.updatePassword);
UsersRouter.post("/role-change/", isAllowed("admin"), usersController.changeRole);
UsersRouter.get("/", usersController.getUsers);

export default UsersRouter;
