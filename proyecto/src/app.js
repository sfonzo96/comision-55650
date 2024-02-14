import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import IndexRouter from "./routes/index.routes.js";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/";
const COOKIE_SECRET = process.env.COOKIE_SECRET || "ASDFASD!@#$";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));

app.use(cookieParser());
app.use(
	session({
		store: MongoStore.create({ mongoUrl: MONGO_URI, ttl: 1000 * 60 * 60 }),
		secret: COOKIE_SECRET,
		saveUninitialized: true,
		resave: true,
		cookie: {
			maxAge: 1000 * 60 * 60,
		},
	})
);

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

const server = app.listen(PORT, (error) => {
	if (error) {
		console.log(error);
	}

	console.log(`Servidor activo en localhost:${PORT} ✨`);
});

const io = new Server(server);

io.on("connection", (socket) => {
	console.log("Se conecto un nuevo ususario");
});

// https://mongoosejs.com/docs/index.html
startMongoConnection()
	.then(() => {
		console.log("Conectado a la base de datos 🚀");
	})
	.catch((err) => console.log(err));

async function startMongoConnection() {
	await mongoose.connect(MONGO_URI);
}
