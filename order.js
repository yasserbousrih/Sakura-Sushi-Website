// Step 1: Define constants to reference various elements on the web page
const orderSummary = document.getElementById('order-summary');
const orderTotal = document.getElementById('order-total');
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const customerInfoForm = document.getElementById('customer-info-form');
const placeOrderBtn = document.getElementById('place-order-btn');
const confirmationMessage = document.getElementById('confirmation-message');
const orderContent = document.getElementById('order-content');
const goToListingBtn = document.getElementById('go-to-listing');
const ordersContainer = document.getElementById('orders-container');

// Step 2: Define the key for orders in local storage
const ORDERS_KEY = 'orders';

// Step 3: Retrieve cart data from local storage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Step 4: Create a function to display the cart items in the order summary
const displayOrderSummary = () => {
  orderSummary.innerHTML = '';

  // Step 5: Loop through each item in the cart array and create an order summary for it
  cart.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add('order-item');

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.name;
    div.appendChild(img);

    const itemInfo = document.createElement('span');
    itemInfo.textContent = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
    div.appendChild(itemInfo);

    orderSummary.appendChild(div);
  });

  // Step 6: Calculate and display the total price of the order
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  orderTotal.textContent = `$${total.toFixed(2)}`;
};

// Step 7: Display the cart items in the order summary
displayOrderSummary();

// Step 8: Handle form submission
customerInfoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;

  // Step 9: Create the order object
  const order = {
    firstName,
    lastName,
    items: cart,
    total: orderTotal.textContent,
    status: 'Pending',
    date: new Date().toLocaleString(),
  };

  // Step 10: Save the order to local storage
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  orders.push(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

  // Step 11: Clear the cart and display a confirmation message
  localStorage.removeItem('cart');
  displayOrderSummary();
  confirmationMessage.textContent = 'Thank you for your order!';
  orderContent.style.display = 'block';
  customerInfoForm.style.display = 'none';
  goToListingBtn.style.display = 'block';
});
// Step 12: Define a function to display all past orders
const displayOrders = () => {
  ordersContainer.innerHTML = '';

  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];

  // Step 13: Loop through each order and create a div to display it
  orders.forEach((order) => {
    const div = document.createElement('div');
    div.classList.add('order');

    // Step 14: Create a heading with the date of the order
    const heading = document.createElement('h2');
    heading.textContent = `Order from ${order.date}`;
    div.appendChild(heading);

    // Step 15: Create a paragraph element with the customer's name
    const name = document.createElement('p');
    name.textContent = `${order.firstName} ${order.lastName}`;
    div.appendChild(name);

    // Step 16: Create a list to display the items in the order
    const ul = document.createElement('ul');
    order.items.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
      ul.appendChild(li);
    });
    div.appendChild(ul);

    // Step 17: Create a paragraph element to display the total cost of the order
    const total = document.createElement('p');
    total.textContent = `Total: ${order.total}`;
    div.appendChild(total);

    // Step 18: Create a paragraph element to display the status of the order
    const status = document.createElement('p');
    status.textContent = `Status: ${order.status}`;
    div.appendChild(status);

    ordersContainer.appendChild(div);
  });
};

// Step 19: Add an event listener to the customer info form to handle form submission
customerInfoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Step 20: Get the values from the form inputs
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;

  // Step 21: Create the order object with the customer's information, cart items, total cost, and date
  const order = {
    firstName,
    lastName,
    items: cart,
    total: orderTotal.textContent,
    status: 'Pending',
    date: new Date().toLocaleString(),
  };

  // Step 22: Save the order to local storage
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  orders.push(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

  // Step 23: Clear the cart and display a confirmation message
  localStorage.removeItem('cart');
  displayOrderSummary();
  confirmationMessage.textContent = 'Thank you for your order!';
  orderContent.style.display = 'block';
  customerInfoForm.style.display = 'none';
  goToListingBtn.style.display = 'block';
});