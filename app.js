
const searchInput = document.querySelector(".search-box input");
const productCards = document.querySelectorAll(".card");

// Search Function
if (searchInput) {
  searchInput.addEventListener("input", function () {
    const value = this.value.toLowerCase();

    productCards.forEach((card) => {
      const name = card.querySelector("h3").textContent.toLowerCase();

      card.style.display = name.includes(value) ? "block" : "none";
    });
  });
}

// Save selected category
const categories = document.querySelectorAll(".cat");

categories.forEach((cat) => {
  cat.addEventListener("click", () => {
    const categoryName = cat.querySelector("p").textContent;
    localStorage.setItem("selectedCategory", categoryName);
  });
});
// ===== Product Click =====

productCards.forEach((card, index) => {
  card.addEventListener("click", (e) => {
    e.preventDefault();

    const product = {
      id: index,
      name: card.querySelector("h3").textContent,
      price: card.querySelector(".new").textContent,
      image: card.querySelector("img").getAttribute("src")
    };

    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "product.html";
  });
});

// ===== Cart Badge =====

function updateCartBadge() {
  const badge = document.getElementById("cartCount");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (badge) {
    badge.textContent = cart.length;
  }
}

updateCartBadge();
// ===== Load Dynamic Products =====

const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
const productContainer = document.getElementById("productContainer");

if (productContainer && savedProducts.length > 0) {
  productContainer.innerHTML = "";

  savedProducts.forEach((item) => {
    productContainer.innerHTML += `
      <a href="product.html" class="card">
        <span class="badge">${item.discount}% OFF</span>
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <div class="price">
          <span class="new">৳${item.price}</span>
        </div>
      </a>
    `;
  });
}

// ===== Auto Refresh =====

window.addEventListener("storage", () => {
  location.reload();
});
