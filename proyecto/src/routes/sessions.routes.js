import bcrypt from "bcrypt";
import { Router } from "express";
import UserService from "../services/db/User.Service.db.js";

const sessionsRouter = Router();
const userService = new UserService();

sessionsRouter.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await userService.getUserByEmail(email);

		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		const passwordsMatches = await bcrypt.compare(password, user.password);

		if (!passwordsMatches) {
			return res.status(401).json({ success: false, message: "Invalid password" });
		}

		delete user.password;

		req.session.user = user;

		res.status(200).json({ success: true, message: "User logged in", redirectUrl: "/products" });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
});

sessionsRouter.post("/signup", async (req, res) => {
	try {
		const { email, password, age, firstName, lastName } = req.body;

		const user = await userService.getUserByEmail(email);

		if (user) {
			return res.status(400).json({ success: false, message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await userService.createUser({ email, password: hashedPassword, age, firstName, lastName });

		if (!newUser) {
			return res.status(500).json({ success: false, message: "Internal server error" });
		}

		res.status(201).json({ success: true, message: "User created", redirectUrl: "/login" });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
});

sessionsRouter.post("/logout", async (req, res) => {
	try {
		req.session.destroy((error) => {
			if (error) {
				console.log(error);
				res.status(500).json({ success: false, message: "Internal server error" });
			} else {
				res.status(200).json({ success: true, message: "User logged out", redirectUrl: "/login" });
			}
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
});

export default sessionsRouter;
