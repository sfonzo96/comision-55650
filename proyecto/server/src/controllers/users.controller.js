import jwt from "jsonwebtoken";
import mailing from "../utils/mailing.js";
export default class SessionsController {
	constructor(usersService) {
		this.usersService = usersService;
	}

	sendPasswordResetEmail = async (req, res, next) => {
		const { email } = req.body;

		try {
			const user = await this.usersService.getUserByEmail(email);

			if (!user) {
				return res.status(404).json({
					success: false,
					message: "User not found",
				});
			}

			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
				expiresIn: "1h",
			});

			await mailing.sendPasswordChangeMail(email, token);

			res.status(200).json({ success: true, message: "Email sent" });
		} catch (error) {
			res.status(500).json({ success: false, message: "Internal server error" });
		}
	};

	updatePassword = async (req, res, next) => {
		try {
			const { token, newPassword } = req.body;

			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			await this.usersService.updatePassword(decoded.id, newPassword);
			res.status(200).json({ success: true, message: "Password updated" });
		} catch (error) {
			res.status(500).json({ success: false, message: error.message });
		}
	};

	verifyToken = async (req, res, next) => {
		const { token } = req.params;

		try {
			jwt.verify(token, process.env.JWT_SECRET);
			res.status(200).json({ success: true, message: "Valid token" });
		} catch (error) {
			res.status(401).json({ success: false, message: "Invalid token" });
		}
	};

	getUsers = async (req, res, next) => {
		const users = await this.usersService.getAllUsers();
		res.status(200).json(users);
	};

	changeRole = async (req, res, next) => {
		const { email, role } = req.body;

		try {
			await this.usersService.changeRole(email, role);
			res.status(200).json({ success: true, message: "Role changed" });
		} catch (error) {
			res.status(500).json({ success: false, message: error.message });
		}
	};
}
