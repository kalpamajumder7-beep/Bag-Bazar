let quantity = 1;

const qtyValue = document.getElementById("qtyValue");
const plusBtn = document.getElementById("plusQty");
const minusBtn = document.getElementById("minusQty");

plusBtn.onclick = () => {
  quantity++;
  qtyValue.textContent = quantity;
};

minusBtn.onclick = () => {
  if (quantity > 1) {
    quantity--;
    qtyValue.textContent = quantity;
  }
};

const mainImage = document.getElementById("mainProductImage");
const thumbs = document.querySelectorAll(".thumb");

thumbs.forEach((thumb) => {
  thumb.onclick = () => {
    mainImage.src = thumb.src;
    thumbs.forEach((t) => t.classList.remove("active"));
    thumb.classList.add("active");
  };
});
// ===== Wishlist =====

const wishlistBtn = document.querySelector(".wishlist-btn");

wishlistBtn.onclick = () => {
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
};

// ===== Add To Cart (Fixed) =====

const addCartBtn = document.getElementById("addCartBtn");

addCartBtn.onclick = () => {
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
};
// ===== Buy Now =====

const buyNowBtn = document.getElementById("buyNowBtn");

buyNowBtn.onclick = () => {
  window.location.href = "checkout.html";
};

// ===== Color Selection =====

const colorBtns = document.querySelectorAll(".color");

colorBtns.forEach((btn) => {
  btn.onclick = () => {
    colorBtns.forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
  };
});

// ===== Cart Badge =====

function updateCartCount() {
  const badge = document.getElementById("cartCount");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (badge) {
    badge.textContent = cart.length;
  }
}

updateCartCount();
