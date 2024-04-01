import express from "express";
import ProductsRouter from "./products.routes.js";
import CartsRouter from "./carts.routes.js";
import ViewsRouter from "./views.routes.js";
import ChatRouter from "./chat.routes.js";
import SessionsRouter from "./sessions.routes.js";

const IndexRouter = express.Router();

IndexRouter.use("/api/products", ProductsRouter);
IndexRouter.use("/api/carts", CartsRouter);
IndexRouter.use("/api/chat", ChatRouter);
IndexRouter.use("/api/sessions", SessionsRouter);
IndexRouter.use("/", ViewsRouter);
IndexRouter.use("/artillery", (req, res) => {
	res.status(200).json({ message: "Artillery test" });
});

export default IndexRouter;
