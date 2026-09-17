let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const wishlistItems = document.getElementById("wishlistItems");
const wishCount = document.getElementById("wishCount");

function renderWishlist() {
  wishlistItems.innerHTML = "";
  wishCount.innerText = wishlist.length;

  if (wishlist.length === 0) {
    wishlistItems.innerHTML = `
      <div class="empty-cart">
        <i class="fa-regular fa-heart"></i>
        <h2>Your Wishlist is Empty</h2>
        <p>Save your favorite bags here.</p>
      </div>
    `;
    return;
  }

  wishlist.forEach((item, index) => {
    wishlistItems.innerHTML += `
      <div class="cart-card">
        <img src="${item.image}">
        <div class="info">
          <h3>${item.name}</h3>
          <p>${item.price}</p>

          <button onclick="moveToCart(${index})" class="cart-btn">
            Add to Cart
          </button>

          <button onclick="removeWish(${index})" class="remove">
            Remove
          </button>
        </div>
      </div>
    `;
  });
}

renderWishlist();
// Move Wishlist Item to Cart
function moveToCart(index) {
  const product = {
    ...wishlist[index],
    qty: 1
  };

  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  renderWishlist();
}

// Remove Single Item
function removeWish(index) {
  wishlist.splice(index, 1);

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  renderWishlist();
}
// Clear Entire Wishlist
const clearBtn = document.getElementById("clearWishlist");

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    if (confirm("Clear all wishlist items?")) {
      wishlist = [];
      localStorage.removeItem("wishlist");
      renderWishlist();
    }
  });
}

// Update Cart Badge
function updateCartCount() {
  const badge = document.getElementById("cartCount");
  if (badge) {
    badge.textContent = cart.length;
  }
}

updateCartCount();
