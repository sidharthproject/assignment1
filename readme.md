Initialize the Cart

Get the cart data from localStorage or initialize an empty cart if no data exists.
Display Products in the Electronics Section

Loop through the collection.cart array and for each product:
Create a product item element with product image, name, price, and an "Add to Cart" button.
Append the product item to the product list in the UI.
Add Product to Cart

When the "Add to Cart" button is clicked:
Find the product by its ID from the collection.
If the product is already in the cart:
Increase its quantity by 1.
If the product is not in the cart:
Add the product to the cart with a quantity of 1.
Update the cart display, total price, and the cart icon count.
Save the updated cart data to localStorage.
Update Cart Icon Count

Calculate the total number of items in the cart by summing the quantities of each product.
Update the cart icon's display to show the total quantity of items.
Increase Quantity of Product in Cart

When the "+" button in the cart is clicked:
Find the product in the cart.
Increase the quantity by 1.
Update the cart display and save the updated cart data.
Decrease Quantity of Product in Cart

When the "-" button in the cart is clicked:
Find the product in the cart.
Decrease the quantity by 1.
If the quantity becomes less than 1, remove the product from the cart.
Update the cart display, total price, and the cart icon count.
Save the updated cart data.
Save Cart Data to LocalStorage

Convert the cart data into a JSON string.
Store the string in localStorage.
Update the Cart UI

Clear the cart items container.
Loop through each item in the cart:
Create a cart item element with product image, name, price, quantity, and buttons for increasing/decreasing quantity.
Append the cart item to the cart items container.
Update the total price in the cart footer.
Toggle Cart Panel Visibility

When the cart icon is clicked:
Toggle the visibility of the cart panel.
Close the Cart Panel

When the close button in the cart is clicked:
Close the cart panel by removing the "open" class.
Page Initialization

When the page is loaded:
Display the list of products in the electronics section.
Update the cart UI to reflect the current state of the cart (including total price, quantity, and item