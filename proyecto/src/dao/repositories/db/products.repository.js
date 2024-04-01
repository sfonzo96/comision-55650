export default class ProductsRepository {
	constructor(model) {
		this.productModel = model;
	}

	async createProduct(product) {
		return await this.productModel.create(product);
	}

	async getAll(searchParams) {
		return await this.productModel.find(searchParams).lean();
	}

	async getById(pid) {
		return await this.productModel.findById({ _id: pid }).lean();
	}

	async getPaginated(filter) {
		filter.options.lean = true;
		const pagesData = await this.productModel.paginate(filter.query, filter.options).lean();

		pagesData.products = pagesData.docs; // Cambio nombre de propiedad para ser más explícito
		delete pagesData.docs; // Elimino propiedad que ya no uso

		return pagesData;
	}

	async deleteProduct(pid) {
		return await this.productModel.findOneAndDelete({ _id: pid }).lean();
	}

	async updateProduct(pid, productUpdates) {
		return await this.productModel.findOneAndUpdate({ _id: pid }, productUpdates, { new: true }).lean();
	}
}
