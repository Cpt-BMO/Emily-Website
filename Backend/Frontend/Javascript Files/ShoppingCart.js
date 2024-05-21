document.addEventListener('DOMContentLoaded', () => {
    const openShopping = document.querySelector('.cart-container');
    const closeShopping = document.querySelector('.closeShopping');
    const shoppingCartList = document.querySelector('.MenuItems');

    // Event listener to open the shopping cart
    openShopping.addEventListener('click', () => {
        document.body.classList.add('active');
    });

    // Event listener to close the shopping cart
    closeShopping.addEventListener('click', () => {
        document.body.classList.remove('active');
    });

    // Event listener for quantity and remove buttons in the shopping cart
    shoppingCartList.addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains('quantity-button') || target.classList.contains('remove-item-button')) {
            updateCart();
        }
    });
});

// Function to submit the order
function submitOrder() {
    const confirmed = window.confirm('Are you sure you want to place this order?');
    if (confirmed) {
        const totalPriceElement = document.querySelector('.total');
        const totalPriceText = totalPriceElement.textContent;
        const totalPrice = parseFloat(totalPriceText.replace('$', '')); // Extract the price from the text

        // Send the total price to the backend
        sendTotalPrice(totalPrice).then(() => {
            // Redirect to the confirmation page after successfully sending the total price
            window.location.href = './confirmation.html';
        }).catch(error => {
            console.error('Error sending total price to the backend:', error);
        });
    }
}

// Function to update the quantity displayed in the cart icon
function updateCartQuantity() {
    const totalItems = document.querySelectorAll('.cart-item').length;
    document.querySelector('.quantity').textContent = totalItems.toString();
}

// Function to update the total price of items in the cart
function updateTotalPrice() {
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
    if (cartItems.length > 0) {
        totalPriceElement.addEventListener('click', submitOrder);
    }
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Function to send the total price to the backend
function sendTotalPrice(totalPrice) {
    fetch('http://localhost:3000/update-total-price', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ totalPrice: totalPrice })
    })
    .then(response => {
        if (response.ok) {
            console.log('Total price successfully sent to the backend');
            // Redirect to the confirmation page after successfully sending the total price
            window.location.href = `../HTML%20Files/confirmation.html?totalPrice=${totalPrice}`;
        } else {
            console.error('Error sending total price to the backend');
        }
    })
    .catch(error => {
        console.error('Error sending total price to the backend:', error);
    });
}

// Function to update the cart (quantity and total price)
function updateCart() {
    updateCartQuantity();
    updateTotalPrice();
}

// Function to add an item to the cart
function addToCart(item) {
    const shoppingCartList = document.querySelector('.MenuItems');
    const existingCartItem = shoppingCartList.querySelector(`[data-id="${item.id}"]`);

    if (!existingCartItem) {
        const cartItem = document.createElement('li');
        cartItem.className = 'cart-item';
        cartItem.setAttribute('data-id', item.id);

        const itemDetails = document.createElement('div');
        itemDetails.className = 'cart-item-details';
        itemDetails.style.display = 'flex';
        itemDetails.style.alignItems = 'center';

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.className = 'remove-item-button';
        removeButton.onclick = function () {
            cartItem.remove();
            updateCartQuantity();
            updateTotalPrice(); // Update total price after removing item
        };
        itemDetails.appendChild(removeButton);

        // Create item image
        const img = document.createElement('img');
        img.src = `../images/${item.image}`;
        img.alt = item.name;
        img.className = 'cart-item-image';
        itemDetails.appendChild(img);

        // Create name and price container
        const namePriceContainer = document.createElement('div');
        namePriceContainer.className = 'name-price-container';

        // Create item name element
        const itemName = document.createElement('span');
        itemName.textContent = item.name;
        itemName.className = 'cart-item-name';
        namePriceContainer.appendChild(itemName);

        // Create item price element
        const itemPrice = document.createElement('span');
        itemPrice.textContent = item.price;
        itemPrice.className = 'cart-item-price';
        namePriceContainer.appendChild(itemPrice);

        itemDetails.appendChild(namePriceContainer);

        // Create quantity controls
        const quantityControls = document.createElement('div');
        quantityControls.className = 'quantity-controls';

        // Create minus button
        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.className = 'quantity-button';
        minusButton.onclick = function () {
            const quantityElement = cartItem.querySelector('.cart-item-quantity');
            let quantity = parseInt(quantityElement.textContent.split(' ')[1]);
            if (quantity > 1) {
                quantityElement.textContent = `Quantity: ${quantity - 1}`;
                updateTotalPrice(); // Update total price after decreasing quantity
            } else {
                alert(`Minimum quantity reached for ${item.name}`);
            }
        };
        quantityControls.appendChild(minusButton);

        // Create quantity display
        const itemQuantity = document.createElement('span');
        itemQuantity.textContent = 'Quantity: 1';
        itemQuantity.className = 'cart-item-quantity';
        quantityControls.appendChild(itemQuantity);

        // Create plus button
        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.className = 'quantity-button';
        plusButton.onclick = function () {
            const quantityElement = cartItem.querySelector('.cart-item-quantity');
            let quantity = parseInt(quantityElement.textContent.split(' ')[1]);
            if (quantity < 10) {
                quantityElement.textContent = `Quantity: ${quantity + 1}`;
                updateTotalPrice(); // Update total price after increasing quantity
            } else {
                alert(`Maximum quantity reached for ${item.name}`);
            }
        };
        quantityControls.appendChild(plusButton);

        itemDetails.appendChild(quantityControls);

        cartItem.appendChild(itemDetails);
        shoppingCartList.appendChild(cartItem);

        // Update the cart after adding the item
        updateCart();

        // Update the total price after adding the item
        updateTotalPrice();
    }
}

// I tried to move this, then it wouldn't work
// so im just gonna keep this here
document.addEventListener('DOMContentLoaded', () => {
    updateCart(); // Get total price on page load

    const totalPriceElement = document.querySelector('.total');
    // Remove event listener for form submission when total price is updated
    totalPriceElement.removeEventListener('click', redirectToConfirmationPage);
});