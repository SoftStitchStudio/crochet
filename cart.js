// ================================
// CART CORE
// ================================

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ================================
// CART COUNT
// ================================

function updateCartCount() {
  const el = document.getElementById("cartCount");
  if (!el) return;

  const count = getCart().reduce((s, i) => s + i.qty, 0);
  el.textContent = count;
}

// ================================
// CART TOTAL
// ================================

function calculateTotal() {
  return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
}

// ================================
// RENDER CART
// ================================

function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cartContainer");
  const totalEl = document.getElementById("cartTotal");

  updateCartCount();

  if (!cart.length) {
    container.innerHTML = `
      <div class="empty-cart">
        Your cart is empty 😔
      </div>
    `;
    totalEl.textContent = "₹ 0";
    return;
  }

  container.innerHTML = "";

  cart.forEach(item => {
    container.innerHTML += `
      <div class="cart-item">
        <div class="cart-name">${item.name}</div>
        <div class="cart-price">₹ ${item.price}</div>

        <div class="qty-controls">
          <button onclick="changeQty('${item.id}', -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty('${item.id}', 1)">+</button>
        </div>

        <button class="remove-btn"
          onclick="removeItem('${item.id}')">
          ✕
        </button>
      </div>
    `;
  });

  totalEl.textContent = `₹ ${calculateTotal()}`;
}

// ================================
// ACTIONS
// ================================

function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);

  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    removeItem(id);
    return;
  }

  saveCart(cart);
  renderCart();
}

function removeItem(id) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
}

// ================================
// INIT
// ================================

document.addEventListener("DOMContentLoaded", updateCartCount);
