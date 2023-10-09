// Constructor function to create product objects
function Product(title, price, image) {
    this.title = title;
    this.price = price;

    this.image = image;
}

// Function to fetch data from the Fake Store API and create product objects
async function fetchAndCreateProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        // Check if data is an array and has at least 20 items
        if (Array.isArray(data) && data.length >= 20) {
            const dataArray = data.slice(0, 20); // Take the first 20 items

            const productContainer = document.getElementById('product-container');

            // Loop through the data array and create product objects
            const products = dataArray.map(item => {
                return new Product(item.title, item.price, item.image);
            });

            // Render the product cards in the main section
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

// Call the fetchAndCreateProducts function to fetch and render data
fetchAndCreateProducts();
