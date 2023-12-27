import express from "express";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }

    console.log(`Servidor activo en localhost:${PORT}`);
});
