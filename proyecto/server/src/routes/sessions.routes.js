import { Router } from "express";
import passport from "passport";
import SessionsController from "../controllers/sessions.controller.js";

const authRouter = Router();
const sessionsController = new SessionsController();

authRouter.post(
	"/login",
	(req, res, next) => {
		passport.authenticate("login", (err, user, info) => {
			if (err || !user) {
				console.log(info);
				return res.status(401).json({ success: false, message: info.message });
			}

			next();
		})(req, res, next);
	},
	sessionsController.login
);

authRouter.post(
	"/signup",
	(req, res, next) => {
		passport.authenticate("login", { session: false }, (err, user, info) => {
			if (err || !user) {
				console.log(info);
				return res.status(401).json({ success: false, message: info.message });
			}

			next();
		})(req, res, next);
	},
	sessionsController.signup
);

authRouter.get("/google", (req, res, next) => {
	passport.authenticate("google", { scope: ["profile email"] }, (err, user, info) => {
		if (err || !user) {
			console.log(info);
			return res.status(401).json({ success: false, message: info.message });
		}

		next();
	})(req, res, next);
});

authRouter.get("/github", (req, res, next) => {
	passport.authenticate("github", { scope: ["user:email"] }, (err, user, info) => {
		if (err || !user) {
			console.log(info);
			return res.status(401).json({ success: false, message: info.message });
		}

		next();
	})(req, res, next);
});

authRouter.get("/googlecallback", passport.authenticate("google"), (req, res) => {
	res.redirect("/products");
});

authRouter.get("/githubcallback", passport.authenticate("github"), (req, res) => {
	res.redirect("/products");
});

authRouter.post("/logout", sessionsController.logout);

authRouter.get("/current", sessionsController.getCurrentSession);

export default authRouter;
