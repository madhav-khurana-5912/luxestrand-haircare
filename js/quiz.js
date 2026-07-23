// Interactive Hair Care Routine Quiz Engine for LuxeStrand
import { products } from '../data/products.js';
import { store } from './store.js';

export function initQuizModal() {
  const quizModal = document.getElementById('quiz-modal');
  const openBtns = document.querySelectorAll('.btn-open-quiz');
  const closeBtn = quizModal.querySelector('.modal-close-btn');

  let currentStep = 1;
  const quizAnswers = {
    hairType: 'straight',
    concern: 'damage',
    preference: 'lightweight'
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      quizModal.classList.add('active');
      resetQuiz();
    });
  });

  closeBtn.addEventListener('click', () => {
    quizModal.classList.remove('active');
  });

  // Step Option Selection listeners
  const optBtns = quizModal.querySelectorAll('.quiz-opt-btn');
  optBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const step = btn.dataset.step;
      const key = btn.dataset.key;
      const val = btn.dataset.val;

      quizAnswers[key] = val;

      // Update UI selection
      const siblingOpts = quizModal.querySelectorAll(`.quiz-opt-btn[data-step="${step}"]`);
      siblingOpts.forEach(o => o.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // Navigation buttons inside quiz
  const nextBtns = quizModal.querySelectorAll('.btn-quiz-next');
  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep < 3) {
        currentStep++;
        showStep(currentStep);
      } else {
        renderResults();
      }
    });
  });

  const prevBtns = quizModal.querySelectorAll('.btn-quiz-prev');
  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  function showStep(stepNum) {
    const steps = quizModal.querySelectorAll('.quiz-step');
    steps.forEach(s => s.classList.remove('active'));
    
    const targetStep = quizModal.querySelector(`.quiz-step[data-step-id="${stepNum}"]`);
    if (targetStep) targetStep.classList.add('active');

    // Update Progress bar / dots
    const dots = quizModal.querySelectorAll('.quiz-step-dot');
    dots.forEach((dot, idx) => {
      if (idx + 1 <= stepNum) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function resetQuiz() {
    currentStep = 1;
    showStep(1);
    const resultsContainer = quizModal.querySelector('.quiz-results-container');
    if (resultsContainer) resultsContainer.style.display = 'none';
    
    const wizardContainer = quizModal.querySelector('.quiz-wizard-body');
    if (wizardContainer) wizardContainer.style.display = 'block';
  }

  function renderResults() {
    const wizardContainer = quizModal.querySelector('.quiz-wizard-body');
    const resultsContainer = quizModal.querySelector('.quiz-results-container');

    wizardContainer.style.display = 'none';
    resultsContainer.style.display = 'block';

    // Calculate recommendations based on primary concern & category match
    const primaryMatches = products.filter(p => p.concern === quizAnswers.concern || p.category === 'shampoo');
    const displayList = primaryMatches.slice(0, 4);

    const resultsList = resultsContainer.querySelector('.quiz-results-grid');
    resultsList.innerHTML = displayList.map(item => {
      const affLink = store.buildAffiliateUrl(item.amazonUrl);
      return `
        <div class="routine-step-card">
          <div class="step-number">${item.brand}</div>
          <img src="${item.image}" alt="${item.name}" style="height:120px; width:100%; object-fit:cover; border-radius:8px; margin-bottom:10px;">
          <h4 style="font-size:0.9rem; margin-bottom:6px; color:#FAF8F5;">${item.name}</h4>
          <div style="font-weight:700; color:#D4AF37; margin-bottom:12px;">${item.price}</div>
          <a href="${affLink}" target="_blank" rel="noopener sponsored" class="btn-amazon-affiliate" style="width:100%; text-align:center;">
            <i class="fab fa-amazon"></i> Buy on Amazon
          </a>
        </div>
      `;
    }).join('');
  }
}
