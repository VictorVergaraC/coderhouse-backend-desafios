import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.router.js";

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const app = express();
const PORT = 8080;

// * Configurar handlebars
app.engine("handlebars", handlebars.engine());
// * Carpeta views para vistas
app.set("views", __dirname + "/views");
// * Usa handlebars como motor de plantillas
app.set("views engine", "handlebars")
// * Usa los archivos dentro de la carpeta views
app.use(express.static(__dirname + "/views"));
// * Usamos los archivos de la carpeta public
app.use(express.static(path.join(__dirname, "public")));

// * Routes
app.use("/", productsRouter);

app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto: ${PORT}`));
