# Language Homepage Update Guide

## Status
✅ **Arabic (ar/index.html)** - COMPLETED with full premium redesign

## Remaining Languages (10)
- German (de)
- Spanish (es)
- French (fr)  
- Hindi (hi)
- Italian (it)
- Portuguese (pt)
- Russian (ru)
- Turkish (tr)
- Urdu (ur)
- Chinese (zh)

## Template Structure

The English `/index.html` contains the complete premium UI/UX design with:

### Key Sections (DO NOT MODIFY STRUCTURE):
1. **Hero V2** - Two-column layout with calculator
2. **Purity Ticker** - Live prices strip
3. **Quick Answer** - Featured snippet target
4. **Purity Cards** - 4-up 999/925/900/800 grid
5. **Split Block** - Quick lookups + Examples  
6. **How It Works** - 3-step visual
7. **Dealer Payout** - Comparison table
8. **EDU Cluster** - Tabbed educational content
9. **Calculators Grid** - More tools
10. **Sell CTA** - Call-to-action section
11. **Tools Hub** - Additional resources
12. **FAQ V2** - Accordion format
13. **Methodology** - 4-cell info strip

## For Each Language File

### 1. Copy Structure From English
Use the English `/index.html` as the base template - DO NOT MODIFY:
- All HTML classes and IDs
- All div structures
- All responsive media queries
- All JavaScript functions
- All inline styles in `<style>` tag

### 2. Replace Only These Text Sections:

**Head Section:**
- `<title>` - Translate
- `<meta name="description">` - Translate
- `<meta name="og:*">` - Keep English
- `<link rel="canonical">` - Update href to `/[LANG]/`
- `<link rel="alternate" hreflang="[LANG]">` - Update all hreflang links
- Schema JSON sections - Translate names only, keep structure

**Body Sections (In Order):**
1. Hero eyebrow: "Live Market Data"
2. Hero h1: "Scrap Silver Calculator"  
3. Hero h1 accent text: "Calculator"
4. Hero subheading
5. Hero pills (4 items)
6. Calculator buttons: SCRAP / COINS / BULLION
7. Form labels: Weight, Silver Purity
8. Unit labels: GRAMS, TROY OZ, DWT, KG
9. Result label: Estimated Melt Value
10. Dealer text
11. Button labels: COPY, PRINT, SHARE
12. Purity ticker label: "Today's Prices"
13. Quick Answer h2 and paragraphs
14. Trust bar items (5 items)
15. Section eyebrows and headings
16. Card titles and descriptions
17. Tab names in edu cluster
18. Tab content (3 panels)
19. FAQ questions and answers
20. Methodology cell titles and text
21. Sticky CTA button text

### 3. Update Canonical & Hreflang

Change these in `<head>`:
```html
<link rel="canonical" href="https://scrapsilvercalculater.com/[LANG]/">

<!-- For lang-specific file -->
<link rel="alternate" hreflang="[LANG]" href="https://scrapsilvercalculater.com/[LANG]/">
```

### 4. CSS No Changes Required
All `.purity-ticker`, `.qa-slim`, `.pc2`, `.hiw-row`, etc. remain identical.

### 5. JavaScript No Changes Required  
All function names, variable names, IDs stay the same:
- `setMode()`, `setU()`, `setP()`
- `calc()`, `loadExample()`
- `updateAllLive()`, `switchTab()`
- No translation needed in script

## Language Translation Mapping

### German (de)
- Title: "Schrottsilber-Rechner – Schmelzwert & Live-Preise"
- Hero: "Schrottsilber" + "Rechner"
- Subheading: "Augenblicklicher Schmelzwert für jeden Schrottsilberartikel..."

### Spanish (es)
- Title: "Calculadora de Plata Reciclada – Valor de Fusión & Precios en Vivo"
- Hero: "Calculadora de Plata" + "Reciclada"
- Subheading: "Valor de fusión instantáneo para cualquier artículo de plata..."

### French (fr)
- Title: "Calculatrice d'Argent Recyclé – Valeur de Fusion & Prix en Temps Réel"
- Hero: "Calculatrice d'Argent" + "Recyclé"
- Subheading: "Valeur de fusion instantanée pour tout article d'argent..."

### Hindi (hi)
- Title: "स्क्रैप सिल्वर कैलकुलेटर – तरल मूल्य और लाइव कीमतें"
- Hero: "स्क्रैप सिल्वर" + "कैलकुलेटर"
- Subheading: "किसी भी स्क्रैप सिल्वर आइटम के लिए तत्काल गलन मूल्य..."

### Italian (it)
- Title: "Calcolatrice Argento Rottame – Valore di Fusione & Prezzi Live"
- Hero: "Calcolatrice di Argento" + "Rottame"
- Subheading: "Valore di fusione istantaneo per qualsiasi articolo di argento..."

### Portuguese (pt)
- Title: "Calculadora de Prata Reciclada – Valor de Fusão & Preços em Tempo Real"
- Hero: "Calculadora de Prata" + "Reciclada"
- Subheading: "Valor de fusão instantâneo para qualquer item de prata..."

### Russian (ru)
- Title: "Калькулятор серебра – Стоимость плавки и живые цены"
- Hero: "Калькулятор Серебра" + "Лома"
- Subheading: "Мгновенная стоимость плавки для любого предмета из серебра..."

### Turkish (tr)
- Title: "Hurda Gümüş Hesaplayıcı – Erime Değeri ve Canlı Fiyatlar"
- Hero: "Hurda Gümüş" + "Hesaplayıcı"
- Subheading: "Herhangi bir hurda gümüş ürünü için anlık erime değeri..."

### Urdu (ur)
- Title: "سکریپ سلور کیلکولیٹر – پگھلنے کی قیمت اور لائیو قیمتیں"
- Hero: "سکریپ سلور" + "کیلکولیٹر"
- Subheading: "کسی بھی سکریپ سلور چیز کے لیے فوری پگھلنے کی قیمت..."

### Chinese (zh)
- Title: "废料白银计算器 – 熔化价值和实时价格"
- Hero: "废料白银" + "计算器"
- Subheading: "任何废料白银物品的即时熔化价值..."

## File Template Locations
- Base: `/index.html` (English - use as template)
- Reference: `/ar/index.html` (Arabic - COMPLETED example)

## Steps to Complete All 10

1. Copy English `/index.html` as base
2. For each language:
   - Change `lang="en"` to `lang="[xx]"`
   - Update canonical href
   - Translate text content only (preserve all HTML/CSS/JS)
   - Update all hreflang values
   - Save to `/[LANG]/index.html`
3. Test with `git diff [LANG]/index.html` to verify only text changed
4. Commit with message: "Feat: Update [Language] homepage with premium UI/UX redesign"

## Expected File Size
~1500 lines per language file (same as English + Arabic examples)

## Quality Check
- [ ] Canonical links correct
- [ ] Hreflang links present for all 11 languages
- [ ] Text translated (not English)
- [ ] No HTML structure changes
- [ ] CSS identical to English
- [ ] JavaScript function names unchanged
- [ ] Form IDs unchanged (id="mw", id="pg", etc.)

## Next Steps
Run after all files updated:
```bash
git add de/index.html es/index.html fr/index.html hi/index.html it/index.html pt/index.html ru/index.html tr/index.html ur/index.html zh/index.html
git commit -m "Feat: Update remaining 10 language homepages with premium UI/UX redesign"
git push origin main
```
