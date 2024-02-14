import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 8,
		},
		age: {
			type: Number,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["admin", "user", "premium"],
			default: "user",
		},
	},
	{
		timestamps: true,
	}
);

const UserModel = mongoose.model("Users", userSchema);
export default UserModel;
