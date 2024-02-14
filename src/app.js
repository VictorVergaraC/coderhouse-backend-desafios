import express from "express";
import http from "http";
import path from "path";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { ProductManager } from './public/models/ProductsManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 8080;

// * Configurar handlebars como motor de plantillas
app.engine("handlebars", handlebars.engine());

// * Carpeta views para vistas y motor de plantillas
app.set("views", __dirname + "/views");
app.set("views engine", "handlebars");

// * Middlewares para archivos estáticos
app.use(express.static(__dirname + "/views"));
app.use(express.static(path.join(__dirname, "public")));

// * Routes
app.get("/", async (req, res) => {
    const objProduct = new ProductManager;
    const arrProducts = await objProduct.getProducts();

    return res.render('home.hbs', { productos: arrProducts });
});

app.get("/realtimeproducts", async (req, res) => {

    const objProduct = new ProductManager;
    const arrProducts = await objProduct.getProducts();

    return res.render('realtimeProducts.hbs', { productos: arrProducts });
});

// * Conecta el socket y emite un evento al establecer la conexión
io.on('connection', socket => {
    console.log('Nuevo usuario conectado.');

    const objProduct = new ProductManager;

    socket.on('getProducts', async () => {
        const arrProducts = await objProduct.getProducts();
        socket.emit('products', arrProducts);
    });

    socket.on('insertProduct', async (data) => {
        console.log(data);

        await objProduct.addProduct(data);
        const arrProducts = await objProduct.getProducts();
        socket.emit('products', arrProducts);

    });


});

server.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto: ${PORT}`));
