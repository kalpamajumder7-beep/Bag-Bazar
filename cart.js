let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const subtotal = document.getElementById("subtotal");
const total = document.getElementById("total");

function renderCart() {
  cartItems.innerHTML = "";

  let sum = 0;

  cart.forEach((item, index) => {
    const price = Number(item.price.replace(/[^\d]/g, ""));
    sum += price * item.qty;

    cartItems.innerHTML += `
      <div class="cart-card">
        <img src="${item.image}">
        <div class="info">
          <h3>${item.name}</h3>
          <p>৳${price}</p>

          <div class="qty-box">
            <button onclick="changeQty(${index},-1)">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${index},1)">+</button>
          </div>

          <button class="remove" onclick="removeItem(${index})">
            Remove
          </button>
        </div>
      </div>
    `;
  });

  subtotal.innerText = "৳" + sum;
  total.innerText = "৳" + (sum + 80);
}

renderCart();
function changeQty(index, value) {
  cart[index].qty += value;

  if (cart[index].qty < 1) {
    cart[index].qty = 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

const clearBtn = document.getElementById("clearCart");

clearBtn.addEventListener("click", () => {
  if (confirm("Clear all products from cart?")) {
    cart = [];
    localStorage.removeItem("cart");
    renderCart();
  }
});
// Save Cart
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart badge
function updateCartCount() {
  const badges = document.querySelectorAll("#cartCount");
  badges.forEach(badge => {
    badge.textContent = cart.length;
  });
}

// Empty cart message
function checkEmptyCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-cart-shopping"></i>
        <h2>Your Cart is Empty</h2>
        <p>Add your favorite bags to continue shopping.</p>
        <a href="index.html" class="shop-btn">Shop Now</a>
      </div>
    `;
    subtotal.innerText = "৳0";
    total.innerText = "৳0";
  }
}

updateCartCount();
checkEmptyCart();
