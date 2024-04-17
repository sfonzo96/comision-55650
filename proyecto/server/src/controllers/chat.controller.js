export default class ChatController {
	constructor(service) {
		this.chatService = service;
	}

	createMessage = async (req, res, next) => {
		try {
			const { user, message } = req.body;
			const newMessage = await chatService.createMessage({ user, message });
			if (!newMessage) {
				throw new CustomError("Message could not be created", 400);
			}

			req.io.emit("newMessage", newMessage);

			return res.status(201).json({ success: true });
		} catch (error) {
			next(error);
		}
	};
}
