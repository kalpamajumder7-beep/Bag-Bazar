// ===== Bag Bazar Admin =====

let products = JSON.parse(localStorage.getItem("products")) || [];
let categories = JSON.parse(localStorage.getItem("categories")) || [
  "Travel Bag",
  "Trolly",
  "Office Bag",
  "College Bag",
  "Chest Bag",
  "Shoulder Bag",
  "Cycle Bag",
  "Collection Bag",
  "Hand Bag",
  "Ladies Purse",
  "Money Bag"
];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

const productList = document.getElementById("productList");
const categoryList = document.getElementById("categoryList");
const orderList = document.getElementById("orderList");

function saveData() {
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("categories", JSON.stringify(categories));
  localStorage.setItem("orders", JSON.stringify(orders));
}
// ===== Add Product =====

document.getElementById("addProductBtn").addEventListener("click", () => {

  const product = {
    id: Date.now(),
    name: document.getElementById("productName").value,
    price: document.getElementById("productPrice").value,
    discount: document.getElementById("productDiscount").value,
    description: document.getElementById("productDescription").value,
    image: document.getElementById("productImage").value,
    category: document.getElementById("productCategory").value
  };

  products.push(product);
  saveData();
  renderProducts();

  alert("Product Added Successfully!");
});

// ===== Render Products =====

function renderProducts() {
  productList.innerHTML = "";

  products.forEach((item, index) => {
    productList.innerHTML += `
      <div class="admin-item">
        <img src="${item.image}" width="55">

        <div>
          <h3>${item.name}</h3>
          <p>৳${item.price} • ${item.category}</p>
        </div>

        <button onclick="deleteProduct(${index})">
          Delete
        </button>
      </div>
    `;
  });
}

function deleteProduct(index) {
  products.splice(index, 1);
  saveData();
  renderProducts();
}

renderProducts();
// ===== Categories =====

const categoryInput = document.getElementById("newCategory");
const categorySelect = document.getElementById("productCategory");

document.getElementById("addCategoryBtn").addEventListener("click", () => {
  const name = categoryInput.value.trim();
  if (!name) return;

  categories.push(name);
  categoryInput.value = "";

  saveData();
  renderCategories();
});

function renderCategories() {
  categoryList.innerHTML = "";
  categorySelect.innerHTML = "";

  categories.forEach((cat, index) => {
    categoryList.innerHTML += `
      <div class="admin-item">
        <span>${cat}</span>
        <button onclick="deleteCategory(${index})">Delete</button>
      </div>
    `;

    categorySelect.innerHTML += `<option>${cat}</option>`;
  });
}

function deleteCategory(index) {
  categories.splice(index, 1);
  saveData();
  renderCategories();
}

// ===== Orders =====

function renderOrders() {
  orderList.innerHTML = "";

  orders.forEach((order, index) => {
    orderList.innerHTML += `
      <div class="admin-item">
        <div>
          <h3>${order.name}</h3>
          <p>৳${order.total} • ${order.payment}</p>
          <small>${order.status}</small>
        </div>

        <button onclick="shipOrder(${index})">
          Mark Shipped
        </button>
      </div>
    `;
  });
}

function shipOrder(index) {
  orders[index].status = "Shipped";
  saveData();
  renderOrders();
}

// Initial Load
renderCategories();
renderOrders();
