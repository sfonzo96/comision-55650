import express from "express";
import ProductManager from "../ProductManager.js";

const productManager = new ProductManager();
const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts();

        if (products.length < 1) {
            res.status(404).json({
                success: false,
                message: "Could not retrieve products",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: limit ? products.slice(0, limit) : products,
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

        const product = await productManager.getProductById(pid);

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

        const newProduct = await productManager.addProduct(product);

        if (!newProduct) {
            res.status(400).json({
                success: false,
                message: "Could not add the product",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: newProduct,
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
