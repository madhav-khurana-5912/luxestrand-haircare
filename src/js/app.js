// Main Application Logic for LuxeStrand Hair Care Affiliate Hub
import { products } from '../data/products.js';
import { store } from './store.js';
import { initQuizModal } from './quiz.js';
import { initTagModal, showToast } from './tagModal.js';
import { initProductModal, openProductQuickView } from './productModal.js';

document.addEventListener('DOMContentLoaded', () => {
  // State variables
  let currentCategory = 'all';
  let searchQuery = '';
  let currentSort = 'popular';

  const productGrid = document.getElementById('product-grid');
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');
  const categoryTabs = document.querySelectorAll('.cat-tab');
  const favBadgeCount = document.querySelector('.badge-count');

  // Initialize Sub-modules
  initQuizModal();
  initTagModal();
  initProductModal();

  // Render Favorites Counter
  function updateFavCount() {
    if (favBadgeCount) {
      favBadgeCount.textContent = store.favorites.length;
    }
  }
  updateFavCount();

  // Filter & Render Pipeline
  function renderProducts() {
    let filtered = products.filter(product => {
      const matchCat = currentCategory === 'all' || product.category === currentCategory;
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    // Sorting
    if (currentSort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (currentSort === 'price-low') {
      filtered.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
    } else if (currentSort === 'price-high') {
      filtered.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
    } else if (currentSort === 'reviews') {
      filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    if (filtered.length === 0) {
      productGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding:60px 20px; color:#9CA3AF;">
          <i class="fas fa-search" style="font-size:3rem; margin-bottom:16px; color:#D4AF37;"></i>
          <h3 style="font-family:'Cinzel', serif; color:#FAF8F5; margin-bottom:8px;">No Formulations Found</h3>
          <p>Try searching for another brand, category, or concern (e.g. 'Olaplex', 'Serum', 'Damage').</p>
        </div>
      `;
      return;
    }

    productGrid.innerHTML = filtered.map(p => {
      const affLink = store.buildAffiliateUrl(p.amazonUrl);
      const isFav = store.isFavorite(p.id);

      return `
        <article class="product-card" data-id="${p.id}">
          <span class="card-badge">${p.badge}</span>
          <button class="card-fav-btn ${isFav ? 'active' : ''}" data-id="${p.id}" title="Save to Favorites">
            <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
          </button>
          
          <div class="card-img-wrapper">
            <img class="card-img" src="${p.image}" alt="${p.name}" loading="lazy">
          </div>

          <div class="card-brand">${p.brand}</div>
          <h3 class="card-title" title="${p.name}">${p.name}</h3>

          <div class="card-rating">
            <div class="stars">
              ${renderStars(p.rating)}
            </div>
            <span class="review-count">(${p.reviewsCount.toLocaleString()})</span>
            ${p.isPrime ? '<span class="card-prime-tag">prime</span>' : ''}
          </div>

          <div class="card-price-row">
            <span class="card-price">${p.price}</span>
            ${p.originalPrice ? `<span class="card-original-price">${p.originalPrice}</span>` : ''}
          </div>

          <div class="card-actions">
            <button class="btn-quickview btn-trigger-qv" data-id="${p.id}">Quick View</button>
            <a href="${affLink}" target="_blank" rel="noopener sponsored" class="btn-amazon-affiliate" data-asin="${p.asin}">
              <i class="fab fa-amazon"></i> Buy
            </a>
          </div>
        </article>
      `;
    }).join('');

    // Attach Event Listeners to dynamic elements
    const qvBtns = productGrid.querySelectorAll('.btn-trigger-qv');
    qvBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const prod = products.find(item => item.id === btn.dataset.id);
        if (prod) openProductQuickView(prod);
      });
    });

    const favBtns = productGrid.querySelectorAll('.card-fav-btn');
    favBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const nowFav = store.toggleFavorite(id);
        updateFavCount();
        renderProducts();
        showToast(nowFav ? 'Added to your Luxury Favorites' : 'Removed from Favorites');
      });
    });
  }

  function renderStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        html += '<i class="fas fa-star"></i>';
      } else if (i - rating < 1) {
        html += '<i class="fas fa-star-half-alt"></i>';
      } else {
        html += '<i class="far fa-star"></i>';
      }
    }
    return html;
  }

  // Event Handlers
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.cat;
      renderProducts();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  // Store subscription to update affiliate links across grid when tag changes
  store.subscribe(() => {
    updateFavCount();
    renderProducts();
  });

  // Initial Render
  renderProducts();
});
