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
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
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
  
  // Add to Cart Function
  function addToCart(productId) {
    const product = collection.cart.find((item) => item.id === productId);
  
    if (product) {
      const cartItem = cart.find((item) => item.id === productId);
  
      if (cartItem) {
        // Increment quantity if product already in cart
        cartItem.quantity += 1;
      } else {
        // Add new product to cart
        cart.push({ ...product });
      }
  
      updateCartAmount();
      updateCartUI();
      saveCartToLocalStorage();
    }
  }
  
  // Update Cart Amount (cart icon)
  function updateCartAmount() {
    const cartAmountElement = document.getElementById("cart-amount");
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartAmountElement.textContent = totalItems; // Update the cart icon with the total number of items
  }
  
  // Increase Quantity
  function increaseQuantity(productId) {
    const cartItem = cart.find((item) => item.id === productId);
    if (cartItem) {
      cartItem.quantity += 1;
      updateCartUI();
      saveCartToLocalStorage();
    }
  }
  
  // Decrease Quantity
  function decreaseQuantity(productId) {
    const cartItem = cart.find((item) => item.id === productId);
    if (cartItem) {
      cartItem.quantity -= 1;
      if (cartItem.quantity < 1) {
        const index = cart.indexOf(cartItem);
        cart.splice(index, 1);
      }
      updateCartAmount();  // Ensure the cart amount is updated when decreasing quantity
      updateCartUI();      // Update the cart UI to reflect the change
      saveCartToLocalStorage(); // Save the updated cart to localStorage
    }
  }
  
  
  // Save Cart to LocalStorage
  function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart as a string
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
  
  // Initialize the page by displaying products and cart
  window.onload = function () {
    displayProducts();
    updateCartUI(); // Display the cart on page load
  };
  