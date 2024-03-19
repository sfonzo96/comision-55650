import express from "express";
import CartsController from "../controllers/carts.controller.js";
import services from "../services/factory.js";

const cartsController = new CartsController(services.cartsService);
const cartsRouter = express.Router();

cartsRouter.post("/", cartsController.createCart);

cartsRouter.get("/", cartsController.getCarts);

cartsRouter.get("/:cid", cartsController.getCart);

cartsRouter.post("/:cid/product/:pid", cartsController.addProductToCart);

cartsRouter.put("/:cid/product/:pid", cartsController.updateProductQuantity);

cartsRouter.delete("/:cid/product/:pid", cartsController.removeProductFromCart);

cartsRouter.delete("/:cid", cartsController.deleteCart);

export default cartsRouter;
