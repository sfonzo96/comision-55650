import MessageModel from "../../dao/models/message.model.js";

export default class ChatService {
	constructor(repo) {
		this.repo = repo;
	}

	async createMessage(message) {
		try {
			const newMessage = await this.repo.create(message);
			return newMessage;
		} catch (error) {
			throw error;
		}
	}

	async getMessages(searchParams = {}) {
		try {
			const messages = await this.repo.get(searchParams);
			return messages;
		} catch (error) {
			throw error;
		}
	}
}
