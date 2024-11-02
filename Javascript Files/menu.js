const menuItems = {
    Cakes: [
        { name: "Birthday Celebration", price: "$34.99", image: "../images/BirthdayCelebration.jpg", id: 1 },
        { name: "Almond Delight", price: "$29.99", image: "../images/AlmondDelight.jpg", id: 2 },
        { name: "Lemon and Cream Cheese", price: "$32.99", image: "../images/LemonCreamCheese.jpg", id: 3 },
        { name: "Black Forest", price: "$36.99", image: "../images/BlackForest.jpg", id: 4 },
        { name: "German Chocolate Cream Cheese", price: "$35.99", image: "../images/GermanChocolateCreamCheese.jpg", id: 5 },
        { name: "Chocolate Ganache", price: "$33.99", image: "../images/ChocolateGanache.webp", id: 6 },
        { name: "Italian Cream", price: "$37.99", image: "../images/ItalianCream.jpg", id: 7 },
        { name: "Lemon Doberge", price: "$34.99", image: "../images/LemonDoberge.jpeg", id: 8 },
        { name: "Chocolate Doberge", price: "$34.99", image: "../images/ChocolateDoberge.jfif", id: 9 },
        { name: "½ & ½ Doberge Cake (Lemon and Chocolate)", price: "$36.99", image: "../images/HalfAndHalfDoberge.webp", id: 10 },
        { name: "Pecan Praline Cream Cheese", price: "$35.99", image: "../images/PecanPralineCreamCheese.jpg", id: 11 },
        { name: "Chocolate Banana", price: "$30.99", image: "../images/ChocolateBanana.jpg", id: 12 },
        { name: "Strawberry Delight", price: "$31.99", image: "../images/StrawberryDelight.jfif", id: 13 },
        { name: "Oreo", price: "$33.99", image: "../images/OreoCake.jfif", id: 14 }
    ],
    Pastries: [
        { name: "Croissant", price: "$3", image: "../images/Croissant.jpg", id: 3 },
        { name: "Danish", price: "$4", image: "../images/Auszognene.webp", id: 4 },
        // Add more pastries here
    ],
    Cupcakes: [
        { name: "Red Velvet Cupcake", price: "$3", image: "../images/RedVelvetCupcake.jpg", id: 5 },
        { name: "Lemon Cupcake", price: "$3", image: "../images/LemonCupcake.jpg", id: 6 },
        // Add more cupcakes here
    ],
    Cookies: [
        { name: "Chocolate Chip", price: "$2", image: "../images/ChocolateChip.jpg", id: 7 },
        { name: "Oatmeal Raisin", price: "$2", image: "../images/OatmealRaisin.jpg", id: 8 },
        // Add more cookies here
    ],
    PetitFours: [
        { name: "Mini Tarts", price: "$2.50", image: "../images/MiniTarts.jfif", id: 9 },
        { name: "Mini Eclairs", price: "$2.50", image: "../images/MiniEclairs.jpg", id: 10 },
        // Add more petit fours here
    ],
    Pies: [
        { name: "Apple Pie", price: "$15", image: "../images/ApplePie.webp", id: 11 },
        { name: "Pumpkin Pie", price: "$15", image: "../images/PumpkinPie.jpg", id: 12 },
        // Add more pies here
    ],
    Breads: [
        { name: "Baguette", price: "$4", image: "../images/Baguette.webp", id: 13 },
        { name: "Sourdough", price: "$5", image: "../images/Sourdough.jpg", id: 14 },
        // Add more breads here
    ],
    SeasonalProducts: [
        { name: "Pecan Pie", price: "$5", image: "../images/PecanPie.jpg", id: 15 },
        { name: "Pumpkin Cake", price: "$8", image: "../images/PumpkinCake.jpg", id: 16 },
        // Add more seasonal products here
    ]
};

function showMenu(meal) {
    const menuContainer = document.getElementById("menuContainer");

    menuContainer.textContent = ""; // this is to clear anything already inside

    menuItems[meal].forEach(item => {
      const li = document.createElement("li");  // create a list to display each menu item
      
      const img = document.createElement("img");  // image for each menu item
      img.src = item.image;
      img.alt = item.name;
      img.className = "menu-item-img";
      li.appendChild(img);
      
      const textContainer = document.createElement("div");  // create a container for name, price, and button
      textContainer.className = "menu-item-text";
  
      const nameSpan = document.createElement("span");  // Menu name, Name color and font size
      nameSpan.textContent = item.name;
      nameSpan.className = "menu-item-name";
      nameSpan.style.color = "LightSkyBlue";
      nameSpan.style.fontSize = "18px";
      textContainer.appendChild(nameSpan);
  
      const priceSpan = document.createElement("span");  // Menu price, price color and font size
      priceSpan.textContent = item.price;
      priceSpan.className = "menu-item-price";
      priceSpan.style.color = "GoldenRod";
      priceSpan.style.fontSize = "18px";
      textContainer.appendChild(priceSpan);
  
      const addButton = document.createElement("button");  // Button to add to cart
      addButton.textContent = "Add to Cart";
      addButton.className = "add-to-cart-button";
      addButton.onclick = function() {
          addToCart(item);
      };
      textContainer.appendChild(addButton);
  
      li.appendChild(textContainer);
  
      menuContainer.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", function() {  // this will display the burger section first when the page loads
    showMenu('Cakes');
});