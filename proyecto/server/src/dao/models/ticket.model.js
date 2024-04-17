import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
	{
		id: { type: Number, required: true },
		code: { type: String, required: true, max: 10, unique: true },
		purchase_datetime: { type: Date, required: true },
		products: {
			type: [
				{
					product: { type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true, _id: false },
					quantity: { type: Number, default: 1 },
				},
			],
			required: true,
		},
		amount: { type: Number, default: 0 },
		purchaser: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true, _id: false },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Tickets", TicketSchema);
