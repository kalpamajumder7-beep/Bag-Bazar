let cart = 0;

function addToCart() {
  cart++;
  document.getElementById("count").innerText = cart;
}

function filter(category) {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const cat = card.dataset.cat;

    if (category === "All" || cat === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function openCheckout() {
  document.getElementById("checkout").style.display = "block";
  window.scrollTo(0, document.body.scrollHeight);
}
