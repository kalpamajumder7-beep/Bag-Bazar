const title = document.getElementById("categoryTitle");
const productBox = document.getElementById("categoryProducts");
const productCount = document.getElementById("productCount");
const sortSelect = document.getElementById("sortProducts");

// Get category from URL
const params = new URLSearchParams(window.location.search);
const currentCategory = params.get("cat") || "All";

title.textContent = currentCategory;

// Load products
let products = JSON.parse(localStorage.getItem("products")) || [];

// Filter products by category
let filteredProducts = products.filter(item =>
  item.category === currentCategory
);
function renderProducts(list) {
  productBox.innerHTML = "";
  productCount.textContent = list.length + " Products";

  if (list.length === 0) {
    productBox.innerHTML = `
      <div class="empty-cart">
        <h2>No Products Found</h2>
        <p>Products in this category will appear here.</p>
      </div>
    `;
    return;
  }

  list.forEach((item) => {
    productBox.innerHTML += `
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

renderProducts(filteredProducts);
// Sort Products
sortSelect.addEventListener("change", () => {
  let sorted = [...filteredProducts];

  if (sortSelect.value === "low") {
    sorted.sort((a, b) => Number(a.price) - Number(b.price));
  }

  if (sortSelect.value === "high") {
    sorted.sort((a, b) => Number(b.price) - Number(a.price));
  }

  renderProducts(sorted);
});

// Open Product Page
document.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;

  const name = card.querySelector("h3").textContent;
  const product = products.find((p) => p.name === name);

  if (product) {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
  }
});
