function showForm() {
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
                <img src=${product.urlImage} alt="image" class="cardImg" />
                <p class="">${product.name}</p>
                <p class="">${product.price}</p>
                <p class="">${product.description}</p>

                <button class="deleteButton" click data-id="${product.id}">eliminar</button>
                <button class="updateButton" click data-id="${product.id}">Actualizar</button>
            </div>
        `;

        cardProduct.innerHTML = content;
        productsContainer.appendChild(cardProduct);
    });
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

const deleteButton = document.querySelectorAll(".deleteButton");
    deleteButton.forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-id");
            deleteProduct(productId);
        });
    });

            console.log('eliminado')
        
    

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
        }, 2000);
    }
});

// mostrar productos al cargar la página
window.onload = fetchAndShowProducts;





      

 
