import express from "express";
import { productsService } from "../services/index.js";
import ProductsController from "../controllers/products.controller.js";

const productsRouter = express.Router();
const productsController = new ProductsController(productsService);

productsRouter.get("/", productsController.getProducts);
productsRouter.get("/:pid", productsController.getProductById);
productsRouter.post("/", productsController.createProduct);
productsRouter.put("/:pid", productsController.updateProduct);
productsRouter.delete("/:pid", productsController.deleteProduct);

export default productsRouter;
