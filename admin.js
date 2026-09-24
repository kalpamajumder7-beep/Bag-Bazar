let products = JSON.parse(localStorage.getItem("products")) || [];
let categories = JSON.parse(localStorage.getItem("categories")) || [
  "Travel Bag","Trolly","Office Bag","College Bag",
  "Chest Bag","Shoulder Bag","Cycle Bag",
  "Collection Bag","Hand Bag","Ladies Purse","Money Bag"
];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

let editIndex = -1;

const productList = document.getElementById("productList");
const categoryList = document.getElementById("categoryList");
const orderList = document.getElementById("orderList");

function saveData(){
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("categories", JSON.stringify(categories));
  localStorage.setItem("orders", JSON.stringify(orders));
}
function getFormData() {
  return {
    id: Date.now(),
    name: document.getElementById("productName").value,
    price: document.getElementById("productPrice").value,
    discount: document.getElementById("productDiscount").value,
    description: document.getElementById("productDescription").value,
    image: document.getElementById("productImage").value,
    category: document.getElementById("productCategory").value
  };
}

document.getElementById("addProductBtn").onclick = () => {
  const product = getFormData();

  if (!product.name || !product.price || !product.image) {
    alert("Fill all required fields");
    return;
  }

  if (editIndex === -1) {
    products.push(product);
    alert("Product Added");
  } else {
    product.id = products[editIndex].id;
    products[editIndex] = product;
    editIndex = -1;
    document.getElementById("addProductBtn").textContent = "Add Product";
    alert("Product Updated");
  }

  saveData();
  renderProducts();

  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productDiscount").value = "";
  document.getElementById("productDescription").value = "";
  document.getElementById("productImage").value = "";
};
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((item, index) => {
    productList.innerHTML += `
      <div class="admin-item">
        <img src="${item.image}" width="60">
        <div>
          <h3>${item.name}</h3>
          <p>৳${item.price} • ${item.discount}% OFF</p>
          <small>${item.category}</small>
        </div>
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Delete</button>
      </div>
    `;
  });
}

function editProduct(index) {
  const p = products[index];

  document.getElementById("productName").value = p.name;
  document.getElementById("productPrice").value = p.price;
  document.getElementById("productDiscount").value = p.discount;
  document.getElementById("productDescription").value = p.description;
  document.getElementById("productImage").value = p.image;
  document.getElementById("productCategory").value = p.category;

  editIndex = index;
  document.getElementById("addProductBtn").textContent = "Update Product";
}

function deleteProduct(index) {
  products.splice(index, 1);
  saveData();
  renderProducts();
}

renderProducts();
