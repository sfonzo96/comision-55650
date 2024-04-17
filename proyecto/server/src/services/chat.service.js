export default class ChatService {
	static instance;
	constructor(repo) {
		this.repo = repo;
	}

	async createMessage(message) {
		try {
			const newMessage = await this.repo.createMessage(message);
			return newMessage;
		} catch (error) {
			throw error;
		}
	}

	async getMessages() {
		try {
			const messages = await this.repo.getAll();
			return messages;
		} catch (error) {
			throw error;
		}
	}

	static getInstance(repo) {
		if (!ChatService.instance) {
			ChatService.instance = new ChatService(repo);
		}
		return ChatService.instance;
	}
}
