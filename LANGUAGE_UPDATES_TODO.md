# Language Homepage Updates - To Do List

## Status Summary
- ✅ **1/11 COMPLETE** - Arabic (ar/index.html) 
- ⏳ **10 PENDING** - de, es, fr, hi, it, pt, ru, tr, ur, zh

## Completed
- [x] **ar** - Arabic homepage with RTL support
  - Commit: b61985a8 (Premium UI/UX redesign)
  - Canonical: https://scrapsilvercalculater.com/ar/
  - Structure: Hero V2 + all premium sections
  - Status: READY FOR PRODUCTION

## To Complete (Alphabetical)

### 1. de (German)
- [ ] Copy from `/index.html` (English template)
- [ ] Translate all text sections to German
- [ ] Update canonical href to `/de/`
- [ ] Update hreflang links
- [ ] Change html `lang="en"` to `lang="de"`
- [ ] Test form functionality
- [ ] Commit with: "Feat: Update German homepage with premium UI/UX redesign"

### 2. es (Spanish)
- [ ] Copy from `/index.html` (English template)
- [ ] Translate all text sections to Spanish
- [ ] Update canonical href to `/es/`
- [ ] Update hreflang links
- [ ] Change html `lang="en"` to `lang="es"`
- [ ] Test form functionality
- [ ] Commit with: "Feat: Update Spanish homepage with premium UI/UX redesign"

### 3. fr (French)
- [ ] Copy from `/index.html` (English template)
- [ ] Translate all text sections to French
- [ ] Update canonical href to `/fr/`
- [ ] Update hreflang links
- [ ] Change html `lang="en"` to `lang="fr"`
- [ ] Test form functionality
- [ ] Commit with: "Feat: Update French homepage with premium UI/UX redesign"

### 4. hi (Hindi)
- [ ] Copy from `/index.html` (English template)
- [ ] Translate all text sections to Hindi
- [ ] Update canonical href to `/hi/`
- [ ] Update hreflang links
- [ ] Change html `lang="en"` to `lang="hi"`
- [ ] Test form functionality
- [ ] Commit with: "Feat: Update Hindi homepage with premium UI/UX redesign"

### 5. it (Italian)
- [ ] Copy from `/index.html` (English template)
- [ ] Translate all text sections to Italian
- [ ] Update canonical href to `/it/`
- [ ] Update hreflang links
- [ ] Change html `lang="en"` to `lang="it"`
- [ ] Test form functionality
- [ ] Commit with: "Feat: Update Italian homepage with premium UI/UX redesign"

### 6. pt (Portuguese)
- [ ] Copy from `/index.html` (English template)
- [ ] Translate all text sections to Portuguese
- [ ] Update canonical href to `/pt/`
- [ ] Update hreflang links
- [ ] Change html `lang="en"` to `lang="pt"`
- [ ] Test form functionality
- [ ] Commit with: "Feat: Update Portuguese homepage with premium UI/UX redesign"

### 7. ru (Russian)
- [ ] Copy from `/index.html` (English template)
- [ ] Translate all text sections to Russian
- [ ] Update canonical href to `/ru/`
- [ ] Update hreflang links
- [ ] Change html `lang="en"` to `lang="ru"`
- [ ] Test form functionality
- [ ] Commit with: "Feat: Update Russian homepage with premium UI/UX redesign"

### 8. tr (Turkish)
- [ ] Copy from `/index.html` (English template)
- [ ] Translate all text sections to Turkish
- [ ] Update canonical href to `/tr/`
- [ ] Update hreflang links
- [ ] Change html `lang="en"` to `lang="tr"`
- [ ] Test form functionality
- [ ] Commit with: "Feat: Update Turkish homepage with premium UI/UX redesign"

### 9. ur (Urdu)
- [ ] Copy from `/index.html` (English template)
- [ ] Translate all text sections to Urdu
- [ ] Update canonical href to `/ur/`
- [ ] Update hreflang links
- [ ] Change html `lang="en"` to `lang="ur"`
- [ ] **IMPORTANT**: Add `dir="rtl"` attribute to html tag (RTL language)
- [ ] Test form functionality
- [ ] Commit with: "Feat: Update Urdu homepage with premium UI/UX redesign"

### 10. zh (Chinese / Simplified)
- [ ] Copy from `/index.html` (English template)
- [ ] Translate all text sections to Chinese (Simplified)
- [ ] Update canonical href to `/zh/`
- [ ] Update hreflang links
- [ ] Change html `lang="en"` to `lang="zh-Hans"` (or `lang="zh"`)
- [ ] Test form functionality
- [ ] Commit with: "Feat: Update Chinese homepage with premium UI/UX redesign"

