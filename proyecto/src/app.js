import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import IndexRouter from "./routes/index.routes.js";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import configPassport from "./config/passport.config.js";
import serverConfig from "./config/env.config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));
app.use(cookieParser());
app.use(
	session({
		store: MongoStore.create({ mongoUrl: serverConfig.DATABASE_URL, ttl: 1000 * 60 * 60 }),
		secret: serverConfig.COOKIE_SECRET,
		saveUninitialized: false,
		resave: true,
		cookie: {
			maxAge: 1000 * 60 * 60,
		},
	})
);

configPassport();
app.use(passport.initialize());
app.use(passport.session());

const hbs = handlebars.create({
	helpers: {
		eq(val1, val2) {
			return val1 === val2;
		},
	},
});

app.engine("handlebars", hbs.engine);
app.set("views", "src/views");
app.set("view engine", "handlebars");

// Middleware que agrega el servidor de ws (io) a todas las peticiones que llegan al servidor
// https://stackoverflow.com/questions/47837685/use-socket-io-in-expressjs-routes-instead-of-in-main-server-js-file
app.use((req, res, next) => {
	req.io = io;
	next();
});

app.use("/", IndexRouter);

const server = app.listen(serverConfig.PORT, (error) => {
	if (error) {
		console.log(error);
		return;
	}

	console.log(`Servidor activo en localhost:${serverConfig.PORT} ✨`);
});

const io = new Server(server);

io.on("connection", (socket) => {
	console.log("Se conecto un nuevo ususario");
});

// https://mongoosejs.com/docs/index.html

if (serverConfig.PERSISTENCE == "MONGO") {
	startMongoConnection()
		.then(() => {
			console.log("Conectado a la base de datos 🚀");
		})
		.catch((err) => console.log(err));
}

async function startMongoConnection() {
	await mongoose.connect(serverConfig.DATABASE_URL);
}
