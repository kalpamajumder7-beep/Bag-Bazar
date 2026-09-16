// ===== Bag Bazar Checkout =====

const form = document.getElementById("checkoutForm");
const totalText = document.getElementById("checkoutTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let subtotal = 0;

cart.forEach(item => {
  const price = Number(item.price.replace(/[^\d]/g, ""));
  subtotal += price * item.qty;
});

const finalTotal = subtotal + 80;
totalText.innerText = "৳" + finalTotal;

// Payment Card Select
const cards = document.querySelectorAll(".pay-card");

cards.forEach(card => {
  card.addEventListener("click", () => {
    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    card.querySelector("input").checked = true;
  });
});
// ===== Place Order =====

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const order = {
    id: Date.now(),
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    district: document.getElementById("district").value,
    postal: document.getElementById("postal").value,
    address: document.getElementById("address").value,
    payment: document.querySelector('input[name="payment"]:checked').value,
    items: cart,
    total: finalTotal,
    status: "Pending"
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  localStorage.removeItem("cart");

  alert("Order placed successfully!");
  window.location.href = "index.html";
});
// ===== Empty Cart Protection =====
if (cart.length === 0) {
  alert("Your cart is empty!");
  window.location.href = "cart.html";
}

// ===== Online Payment Placeholder =====
const payment = document.querySelector(
  'input[name="payment"]:checked'
);

if (payment && payment.value !== "cod") {
  console.log("Payment Gateway API will connect here.");
}

// ===== Save User Order History =====
function saveOrderHistory(order) {
  let history = JSON.parse(localStorage.getItem("orderHistory")) || [];
  history.push(order);
  localStorage.setItem("orderHistory", JSON.stringify(history));
}
