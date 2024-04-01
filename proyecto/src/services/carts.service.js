export default class CartsService {
	static instance;
	constructor(repo) {
		this.cartRepo = repo;
	}

	async createCart() {
		try {
			const products = [];
			const cart = await this.cartRepo.create(products);

			return cart;
		} catch (error) {
			throw error;
		}
	}

	async getCarts() {
		try {
			const carts = await this.cartRepo.getAll();
			return carts;
		} catch (error) {
			throw error;
		}
	}

	async getCartById(cid) {
		try {
			const cart = await this.cartRepo.getById(cid);
			return cart;
		} catch (error) {
			throw error;
		}
	}

	async addProductToCart(cid, pid) {
		try {
			const productExistsInCart = await this.cartRepo.cartExists(cid, pid);
			let cart;
			if (!productExistsInCart) {
				cart = await this.cartRepo.addProductToCart(cid, pid);
			} else {
				cart = await this.cartRepo.updateQuantity(cid, pid, 1);
			}

			return cart;
		} catch (error) {
			throw error;
		}
	}

	async updateProductQuantity(pid, cid, quantity) {
		try {
			const productExistsInCart = await this.cartRepo.cartExists(cid, pid);
			if (!productExistsInCart) {
				// Comment: modify the return value in order to avoid throwing errors (modify all methods and services)
				return { message: "Product not found in cart" };
			}

			const cart = await this.cartRepo.updateQuantity(cid, pid, quantity);

			return cart;
		} catch (error) {
			throw error;
		}
	}

	async removeProductFromCart(cid, pid) {
		try {
			const productExistsInCart = await this.cartRepo.cartExists(cid, pid);

			if (!productExistsInCart) {
				return { message: "Product not found in cart" };
			}

			const cart = await this.cartRepo.removeProductFromCart(cid, pid);

			return cart;
		} catch (error) {
			throw error;
		}
	}

	async emptyCart(cid) {
		try {
			const cart = await this.cartRepo.emptyCart(cid);

			return cart;
		} catch (error) {
			throw error;
		}
	}

	static getInstance(repo) {
		if (!CartsService.instance) {
			CartsService.instance = new CartsService(repo);
		}
		return CartsService.instance;
	}
}
