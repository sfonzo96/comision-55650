import express from "express";
import ProductsRouter from "./products.routes.js";
import CartsRouter from "./carts.routes.js";
import ViewsRouter from "./views.routes.js";

const IndexRouter = express.Router();

IndexRouter.use("/api/products", ProductsRouter);
IndexRouter.use("/api/carts", CartsRouter);
IndexRouter.use("/", ViewsRouter);

export default IndexRouter;
