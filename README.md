# Scrap Silver Calculator 🪙

![Scrap Silver Calculator](https://silvercalc.com/favicon.ico)

A highly accurate, multi-lingual, and completely free web application designed to help users calculate the exact melt value of their scrap silver, silver coins, sterling jewelry, and silver bullion based on live, real-time global spot prices.

## 🚀 Features

* **Real-time Live Pricing:** Automatically fetches the latest silver spot prices.
* **Over 60+ Dedicated Calculators:** Specialized tools for Junk Silver, 925 Sterling, 900 Coin Silver, Silverware, Bar Value, Tola measurements, Pennyweights (dwt), and more.
* **Global Localization:** Fully translated and natively localized into 11 languages (Spanish, French, German, Portuguese, Hindi, Urdu, Arabic, Turkish, Italian, Chinese, and Russian).
* **Instant Conversion:** Built-in tools for weight conversion (Grams, Troy Ounces, Kilograms, DWT, Tolas) and a "Sell or Hold" ROI analyzer.
* **Responsive Design:** Extremely fast, mobile-first, lightweight dark-mode interface.
* **Zero Dependencies / No Build Step:** Built entirely with raw Vanilla HTML, CSS, and JavaScript.

## 📂 Project Structure

* `/` (Root): English HTML files, core pages, and SEO guides.
* `/css/`: Core stylesheets and lightweight CSS grid system.
* `/js/`:
  * `silver-price.js`: Logic for fetching and managing live API silver prices.
  * `calculator.js`: Core math and logic for purity and melt value conversions.
  * `components.js`: Dynamic injection of the Navbar, Footer, and UI elements.
* `/[lang]/`: 11 isolated localization folders natively mapped to translated URLs for optimal International SEO.
* Scripts: Various Node.js utility scripts (`mass-translate.js`, `inject-dict.js`, etc.) used internally for batch-translating the site via Google Translate API.

## 🛠️ How to Run Locally

Since this project relies on vanilla web technologies without any complex build frameworks (like React or Next.js), running it locally is incredibly simple:

1. Clone or download the repository.
2. Ensure you have a simple local server running (to prevent CORS errors when fetching the price API). If you have Node.js installed, you can run:
   ```bash
   npx serve .
   ```
3. Open `http://localhost:3000` in your web browser.

## 🌍 Supported Languages
* `en` - English (Root)
* `es` - Spanish
* `fr` - French
* `de` - German
* `pt` - Portuguese
* `hi` - Hindi
* `ur` - Urdu
* `ar` - Arabic
* `tr` - Turkish
* `it` - Italian
* `zh` - Chinese
* `ru` - Russian

## ⚖️ License
Copyright &copy; 2024 Scrap Silver Calculator. All Rights Reserved. Prices provided are for informational purposes only.
