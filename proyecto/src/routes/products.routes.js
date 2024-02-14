import express from "express";
import ProductsService from "../services/db/Products.service.db.js";

const productsService = new ProductsService();
const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
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

		// COMMENT: A este endpoint se enviaría la petición si se trabajase con React (y no estaría está lógica en el views.routes ya que directamente no existiría)
		// const baseUrl = `http://localhost:8080/api/products?limit=${limit}&page=${pagesData.prevPage}`;

		// pagesData.prevLink =
		// 	pagesData.hasPrevPage &&
		// 	`${baseUrl}${sort ? "&sort=" + sort : ""}${category ? "&category=" + category : ""}`; // Creo link para la página anterior de manera dinámica

		// pagesData.nextLink =
		// 	pagesData.hasNextPage &&
		// 	`${baseUrl}${sort ? "&sort=" + sort : ""}${category ? "&category=" + category : ""}`;

		if (pagesData.products.length < 1) {
			res.status(404).json({
				success: false,
				message: "Could not retrieve products",
			});
			return;
		}

		console.log(pagesData);
		res.status(200).json({
			success: true,
			data: pagesData,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});
productsRouter.get("/:pid", async (req, res) => {
	try {
		const { pid } = req.params;

		const product = await productsService.getProductById(pid);

		if (!product) {
			res.status(404).json({
				success: false,
				message: "Product not found",
			});
			return;
		}

		res.status(200).json({
			success: true,
			data: product,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

productsRouter.post("/", async (req, res) => {
	try {
		const { product } = req.body;
		const newProduct = await productsService.createProduct(product);

		if (!newProduct) {
			res.status(400).json({
				success: false,
				message: "Could not add the product",
			});
			return;
		}

		const products = await productsService.getProducts();
		// Alternativa a HTTPs
		// req.io.emit("updateProducts", {
		// 	success: true,
		// 	products,
		// });

		res.status(200).json({
			success: true,
			// newProduct: newProduct,
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

productsRouter.put("/:pid", async (req, res) => {
	try {
		const { pid } = req.params;
		const { product } = req.body;

		const updatedProduct = await productsService.updateProduct(pid, product);

		if (!updatedProduct) {
			res.status(400).json({
				success: false,
				message: "Could not update the product",
			});
			return;
		}

		res.status(200).json({
			success: true,
			data: updatedProduct,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

productsRouter.delete("/:pid", async (req, res) => {
	try {
		const { pid } = req.params;

		await productsService.deleteProductById(pid);

		const products = await productsService.getProducts();

		res.status(200).json({
			success: true,
			message: `Product with ID ${pid} was deleted.`,
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

export default productsRouter;
