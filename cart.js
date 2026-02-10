function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function addToCart(product) {
  const cart = getCart();
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart 🧶");
}
