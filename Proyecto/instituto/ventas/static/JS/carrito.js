document.addEventListener('DOMContentLoaded', function() {
    let allProducts = [];

    document.querySelector('.row-product').addEventListener('click', function(event) {
        if (event.target.classList.contains('icon-close')) {
            const titleToRemove = event.target.closest('.cart-product').querySelector('.titulo-producto-carrito').textContent;
            allProducts = allProducts.filter(product => product.title !== titleToRemove);
            showHTML();
        }
    });

    const btnCart = document.querySelector('.container-cart-icon');
    const containerCartProducts = document.querySelector('.container-cart-products');

    btnCart.addEventListener('click', function() {
        containerCartProducts.classList.toggle('hidden-cart');
    });

    document.querySelector('.galery').addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-add-cart')) {
            event.preventDefault();
            const product = event.target.closest('.card-product');
            const infoProduct = {
                quantity: 1,
                title: product.querySelector('h2').textContent,
                price: product.querySelector('p').textContent,
            };

            addProductToCart(infoProduct);
            showHTML();
        }
    });

    function addProductToCart(infoProduct) {
        const exists = allProducts.some(product => product.title === infoProduct.title);

        if (exists) {
            const products = allProducts.map(product => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }
            });
            allProducts = [...products];
        } else {
            allProducts = [...allProducts, infoProduct];
        }
    }

    const showHTML = () => {
        const cartEmpty = document.querySelector('.cart-empty');
        const rowProduct = document.querySelector('.row-product');
        const cartTotal = document.querySelector('.cart-total');
        const valorTotal = document.querySelector('.total-pagar');
        const countProducts = document.querySelector('#contador-productos');

        if (!allProducts.length) {
            cartEmpty.classList.remove('show');
            rowProduct.classList.add('hidden');
            cartTotal.classList.add('hidden');
        } else {
            cartEmpty.classList.add('hidden');
            rowProduct.classList.remove('hidden');
            cartTotal.classList.remove('hidden');
        }

        rowProduct.innerHTML = '';

        let total = 0;
        let totalOfProducts = 0;

        allProducts.forEach(product => {
            const containerProduct = document.createElement('div');
            containerProduct.classList.add('cart-product');

            containerProduct.innerHTML = `
                <div class="info-cart-product">
                    <span class="cantidad-producto-carrito">${product.quantity}</span>
                    <p class="titulo-producto-carrito">${product.title}</p>
                    <span class="precio-producto-carrito">${product.price}</span>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="icon-close"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            `;

            rowProduct.append(containerProduct);

            total += product.quantity * parseFloat(product.price.replace('$', ''));
            totalOfProducts += product.quantity;
        });

        valorTotal.innerText = `$${total}`;
        countProducts.innerText = totalOfProducts;
    };
});
