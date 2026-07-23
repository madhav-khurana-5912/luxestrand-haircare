// Amazon Affiliate Tag Configuration Modal for LuxeStrand
import { store } from './store.js';

export function initTagModal() {
  const modal = document.getElementById('tag-modal');
  const openBtns = document.querySelectorAll('.btn-open-tag-modal');
  const closeBtn = modal.querySelector('.modal-close-btn');
  const saveBtn = modal.querySelector('.btn-save-tag');
  const input = modal.querySelector('#affiliate-tag-input');
  const currentTagDisplay = document.querySelectorAll('.current-tag-text');

  function updateDisplays() {
    const currentTag = store.getAffiliateTag();
    currentTagDisplay.forEach(el => {
      el.textContent = currentTag;
    });
    if (input) input.value = currentTag;
  }

  updateDisplays();

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      updateDisplays();
      modal.classList.add('active');
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  saveBtn.addEventListener('click', () => {
    const val = input.value.trim();
    if (val) {
      store.setAffiliateTag(val);
      updateDisplays();
      modal.classList.remove('active');
      showToast(`Amazon Affiliate Tag updated to: ${val}`);
    }
  });

  store.subscribe(() => {
    updateDisplays();
  });
}

export function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-check-circle" style="color:#D4AF37;"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}
