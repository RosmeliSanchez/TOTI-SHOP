function showForm() {
    productForm.style = 'display: flex';
}

const form = document.querySelector('#productForm')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const urlImage = document.querySelector('#image').value
    const name = document.querySelector('#name').value
    const price = document.querySelector('#price').value
    const description = document.querySelector('#description').value

    if (urlImage === "" && name === "" && price === "" && description === "") {
        
        const alertMessage = document.querySelector('.alert')
        alertMessage.innerHTML = "Deve preencher todo o formulário"
    } else {
        
        fetch()
    }
})