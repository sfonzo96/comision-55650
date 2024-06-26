import { Router } from "express";
import ViewsController from "../controllers/views.controller.js";
import { chatService, productsService } from "../services/index.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const viewsRouter = Router();
const viewsController = new ViewsController(chatService, productsService);

viewsRouter.get("/", viewsController.renderHome);

viewsRouter.get("/products", viewsController.renderProducts);

viewsRouter.get("/login", isAuthenticated, viewsController.renderLogin);

viewsRouter.get("/signup", isAuthenticated, viewsController.renderSignup);

viewsRouter.get("/logout", viewsController.renderLogout);

viewsRouter.get("/realtimeproducts", viewsController.renderRealTime);

viewsRouter.get("/chat", viewsController.renderChat);
export default viewsRouter;
