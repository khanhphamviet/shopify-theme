document.addEventListener('DOMContentLoaded', loadWishlistPage);

async function loadWishlistPage() {
  const grid = document.getElementById('wishlist-grid');
  const emptyState = document.querySelector('.wishlist-empty');
  const loadingState = document.querySelector('.wishlist-loading');

  if (!grid) return;

  try {
    const res = await fetch('/apps/wishlist/list');
    if (!res.ok) throw new Error('Failed to load wishlist');
    const data = await res.json();

    loadingState.style.display = 'none';

    if (!data.products || data.products.length === 0) {
      emptyState.style.display = 'block';
      return;
    }

    renderWishlistItems(data.products, grid);

  } catch (err) {
    console.error('Wishlist page error:', err);
    loadingState.textContent = 'Có lỗi khi tải danh sách yêu thích.';
  }
}

function renderWishlistItems(products, grid) {
  products.forEach(product => {
    const item = document.createElement('div');
    item.className = 'wishlist-item';
    item.dataset.productId = product.id;

    item.innerHTML = `
      <a href="${product.url}" class="wishlist-item__link">
        <img src="${product.image}" alt="${escapeHtml(product.title)}" loading="lazy">
        <h3 class="wishlist-item__title">${escapeHtml(product.title)}</h3>
        <span class="wishlist-item__price">${formatPrice(product.price)}</span>
      </a>
      <button 
        type="button" 
        class="wishlist-btn wishlist-btn--remove active" 
        data-product-id="${product.id}"
        aria-label="Xóa khỏi yêu thích"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="#e63946" stroke="#e63946" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
    `;

    grid.appendChild(item);
  });
}

function formatPrice(cents) {
  return (cents / 100).toLocaleString('vi-VN') + 'đ';
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}