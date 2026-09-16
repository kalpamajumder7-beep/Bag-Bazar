// ===== Bag Bazar Product Page =====

let quantity = 1;

const qtyText = document.getElementById("qtyValue");
const plusBtn = document.getElementById("plusQty");
const minusBtn = document.getElementById("minusQty");

// Quantity
plusBtn.addEventListener("click", () => {
  quantity++;
  qtyText.textContent = quantity;
});

minusBtn.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    qtyText.textContent = quantity;
  }
});

// Image Gallery
const mainImage = document.getElementById("mainProductImage");
const thumbs = document.querySelectorAll(".thumb");

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    mainImage.src = thumb.src;

    thumbs.forEach((t) => t.classList.remove("active"));
    thumb.classList.add("active");
  });
  
  // ===== Wishlist =====

const wishlistBtn = document.querySelector(".wishlist-btn");

wishlistBtn.addEventListener("click", () => {
  const product = {
    name: document.getElementById("productName").innerText,
    price: document.getElementById("productPrice").innerText,
    image: document.getElementById("mainProductImage").src
  };

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const exists = wishlist.find(item => item.name === product.name);

  if (!exists) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to Wishlist ❤️");
  } else {
    alert("Already in Wishlist");
  }
});

// ===== Add To Cart =====

const addCartBtn = document.getElementById("addCartBtn");

addCartBtn.addEventListener("click", () => {

  const product = {
    name: document.getElementById("productName").innerText,
    price: document.getElementById("productPrice").innerText,
    image: document.getElementById("mainProductImage").src,
    qty: quantity
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Product Added to Cart 🛒");
});

// ===== Buy Now =====

document.getElementById("buyNowBtn").addEventListener("click", () => {
  window.location.href = "checkout.html";
});
});

// ===== Color Selection =====

const colorBtns = document.querySelectorAll(".color");

colorBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    colorBtns.forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
  });
});

// ===== Cart Counter =====

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const badge = document.getElementById("cartCount");

  if (badge) {
    badge.textContent = cart.length;
  }
}

updateCartCount();
