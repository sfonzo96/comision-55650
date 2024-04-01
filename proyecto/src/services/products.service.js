export default class ProductsService {
	static instance;
	constructor(repo) {
		this.repo = repo;
	}

	async createProduct(product) {
		try {
			const newProduct = await this.repo.createProduct(product);

			return newProduct;
		} catch (error) {
			throw error;
		}
	}

	async getProducts() {
		try {
			const products = await this.repo.getAll();

			return products;
		} catch (error) {
			throw error;
		}
	}

	async getPaginatedProducts(filter) {
		try {
			// Comment: build filter here
			const pagesData = await this.repo.getPaginated(filter);
			pagesData.status = "success";

			return pagesData;
		} catch (error) {
			throw error;
		}
	}

	async getProductById(pid) {
		try {
			const product = await this.repo.getById(pid);

			return product;
		} catch (error) {
			throw error;
		}
	}

	async deleteProductById(pid) {
		try {
			const product = await this.repo.deleteProduct(pid);

			return product;
		} catch (error) {
			throw error;
		}
	}

	async updateProduct(pid, productUpdates) {
		try {
			const product = await this.repo.updateProduct(pid, productUpdates);

			return product;
		} catch (error) {
			throw error;
		}
	}

	static getInstance(repo) {
		if (!ProductsService.instance) {
			ProductsService.instance = new ProductsService(repo);
		}
		return ProductsService.instance;
	}
}
