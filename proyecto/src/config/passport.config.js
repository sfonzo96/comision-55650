import passport from "passport";
import passportLocal from "passport-local";
import passportGoogle from "passport-google-oauth20";
import services from "../services/factory.js";
import bcrypt from "bcrypt";

const configPassport = () => {
	passport.use(
		"login",
		new passportLocal.Strategy(
			{
				usernameField: "email",
				passwordField: "password",
				passReqToCallback: true,
			},
			async function (req, username, password, done) {
				try {
					const user = await services.usersService.getUserByEmail(username);

					if (!user) {
						req.loginSuccess = false;
						return done(null, false, { message: "User not found" });
					}

					const passwordsMatch = await bcrypt.compare(password, user.password);
					if (!passwordsMatch) {
						req.loginSuccess = false;
						return done(null, false, { message: "Invalid password" });
					}

					// delete user.password;

					// req.session.user = user;
					req.loginSuccess = true;
					return done(null, user);
				} catch (error) {
					console.log(error.message);
					return done(error);
				}
			}
		)
	);

	passport.use(
		"signup",
		new passportLocal.Strategy(
			{
				usernameField: "email",
				passwordField: "password",
				passReqToCallback: true,
			},
			async function (req, username, password, done) {
				try {
					const user = await services.usersService.getUserByEmail(username);

					if (user) {
						req.signupSuccess = false;
						return done(null, false, { message: "User already exists" });
					}

					const hashedPassword = await bcrypt.hash(password, 10);

					const { age, firstName, lastName } = req.body;

					const cart = await services.cartsService.createCart();

					const newUser = await services.usersService.createUser({
						email: username,
						password: hashedPassword,
						age,
						firstName,
						lastName,
						cart: cart._id,
					});

					if (!newUser) {
						req.signupSuccess = false;
						return done(null, false, { message: "Internal server error" });
					}

					req.signupSuccess = true;
					return done(null, newUser);
				} catch (error) {
					console.log(error.message);
					return done(error);
				}
			}
		)
	);

	passport.use(
		"google",
		new passportGoogle.Strategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: "http://localhost:8080/api/auth/googlecallback",
			},
			async function (accessToken, refreshToken, profile, done) {
				try {
					const cart = await services.cartsService.createCart();

					const newUser = {
						email: profile.emails[0].value,
						firstName: profile.name.givenName,
						lastName: profile.name.familyName,
						password: "password",
						// Comment: generar contraseña con uuid y enviarla en mail al crear
						cart: cart._id,
					};

					const user = await services.usersService.getOrCreateUser(newUser);

					if (!user) {
						return done(null, false, { message: "Internal server error" });
					}

					return done(null, user);
				} catch (error) {
					console.log(error.message);
					done(error, null);
				}
			}
		)
	);

	passport.serializeUser(function (user, done) {
		console.log("serial");
		done(null, user._id);
	});

	passport.deserializeUser(async function (id, done) {
		const user = await services.usersService.getUserById(id);
		delete user.password;
		done(null, user);
	});
};

export default configPassport;
