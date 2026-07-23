// Store & Affiliate Tag Router for LuxeStrand Hair Care Hub

const DEFAULT_TAG = 'luxestrand-20';

export class Store {
  constructor() {
    this.affiliateTag = localStorage.getItem('luxestrand_affiliate_tag') || DEFAULT_TAG;
    this.favorites = JSON.parse(localStorage.getItem('luxestrand_favorites') || '[]');
    this.listeners = [];
  }

  getAffiliateTag() {
    return this.affiliateTag;
  }

  setAffiliateTag(newTag) {
    const cleanTag = newTag.trim() || DEFAULT_TAG;
    this.affiliateTag = cleanTag;
    localStorage.setItem('luxestrand_affiliate_tag', cleanTag);
    this.notify();
  }

  /**
   * Generates a valid Amazon affiliate URL with the configured tracking tag
   * @param {string} amazonUrl Base Amazon URL or ASIN
   * @returns {string} Fully qualified affiliate URL
   */
  buildAffiliateUrl(amazonUrl) {
    if (!amazonUrl) return '#';
    
    // Parse URL
    try {
      const url = new URL(amazonUrl);
      url.searchParams.set('tag', this.affiliateTag);
      url.searchParams.set('linkCode', 'll2');
      url.searchParams.set('linkId', 'luxestrand_aff');
      return url.toString();
    } catch (e) {
      // Fallback string append if simple URL
      const separator = amazonUrl.includes('?') ? '&' : '?';
      return `${amazonUrl}${separator}tag=${this.affiliateTag}&linkCode=ll2`;
    }
  }

  toggleFavorite(productId) {
    if (this.favorites.includes(productId)) {
      this.favorites = this.favorites.filter(id => id !== productId);
    } else {
      this.favorites.push(productId);
    }
    localStorage.setItem('luxestrand_favorites', JSON.stringify(this.favorites));
    this.notify();
    return this.favorites.includes(productId);
  }

  isFavorite(productId) {
    return this.favorites.includes(productId);
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this));
  }
}

export const store = new Store();
