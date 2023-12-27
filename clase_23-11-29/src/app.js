import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const productManager = new ProductManager();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

app.get("/api/products/", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts();

        if (!limit) {
            res.status(200).send({
                success: true,
                products: products,
            });
            return;
        }

        res.status(200).send({
            success: true,
            data: products.filter((product) => product.id <= limit),
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
        });
    }
});

app.get("/api/products/:pid", async (req, res) => {
    try {
        const { pid } = req.params;

        if (isNaN(pid)) {
            throw new Error("ID must be a number.");
        }

        const product = await productManager.getProductById(pid);

        if (!product) {
            throw new Error(`Product with id ${pid} was not found.`);
        }

        res.status(200).send({
            success: true,
            product: product,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
        });
    }
});

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }

    console.log(`Servidor activo en localhost:${PORT}`);
});
