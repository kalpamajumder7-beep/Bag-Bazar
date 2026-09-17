// ===== Bag Bazar Profile =====

const user = JSON.parse(localStorage.getItem("user"));
const orders = JSON.parse(localStorage.getItem("orders")) || [];

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userPhone = document.getElementById("userPhone");
const orderList = document.getElementById("orderList");

// Login Protection
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}

// Load User Info
if (user) {
  userName.textContent = user.name;
  userEmail.textContent = user.email;
  userPhone.textContent = user.phone;
}
// ===== Load Orders =====

function renderOrders() {
  orderList.innerHTML = "";

  if (orders.length === 0) {
    orderList.innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-box-open"></i>
        <h3>No Orders Yet</h3>
        <p>Your placed orders will appear here.</p>
      </div>
    `;
    return;
  }

  orders.forEach(order => {
    orderList.innerHTML += `
      <div class="order-card">
        <div class="order-top">
          <h3>Order #${order.id}</h3>
          <span>${order.status}</span>
        </div>

        <p><strong>Total:</strong> ৳${order.total}</p>
        <p><strong>Payment:</strong> ${order.payment.toUpperCase()}</p>
        <p><strong>District:</strong> ${order.district}</p>
      </div>
    `;
  });
}

renderOrders();
// ===== Logout =====

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  alert("Logged out successfully!");
  window.location.href = "login.html";
});

// ===== Auto Update Profile =====

function refreshProfile() {
  if (!user) return;

  userName.textContent = user.name;
  userEmail.textContent = user.email;
  userPhone.textContent = user.phone;
}

refreshProfile();
