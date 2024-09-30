document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar el comportamiento por defecto del formulario

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validar las credenciales
        if (username === 'mor_2314' && password === '83r5^_') {
            // Consumir la API si las credenciales son correctas
            fetch('https://fakestoreapi.com/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(json => {
                console.log('Respuesta del servidor:', json);
                alert('Inicio de sesión exitoso');

                // Redirigir a la página de productos
                window.location.href = 'productos.html';
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            // Mostrar mensaje de error si las credenciales son incorrectas
            errorMessage.style.display = 'block';
        }
    });
});



// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.querySelector('.product-list');

    // Función para obtener los productos de la API
    const fetchProducts = () => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(products => displayProducts(products))
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    // Función para mostrar los productos en el DOM
    const displayProducts = (products) => {
        productList.innerHTML = ''; // Limpiar contenido previo

        products.forEach(product => {
            // Crear el HTML de cada card
            const productCard = `
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <img src="${product.image}" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${product.description.substring(0, 100)}...</p>
                            <p class="card-text"><strong>$${product.price}</strong></p>
                        </div>
                        <div class="card-footer">
                            <a href="#" class="btn btn-primary">Comprar</a>
                        </div>
                    </div>
                </div>
            `;

            // Insertar cada card en el div product-list
            productList.innerHTML += productCard;
        });
    };

    // Llamar a la función para obtener y mostrar los productos
    fetchProducts();
});

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.querySelector('.product-list');
    const categoryButtonsContainer = document.getElementById('category-buttons');

    // Función para obtener las categorías de la API
    const fetchCategories = () => {
        fetch('https://fakestoreapi.com/products/categories')
            .then(response => response.json())
            .then(categories => {
                displayCategoryButtons(categories);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    };

    // Función para mostrar los botones de categorías en el DOM
    const displayCategoryButtons = (categories) => {
        // Crear un botón para cada categoría
        categories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'btn btn-outline-primary m-1';
            button.textContent = category;
            button.onclick = () => filterProductsByCategory(category); // Asignar función de filtrado
            categoryButtonsContainer.appendChild(button);
        });

        // Botón para mostrar todos los productos
        const allButton = document.createElement('button');
        allButton.className = 'btn btn-outline-primary m-1';
        allButton.textContent = 'Todos';
        allButton.onclick = fetchProducts; // Mostrar todos los productos
        categoryButtonsContainer.appendChild(allButton);
    };

    // Función para obtener los productos de la API
    const fetchProducts = () => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(products => displayProducts(products))
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

   const displayProducts = (products) => {
    productList.innerHTML = ''; // Limpiar contenido previo

    products.forEach(product => {
        // Crear el HTML de cada card
        const productCard = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description.substring(0, 100)}...</p>
                        <p class="card-text"><strong>$${product.price}</strong></p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Agregar</button>
                    </div>
                </div>
            </div>
        `;

        // Insertar cada card en el div product-list
        productList.innerHTML += productCard;
    });
};

// Función para agregar un producto al carrito
const addToCart = (productId) => {
    const cartData = {
        userId: 5,
        date: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
        products: [{ productId: productId, quantity: 1 }]
    };

    fetch('https://fakestoreapi.com/carts', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json' // Agregar el tipo de contenido
        },
        body: JSON.stringify(cartData)
    })
    .then(res => res.json())
    .then(json => {
        console.log('Producto agregado al carrito:', json);
        alert('Producto agregado al carrito!');
    })
    .catch(error => {
        console.error('Error al agregar producto al carrito:', error);
        alert('Error al agregar producto al carrito.');
    });
};

// Llamar a la función para obtener y mostrar los productos
fetchProducts();

    // Función para filtrar productos por categoría
    const filterProductsByCategory = (category) => {
        fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then(response => response.json())
            .then(products => displayProducts(products))
            .catch(error => {
                console.error('Error fetching products by category:', error);
            });
    };

    // Llamar a la función para obtener y mostrar las categorías y productos al cargar la página
    fetchCategories();
    fetchProducts();
});

document.addEventListener("DOMContentLoaded", () => {
    const cartBody = document.getElementById("cart-body");
    const cartTable = document.getElementById("cart-table");

    // Función para obtener los datos del carrito
    const fetchCartData = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/carts/user/1');
            const data = await response.json();

            // Limpiar el contenido previo de la tabla
            cartBody.innerHTML = '';

            // Mostrar la tabla
            cartTable.style.display = 'block';

            // Llenar la tabla con los datos obtenidos
            data.forEach(cart => {
                const row = `
                    <tr>
                        <td>${cart.id}</td>
                        <td>${cart.date}</td>
                        <td><a href="#" onclick="viewCart(${cart.id})">Ver</a></td>
                    </tr>
                `;  
                cartBody.innerHTML += row;
            });
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };

    // Llamar a la función para obtener los datos del carrito
    fetchCartData();
});

document.addEventListener("DOMContentLoaded", () => {
    const cartBody = document.getElementById("cart-body");
    const cartTable = document.getElementById("cart-table");

    // Función para obtener los datos del carrito
    const fetchCartData = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/carts/user/1');
            const data = await response.json();

            // Limpiar el contenido previo de la tabla
            cartBody.innerHTML = '';

            // Mostrar la tabla
            cartTable.style.display = 'block';

            // Llenar la tabla con los datos obtenidos
            data.forEach(cart => {
                const row = `
                    <tr>
                        <td>${cart.id}</td>
                        <td>${cart.date}</td>
                        <td><a href="#" onclick="viewCart(${cart.id})" class="btn btn-link">Ver</a></td>
                    </tr>
                `;
                cartBody.innerHTML += row;
            });
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };

    // Llamar a la función para obtener los datos del carrito
    fetchCartData();
});

// Función para manejar la acción de ver el carrito
const viewCart = async (cartId) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/carts/${cartId}`);
        const cartDetails = await response.json();

        const cartDetailsBody = document.getElementById("cart-details-body");
        cartDetailsBody.innerHTML = ''; // Limpiar contenido previo

        // Calcular el subtotal y llenar la tabla
        cartDetails.products.forEach(product => {
            const subtotal = product.quantity * product.productId; // Ejemplo de cálculo, ajusta según tu lógica
            const row = `
                <tr>
                    <td>${product.productId}</td>
                    <td>${product.quantity}</td>
                    <td>$${product.productId}</td> <!-- Suponiendo que productId es el valor -->
                    <td>$${subtotal}</td>
                </tr>
            `;
            cartDetailsBody.innerHTML += row;
        });

        // Mostrar el modal
        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
        cartModal.show();
    } catch (error) {
        console.error('Error fetching cart details:', error);
    }
};

