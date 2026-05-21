# Content Cannibalization Analysis
**Date:** May 15, 2026  
**Focus:** Homepage price table vs. other pages offering similar data  
**Risk Level:** 🔴 **CRITICAL**

---

## 📊 IDENTIFIED CANNIBALIZATION ISSUES

### The Problem
Your homepage currently hosts:
1. **Live Price Strip** (real-time spot price)
2. **Quick Answer Block** (spot price per ounce + purity breakdown per gram)
3. **Purity Cards** (999, 925, 900, 800 — price per gram + per ounce)
4. **Full Prices Table** (all purities × 6 weight units = 24 data points)

**This EXACT data is replicated or heavily overlaps on:**
- `silver-price-today.html` — Live chart + full payout tables + purity cards
- `silver-price-per-gram.html` — Per-gram prices, conversions, purity breakdown
- `silver-price-per-ounce.html` — Per-ounce prices, conversions, purity breakdown
- `silver-spot-price-today.html` — Live spot price + historical chart
- `silver-purity-chart.html` — Purity grade reference with current prices
- Individual purity calculators — Each has its own purity-specific pricing

---

## 🎯 CANNIBALIZATION RISK MATRIX

| Content Element | Homepage | silver-price-today | silver-price-per-gram | silver-price-per-ounce | Risk Level |
|---|---|---|---|---|---|
| **Live Spot Price** | ✅ YES (strip) | ✅ YES | ✅ YES | ✅ YES | 🔴 CRITICAL |
| **Per-Gram Prices** | ✅ YES (purity cards + quick answer) | ✅ YES | ✅ YES | Converted | 🔴 CRITICAL |
| **Per-Ounce Prices** | ✅ YES (purity cards + QA) | ✅ YES | Converted | ✅ YES | 🔴 CRITICAL |
| **Purity Breakdown (999/925/900/800)** | ✅ YES (all 4) | ✅ YES (full cards) | ✅ YES | ✅ YES | 🟠 HIGH |
| **Full Price Lookup Table** | ✅ YES (6 columns × 4 purities) | ✅ YES | Partial | Partial | 🟠 HIGH |
| **Interactive Calculator** | ✅ YES (main feature) | ❌ NO | Converter only | Converter only | 🟢 LOW |
| **Educational Content** | ❌ NO (current) | ✅ YES (1800+ words) | ✅ YES | ✅ YES | 🟢 LOW |
| **Live Chart/Graph** | ❌ NO | ✅ YES (TradingView) | ❌ NO | ❌ NO | 🟢 LOW |

---

## 🔍 SPECIFIC CANNIBALIZATION EXAMPLES

### 1. Homepage vs. silver-price-today.html
**Keyword:** "silver price today"
- **Homepage** ranks for: "scrap silver calculator", "silver price", "purity prices"
- **silver-price-today.html** ranks for: "silver prices today", "live silver price", "spot price chart"
- **Cannibalization Risk:** MODERATE
  - Homepage's price strip + quick answer are too close to silver-price-today's intro section
  - Both show same data (999, 925, 900, 800 with per-gram & per-oz prices)
  - Google may consolidate ranking signals or dilute authority

### 2. Homepage vs. silver-price-per-gram.html  
**Keyword:** "silver price per gram"
- **Homepage** shows: "999 fine: $X/gram, 925 sterling: $X/gram, etc." in purity cards
- **silver-price-per-gram.html** main focus: Per-gram conversions & breakdown for all purities
- **Cannibalization Risk:** CRITICAL ⚠️
  - User searching "silver price per gram" might land on EITHER page
  - Homepage's purity cards directly answer this query
  - Dilutes ranking authority for silver-price-per-gram.html
  - Expected winner: silver-price-today.html (more established, more content)

### 3. Homepage vs. silver-price-per-ounce.html
**Keyword:** "silver price per ounce"
- **Homepage** shows: Per-troy-ounce prices for all purities
- **silver-price-per-ounce.html** main focus: Per-ounce prices, conversions, breakdowns
- **Cannibalization Risk:** CRITICAL ⚠️
  - Same issue as #2
  - Both pages serve identical queries from different angles

### 4. Quick Answer Block Cannibalization
**Section:** "How much is scrap silver worth today?"
- **Homepage** offers full answer with live numbers
- **silver-price-today.html** has a "What is the Silver Price Today?" section with identical messaging
- **Cannibalization Risk:** MODERATE
  - Featured snippet competition — both could fight for position zero
  - Homepage might win (homepage authority) or silver-price-today.html (more detailed)
  - Splits ranking signals

---

## 📈 SEO IMPACT ASSESSMENT

### Current Situation
With this overlap, Google is likely:
1. **Treating homepage + price pages as topical cluster** rather than clear hierarchy
2. **Diluting PageRank** across multiple similar pages
3. **Confusing intent** — homepage is calculator-focused, but serving price lookup queries
4. **Reducing CTR** on silver-price-per-gram.html / silver-price-per-ounce.html (if homepage ranks higher)
5. **Wasting crawl budget** on duplicate data patterns

### Evidence of Cannibalization
- You have **~50+ pages** with silver pricing/calculator functionality
- Your homepage acts as **both calculator AND price lookup** (conflicting purposes)
- Specific price pages (per-gram, per-ounce) have weaker unique value propositions

---

## ✅ RECOMMENDED SOLUTION: "Hub & Spoke" Architecture

