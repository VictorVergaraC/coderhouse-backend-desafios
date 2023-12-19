class TicketManager {
    constructor() {
        this.eventos = []
        this.precioBaseDeGanancia = 0
    }

    getEventos() {
        return this.eventos
    }

    getUltimoId() {
        return this.eventos.length + 1
    }

    agregarEvento(nombre, lugar, precio, capacidad = 50, fecha = new Date(), participantes = []) {
        const id = this.getUltimoId()
        const precioConGanancia = parseInt(precio) + (parseInt(precio) * 0.5) + this.precioBaseDeGanancia

        const nuevoEvento = {
            id, nombre, lugar, precio: precioConGanancia, capacidad, fecha, participantes
        }

        this.eventos = [...this.eventos, nuevoEvento]
    }

    agregarUsuario(idEvento, idUsuario) {
        const existeEvt = this.existeEvento(parseInt(idEvento))
        if (existeEvt) {
            const usuarioEnEvento = this.existeUsuarioEnEvento(idUsuario, existeEvt)
            if (usuarioEnEvento) {
                console.log(`\nEl usuario ${idUsuario} ya se encuentra registrado en el evento.\n`)
                return
            }

            existeEvt.participantes = [...existeEvt.participantes, idUsuario]
            console.log(`\nUsuario: ${idUsuario} agregado al evento: ${idEvento}!\n`)
            return
        }

        console.log(`\nEl evento ${idEvento} no existe!\n`)
        return
    }

    ponerEventoEnGira(idEvento, nuevaLocalidad, nuevaFecha) {
        const existeEvt = this.existeEvento(idEvento)

        if (existeEvt) {
            const index = this.eventos.findIndex(evento => evento.id === idEvento)
            this.eventos[index] = {
                ...this.eventos[index],
                lugar: nuevaLocalidad,
                fecha: nuevaFecha
            }
            console.log(`\nEvento ${idEvento} puesto en Gira!`, this.eventos[index], '\n')
            return 
        }
    }

    existeEvento(idEvt) {
        return this.eventos.find(evento => evento.id === idEvt)
    }

    existeUsuarioEnEvento(idUsuario, evento) {
        return evento.participantes.includes(idUsuario)
    }
}

const ticketManager = new TicketManager()
ticketManager.precioBaseDeGanancia = 2500;

ticketManager.agregarEvento('Concierto', 'Estadio Nacional', 20000)
ticketManager.agregarEvento('Conferencia', 'Municipalidad', 10000)

console.log(ticketManager.getEventos())

ticketManager.agregarUsuario(1, 1)
ticketManager.agregarUsuario(1, 1)
ticketManager.agregarUsuario(1, 3)

console.log(ticketManager.getEventos())

ticketManager.ponerEventoEnGira(2, 'Estadio Pucón', new Date('2024-01-01'))

console.log(ticketManager.getEventos())

class ProductManager {
    
    constructor() {
        this.products = []
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const codeExist = this.productExist(code)

        if (codeExist) {
            console.log(`El producto con el código: ${code} ya se encuentra registrado!`)
            return
        }
        const id = this.getLastId()
        const newProduct = { id, title, description, price, thumbnail, code, stock }

        this.products = [...this.products, newProduct]

        console.log('Producto creado! :', newProduct)
        return
    }

    getProducts() {
        return this.products
    }

    getProductById(idProduct) {
        const filterObject = this.products.find(product => product.id === idProduct)

        return filterObject || `Producto ${idProduct} no encontrado!`
    }

    getLastId() {
        return this.products.length + 1
    }

    productExist(codeProduct) {
        return this.products.find(product => product.code === codeProduct)
    }

}

const prodManager = new ProductManager()
prodManager.addProduct('Chocolate', 'Con almendras', 4990, 'Sin imagen', 'abc123', 10)
console.log('Listado de productos:', prodManager.getProducts())
prodManager.addProduct('Chocolate', 'Con almendras', 4990, 'Sin imagen', 'abc123', 10)
console.log('Producto by id:', prodManager.getProductById(1))
console.log('Producto by id:', prodManager.getProductById(5))
