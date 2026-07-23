# LuxeStrand & Co. - Luxury Hair Care Affiliate Platform

A high-converting, modern luxury hair care affiliate website built with vanilla HTML5, CSS3 glassmorphic design system, modular JavaScript, and dynamic Amazon Associates tracking link generator.

---

## 🌟 Key Features

- 💎 **Luxury Aesthetic**: Botanical dark mode, champagne gold gradients (`#D4AF37`), glassmorphism cards, and fluid responsive layouts.
- 🛒 **Dynamic Amazon Affiliate Tags**: Real-time affiliate tag generator and custom tag editor modal (updates all product buy links on the fly).
- 🔬 **Interactive Hair Care Routine Quiz**: 3-step diagnostic questionnaire recommending customized 4-product routines with single-click Amazon links.
- ⚡ **Product Quick View Modal**: Laboratory verdict, ingredients breakdown, verified Amazon star ratings, and price comparison.
- 🔍 **Live Search & Filter**: Filter by Shampoos, Oils & Serums, Deep Masks, Scalp Care, Curly Hair, Styling Tools, or sort by rating and price.
- ⚖️ **FTC & Amazon Associates Compliance**: Integrated Amazon Associates disclosure banner and legal footer.

---

## 🚀 How to Deploy to Vercel via GitHub

### Option 1: GitHub & Vercel Web Dashboard (Recommended)

1. **Initialize Git Repository**:
   Open terminal in the project directory `C:\Users\maddy\.gemini\antigravity\scratch\luxestrand-haircare`:
   ```bash
   cd C:\Users\maddy\.gemini\antigravity\scratch\luxestrand-haircare
   git init
   git add .
   git commit -m "Initial commit of LuxeStrand Hair Care Affiliate site"
   ```

2. **Push to GitHub**:
   - Go to [GitHub.com](https://github.com/new) and create a new repository named `luxestrand-haircare`.
   - Run the following commands in your terminal:
   ```bash
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/luxestrand-haircare.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy to Vercel**:
   - Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
   - Click **"Add New..."** -> **"Project"**.
   - Select your GitHub repository (`luxestrand-haircare`).
   - Leave Framework Preset as **"Other"** or **"Static Site"**.
   - Click **"Deploy"**.
   - Your site will be live within seconds at `https://luxestrand-haircare.vercel.app`!

---

### Option 2: Vercel CLI (Command Line)

If you have the Vercel CLI installed:
```bash
npx vercel
```
Follow the prompts to connect your account and deploy instantly!

---

## ⚙️ Customizing Your Amazon Affiliate Tag

1. Open your live site in any browser.
2. Click **"Edit Affiliate Tag"** in the top bar.
3. Type your Amazon Associates Tracking ID (e.g. `yourname-20`).
4. Click **"Save & Apply Tag"**. All buy buttons will instantly use your tag for commission tracking!

---

## 📁 Project Directory Structure

```
luxestrand-haircare/
├── index.html               # Main HTML entrypoint & Modals
├── style.css                # Luxury Glassmorphic Design System
├── vercel.json              # Vercel static routing config
├── README.md                # Deployment guide & documentation
└── src/
    ├── data/
    │   └── products.js      # Curated luxury products dataset with Amazon ASINs
    └── js/
        ├── app.js           # Core product grid, filtering, and search engine
        ├── store.js         # Amazon affiliate link generator & wishlist store
        ├── quiz.js          # Interactive hair care routine diagnostic wizard
        ├── tagModal.js      # Affiliate tag editor & toast notifications
        └── productModal.js  # Product quick view modal renderer
```
