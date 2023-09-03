function showForm(productId) {
    const productForm = document.querySelector('#productForm');
    productForm.style.display = 'flex';
}

function showProducts(products) {
    const productsContainer = document.querySelector(".content");
    productsContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar los nuevos productos
    
    products.forEach(product => {
        const cardProduct = document.createElement("div");
        cardProduct.className = "cardProduct"; // Asignar una clase para el estilo CSS

        const content = `
            <div>
                <img src=${product.urlImage} alt="image" class="cardImg" width="250px" height="250px"/>
                <p class="">${product.name}</p>
                <p class="">${product.price}</p>
                <p class="">${product.description}</p>
                <button class="deleteButton" data-id="${product.id}" onclick="deleteProduct(${product.id})">Eliminar</button>
                <button class="updateButton" data-id="${product.id}" onclick="updateProduct(${product.id})">Actualizar</button>
            </div>
        `;

        const deleteButton = document.createElement("button"); // Eliminar elementos
        deleteButton.className = "deleteButton"
        const productId = product.id;
        deleteButton.addEventListener("click", () => {
            deleteProduct(productId);
            console.log(`Eliminado ${productId}`)
        });
        
        const form = document.querySelector('#productForm');

        cardProduct.innerHTML = content;
        productsContainer.appendChild(cardProduct);
        cardProduct.appendChild(deleteButton);
    });
}

function cancelUpdate() {
    const productForm = document.querySelector('#productForm');
    productForm.style.display = 'none';
    form.reset()
}

function fetchProducts() {
    return fetch("https://64eb5a4de51e1e82c5773fef.mockapi.io/products")
        .then(response => response.json())
        .catch(error => console.log(error));
}


async function fetchAndShowProducts() {
    const products = await fetchProducts();
    showProducts(products);
}

async function deleteProduct(productId) {
    await fetch(`https://64eb5a4de51e1e82c5773fef.mockapi.io/products/${productId}`, {
        method: "DELETE"
    });
    

    fetchAndShowProducts(); // Actualizar la lista de productos después de borrar uno
}    

async function updateProduct(productId) {
    const productToUpdate = await fetchProductById(productId);
    if (productToUpdate) {
        // Llenar el formulario de edición con los datos del producto existente
        document.querySelector('#image').value = productToUpdate.urlImage;
        document.querySelector('#name').value = productToUpdate.name;
        document.querySelector('#price').value = productToUpdate.price;
        document.querySelector('#description').value = productToUpdate.description;

        // Mostrar el formulario de edición
        const productForm = document.querySelector('#productForm');
        productForm.style.display = 'flex';

        // Agregar un evento al formulario de edición para realizar la actualización
        productForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            // Realizar la solicitud PUT para actualizar el producto en el servidor

            await fetch(`https://64eb5a4de51e1e82c5773fef.mockapi.io/products/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    urlImage: document.querySelector('#image').value,
                    name: document.querySelector('#name').value,
                    price: document.querySelector('#price').value,
                    description: document.querySelector('#description').value
                })
            });

            // Ocultar el formulario de edición y actualizar la lista de productos
            productForm.style.display = 'none';
            fetchAndShowProducts();
        });
    }
}

async function fetchProductById(productId) {
    try {
        const response = await fetch(`https://64eb5a4de51e1e82c5773fef.mockapi.io/products/${productId}`);
        if (response.ok) {
            const product = await response.json();
            return product;
        } else {
            console.error('Error al obtener el producto por ID');
            return null;
        }
    } catch (error) {
        console.error('Error en la solicitud para obtener el producto por ID:', error);
        return null;
    }
}

const form = document.querySelector('#productForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const urlImage = document.querySelector('#image').value;
    const name = document.querySelector('#name').value;
    const price = document.querySelector('#price').value;
    const description = document.querySelector('#description').value;

    if (urlImage === "" || name === "" || price === "" || description === "") {
        const alertMessage = document.querySelector('.alert');
        alertMessage.innerHTML = "Deve preencher o formulario";
        alertMessage.style = 'display: block; color: red';
    } else {
        // Realizar la solicitud POST y luego obtener y mostrar los productos actualizados
        await fetch('https://64eb5a4de51e1e82c5773fef.mockapi.io/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                urlImage,
                name,
                price,
                description
            })
        });

        fetchAndShowProducts();

        setTimeout(() => {
            form.style.display = 'none';
            form.reset();
        }, 1000);
    }
});

// mostrar productos al cargar la página
window.onload = fetchAndShowProducts;
