document.addEventListener('DOMContentLoaded', () => {
    const openShopping = document.querySelector('.cart-container');
    const closeShopping = document.querySelector('.closeShopping');
    const body = document.querySelector('body');

    openShopping.addEventListener('click', () => {  // open the shopping cart
        body.classList.add('active');
    });

    closeShopping.addEventListener('click', () => {  // close the shopping cart
        body.classList.remove('active');
    });

    const shoppingCartList = document.querySelector('.MenuItems');  // updates the price and the quantity in the cart
    shoppingCartList.addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains('quantity-button') || target.classList.contains('remove-item-button')) {
            updateCart();
        }
    });
});

function submitOrder() {  // prepares the item to submit
    const confirmed = window.confirm('Are you sure you want to place this order?');
    if (confirmed) {
        const cartItems = document.querySelectorAll('.cart-item');
        cartItems.forEach(cartItem => {
            cartItem.remove();
        });

        updateCart();

        alert('Your order has been placed successfully!');
    }
}

function updateCartQuantity() { // updates the number in the cart
    const totalItems = document.querySelectorAll('.cart-item').length;
    const quantitySpan = document.querySelector('.quantity');
    quantitySpan.textContent = totalItems.toString();
}

function updateTotalPrice() {  // updates the total price depending on the item price and quantity
    const cartItems = document.querySelectorAll('.cart-item');
    let totalPrice = 0;

    cartItems.forEach(cartItem => {
        const quantityElement = cartItem.querySelector('.cart-item-quantity');
        const priceElement = cartItem.querySelector('.cart-item-price');

        const quantity = parseInt(quantityElement.textContent.split(' ')[1]);
        const price = parseFloat(priceElement.textContent.replace('$', ''));

        totalPrice += quantity * price;
    });

    const totalPriceElement = document.querySelector('.total');
    totalPriceElement.removeEventListener('click', submitOrder);
    if (cartItems.length > 0) {
        totalPriceElement.addEventListener('click', submitOrder);
    }

    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

function addToCart(item) {  // creates an item with the button, images, name, and price tag
    const shoppingCartList = document.querySelector('.MenuItems');
    const existingCartItem = shoppingCartList.querySelector(`[data-id="${item.id}"]`);

    if (existingCartItem) {
        return;
    } else {
        const cartItem = document.createElement('li');
        cartItem.className = 'cart-item';
        cartItem.setAttribute('data-id', item.id);

        const itemDetails = document.createElement('div');
        itemDetails.className = 'cart-item-details';
        itemDetails.style.display = 'flex';
        itemDetails.style.alignItems = 'center';

        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.className = 'remove-item-button';
        removeButton.onclick = function () {
            cartItem.remove();
            updateCartQuantity();
        };
        itemDetails.appendChild(removeButton);

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        img.className = 'cart-item-image';
        itemDetails.appendChild(img);

        const namePriceContainer = document.createElement('div');
        namePriceContainer.className = 'name-price-container';

        const itemName = document.createElement('span');
        itemName.textContent = item.name;
        itemName.className = 'cart-item-name';
        namePriceContainer.appendChild(itemName);

        const itemPrice = document.createElement('span');
        itemPrice.textContent = item.price;
        itemPrice.className = 'cart-item-price';
        namePriceContainer.appendChild(itemPrice);

        itemDetails.appendChild(namePriceContainer);

        const quantityControls = document.createElement('div');
        quantityControls.className = 'quantity-controls';

        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.className = 'quantity-button';
        minusButton.onclick = function () {
            const quantityElement = cartItem.querySelector('.cart-item-quantity');
            let quantity = parseInt(quantityElement.textContent.split(' ')[1]);
            if (quantity > 1) {
                quantityElement.textContent = 'Quantity: ' + (quantity - 1);
            } else {
                alert('Minimum quantity reached for ' + item.name);
            }
        };
        quantityControls.appendChild(minusButton);

        const itemQuantity = document.createElement('span');
        itemQuantity.textContent = 'Quantity: 1';
        itemQuantity.className = 'cart-item-quantity';
        quantityControls.appendChild(itemQuantity);

        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.className = 'quantity-button';
        plusButton.onclick = function () {
            const quantityElement = cartItem.querySelector('.cart-item-quantity');
            let quantity = parseInt(quantityElement.textContent.split(' ')[1]);
            if (quantity < 10) {
                quantityElement.textContent = 'Quantity: ' + (quantity + 1);
            } else {
                alert('Maximum quantity reached for ' + item.name);
            }
        };
        quantityControls.appendChild(plusButton);

        itemDetails.appendChild(quantityControls);

        cartItem.appendChild(itemDetails);

        shoppingCartList.appendChild(cartItem);
    }
    updateCart();
}

function updateCart() {
    updateCartQuantity();
    updateTotalPrice();
}
