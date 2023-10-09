function Product(title, price, image) {
    this.title = title;
    this.price = price;

    this.image = image;
}

async function fetchAndCreateProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        
        if (Array.isArray(data) && data.length >= 20) {
            const dataArray = data.slice(0, 20);
            const productContainer = document.getElementById('product-container');
            const products = dataArray.map(item => {
                return new Product(item.title, item.price, item.image);
            });
            products.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <h2>${product.title}</h2>
                    <p>Price: $${product.price}</p>
                    <img src="${product.image}" alt="${product.title}">
                `;
                productContainer.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
fetchAndCreateProducts();
