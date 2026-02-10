// ================================
// CART HELPERS
// ================================

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ================================
// ADD TO CART (SMART VERSION)
// ================================

function addToCart(product) {
  let cart = getCart();

  // Check if product already exists
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      ...product,
      qty: 1
    });
  }

  saveCart(cart);

  updateCartCount();
  showToast("Added to cart 🧶");
}

// ================================
// CART COUNT (HEADER)
// ================================

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartCount() {
  const el = document.getElementById("cartCount");
  if (el) {
    el.textContent = getCartCount();
  }
}

// ================================
// TOAST MESSAGE (NO ALERT)
// ================================

function showToast(message) {
  let toast = document.getElementById("toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.className = "toast show";

  setTimeout(() => {
    toast.className = "toast";
  }, 2000);
}

// ================================
// INIT
// ================================

document.addEventListener("DOMContentLoaded", updateCartCount);
