# MASTER AI PROMPT FOR FUTURE MULTI-LANGUAGE WEBSITES

*Copy and paste the exact text below whenever you start a brand new project with an AI. It will instantly give them the exact blueprint, site architecture, and automated translation strategies we perfected in this project.*

***

**[COPY BELOW THIS LINE]**

I am building a custom, multi-page website and I have zero technical knowledge, so you will act as my lead developer and marketing strategist. 

Your objective is to build this site utilizing Vanilla HTML, CSS, and Javascript. 
This site must be built with a highly centralized architecture and natively support multiple major languages. The main source language will usually be **English**, and it must be automatically translated into the following folders: Spanish (`/es/`), French (`/fr/`), German (`/de/`), Portuguese (`/pt/`), Hindi (`/hi/`), Urdu (`/ur/`), Arabic (`/ar/`), Turkish (`/tr/`), Italian (`/it/`), Chinese (`/zh/`), and Russian (`/ru/`).

Please strictly follow this specific architectural and strategic blueprint:

### 1. Centralized Architecture (CRITICAL)
- **CSS**: Use a single global `style.css` file for the entire site. Use premium, modern designs.
- **Header, Footer & Navigation**: You MUST use a centralized JavaScript injection method (e.g., `js/components.js`). 
- Do NOT hardcode the `<header>`, `<nav>`, or `<footer>` in every single HTML file. Instead, place placeholder blocks like `<div id="site-header"></div>` and have the Javascript dynamically render the navigation and footer across all pages on load. This allows me to request a single change to the menu and have it reflect globally across hundreds of files instantly.

### 2. Multi-Language Folder Structure
- The main/default language pages (e.g., English) will reside in the root directory `/`.
- Each translated language must have its own dedicated subfolder named by its language code.
- Inside these subfolders, the `.html` files must be exact styling replicas of the root files, but safely translated.
- **Asset Pathing**: Inside the subfolders, ensure that all `<link>` and `<script>` paths correctly use `../` to point back to the root `css/` and `js/` folders so styles and scripts do not break.

### 3. Localized URL Slugs & Dictionary Mapping
- When generating the translated pages, you MUST translate the filenames (URL slugs) into the native target language (e.g., instead of `/es/silver-calculator.html` it should be `/es/calculadora-de-plata.html`). Do not keep English filenames inside foreign language folders.
- Because the Header/Footer is centralized in JavaScript via `components.js`, the localized pages need a way to translate those global UI items without breaking the single-script architecture.
- **The Solution:** At the bottom of every translated HTML file (just above `</body>`), inject a Javascript Dictionary object like `<script> window.MenuTranslations = {...} </script>`.
- This dictionary must map all English UI labels to their target language equivalents (e.g., `"Home": "Inicio"`), AND map all English URL slugs to their localized URLs (e.g., `"calculator.html": "calculadora.html"`).
- Program the centralized `components.js` so that if `window.MenuTranslations` is detected on a page, the navigation dynamically renders the correct translated text labels and points internally to the correct translated URL slugs.

### 4. Automated Mass Translation (No Manual Work)
- Do NOT attempt to manually translate or type out dozens of pages by hand in our chat.
- Instead, write highly-optimized Node.js scripts using the `cheerio` parsing library and public translation APIs (like Google Translate via `translate.googleapis.com` or the Lingva Proxy API via `lingva.ml`).
- Your automated script should: 
  1. Extract all unique text nodes from the root HTML files.
  2. Send them to the translation API in small partitioned batches to avoid rate limits.
  3. Generate the localized file slugs.
  4. Build the `window.MenuTranslations` dictionaries for the UI.
  5. Automatically output the fully styled, natively translated HTML files into their respective language subfolders on my machine.

### 5. SEO & Monetization Priorities
- **On-Page & Technical SEO**: This is my absolute priority for Google AdSense and Ad Manager optimization. 
- **Heading Hierarchy**: Every page must have exactly ONE `<h1>` tag containing the primary keyword, followed by logically structured `<h2>` and `<h3>` tags that include secondary and related keywords.
- **Affiliate & Ad Spaces**: Create dedicated, seamless UI components for affiliate links (Amazon, eBay, etc.) and ad banners. They must blend into the premium design and not break the layout.
- **Legal Pages**: Automatically generate and link all necessary legal pages in the footer (Privacy Policy, Terms of Service, Disclaimer/Disclosure, Contact) to ensure AdSense compliance.
- **Guest Posting**: Create a "Write for Us" page to open up guest posting opportunities.

### 6. User Engagement, Extensions & Apps
- **Interactive Game/Quiz**: Include an interactive game or quiz relevant to the website's topic. This is to test user knowledge, make the site fun, and drastically increase my average session time.
- **AI Brainstorming**: Always proactively analyze my niche and suggest additional, creative features/tools that you know of which could improve the site’s potential. Do not wait for me to think of everything.
- **Browser Extensions**: Let me know if the tool we build is a good candidate to be transformed into browser extensions (Chrome, Firefox, Microsoft Edge) to help acquire quality backlinks ("Link Bait").
- **App Store Expansion**: Prepare the architecture to be potentially bundled into a fully functional App Store app natively, but **always ask for my permission** before we begin focusing on mobile app development.

### 7. Traffic Generation & Marketing Strategy
- **Custom Traffic Guide**: Once the site is built, you MUST generate a simple, easy-to-understand "How to Get Traffic" guide specifically tailored to this new website's exact niche. Do not give me generic advice; tell me exactly where my target audience hangs out and how to reach them.
- **Parasite SEO Evaluation**: You must evaluate if this specific niche is eligible and good for Parasite SEO (leveraging high-authority sites to rank content fast). 
  - If YES: Tell me exactly *which* platforms (e.g., Medium, LinkedIn Articles, Reddit, Quora, specific forums) are the absolute best for getting traffic to this specific tool/site.
  - If NO: Explain exactly *why* this niche won't work for Parasite SEO and what alternative strategy I should use instead.
- **Multiple Traffic Sources**: Provide me with a comprehensive list of multiple actionable traffic sources to make my job easy. This list should include everything from Guest Posting outreach strategies to Parasite SEO, Social Media angles, and niche-specific directory submissions

Remember: I want a professional, premium-looking design with zero maintenance friction. Every global change should only require editing ONE core file. If you understand these instructions, please outline your plan to begin the root English website development.
