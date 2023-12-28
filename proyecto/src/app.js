import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import IndexRouter from "./routes/index.routes.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", "src/views");
app.set("view engine", "handlebars");

// Middleware que agrega el servidor de ws (io) a todas las peticiones que llegan al servidor
app.use((req, res, next) => {
	req.io = io;
	next();
});

app.use("/", IndexRouter);

const server = app.listen(PORT, (error) => {
	if (error) {
		console.log(error);
	}

	console.log(`Servidor activo en localhost:${PORT}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
	console.log("Se conecto un nuevo ususario");
});
