import { Router } from "express";
import passport from "passport";
import SessionsController from "../controllers/sessions.controller.js";

const authRouter = Router();
const sessionsController = new SessionsController();

authRouter.post("/login", passport.authenticate("login", {}), sessionsController.login);

authRouter.post("/signup", passport.authenticate("signup", { session: false }), sessionsController.signup);

authRouter.get("/google", passport.authenticate("google", { scope: ["profile email"] }));

authRouter.get("/googlecallback", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
	res.redirect("/products");
});

authRouter.post("/logout", sessionsController.logout);

authRouter.get("/current", sessionsController.getCurrentSession);

export default authRouter;
