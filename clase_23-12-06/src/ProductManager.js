import fs from "fs";

export default class ProductManager {
    #filePath;

    constructor(filePath = "./src/products.json") {
        this.#filePath = filePath;
    }

    async addProduct(product) {
        try {
            if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
                throw new Error("Missing data.");
            }

            const products = await this.getProducts();

            if (products.find((product) => product.code === code)) {
                throw new Error(`Product with code ${code} already exists`);
            }

            product.id = products.length > 0 ? Math.max(...products.map((product) => product.id)) + 1 : 1;

            products.push(product);

            await this.#saveProducts(products);
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.#filePath)) {
                const products = JSON.parse(await fs.promises.readFile(this.#filePath, "utf-8"));
                return products;
            }
            return [];
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();

            const product = products.find((product) => product.id == id);

            if (!product) {
                throw new Error(`Product with id ${id} was not found.`);
            }
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductsById(id) {
        try {
            const product = getProductsById(id);
            if (!product) {
                throw new Error(`Product with id ${id} was not found.`);
            }

            let products = await this.getProducts();
            products = products.filter((product) => product.id !== id);

            this.#saveProducts(products);
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, productUpdates) {
        try {
            const products = await this.getProducts();

            const productIndex = await products.findIndex((product) => product.id === id);

            if (productIndex < 0) {
                throw new Error(`Product with id ${id} was not found.`);
            }

            if (productUpdates.hasOwnProperty(id) && productUpdates.id !== products[productIndex].id) {
                throw new Error(`Product's id can not be modified`);
            }

            products[productIndex] = { ...products[productIndex], ...productUpdates };

            await this.#saveProducts(products);
        } catch (error) {
            console.log(error);
        }
    }

    async #saveProducts(products) {
        try {
            await fs.promises.writeFile(this.#filePath, JSON.stringify(products));
        } catch (error) {
            console.log(error);
        }
    }
}

// const pm = new ProductManager();

// const createProducts = async () => {
//     await pm.addProduct("Titulo1", "Descripcion1", 100, "link a imagen", "aaa001", 50);
//     await pm.addProduct("Titulo2", "Descripcion2", 100, "link a imagen", "aaa002", 50);
//     await pm.addProduct("Titulo3", "Descripcion3", 100, "link a imagen", "aaa003", 50);
//     await pm.addProduct("Titulo4", "Descripcion4", 100, "link a imagen", "aaa004", 50);
//     await pm.addProduct("Titulo5", "Descripcion5", 100, "link a imagen", "aaa005", 50);
//     await pm.addProduct("Titulo6", "Descripcion6", 100, "link a imagen", "aaa006", 50);
//     await pm.addProduct("Titulo7", "Descripcion7", 100, "link a imagen", "aaa007", 50);
//     await pm.addProduct("Titulo8", "Descripcion8", 100, "link a imagen", "aaa008", 50);
//     await pm.addProduct("Titulo9", "Descripcion9", 100, "link a imagen", "aaa009", 50);
//     await pm.addProduct("Titulo10", "Descripcion10", 100, "link a imagen", "aaa010", 50);
// };

// createProducts();
