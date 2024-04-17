export default class CartsRepository {
	constructor(model) {
		this.CartModel = model;
	}

	async create(products) {
		return await this.CartModel.create({ products });
	}

	async getAll() {
		return await this.CartModel.find().lean();
	}

	async getById(cid) {
		return await this.CartModel.findOne({ _id: cid }).lean();
	}

	async cartExists(cid, pid) {
		return await this.CartModel.exists({ _id: cid, "products.product": pid }).lean();
	}

	async addProductToCart(cid, pid) {
		return await this.CartModel.findOneAndUpdate(
			{ _id: cid },
			{ $push: { products: { product: pid, quantity: 1 } } }
		).lean();
	}

	async emptyCart(cid) {
		return await this.CartModel.findOneAndUpdate({ _id: cid }, { $set: { products: [] } }).lean();
	}

	async removeProductFromCart(cid, pid) {
		return await this.CartModel.findOneAndUpdate({ _id: cid }, { $pull: { products: { product: pid } } }).lean();
	}

	async updateCart(cid, products) {
		return await this.CartModel.findOneAndUpdate({ _id: cid }, { $set: { products } }).lean();
	}

	async updateQuantity(cid, pid, quantity) {
		return await this.CartModel.findOneAndUpdate(
			{ _id: cid, "products.product": pid },
			{ $set: { "products.$.quantity": quantity } }
		).lean();
	}
}
