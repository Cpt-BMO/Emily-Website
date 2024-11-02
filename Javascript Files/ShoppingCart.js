document.addEventListener("DOMContentLoaded", function() {
    const cartContainer = document.getElementById("cartContainer");
    const checkoutButton = document.getElementById("checkoutButton");
    
    // Retrieve the shopping cart from localStorage or set to empty array if not found
    const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

    // Check if the cart is empty
    if (cart.length === 0) {
        cartContainer.innerHTML = "<li>Your cart is empty.</li>";
        checkoutButton.style.display = "none"; // Hide checkout button if cart is empty
        return;
    }

    // Populate the cart with items
    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width:50px;height:50px;">
            <strong>${item.name}</strong> - <span>${item.price}</span>
            <button class="deleteButton">Delete</button>
        `;

        // Append delete button functionality
        const deleteButton = li.querySelector(".deleteButton");
        deleteButton.onclick = function() {
            removeFromCart(item.name); // Pass the item name to remove it from the cart
        };

        cartContainer.appendChild(li);
    });

    // Show the checkout button
    checkoutButton.style.display = "block";
    checkoutButton.onclick = function() {
        // Logic to handle checkout
        alert("Proceeding to checkout!");
        // You can redirect to a checkout page if desired
    };

    function removeFromCart(itemName) {
        // Filter out the item to be removed
        const updatedCart = cart.filter(item => item.name !== itemName);

        // Update the localStorage with the new cart
        localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));

        // Refresh the cart display
        cartContainer.innerHTML = ""; // Clear current items
        if (updatedCart.length === 0) {
            cartContainer.innerHTML = "<li>Your cart is empty.</li>";
            checkoutButton.style.display = "none"; // Hide checkout button if cart is empty
        } else {
            updatedCart.forEach(item => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" style="width:50px;height:50px;">
                    <strong>${item.name}</strong> - <span>${item.price}</span>
                    <button class="deleteButton">Delete</button>
                `;
                cartContainer.appendChild(li);
            });
        }
    }
});
