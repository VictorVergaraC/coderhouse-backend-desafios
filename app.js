const express = require('express');
const fs = require('fs');

const app = express();

const PORT = 8080;

class ProductManager {

    constructor() {
        this.filePath = "productos.json";
    }

    async getProducts() {
        try {

            const data = await fs.readFileSync(this.filePath, "utf8");
            return data ? JSON.parse(data) : [];

        } catch (error) {
            console.log("Error fetching products:", error);
            return [];
        }
    }

    async getProductById(idProduct) {
        const products = await this.getProducts();

        const product = products.find(prod => prod.id === idProduct);

        return product ? product : null;
    }

}


app.get('/', (req, res) => {
    res.send("Bienvenid@ al tercer desafío!");
})

app.get('/products', async (req, res) => {

    const objProduct = new ProductManager();
    const products = await objProduct.getProducts();

    // Si no tenemos productos, no necesitamos saber si hay límite de consulta;
    if (products.length <= 0) {
        res.send("No se encontraron productos!");
        return
    }

    const copyData = [...products];

    const limit = parseInt(req.query.limit) || copyData.length;

    const response = copyData.slice(0, limit);

    res.send(JSON.stringify(response));

});

app.get('/products/:pid', async (req, res) => {

    const idReq = req.params.pid;

    const objProduct = new ProductManager();

    const product = await objProduct.getProductById(parseInt(idReq));

    res.send(product ? JSON.stringify(product) : "Producto no encontrado!");

});

app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto: ${PORT}`));