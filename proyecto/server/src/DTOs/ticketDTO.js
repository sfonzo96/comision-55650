export default class TicketDTO {
	constructor(products, purchaser) {
		this.products = products;
		this.amount = this.getTotalAmount();
		this.code = this.generateCode();
		this.purchase_datetime = new Date();
		this.purchaser = purchaser;
	}

	generateCode() {
		return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	}

	getTotalAmount() {
		return this.products.reduce((acc, product) => acc + product.price * product.quantity, 0);
	}
}
