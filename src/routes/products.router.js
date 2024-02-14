import express from "express";
import http from "http";
import { Server } from "socket.io";
import handlebars from "express-handlebars";

import { ProductManager } from "../public/models/ProductsManager.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const router = express.Router();

router.get("/", async (req, res) => {
    const objProduct = new ProductManager;
    const arrProducts = await objProduct.getProducts();

    return res.render('realtimeProducts.hbs', { productos: arrProducts });
});

router.get("/realtimeproducts", async (req, res) => {

    res.json({ message: "Hola mundo!" });
});

io.on('connection', (socket) => {
    console.log('Usuario conectado');
    
});

export default router;