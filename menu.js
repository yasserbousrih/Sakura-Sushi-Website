// Initialize an empty array to store cart items
let cart = [];

// Define constants to reference various elements on the web page
const cartOverlay = document.getElementById('cart-overlay');
const cartContent = document.getElementById('cart-content');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

// Define a function to update the cart display and total
const updateCart = () => {
  // Step 1: Clear existing cart items
  cartItems.innerHTML = '';

  // Step 2: Initialize a variable to store the cart total
  let total = 0;

  // Step 3: Loop through each item in the cart array
  cart.forEach((item) => {
    // Step 4: Create a new list item for the item
    const li = document.createElement('li');

    // Step 5: Add the item image to the list item
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.name;
    li.appendChild(img);

    // Step 6: Add the item name and quantity to the list item
    const itemInfo = document.createElement('span');
    itemInfo.textContent = `${item.name} x ${item.quantity}`;
    li.appendChild(itemInfo);

    // Step 7: Add a "remove" button to the list item
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';

    // Step 8: Add an event listener to the "remove" button to remove the item from the cart and update the display
    removeBtn.addEventListener('click', () => {
      cart = cart.filter((cartItem) => cartItem.name !== item.name);
      updateCart();
    });

    li.appendChild(removeBtn);
    cartItems.appendChild(li);

    // Step 9: Update the cart total based on the item price and quantity
    total += item.price * item.quantity;
  });

  // Step 10: Update the cart total display
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
};

// Step 11: Add an event listener to each "add to cart" button on the web page
document.querySelectorAll('.add-to-cart-btn').forEach((button) => {
  button.addEventListener('click', () => {
    // Step 12: Get the item name, price, and image source from the button data attributes
    const itemName = button.getAttribute('data-name');
    const itemPrice = parseFloat(button.getAttribute('data-price'));
    const itemImgSrc = button.getAttribute('data-src');

    // Step 13: Get the quantity from the input element associated with the button
    const itemQuantityInput = button.parentElement.querySelector('.item-quantity');
    const itemQuantityValue = parseInt(itemQuantityInput.value);

    // Step 14: If the quantity is greater than 0, add the item to the cart
    if (itemQuantityValue > 0) {
      // Step 15: Check if the item is already in the cart
      const existingItem = cart.find((item) => item.name === itemName);

      // Step 16: If the item is already in the cart, increase the quantity
      if (existingItem) {
        existingItem.quantity += itemQuantityValue;
      // Step 17: Otherwise, add a new item to the cart
     // Step 17: Otherwise, add a new item to the cart
} else {
  // Create a new object to represent the item
  const newItem = {
    name: itemName,
    price: itemPrice,
    quantity: itemQuantityValue,
    src: itemImgSrc,
  };
  // Add the new item to the cart
  cart.push(newItem);
}

// Step 18: Reset the quantity input to 0 and update the cart display
itemQuantityInput.value = 0;
updateCart();
    }
  });
});

// Add an event listener to the "order" button on the cart overlay
document.getElementById('cart-order-btn').addEventListener('click', () => {
  // Save the cart array to local storage and redirect tothe order page
localStorage.setItem('cart', JSON.stringify(cart));
window.location.href = 'order.html';
});

// Add an event listener to the "order" button on the order page
document.getElementById('order-btn').addEventListener('click', () => {
// Save the cart array to local storage again
localStorage.setItem('cart', JSON.stringify(cart));
window.location.href = 'order.html';
});