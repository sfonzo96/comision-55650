import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import IndexRouter from "./routes/index.routes.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));

app.engine("handlebars", handlebars.engine());
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
