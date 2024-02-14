import { Router } from "express";
import ProductsService from "../services/db/Products.service.db.js";
import ChatService from "../services/db/Chat.service.db.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const viewsRouter = Router();
const productsService = new ProductsService("src/products.json");
const chatService = new ChatService();

viewsRouter.get("/products", async (req, res) => {
	try {
		const { limit = 8, page = 1, sort, category } = req.query;
		const filter = {
			options: {
				limit,
				page,
			},
		};

		if (category) {
			filter.query = { category: category };
		}

		if (sort) {
			filter.options.sort = { price: sort };
		}
		//console.log(filter);
		const pagesData = await productsService.getPaginatedProducts(filter);

		pagesData.products = pagesData.docs; // Cambio nombre de propiedad para ser más explícito
		delete pagesData.docs; // Elimino propiedad que ya no uso

		const baseUrl = `http://localhost:8080/products?limit=${limit}`;
		// Creo links para las páginas anterior de manera dinámica
		pagesData.prevLink =
			pagesData.hasPrevPage &&
			`${baseUrl}&page=${pagesData.prevPage}${sort ? "&sort=" + sort : ""}${
				category ? "&category=" + category : ""
			}`;

		pagesData.nextLink =
			pagesData.hasNextPage &&
			`${baseUrl}&page=${pagesData.nextPage}${sort ? "&sort=" + sort : ""}${
				category ? "&category=" + category : ""
			}`;

		if (pagesData.products.length < 1) {
			res.status(404).json({
				success: false,
				message: "Could not retrieve products",
			});
			return;
		}

		res.render("products", {
			title: "Listado de productos",
			data: pagesData,
			user: req.session.user,
			style: "css/products.css",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

viewsRouter.get("/login", isAuthenticated, async (req, res) => {
	res.render("login", {
		title: "Login",
		style: "css/login.css",
	});
});

viewsRouter.get("/signup", isAuthenticated, async (req, res) => {
	res.render("signup", {
		title: "Registro",
		style: "css/signup.css",
	});
});

viewsRouter.get("/logout", async (req, res) => {
	res.render("logout", {
		title: "Logout",
		user: req.session.user,
		style: "css/logout.css",
	});
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
	const products = await productsService.getProducts();
	res.render("realtime", {
		title: "Productos en tiempo real",
		products: products,
		style: "css/products.css",
	});
});

viewsRouter.get("/chat", async (req, res) => {
	const messages = await chatService.findMessages();

	res.render("chat", {
		title: "Chat",
		messages: messages,
		style: "css/chat.css",
	});
});
export default viewsRouter;
