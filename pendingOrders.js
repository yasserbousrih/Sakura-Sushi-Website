// Step 1: Add an event listener that waits for the DOM to fully load before executing the callback function.
document.addEventListener('DOMContentLoaded', () => {

  // Step 2: Get orders from local storage or set to an empty array if none are found.
  const orders = JSON.parse(localStorage.getItem('orders')) || [];

  // Step 3: Get a reference to the orders container element.
  const ordersContainer = document.getElementById('orders-container');

  // Step 4: Create an array to keep track of orders that have already been created.
  const createdOrders = [];

  // Step 5: Loop through each order and create an order div for it if it hasn't already been created.
  orders.forEach((order, index) => {

    // Step 6: Check if the order div has already been created.
    if (createdOrders.includes(order.date)) {
      return;
    }

    // Step 7: Create a new div element for the order.
    const orderDiv = document.createElement('div');
    orderDiv.classList.add('order');
    orderDiv.id = `order-${index + 1}`;

    // Step 8: Create a heading element for the order with the order date.
    const heading = document.createElement('h2');
    heading.textContent = `Order from ${order.date}`;
    orderDiv.appendChild(heading);

    // Step 9: Create a paragraph element with the customer's name.
    const name = document.createElement('p');
    name.textContent = `${order.firstName} ${order.lastName}`;
    orderDiv.appendChild(name);

    // Step 10: Create a list element to display the items in the order.
    const ul = document.createElement('ul');
    order.items.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
      ul.appendChild(li);
    });
    orderDiv.appendChild(ul);

    // Step 11: Create a paragraph element to display the total cost of the order.
    const total = document.createElement('p');
    total.textContent = `Total: ${order.total}`;
    orderDiv.appendChild(total);

    // Step 12: Create a button element to remove the order from the list.
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';

    // Step 13: Add an event listener to the remove button to remove the order from local storage and the DOM.
    removeBtn.addEventListener('click', () => {
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      const updatedOrders = orders.filter((o) => o.date !== order.date);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      ordersContainer.removeChild(orderDiv);
    });
    orderDiv.appendChild(removeBtn);

    // Step 14: Add the order div to the orders container and push the order date to the createdOrders array.
    ordersContainer.appendChild(orderDiv);
    createdOrders.push(order.date);
  });
});
