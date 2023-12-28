import { Router } from "express";
import ProductManager from "../services/ProductsManager.js";

const viewsRouter = Router();
const productManager = new ProductManager("src/products.json");

viewsRouter.get("/products", async (req, res) => {
	const products = await productManager.getProducts();
	res.render("products", {
		title: "Listado de productos",
		products: products,
		style: "css/products.css",
	});
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
	const products = await productManager.getProducts();
	res.render("realtime", {
		title: "Productos en tiempo real",
		products: products,
		style: "css/products.css",
	});
});

export default viewsRouter;
