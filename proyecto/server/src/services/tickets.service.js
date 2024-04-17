import TicketDTO from "../DTOs/ticketDTO.js";

export default class TicketsService {
	static instance;

	constructor(ticketsRepo, productsRepo, cartsRepo) {
		this.ticketRepo = ticketsRepo;
		this.productsRepo = productsRepo;
		this.cartsRepo = cartsRepo;
	}

	static getInstance(ticketRepo, productsRepo) {
		if (!TicketsService.instance) {
			TicketsService.instance = new TicketsService(ticketRepo, productsRepo);
		}
		return TicketsService.instance;
	}

	async createTicket(cartId, userId) {
		const availableProducts = [];
		const notAvailableProducts = [];
		const cart = await this.cartsRepo.getById(cartId);

		for (const cartProduct of cart.products) {
			const productFromDb = await this.productsRepo.findById(cartProduct.product);

			if (productFromDb.stock >= cartProduct.quantity) {
				availableProducts.push(cartProduct);
				await this.productsRepo.update(productFromDb._id, {
					stock: productFromDb.stock - cartProduct.quantity,
				});
			} else {
				notAvailableProducts.push(cartProduct);
			}
		}

		await this.cartsRepo.update(cartId, notAvailableProducts);
		const ticket = new TicketDTO(availableProducts, userId);

		return await this.ticketRepo.create(ticket);
	}

	async getTickets() {
		return await this.ticketRepo.find();
	}

	async getTicketById(id) {
		return await this.ticketRepo.findById(id);
	}
}
