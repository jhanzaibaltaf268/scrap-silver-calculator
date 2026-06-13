# Scrap Silver Calculator — Browser Extension

Live silver spot price & instant melt value calculator for Chrome, Edge, Firefox, and Opera.

## Before You Submit — Generate the Icons First

1. Open `icons/generate-icons.html` in any browser
2. Click **"Download All Icons"**
3. Save all 4 PNG files into the `icons/` folder:
   - `icon16.png`
   - `icon32.png`
   - `icon48.png`
   - `icon128.png`

---

## How to Package the Extension (.zip)

Select these files/folders and zip them together:
```
manifest.json
popup.html
popup.css
popup.js
background.js
icons/
  icon16.png
  icon32.png
  icon48.png
  icon128.png
```

**Do NOT include** `icons/generate-icons.html`, `icons/icon.svg`, or this README in the zip.

---

## Store Submission Guide

### 1. Chrome Web Store
- URL: https://chrome.google.com/webstore/devconsole
- One-time fee: $5 USD developer registration
- Upload: .zip file (Manifest V3 — already configured)
- Screenshots needed: at least 1 (1280×800 or 640×400)
- Review time: 1–3 business days

### 2. Microsoft Edge Add-ons (Free)
- URL: https://partner.microsoft.com/dashboard/microsoftedge/overview
- Same .zip works — Edge supports Chrome Manifest V3
- Free to publish
- Review time: 3–7 business days
- Tip: Use the same screenshots from Chrome Web Store

### 3. Opera Add-ons (Free)
- URL: https://addons.opera.com/developer/
- Same Chrome .zip works directly
- Free to publish
- Review time: varies (can take 1–2 weeks)

### 4. Firefox Add-ons — AMO (Free)
- URL: https://addons.mozilla.org/developers/
- The `browser_specific_settings.gecko` key in manifest.json is already set
- Firefox supports Manifest V3 from version 109+
- Free to publish
- Review time: automated + manual (can take days to weeks)
- Tip: Test in Firefox first — open `about:debugging` → "This Firefox" → "Load Temporary Add-on"

### 5. Brave Browser
- Brave uses the Chrome Web Store directly
- No separate submission needed — publish on Chrome Web Store and Brave users can install it

### 6. Vivaldi / Kiwi / Other Chromium
- All Chromium-based browsers support Chrome Web Store extensions
- No separate submission needed

---

## Test Locally Before Submitting

**Chrome / Edge / Brave / Opera:**
1. Go to `chrome://extensions` (or `edge://extensions`)
2. Enable "Developer mode" (top right toggle)
3. Click "Load unpacked"
4. Select the `chrome-extension/` folder (the one with `manifest.json`)
5. The extension icon appears in the toolbar — click it to test

**Firefox:**
1. Go to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select `manifest.json`

---

## Required Store Listing Assets

| Asset | Size | Notes |
|-------|------|-------|
| Icon | 128×128 PNG | Already created via generator |
| Screenshot | 1280×800 PNG | Take a screenshot of the popup |
| Small promo tile | 440×280 PNG | Optional for Chrome Web Store |
| Large promo tile | 920×680 PNG | Optional, for featured placement |
| Description | Up to 132 chars | Short description for store listing |

### Suggested Store Description (Short — 132 chars):
```
Live silver spot price & instant melt value calculator. 925 sterling, 999 fine, 900 coin silver & more.
```

### Suggested Store Description (Full):
```
Scrap Silver Calculator gives you the live silver spot price and an instant melt value calculator — right in your browser toolbar.

FEATURES:
• Live silver spot price (USD, EUR, GBP, INR, PKR)
• Real-time gold price and gold/silver ratio
• Per-gram prices for 925 sterling and 999 fine silver
• Quick melt value calculator — enter weight, unit, and purity
• Supports grams, troy ounces, pennyweights, and kilograms
• All major silver purities: 999, 958, 925, 900, 835, 800
• Auto-refreshes every hour in the background
• Links to full calculator, live price chart, and silver news

Data sourced from scrapsilvercalculater.com — updated live.
```

---

## Privacy Policy (required by Chrome Web Store)

Use your site's existing privacy policy:
https://scrapsilvercalculater.com/privacy-policy/