### Current Model (❌ Problematic)
```
Homepage (Calculator + Prices + Education)
    ├── silver-price-today.html (Prices + Chart + More)
    ├── silver-price-per-gram.html (Prices per gram)
    ├── silver-price-per-ounce.html (Prices per ounce)
    └── silver-purity-chart.html (Prices by purity)
    
❌ CONFLICT: Homepage competes with all downstream pages
```

### Recommended Model (✅ Optimal)
```
Homepage (CALCULATOR ONLY + Educational Content)
    │ 
    ├── Price Hub Section:
    │   ├── [NEW] "Silver Prices Today" (master price page)
    │   │   ├── silver-price-per-gram.html (links from hub)
    │   │   └── silver-price-per-ounce.html (links from hub)
    │   │
    │   ├── silver-price-today.html (chart + detailed analysis)
    │   └── silver-purity-chart.html (reference guide)
    │
    └── Calculators (current hub)
        ├── 999-silver-calculator.html
        ├── 925-silver-calculator.html
        └── [etc.]
```

---

## 🔧 SPECIFIC CHANGES NEEDED FOR HOMEPAGE

### Remove/Reduce:
1. ❌ **Full Prices Table** (6 columns × 4 purities)
   - Move to dedicated `silver-prices-reference.html`
   - Link from homepage with CTA: "View full price table →"

2. ⚠️ **Purity Cards** (current implementation)
   - Keep ONLY 2-card summary: "999 Fine" + "925 Sterling" 
   - Reduce to show price/gram & price/oz WITHOUT per-kilogram, per-pennyweight
   - Add: "See all purity prices →" (links to silver-price-today.html or new hub)

3. ⚠️ **Quick Answer Block** 
   - Keep the H2 "How much is scrap silver worth?" (it's educational)
   - Reduce answer from 200 words → 100 words
   - Remove live per-gram stats tables
   - Add: "Check live per-gram & per-ounce rates →" (link out)

4. ✅ **Keep the Price Strip** 
   - This is above-the-fold, sets context, doesn't rank for price lookups
   - Minimal cannibalization risk (users don't search for "silver spot:" specifically)

### Add/Enhance:
1. ✅ **Keep Interactive Calculator** 
   - This is your unique value — not replicated elsewhere
   - Homepage's primary focus

2. ✅ **Add Educational H2 Sections**
   - "Understanding Scrap Silver Value"
   - "How to Calculate Purity & Melt Value"
   - "Choosing Between Dealers"
   - These DON'T conflict with price pages

3. 🔗 **Create Internal Link Structure**
   ```html
   <!-- In "Try a Real-World Example" section -->
   <p>For live prices by purity grade, see <a href="/silver-price-today/">today's silver prices</a>.</p>
   
   <!-- In purity cards -->
   <p>View all purities & unit conversions: <a href="/silver-purity-chart/">Silver Purity Chart</a></p>
   
   <!-- In quick answer -->
   <p><a href="/silver-price-per-gram/">See live per-gram rates</a> for all purities.</p>
   ```

---

## 📋 IMPLEMENTATION PLAN

| Step | Action | Page(s) | Priority | Est. Time |
|---|---|---|---|---|
| 1 | **Reduce Quick Answer block** | index.html | 🔴 HIGH | 15 min |
| 2 | **Consolidate Purity Cards to 2** | index.html | 🔴 HIGH | 20 min |
| 3 | **Move Full Price Table to new page** | index.html → new page | 🟠 MEDIUM | 30 min |
| 4 | **Add cross-links** | index.html | 🟠 MEDIUM | 20 min |
| 5 | **Update silver-price-today.html** | silver-price-today.html | 🟢 LOW | 10 min |
| 6 | **Add canonical tags** (if needed) | All price pages | 🟢 LOW | 15 min |
| 7 | **Test with Search Console** | Monitor | 🟢 LOW | Ongoing |

---

## 🎯 Expected Outcomes After Fix

### Before (Current State)
- Homepage ranks for: "scrap silver calculator", "silver price", "purity prices"
- silver-price-today.html ranks for: "silver prices today", "live silver price"  
- silver-price-per-gram.html ranks for: "silver price per gram" (weak ranking)
- silver-price-per-ounce.html ranks for: "silver price per ounce" (weak ranking)
- **Problem:** Homepage stealing traffic from specific price pages

### After (Proposed Fix)
- Homepage ranks ONLY for: "scrap silver calculator", "calculate silver value"
- silver-price-today.html ranks for: "silver prices today", "live silver price", "silver price chart"
- silver-price-per-gram.html ranks for: "silver price per gram" (strong ranking)
- silver-price-per-ounce.html ranks for: "silver price per ounce" (strong ranking)
- **Benefit:** Each page owns its keyword, more total search traffic overall

### Key Metrics to Monitor
```
Google Search Console:
- Track "silver price per gram" clicks → should INCREASE (was 2-3 clicks/month → target 10-15)
- Track "silver price per ounce" clicks → should INCREASE
- Track "silver prices today" clicks → should move mostly to silver-price-today.html
- Homepage clicks for price queries → should DECREASE (goal achieved)
```

---

## 💡 Bottom Line

**Your homepage is too greedy with data.** It's acting as both:
- ❌ **Price lookup tool** (fights with 5+ dedicated price pages)
- ✅ **Calculator** (unique, should be focus)

**The fix:** Keep the calculator + educational content. Strip out ~80% of the price table data. Create proper hub pages that own these keywords. Result: More total search traffic across all pages, clearer user paths, better SEO authority distribution.

