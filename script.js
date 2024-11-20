const collection = {
    "cart": [
      {
        "id": "101",
        "name": "Wireless Mouse",
        "image": "https://m.media-amazon.com/images/I/51KmxQjXBlL._AC_UY218_.jpg",
        "price": 25.99,
        "quantity": 1
      },
      {
        "id": "102",
        "name": "Keyboard",
        "image": "https://m.media-amazon.com/images/I/71A3ZqZghGL._AC_UY218_.jpg",
        "price": 45.50,
        "quantity": 1
      },
      {
        "id": "103",
        "name": "Monitor",
        "image": "https://m.media-amazon.com/images/I/81GQlgFaltL._AC_UL320_.jpg",
        "price": 2000.00,
        "quantity": 1
      },
      {
        "id": "104",
        "name": "Cattle",
        "image": "https://m.media-amazon.com/images/I/51DGcy8eBCL._AC_SY200_.jpg",
        "price": 350.00,
        "quantity": 1
      },
      {
        "id": "105",
        "name": "Charger",
        "image": "https://m.media-amazon.com/images/I/61SykyWBFEL._AC_UY218_.jpg",
        "price": 400.00,
        "quantity": 1
      },
      {
        "id": "106",
        "name": "LaptopBag",
        "image": "https://m.media-amazon.com/images/I/81w2z8kGABL._AC_UY218_.jpg",
        "price": 500.00,
        "quantity": 1
      }
    ]
  };
  // Initialize cart from localStorage or use an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartPanel = document.getElementById("cart-panel");
const cartItemsContainer = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const cartIcon = document.querySelector(".cart-icon");
const closeCartButton = document.getElementById("close-cart");

// Populate products in the Electronics section
function displayProducts() {
  const productList = document.getElementById("product-list");
  collection.cart.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.className = "product-item";

    productItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Price: ${product.price.toFixed(2)} Rs</p>
      <button onclick="addToCart('${product.id}')">Add to Cart</button>
    `;

    productList.appendChild(productItem);
  });
}
function addToCart(productId) {
  console.log("Adding product to cart:", productId); // Debug log
  const product = collection.cart.find((item) => item.id === productId);

  if (product) {
    let totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    if (totalItems >= 100) {
      alert("You cannot have more than 100 items in your cart.");
      return;
    }

    const cartItem = cart.find((item) => item.id === productId);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    updateCartAmount();
    updateCartUI();
    saveCartToLocalStorage();
  } else {
    console.error("Product not found:", productId); // Error handling
  }
}


// Increase Quantity Function
function increaseQuantity(productId) {
  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    // Calculate the total number of items in the cart
    let totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    // Check if increasing quantity will exceed 100 items in total
    if (totalItems >= 100) {
      alert("You cannot have more than 100 items in your cart.");
      return; // Prevent increasing quantity if total is 100 or more
    }

    // Increase the quantity if the check passes
    cartItem.quantity += 1;

    // Update the cart UI and total price
    updateCartAmount();
    updateCartUI();
    saveCartToLocalStorage();
  }
}

// Decrease Quantity Function (as before)
function decreaseQuantity(productId) {
  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.quantity -= 1;
    if (cartItem.quantity < 1) {
      const index = cart.indexOf(cartItem);
      cart.splice(index, 1);
    }
    updateCartAmount();
    updateCartUI();
    saveCartToLocalStorage();
  }
}

function updateCartAmount() {
  const cartAmountElement = document.getElementById("cart-amount");
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
   // Show alert if total items exceed 100
   if (totalItems > 100) {
    alert("You cannot have more than 100 items in your cart.");
  }
  cartAmountElement.textContent = totalItems; 
  // Update the cart icon with the total number of items
}

// Save Cart to LocalStorage
function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart)); // Save cart as a string
}

// Load Cart from LocalStorage
function loadCartFromLocalStorage() {
  const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = savedCart; // Restore cart data
  updateCartAmount(); // Update the cart amount on page load
  updateCartUI(); // Update the cart UI on page load
}

// Update Cart UI
function updateCartUI() {
  cartItemsContainer.innerHTML = ""; // Clear previous cart items
  let totalPrice = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;

    // Create a cart item element
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <p>${item.name}</p>
        <p>Price: ₹${item.price.toFixed(2)}</p>
        <div class="inc-quantity">
          <button onclick="decreaseQuantity('${item.id}')">-</button>
          <p>Qty: ${item.quantity}</p>
          <button onclick="increaseQuantity('${item.id}')">+</button>
        </div>
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  // Update total price
  totalPriceElement.innerText = `Total: ₹${totalPrice.toFixed(2)}`;
}

// Toggle Cart Panel Visibility
function toggleCartPanel() {
  cartPanel.classList.toggle("open");
}

// Close Cart Panel
function closeCart() {
  cartPanel.classList.remove("open");
}

// Event Listeners
cartIcon.addEventListener("click", toggleCartPanel);
closeCartButton.addEventListener("click", closeCart);

// Initialize the page by displaying products and restoring cart
window.onload = function () {
  displayProducts();
  loadCartFromLocalStorage(); // Load the cart from localStorage
};
