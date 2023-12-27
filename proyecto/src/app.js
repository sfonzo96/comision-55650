import express from "express";
import IndexRouter from "./routes/index.routes.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", IndexRouter);

app.listen(PORT, (error) => {
	if (error) {
		console.log(error);
	}

	console.log(`Servidor activo en localhost:${PORT}`);
});
