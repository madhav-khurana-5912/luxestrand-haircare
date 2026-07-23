// Product Quick View Modal Component for LuxeStrand
import { store } from './store.js';

export function initProductModal() {
  const modal = document.getElementById('product-modal');
  const closeBtn = modal.querySelector('.modal-close-btn');

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

export function openProductQuickView(product) {
  const modal = document.getElementById('product-modal');
  const body = modal.querySelector('.product-modal-body');

  const affLink = store.buildAffiliateUrl(product.amazonUrl);
  const isFav = store.isFavorite(product.id);

  body.innerHTML = `
    <div style="display:grid; grid-template-columns: 1fr 1.2fr; gap:30px; align-items:start;">
      <div>
        <div style="position:relative; border-radius:16px; overflow:hidden; border:1px solid rgba(255,255,255,0.1); margin-bottom:16px;">
          <img src="${product.image}" alt="${product.name}" style="width:100%; height:320px; object-fit:cover;">
          <span class="card-badge">${product.badge}</span>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03); padding:12px; border-radius:12px; border:1px solid rgba(255,255,255,0.06);">
          <span style="font-size:0.8rem; color:#9CA3AF;">Amazon ASIN: <strong style="color:#FAF8F5;">${product.asin}</strong></span>
          ${product.isPrime ? '<span class="card-prime-tag">prime</span>' : ''}
        </div>
      </div>

      <div>
        <div style="font-size:0.8rem; text-transform:uppercase; color:#D4AF37; letter-spacing:0.08em; font-weight:700; margin-bottom:6px;">${product.brand}</div>
        <h2 style="font-family:'Cinzel', serif; font-size:1.5rem; line-height:1.25; margin-bottom:12px; color:#FAF8F5;">${product.name}</h2>
        
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:16px;">
          <div class="stars" style="color:#F59E0B;">
            <i class="fas fa-star"></i> <strong style="color:#FAF8F5;">${product.rating}</strong>
          </div>
          <span style="font-size:0.82rem; color:#9CA3AF;">(${product.reviewsCount.toLocaleString()} verified Amazon reviews)</span>
        </div>

        <div style="display:flex; align-items:baseline; gap:12px; margin-bottom:20px;">
          <span style="font-size:1.8rem; font-weight:800; color:#FAF8F5;">${product.price}</span>
          ${product.originalPrice ? `<span style="text-decoration:line-through; color:#9CA3AF;">${product.originalPrice}</span>` : ''}
          <span style="background:rgba(16,185,129,0.15); color:#10B981; font-size:0.75rem; font-weight:700; padding:2px 8px; border-radius:12px;">In Stock on Amazon</span>
        </div>

        <p style="font-size:0.92rem; color:#9CA3AF; line-height:1.6; margin-bottom:20px;">${product.shortDesc}</p>

        <div style="background:rgba(212,175,55,0.06); border:1px solid rgba(212,175,55,0.2); padding:14px; border-radius:12px; margin-bottom:20px;">
          <h4 style="font-size:0.85rem; color:#D4AF37; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:6px;"><i class="fas fa-microscope"></i> Laboratory Verdict</h4>
          <p style="font-size:0.85rem; color:#FAF8F5;">${product.verdict}</p>
        </div>

        <div style="margin-bottom:24px;">
          <h4 style="font-size:0.85rem; color:#FAF8F5; margin-bottom:8px;">Key Active Ingredients:</h4>
          <div style="display:flex; flex-wrap:wrap; gap:8px;">
            ${product.ingredients.map(ing => `<span style="background:rgba(255,255,255,0.06); font-size:0.78rem; padding:4px 12px; border-radius:20px; border:1px solid rgba(255,255,255,0.1);">${ing}</span>`).join('')}
          </div>
        </div>

        <div style="display:flex; gap:14px;">
          <a href="${affLink}" target="_blank" rel="noopener sponsored" class="btn-amazon-affiliate" style="flex:1; padding:14px; font-size:0.95rem;">
            <i class="fab fa-amazon" style="font-size:1.2rem;"></i> Buy Now on Amazon
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
}
