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


// ================================
// PAY NOW (UPI FLOW)
// ================================

window.payNow = function () {
  const cart = getCart();

  if (!cart.length) {
    alert("Your cart is empty");
    return;
  }

  const total = calculateTotal();

  // Create readable order summary
  const orderText = cart
    .map(i => `${i.name} x ${i.qty}`)
    .join(", ");

  // Your UPI ID (CHANGE THIS)
  const upiId = "yourupi@bank";

  // Encode for URL
  const note = encodeURIComponent(
    `Order: ${orderText} | Total: ₹${total}`
  );

  const upiUrl = `upi://pay?pa=${upiId}&pn=Soft Stitch Studio&am=${total}&cu=INR&tn=${note}`;

  // Open UPI app
  window.location.href = upiUrl;

  // Save order snapshot (IMPORTANT)
  localStorage.setItem(
    "lastOrder",
    JSON.stringify({
      items: cart,
      total: total,
      time: new Date().toISOString()
    })
  );

  // Redirect to confirmation page after 5 seconds
  setTimeout(() => {
    window.location.href = "order-confirmation.html";
  }, 5000);
};
