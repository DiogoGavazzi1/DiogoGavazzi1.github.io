// ======================================
// RENDER CHECKOUT SUMMARY
// ======================================

function renderCheckoutSummary() {

    const cart = getCart(); // vem do cart.js
    const container = document.querySelector(".order-items");
    const subtotalEl = document.getElementById("checkout-subtotal");
    const totalEl = document.getElementById("checkout-total");

    if (!container) return;

    // Carrinho vazio
    if (cart.length === 0) {
        container.innerHTML = `
            <p class="text-muted">O carrinho está vazio.</p>
            <a href="catalog.html" class="btn btn-gold-cta mt-2">
                Ir para o Catálogo
            </a>
        `;

        if (subtotalEl) subtotalEl.textContent = formatEUR(0);
        if (totalEl) totalEl.textContent = formatEUR(0);
        return;
    }

    // Render produtos
    container.innerHTML = cart.map(item => {

        const itemTotal = item.price * item.qty;

        return `
            <div class="order-item d-flex align-items-center justify-content-between mb-3">

                <div class="d-flex align-items-center gap-3">
                    <img src="${item.image}" 
                         alt="${item.name}" 
                         style="width:60px; border-radius:8px;">
                    
                    <div>
                        <p class="mb-0 fw-medium">${item.name}</p>
                        <small class="text-muted">${item.tag || ""} · x${item.qty}</small>
                    </div>
                </div>

                <p class="mb-0 fw-medium">
                    ${formatEUR(itemTotal)}
                </p>

            </div>
        `;

    }).join("");

    // Calcular total
    const total = cart.reduce((sum, item) => {
        return sum + (item.price * item.qty);
    }, 0);

    if (subtotalEl) subtotalEl.textContent = formatEUR(total);
    if (totalEl) totalEl.textContent = formatEUR(total);
}


// ======================================
// INIT
// ======================================

document.addEventListener("DOMContentLoaded", renderCheckoutSummary);