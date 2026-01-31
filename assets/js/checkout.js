const CART_KEY = "wineStoreCart";

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function formatEUR(value) {
    return value.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
}

function renderCheckoutSummary() {
    const cart = getCart();
    const container = document.querySelector(".order-items");

    if (!container) return;

    // Se carrinho vazio
    if (cart.length === 0) {
        container.innerHTML = `
      <p class="text-muted">O carrinho está vazio.</p>
      <a href="catalog.html" class="btn btn-gold-cta mt-2">Ir para o Catálogo</a>
    `;
        updateTotals(0);
        return;
    }

    // Render produtos
    container.innerHTML = cart.map(item => `
    <div class="order-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="order-item-info">
        <p class="order-item-name">${item.name}</p>
        <p class="order-item-meta">${item.tag} · x${item.qty}</p>
      </div>
      <p class="order-item-price">${formatEUR(item.price * item.qty)}</p>
    </div>
  `).join("");

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    updateTotals(total);
}

function updateTotals(total) {
    const subtotalEl = document.querySelector(".summary-row span:last-child");
    const totalEl = document.querySelector(".summary-row.total span:last-child");

    if (subtotalEl) subtotalEl.textContent = formatEUR(total);
    if (totalEl) totalEl.textContent = formatEUR(total);
}

document.addEventListener("DOMContentLoaded", renderCheckoutSummary);
