# Silver Scrap Calculator - Site Architecture & AI Instructions

**IMPORTANT FOR ANY AI ASSISTANT**: If the user asks you to modify, update, or troubleshoot the website, **READ THIS FILE FIRST** before making changes.

## 1. Directory Structure & Localization
- **Root Directory (`/`)**: Contains the 60 master English HTML calculator pages.
- **Language Folders**: The site is translated into 11 languages (`es`, `fr`, `de`, `pt`, `hi`, `ur`, `ar`, `tr`, `it`, `zh`, `ru`).
  - Each language folder contains an exact replica of the 60 calculators, translated natively.
  - The URL slugs for these 60 files are translated correctly for each language (e.g., `/de/silberschrott-rechner.html`).

## 2. Centralized Global Elements (Header, Footer, Navigation)
- **File:** `js/components.js`
- **How it Works:** Rather than writing headers and footers 720 times, ALL HTML files (both English and translated) have empty `<div id="site-header"></div>` and `<div id="site-footer"></div>` blocks.
- `js/components.js` injects the DOM dynamically on page load.
- **Making Global Changes:** If you need to add a new link to the menu, change the logo, or modify the footer, **ONLY EDIT `js/components.js`**. It will instantly apply across all 720+ pages.

## 3. How Translations Work Globally
- Inside `js/components.js`, the navigation labels and URLs are hardcoded in English inside `NAV_ITEMS`.
- For a translated page (ex: `/ru/калькулятор.html`) to display the navigation in Russian, a script block at the very bottom of the HTML file defines a global variable: `window.MenuTranslations`.
- `window.MenuTranslations` contains ALL localized labels ("Home" -> "Главная") and all localized URL slugs ("silver-scrap-calculator.html" -> "калькулятор-лома-серебра.html").
- The JS `t()` and `s()` functions in `components.js` look at `window.MenuTranslations` to replace the English text dynamically.
- **Troubleshooting Languages:** If a specific language page shows English menus or dead links, it means its `window.MenuTranslations` dictionary is either missing, malformed, or missing the exact English string key.

## 4. Code Logic & Styling
- **CSS Styles**: `css/style.css`. Edit this to change colors, layouts, margins, or responsive mobile views across the entire site. Do not write inline CSS in HTML unless it's a unique edge case.
- **Mathematical Logic**: `js/calculator.js` handles the core math converting weight, purity, and spot prices.
- **Live Prices**: `js/silver-price.js` handles fetching live silver spot numbers for the calculators.

## 5. Adding a Brand New Calculator (The Workflow)
To add a new calculator to the site, follow this automated workflow:
1. Create the new English file in the root directory (e.g., `new-calculator.html`).
2. Add the English label and `href` to `NAV_ITEMS` in `js/components.js`.
3. Inform the user that a mass translation workflow must be run (or write a focused Node.js script using the Google Translate / Lingva API to translate the new file, generate localized slugs, build its `window.MenuTranslations`, and place the translated files into all 11 language folders).

## 6. AI Prompt Shortcut for the User
If the user says:
*"Fix the padding on the silver chain page, apply it globally."*
You should know instantly: **Edit `css/style.css` because it handles padding for all calculators.**

If the user says:
*"The Spanish dropdown menu is showing English text for 'Silver Profit Calculator'."*
You should know instantly: **Edit the `/es/*.html` files to inject the proper Spanish translation into their `window.MenuTranslations` script block.**