## File Size Reference
- English (`/index.html`): ~1561 lines
- Arabic (`/ar/index.html`): ~1563 lines (after update)
- Expected per language: 1550-1570 lines

## Text Sections to Translate (Priority Order)

1. **Page title** - In `<title>` tag
2. **Meta description** - In `<meta name="description">`
3. **Hero eyebrow** - "Live Market Data"
4. **Hero heading** - "Scrap Silver" + accent text "Calculator"
5. **Hero subheading**
6. **Hero pills** - 4 benefit statements
7. **Calculator tabs** - SCRAP / COINS / BULLION
8. **Form labels** - Weight, Silver Purity
9. **Unit names** - GRAMS, TROY OZ, DWT, KG
10. **Result label** - Estimated Melt Value
11. **Dealer statement** - "Dealer typically pays..."
12. **Action buttons** - COPY / PRINT / SHARE
13. **Purity ticker label** - "Today's Prices"
14. **Quick Answer heading + paragraphs** (2 paragraphs)
15. **Trust bar items** (5 items)
16. **Section eyebrows** (6 different ones)
17. **Section headings** (h2 elements)
18. **Card/section descriptions**
19. **Purity cards** - Grade labels, usage hints
20. **Quick lookup cards** (4 cards)
21. **Example cards** (4 cards)
22. **How it works steps** (3 items)
23. **Dealer payout table** (5 rows)
24. **EDU tabs** (3 tab names)
25. **EDU panel content** (3 long panels with lists)
26. **More calculators** (8 cards)
27. **Sell CTA section** (heading + 3 buttons)
28. **Tools hub** (6 cards)
29. **FAQ** (8 Q&A pairs)
30. **Methodology cells** (4 cells)
31. **Sticky mobile CTA** - Button text

## Important Notes

### DO NOT CHANGE
- ✗ Class names (e.g., `.hero-v2`, `.qa-slim`, `.pc2`)
- ✗ IDs (e.g., `id="calculator"`, `id="mw"`, `id="pg"`)
- ✗ HTML structure/tags
- ✗ CSS selectors or properties
- ✗ JavaScript function names or logic
- ✗ Event handlers (`onclick`, `oninput`)
- ✗ Form input types and attributes

### MUST CHANGE
- ✓ Text content between tags
- ✓ `lang` attribute in `<html>` tag
- ✓ Canonical href
- ✓ All `hreflang` attributes
- ✓ Page title and meta description
- ✓ Schema JSON text fields (name, description)
- ✓ `dir="rtl"` for Urdu and Arabic only

## Testing Checklist

After each language update:
- [ ] All text displays correctly in target language
- [ ] Calculator form inputs work (numbers still function)
- [ ] Buttons are clickable and functional
- [ ] Tabs can be clicked to switch panels
- [ ] FAQ accordion expands/collapses
- [ ] Mobile responsive still works (test at 375px width)
- [ ] No console errors in browser DevTools
- [ ] Canonical tag is correct
- [ ] All 11 hreflang links are present

## Batch Commit Command (After All Complete)
```bash
git add de/index.html es/index.html fr/index.html hi/index.html it/index.html pt/index.html ru/index.html tr/index.html ur/index.html zh/index.html
git commit -m "Feat: Update remaining 10 language homepages with premium UI/UX redesign

- Apply Hero V2 two-column layout to all language versions
- Add purity ticker with live price updates
- Create quick answer and trust signal sections
- Build purity price cards and split lookup blocks
- Implement how-to-calculate section
- Add dealer payout comparison table
- Create tabbed educational content cluster
- Add calculators and resources hubs
- Implement sell CTA and FAQ sections
- Update canonical URLs and hreflang links per language
- Preserve all JavaScript calculator functionality
- Maintain responsive mobile-first design

Languages updated: German, Spanish, French, Hindi, Italian, Portuguese, Russian, Turkish, Urdu, Chinese

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

## Progress Tracking
- Started: May 15, 2026
- Arabic completed: May 15, 2026
- Expected completion: May 22, 2026 (7 days for 10 languages)

## Resources
- English template: `/index.html`
- Arabic reference: `/ar/index.html` (completed example)
- Guide: `/LANGUAGE_UPDATE_GUIDE.md` (detailed instructions)
- Translations.js: `/js/translations.js` (menu text already translated)
