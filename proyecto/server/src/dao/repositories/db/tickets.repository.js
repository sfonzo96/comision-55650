export default class TicketsRepository {
	constructor(model) {
		this.TicketModel = model;
	}

	async create(ticket) {
		return await this.TicketModel.create(ticket);
	}

	async find() {
		return this.TicketModel.find().lean();
	}

	async findById(tid) {
		return this.TicketModel.findById(tid).lean();
	}
}
