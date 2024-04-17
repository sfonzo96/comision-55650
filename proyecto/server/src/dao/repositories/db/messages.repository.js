export default class ChatRepository {
	constructor(model) {
		this.messageModel = model;
	}

	async createMessage(message) {
		try {
			const newMessage = await this.messageModel.create(message);
			return newMessage;
		} catch (error) {
			throw error;
		}
	}

	async getAll() {
		try {
			const messages = await this.messageModel.find().lean();
			return messages;
		} catch (error) {
			throw error;
		}
	}
}
