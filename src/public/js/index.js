
const socket = io();

const formProduct = document.getElementById('form-product');

formProduct.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = {};

    const elements = formProduct.querySelectorAll('input');
    elements.forEach(elem => {
        formData[elem.name] = elem.value;
    });

    socket.emit('insertProduct', formData);

    formProduct.querySelector('form').reset();

    alert('Producto creado!');
});

socket.emit('getProducts');

socket.on('products', productos => {

    const containerProducts = document.getElementById('container-products');
    containerProducts.innerHTML = '';

    productos.forEach(elem => {
        const element = document.createElement('article');
        element.classList.add('card', 'border');
        const { id, title, description, price, stock } = elem;

        element.innerHTML = `
            <div class="card-header">
                <h6>${title}</h6>
            </div>
            <div class="card-body">
                <p>
                    <strong>Descripción:</strong> ${description}
                </p>
                <p>
                    <strong>Precio: </strong> $${price}
                </p>
                <p>
                    <strong>Stock: </strong> ${stock}
                </p>
            </div>
            <div class="card-footer">
                <button class="btn btn-sm btn-danger" onclick="handleDeleteProduct(${id})">Eliminar</button>
            </div>
        `;

        containerProducts.appendChild(element);
    });

});

const handleDeleteProduct = async (strId) => {
    const productId = parseInt(strId);
    socket.emit('deleteProduct', productId);
    alert('Producto eliminado correctamente!');
}