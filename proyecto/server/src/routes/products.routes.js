import express from "express";
import { productsService } from "../services/index.js";
import ProductsController from "../controllers/products.controller.js";

const productsRouter = express.Router();
const productsController = new ProductsController(productsService);

productsRouter.get("/", productsController.getProducts);
productsRouter.get("/:pid", productsController.getProductById);
productsRouter.post("/", isAllowed(["admin", "premium"]), productsController.createProduct);
productsRouter.put("/:pid", isAllowed(["admin"]), productsController.updateProduct);
productsRouter.delete("/:pid", isAllowed(["admin", "premium"]), productsController.deleteProduct);

export default productsRouter;
/* -   Solo admin crea, elimina y modifica productos
    -   Premium puede crear productos
    -   Premium solo borra productos propios EN SERVICE
    -   Premium no puede agregar productos propios a carrito EN SERVICE
    -   Solo usuario agrega productos a carrito
    -   Solo usuario envía mensajes a chat */
