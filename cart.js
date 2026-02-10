// ================================
// CART CORE (GLOBAL)
// ================================

window.getCart = function () {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

window.saveCart = function (cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// ================================
// ADD TO CART (GLOBAL)
// ================================

window.addToCart = function (product) {
  let cart = getCart();

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  updateCartCount();
  alert("Added to cart 🧶");
};

// ================================
// CART COUNT
// ================================

window.updateCartCount = function () {
  const el = document.getElementById("cartCount");
  if (!el) return;

  const count = getCart().reduce((s, i) => s + i.qty, 0);
  el.textContent = count;
};

// ================================
// TOTAL
// ================================

window.calculateTotal = function () {
  return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
};

// ================================
// RENDER CART (for cart.html)
// ================================

window.renderCart = function () {
  const cart = getCart();
  const container = document.getElementById("cartContainer");
  const totalEl = document.getElementById("cartTotal");

  if (!container) return;

  updateCartCount();

  if (!cart.length) {
    container.innerHTML = `<p>Your cart is empty 😔</p>`;
    if (totalEl) totalEl.textContent = "₹ 0";
    return;
  }

  container.innerHTML = "";

  cart.forEach(item => {
    container.innerHTML += `
      <div>
        ${item.name} – ₹ ${item.price} × ${item.qty}
        <button onclick="removeItem('${item.id}')">✕</button>
      </div>
    `;
  });

  if (totalEl) totalEl.textContent = `₹ ${calculateTotal()}`;
};

// ================================
// REMOVE ITEM
// ================================

window.removeItem = function (id) {
  let cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
};

// ================================
// INIT
// ================================

document.addEventListener("DOMContentLoaded", updateCartCount);
