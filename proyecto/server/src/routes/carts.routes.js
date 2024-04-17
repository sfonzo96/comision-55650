import express from "express";
import CartsController from "../controllers/carts.controller.js";
import { cartsService, productsService } from "../services/index.js";
import isAllowed from "../middlewares/isAllowed.js";

const cartsController = new CartsController(cartsService, productsService);
const cartsRouter = express.Router();

cartsRouter.post("/", cartsController.createCart);
cartsRouter.get("/", cartsController.getCarts);
cartsRouter.get("/:cid", cartsController.getCart);
cartsRouter.post("/:cid/product/:pid", isAllowed(["user"]), cartsController.addProductToCart);
cartsRouter.put("/:cid/product/:pid", isAllowed(["user"]), cartsController.updateProductQuantity);
cartsRouter.delete("/:cid/product/:pid", isAllowed(["user"]), cartsController.removeProductFromCart);
cartsRouter.delete("/:cid", isAllowed(["user"]), cartsController.deleteCart);

export default cartsRouter;
