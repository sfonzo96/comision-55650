export default class TicketsController {
	constructor(ticketsService) {
		this.ticketsService = ticketsService;
	}

	async createTicket(req, res) {
		const { cart, _id } = req.user;

		try {
			const ticket = await this.ticketsService.createTicket(cart, _id);
			res.status(201).json(ticket);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	}

	async getTickets(req, res) {
		try {
			const tickets = await this.ticketsService.getTickets();
			res.status(200).json(tickets);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	}

	async getTicketById(req, res) {
		const { id } = req.params;

		try {
			const ticket = await this.ticketsService.getTicketById(id);
			res.status(200).json(ticket);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	}
}
