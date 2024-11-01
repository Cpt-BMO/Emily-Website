const menuItems = {
    Burgers: [
      { name: "Hamburger", price: "$6.99", image: "../images/Burger.jpg", id: 1},
      { name: "Bacon and Cheese", price: "$8.99", image: "../images/BaconAndCheeseBurger.jpg", id: 2},
      { name: "Patty Melt", price: "$9.99", image: "../images/PattyMeltBurger.jpg", id: 3},
      { name: "Double Patty", price: "$10.99", image: "../images/DoublePattyBurger.jpg", id: 4},
      { name: "Veggie Burger", price: "$7.99", image: "../images/VeggieBurger.png", id: 5},
      { name: "Kids Burger", price: "$5.99", image: "../images/KidSizeBurgers.avif", id: 6}
    ],
    Chicken: [
      { name: "Chicken Fingers", price: "$8.99", image: "../images/ChickenFingers.avif", id: 7},
      { name: "Popcorn Chicken", price: "$6.99", image: "../images/PopcornChicken.jpg", id: 8},
      { name: "Sesame Chicken", price: "$9.99", image: "../images/SesameChicken.jpg", id: 9},
      { name: "Fried Chicken", price: "$12.99", image: "../images/FriedChicken.jpeg", id: 10},
      { name: "Fried Chicken Sandwich", price: "$13.99", image: "../images/FriedChickenBurger.jpg", id: 11},
      { name: "Chicken Katsu", price: "$8.99", image: "..//images/Chicken Katsu.jpg", id: 12}
    ],
    Pizza: [
      { name: "Pepperoni Pizza", price: "$10.99", image: "../images/PeppPizza.jpg", id: 13},
      { name: "Cheese Pizza", price: "$8.99", image: "../images/CheesePizza.png", id: 14},
      { name: "BBQ Chicken Pizza", price: "$11.99", image: "../images/BuffaloChickenPizza.jpg", id: 15},
      { name: "Meat Lover Pizza", price: "$12.99", image: "../images/MeatLoverPizza.jpg", id: 16},
      { name: "Chicago Deep Dish Pizza", price: "$13.99", image: "../images/ChicagoPizza.jpg", id: 17},
      { name: "Customizable Pizza", price: "$10.99", image: "../images/ChoicePizza.jpg", id: 18}
    ],
    HotDogs: [
      { name: "Chili Cheese Hot Dog", price: "$7.99", image: "../images/ChilliCheeseDog.jpg", id: 19},
      { name: "Chicago Hot Dog", price: "$6.99", image: "../images/ChicagoHotDog.webp", id: 20},
      { name: "Brisket Hot Dog",price: "$8.99", image: "../images/BrisketHotDog.jpg", id: 21},
      { name: "Elote Hot Dogs", price: "$9.99", image: "../images/EloteHotDogs.jpg", id: 22},
      { name: "Seattle Hot Dog", price: "$11.99", image: "../images/SeattleHotDog.jpg", id: 23},
      { name: "New York Hot Dog", price: "$9.99", image: "../images/NewYorkHotDog.jpg", id: 24}
    ],
    Salad: [
      { name: "Chicken Caesar Salad", price: "$6.99", image: "../images/ChickenCesarSalad.jpg", id: 25},
      { name: "Cobb Salad", price: "$7.99", image: "../images/CobbSalad.jpg", id: 26},
      { name: "Greek Salad", price: "$6.99", image: "../images/GreekSalad.jpg", id: 27},
      { name: "Thai Salad", price: "$6.99", image: "../images/ThaiSalad.jpg", id: 28},
      { name: "BBQ Chicken Salad", price: "$8.99", image: "../images/BB-QSalad.jpg", id: 29},
      { name: "Tomato Salad", price: "$5.99", image: "../images/Tomato Salad.jpg", id: 30}
    ],
    Drinks: [
      { name: "Coffee", price: "$6.99", image: "../images/Coffee.jpg", id: 31},
      { name: "Iced Tea", price: "$5.99", image: "../images/IcedTea.jpg", id: 32},
      { name: "Matcha Latte", price: "$5.99", image: "../images/MatchaLatte.jpg", id: 33},
      { name: "Brown Sugar Boba", price: "$5.99", image: "../images/BrownSugarBoba.jpg", id: 34},
      { name: "Taro Milk Tea", price: "$5.99", image: "../images/TaroMilkTea.jpg", id: 35},
      { name: "Thai Milk Tea", price: "$5.99", image: "../images/ThaiMilkTea.jpg", id: 36}
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
  showMenu('Burgers');
});
