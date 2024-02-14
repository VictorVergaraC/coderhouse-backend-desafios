
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

    Swal.fire({
        icon: "success",
        title: "Producto creado!",
        text: ` `
    })
});

socket.emit('getProducts');

socket.on('products', productos => {

    const containerProducts = document.getElementById('container-products');
    containerProducts.innerHTML = '';
    
    productos.forEach(elem => {
        const element = document.createElement('article');
        element.classList.add('card', 'border');
        const { title, description, price, stock } = elem;
        
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
        `;
        containerProducts.appendChild(element);
    });

});
