function addProduct() {
  let products = JSON.parse(localStorage.getItem("bags")) || [];

  const item = {
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    image: document.getElementById("image").value,
    category: document.getElementById("category").value
  };

  products.push(item);
  localStorage.setItem("bags", JSON.stringify(products));

  alert("Product Added!");

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("image").value = "";
}
