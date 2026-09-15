const searchInput = document.querySelector(".search-box input");
const products = document.querySelectorAll(".card");
const cartBadge = document.querySelector(".cart-icon span");

let cartCount = 0;
let wishlist = [];

searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase();

  products.forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();

    if(name.includes(value)){
      card.style.display = "block";
    }else{
      card.style.display = "none";
    }
  });
});

function addToCart(){
  cartCount++;
  cartBadge.textContent = cartCount;
}

function addToWishlist(name){
  if(!wishlist.includes(name)){
    wishlist.push(name);
    alert(name + " added to wishlist ❤️");
  }
}
// Horizontal slider
document.querySelectorAll(".cat-slider, .product-slider").forEach(slider=>{
  let down=false,startX,scroll;

  slider.addEventListener("mousedown",e=>{
    down=true;
    startX=e.pageX-slider.offsetLeft;
    scroll=slider.scrollLeft;
  });

  slider.addEventListener("mouseleave",()=>down=false);
  slider.addEventListener("mouseup",()=>down=false);

  slider.addEventListener("mousemove",e=>{
    if(!down) return;
    e.preventDefault();
    const x=e.pageX-slider.offsetLeft;
    slider.scrollLeft=scroll-(x-startX)*1.5;
  });
});

// Product click
products.forEach(card=>{
  card.addEventListener("click",()=>{
    const name=card.querySelector("h3").innerText;
    localStorage.setItem("selectedProduct",name);
    window.location.href="product.html";
  });
});
// Save Cart
function saveCart(product){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Save Wishlist
function saveWishlist(product){
  let wish = JSON.parse(localStorage.getItem("wishlist")) || [];

  if(!wish.includes(product)){
    wish.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wish));
  }
}

// Bottom navigation
document.querySelectorAll(".bottom-nav a").forEach(item=>{
  item.addEventListener("click",()=>{
    document.querySelectorAll(".bottom-nav a")
      .forEach(i=>i.classList.remove("active"));
    item.classList.add("active");
  });
});  
