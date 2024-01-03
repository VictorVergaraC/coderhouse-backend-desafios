const fs = require('fs')

class ProductManager {

    constructor(path) {
        this.path = path
    }

    async addProduct(objProduct) {
        const id = await this.getLastId()

        const newObj = {
            id,
            ...objProduct
        }

        let arrData = await this.getProducts()
        arrData = [...arrData, newObj]

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(arrData))
            console.log("Objeto creado correctamente!", newObj)
        } catch (error) {
            console.error("Error al crear el objeto:", error)
        }
    }

    async getLastId() {
        const arrData = await this.getProducts() || []
        return arrData.length + 1
    }

    async getProducts() {
        try {

            const fileExist = await this.fileExist(this.path)

            if (!fileExist) {
                const created = await this.createFile(this.path, "[]")
                if (!created) {
                    throw error;
                    return
                }
            }

            const data = await fs.readFileSync(this.path, "utf8")
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error("Error al leer el archivo:", error);
            return [];
        }
    }

    async getProductById(idProduct) {
        const arrData = await this.getProducts()
        const product = arrData.find(item => item.id === idProduct)

        if (product) {
            console.log("Producto encontrado:", product)
            return product
        }

        console.log("Producto no encontrado ...")
        return null;
    }

    async updateProduct(idProduct, newObjProduct) {

        const product = await this.getProductById(idProduct);

        if (!product) {
            console.log("El producto no existe, por ende no se puede actualizar ...");
            return;
        }

        const arrData = await this.getProducts()

        if (arrData.length > 0) {
            const index = arrData.findIndex(item => item.id === idProduct)

            if (index < 0) {
                console.log("Producto no encontrado!")
                return
            }

            arrData[index] = {
                ...arrData[index],
                ...newObjProduct,
                id: idProduct
            }

            console.log("Producto actualizado!", arrData[index]);
            return arrData[index];
        }

        console.log("No se encontraron productos!")
    }

    async deleteProduct(idProduct) {

        const product = await this.getProductById(idProduct);

        if (!product) {
            console.log("El producto no existe, por ende no se puede eliminar ...");
            return;
        }

        const arrData = await this.getProducts();

        const newArr = arrData.filter(item => item.id !== idProduct);

        try {

            const deleted = await this.createFile(this.path, JSON.stringify(newArr));
            if (deleted) {
                console.log("Producto eliminado!")
                return
            }
            console.log("No se pudo eliminar el producto!");
            return;

        } catch(error) {
            console.log("Error al intentar eliminar el producto...", error)
        }

    }

    async fileExist(strFile) {
        try {
            await fs.promises.access(strFile, fs.constants.F_OK);
            return true;
        } catch (error) {
            return false;
        }
    }

    async createFile(strName, data) {
        try {
            fs.writeFileSync(strName, data)
            return true

        } catch (error) {
            console.error("Error al crear el archivo", error)
            return false
        }
    }

}

// Haciendo uso de los requerimientos ...

const newObject = {
    title: 'Sprite',
    description: 'Bebida Sprite Zero',
    price: 990,
    thumbnail: 'sin imagen',
    code: '780968574123',
    stock: 10
}

const updateObject = {
    title: 'Fanta',
    description: 'Bebida Fanta Light',
    price: 990,
    thumbnail: 'sin imagen',
    code: '780968574123',
    stock: 10
}

const prodManager = new ProductManager("products.json")

const loadProducts = async () => {
    
    const allProducts = await prodManager.getProducts();
    console.log("Listado de productos ...");
    console.log(allProducts);
}

// prodManager.addProduct(newObject);
// prodManager.updateProduct(1, updateObject);
// prodManager.getProductById(2);
// prodManager.getProductById(5);
// prodManager.deleteProduct(2);
// prodManager.deleteProduct(5);
// loadProducts();
