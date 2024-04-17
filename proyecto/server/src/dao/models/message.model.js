import mongoose from "mongoose";
// https://mongoosejs.com/docs/api/schema.html
// https://mongoosejs.com/docs/validation.html
const messageSchema = new mongoose.Schema(
	{
		user: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const MessageModel = mongoose.model("Messages", messageSchema);
export default MessageModel;
