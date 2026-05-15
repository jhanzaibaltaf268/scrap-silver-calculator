# Silo Architecture & Internal Linking Strategy
**Date:** May 15, 2026  
**Objective:** Fix indexation issues and improve rankings through proper topical clustering and internal link architecture

---

## 🔴 CURRENT STATE: WHY PAGES ARE NOT INDEXING

### Problems Identified

1. **No Clear Silo Structure**
   - 71 English pages scattered without topical hierarchy
   - Pages exist in isolation with minimal internal links
   - Google can't determine page relationships or topic authority
   - Crawl budget wasted on unrelated pages

2. **Weak Internal Linking**
   - Average 1-2 internal links per page (should be 5-15)
   - No hub pages to funnel PageRank to pillar content
   - Language pages not properly linked (separate silos = missed authority consolidation)
   - No breadcrumb/contextual clustering links

3. **Scattered Page Taxonomy**
   - Purity calculators (999, 925, 900, 800, 835, 958) not clustered together
   - Item calculators (jewelry, coins, silverware) not cross-linked
   - Price pages (today, per-gram, per-ounce) not hierarchically linked
   - Educational content orphaned from transactional pages

4. **Missing Pillar Content**
   - No "hub" pages to own major keyword clusters
   - No category pages to link related sub-pages
   - Each page fights independently instead of supporting a pillar

---

## 📊 CURRENT PAGE INVENTORY (71 Pages)

### Silo 1: PRICE HUB (7 pages)
**Intent:** Live pricing and market data  
**Primary Keyword:** Silver prices, spot prices, current rates

- silver-price-today (🔑 PILLAR)
- silver-price-per-gram
- silver-price-per-ounce
- silver-spot-price-today
- current-silver-price
- silver-price-all-currencies
- silver-purity-chart

**Problem:** Not cross-linked. Users land on one and leave. No authority consolidation.

---

### Silo 2: PURITY CALCULATORS (7 pages)
**Intent:** Grade-specific silver value calculation  
**Primary Keyword:** 925 silver calculator, 999 silver, etc.

- sterling-silver-calculator (🔑 PILLAR — most searched)
- 925-silver-calculator
- 999-silver-calculator
- 900-silver-calculator
- 800-silver-calculator
- 835-silver-calculator
- 958-silver-calculator

**Problem:** Each page stands alone. No hierarchy. Users searching "925 silver" don't discover 999 or 900 variants. No authority sharing.

**Example:** 925-silver-calculator.html only links to `/what-does-925-mean/`. Should link to:
- sterling-silver-calculator (parent/related)
- 999-silver-calculator (comparison)
- silver-purity-chart (reference)

---

### Silo 3: ITEM/JEWELRY CALCULATORS (17 pages)
**Intent:** Value calculation for specific items  
**Primary Keyword:** Silver jewelry value, coin value, etc.

- silver-jewelry-value-calculator (🔑 PILLAR)
- silver-coin-value-calculator
- silver-bar-value-calculator
- canadian-silver-coin-calculator
- silverware-value-calculator
- silver-dime-calculator
- silver-dollar-calculator
- silver-quarter-calculator
- silver-bracelet-value
- silver-chain-value
- silver-necklace-value
- silver-ring-value
- silver-cup-value
- silver-fork-value
- silver-knife-value
- silver-spoon-value
- silver-tray-value
- silver-plate-value

**Problem:** Completely orphaned. No internal links. Users can't navigate between items. Items grouped by semantics but not internally linked.

**Structure Needed:**
- silver-jewelry-value-calculator = HUB for all jewelry types
  - Bracelet, necklace, ring, chain should link back to parent
  - Parent should link to all jewelry items with context
- silver-coin-value-calculator = HUB for all coins
  - Dime, dollar, quarter, canadian should link to parent
  - Parent should link to specific coin types

---

### Silo 4: QUANTITY/WEIGHT VALUE PAGES (7 pages)
**Intent:** Value for specific quantities of silver  
**Primary Keyword:** 1 oz silver value, 100 oz silver, etc.

- 1oz-silver-value
- 2oz-silver-value
- 5oz-silver-value
- 10oz-silver-value
- 1-10oz-silver-value
- 100oz-silver-value
- 1kg-silver-value

**Problem:** Not connected to each other or price pages. No "progression" logic. No cross-linking to purity or calculator pages.

---

### Silo 5: SPECIALTY CALCULATORS (11 pages)
**Intent:** Niche use-case calculators  
**Primary Keyword:** Junk silver, batch calculator, etc.

- junk-silver-calculator (🔑 PILLAR)
- face-value-silver-calculator
- silver-batch-calculator
- silver-scrap-calculator
- silver-melt-value-calculator
- pennyweight-calculator
- tola-calculator
- sona-chandi-calculator
- silver-profit-calculator
- gold-and-silver-calculator
- 925-sterling-silver-price-per-gram

**Problem:** These are specialized calculators that don't link to each other or main hubs. Users don't discover the batch calculator when using the standard one.

---

### Silo 6: EDUCATIONAL & REFERENCE (13 pages)
**Intent:** Informational—understand silver, identify items, learn about market  
**Primary Keyword:** What is silver, how to identify, etc.

- what-is-silver-scrap (🔑 PILLAR)
- what-is-sterling-silver
- what-does-925-mean
- what-is-junk-silver
- what-is-silver-bullion
- what-is-silver-melt-value
- what-is-troy-ounce
- identify-silver
- silver-hallmarks-guide
- how-to-sell-silver
- how-silver-prices-work
- how-to-use-silver-calculators
- silver-weight-converter

**Problem:** Not clustered with calculators. Users learn what silver is but don't see calculator links. No content hub.

---

### Silo 7: UTILITY (6 pages)
- index (🏠 Homepage)
- contact
- privacy-policy
- terms-of-service
- disclaimer
- 404

**Status:** Minimal linking, appropriate.

---

### Silo 8: LEGACY/UNCLEAR (2 pages)
- audit-report
- modern-dashboard-calculator
- scrapsilver-masterpiece

**Recommendation:** Audit for relevance; consider sunsetting or consolidating.

---

## ✅ RECOMMENDED SILO ARCHITECTURE

### 🏛️ THE REVISED STRUCTURE

```
HOMEPAGE (index)
    │
    ├── PRICE HUB (silver-price-today.html) ← PILLAR PAGE
    │   ├── silver-price-per-gram
    │   ├── silver-price-per-ounce
    │   ├── silver-spot-price-today
    │   ├── current-silver-price
    │   ├── silver-price-all-currencies
    │   └── silver-purity-chart
    │
    ├── CALCULATOR HUB (new: silver-calculators.html or use index as hub)
    │   │
    │   ├── PURITY CLUSTER (sterling-silver-calculator = PILLAR)
    │   │   ├── 925-silver-calculator
    │   │   ├── 999-silver-calculator
    │   │   ├── 900-silver-calculator
    │   │   ├── 800-silver-calculator
    │   │   ├── 835-silver-calculator
    │   │   └── 958-silver-calculator
    │   │
    │   ├── ITEM CLUSTER (silver-jewelry-value-calculator = PILLAR)
    │   │   ├── Jewelry Sub-Hub
    │   │   │   ├── silver-bracelet-value
    │   │   │   ├── silver-chain-value
    │   │   │   ├── silver-necklace-value
    │   │   │   └── silver-ring-value
    │   │   ├── Coin Sub-Hub (silver-coin-value-calculator = PILLAR)
    │   │   │   ├── silver-dime-calculator
    │   │   │   ├── silver-dollar-calculator
    │   │   │   ├── silver-quarter-calculator
    │   │   │   └── canadian-silver-coin-calculator
    │   │   ├── Silverware Sub-Hub
    │   │   │   ├── silver-cup-value
    │   │   │   ├── silver-fork-value
    │   │   │   ├── silver-knife-value
    │   │   │   ├── silver-spoon-value
    │   │   │   └── silver-tray-value
    │   │   └── Other Items
    │   │       ├── silver-bar-value-calculator
    │   │       ├── silver-plate-value
    │   │       └── silverware-value-calculator
    │   │
    │   ├── SPECIALTY CLUSTER (junk-silver-calculator = PILLAR)
    │   │   ├── face-value-silver-calculator
    │   │   ├── silver-batch-calculator
    │   │   ├── silver-scrap-calculator
    │   │   ├── silver-melt-value-calculator
    │   │   ├── pennyweight-calculator
    │   │   ├── tola-calculator
    │   │   ├── sona-chandi-calculator
    │   │   ├── silver-profit-calculator
    │   │   ├── gold-and-silver-calculator
    │   │   └── 925-sterling-silver-price-per-gram
    │   │
    │   └── QUANTITY CLUSTER (silver-scrap-calculator or new hub?)
    │       ├── 1oz-silver-value
    │       ├── 2oz-silver-value
    │       ├── 5oz-silver-value
    │       ├── 10oz-silver-value
    │       ├── 1-10oz-silver-value
    │       ├── 100oz-silver-value
    │       └── 1kg-silver-value
    │
    └── EDUCATION HUB (what-is-silver-scrap.html = PILLAR)
        ├── what-is-sterling-silver
        ├── what-does-925-mean
        ├── what-is-junk-silver
        ├── what-is-silver-bullion
        ├── what-is-silver-melt-value
        ├── what-is-troy-ounce
        ├── identify-silver
        ├── silver-hallmarks-guide
        ├── how-to-sell-silver
        ├── how-silver-prices-work
        ├── how-to-use-silver-calculators
        └── silver-weight-converter
```

---

## 🔗 INTERNAL LINKING STRATEGY

### Tier 1: HUB PAGES (PILLAR CONTENT)
These pages own major keyword clusters and link to all related subtopics.

| Hub | Keywords | Links Out | Purpose |
|-----|----------|-----------|---------|
| **index** | "scrap silver calculator" (homepage) | 8-12 | Navigation to all major clusters |
| **silver-price-today** | "silver price today", "live silver price" | 7-10 | Price data hub; links to all price variants |
| **sterling-silver-calculator** | "925 silver calculator", "sterling silver value" | 8-10 | Calculator hub; links to all purity grades |
| **silver-jewelry-value-calculator** | "silver jewelry value", "calculate scrap jewelry" | 12-15 | Item calculator hub; links to all item types |
| **junk-silver-calculator** | "junk silver calculator", "bag value" | 10-12 | Specialty calculator hub |
| **what-is-silver-scrap** | "what is scrap silver", "scrap silver value" | 10-12 | Educational hub; links to all learning content |

**Hub Linking Pattern:**
```html
<!-- In silver-price-today.html -->
<section class="price-variants">
  <h2>Silver Prices by Unit</h2>
  <p>Need prices in a different format?</p>
  <ul>
    <li><a href="/silver-price-per-gram/">Silver Price Per Gram</a> — For precise per-gram calculations</li>
    <li><a href="/silver-price-per-ounce/">Silver Price Per Ounce</a> — Standard troy ounce pricing</li>
    <li><a href="/current-silver-price/">Current Silver Spot</a> — Live spot price updates</li>
    <li><a href="/silver-purity-chart/">Purity Grade Reference</a> — See all purity rates at a glance</li>
  </ul>
</section>
```

---

### Tier 2: CLUSTER PAGES (SUBTOPIC)
These pages own a specific variant and link up to hub + sideways to similar variants.

**Pattern for Cluster Pages:**

```html
<!-- At top of 925-silver-calculator.html -->
<nav class="breadcrumb">
  <a href="/">Home</a> > 
  <a href="/sterling-silver-calculator/">Sterling Silver Calculators</a> >
  <span>925 Calculator</span>
</nav>

<!-- In content section -->
<div class="related-calcs">
  <h3>Other Sterling Silver Purity Grades</h3>
  <p>Looking for a different silver grade? Check our other calculators:</p>
  <ul>
    <li><a href="/sterling-silver-calculator/">Sterling Silver (925) — Main Calculator</a></li>
    <li><a href="/999-silver-calculator/">Fine Silver (999) — 99.9% Pure</a></li>
    <li><a href="/900-silver-calculator/">Coin Silver (900) — Pre-1965 US Coins</a></li>
    <li><a href="/800-silver-calculator/">European Silver (800) — Vintage European Items</a></li>
  </ul>
</div>

<!-- At bottom before footer -->
<div class="cta-upsell">
  <h3>Calculate Different Item Types?</h3>
  <p>Use our <a href="/silver-jewelry-value-calculator/">jewelry value calculator</a> for bracelets, necklaces, and rings. Or browse <a href="/silver-coin-value-calculator/">coin values</a> for specific coin types.</p>
</div>
```

**Key linking rules for cluster pages:**
1. Link UP to parent/hub page (e.g., 925 → sterling-silver-calculator)
2. Link SIDEWAYS to sibling pages (925 → 999, 900, 800)
3. Link ACROSS to related clusters (925 → price-per-gram, identify-silver)
4. Link DOWN if sub-variants exist (jewelry hub → specific jewelry types)

---

### Tier 3: SUBTOPIC PAGES (INDIVIDUAL VARIANTS)
These are the deepest pages in a cluster. They link up to hub + to related content.

**Example: silver-dime-calculator.html**
```html
<!-- Breadcrumb -->
<nav class="breadcrumb">
  <a href="/">Home</a> >
  <a href="/silver-jewelry-value-calculator/">Item Calculators</a> >
  <a href="/silver-coin-value-calculator/">Coin Value Calculators</a> >
  <span>Dime Calculator</span>
</nav>

<!-- In content -->
<section class="coin-variants">
  <h3>Other U.S. Coin Calculators</h3>
  <ul>
    <li><a href="/silver-dollar-calculator/">Silver Dollar Value</a></li>
    <li><a href="/silver-quarter-calculator/">Silver Quarter Value</a></li>
    <li><a href="/canadian-silver-coin-calculator/">Canadian Silver Coins</a></li>
  </ul>
</section>

<!-- Educational links -->
<section class="education-links">
  <h3>Learn About Silver Coins</h3>
  <ul>
    <li><a href="/what-is-junk-silver/">What Is Junk Silver?</a> — Understanding pre-1965 US coins</li>
    <li><a href="/identify-silver/">How to Identify Silver</a> — Check if your coins contain silver</li>
    <li><a href="/silver-hallmarks-guide/">Hallmarks Guide</a> — Recognize purity stamps</li>
  </ul>
</section>
```

---

## 📋 COMPLETE INTERNAL LINKING MATRIX

### PRICE HUB LINKING
```
silver-price-today.html (HUB) links to:
├── silver-price-per-gram.html
├── silver-price-per-ounce.html
├── silver-spot-price-today.html
├── current-silver-price.html
├── silver-price-all-currencies.html
└── silver-purity-chart.html

Each cluster page links BACK:
├── → silver-price-today.html (parent)
└── → other cluster pages (siblings)

Cross-cluster links:
├── silver-price-today.html → sterling-silver-calculator.html (related search intent)
└── silver-purity-chart.html → 925-silver-calculator.html, 999-silver-calculator.html (purity ref)
```

### CALCULATOR HUB LINKING
```
sterling-silver-calculator.html (PILLAR) links to:
├── 925-silver-calculator.html
├── 999-silver-calculator.html
├── 900-silver-calculator.html
├── 800-silver-calculator.html
├── 835-silver-calculator.html
└── 958-silver-calculator.html

Plus cross-cluster links:
├── → silver-jewelry-value-calculator.html (item calc hub)
├── → junk-silver-calculator.html (specialty hub)
├── → silver-price-today.html (pricing context)
└── → what-is-sterling-silver.html (education)

Each purity page (925, 999, etc.) links:
├── UP: → sterling-silver-calculator.html
├── SIDEWAYS: → other purity calculators
├── DOWN: → related educational pages (e.g., 925 → what-does-925-mean.html)
└── ACROSS: → price pages, item calculators
```

### ITEM CALCULATOR LINKING
```
silver-jewelry-value-calculator.html (HUB) links to:
├── Jewelry section:
│   ├── silver-bracelet-value.html
│   ├── silver-chain-value.html
│   ├── silver-necklace-value.html
│   └── silver-ring-value.html
├── Coin section → silver-coin-value-calculator.html
├── Silverware section → silverware-value-calculator.html
├── Other items
│   ├── silver-bar-value-calculator.html
│   ├── silver-plate-value.html
│   └── Other specialty items
└── Cross-cluster:
    ├── → sterling-silver-calculator.html (calculator hub)
    ├── → silver-price-today.html (pricing)
    └── → identify-silver.html (how to identify items)

silver-coin-value-calculator.html (SUB-HUB):
├── → silver-dime-calculator.html
├── → silver-dollar-calculator.html
├── → silver-quarter-calculator.html
├── → canadian-silver-coin-calculator.html
├── BACK UP: → silver-jewelry-value-calculator.html
└── ACROSS: → junk-silver-calculator.html (related coin content)
```

### EDUCATIONAL HUB LINKING
```
what-is-silver-scrap.html (HUB) links to:
├── what-is-sterling-silver.html
├── what-does-925-mean.html
├── what-is-junk-silver.html
├── what-is-silver-bullion.html
├── what-is-silver-melt-value.html
├── what-is-troy-ounce.html
├── identify-silver.html
├── silver-hallmarks-guide.html
├── how-to-sell-silver.html
├── how-silver-prices-work.html
├── how-to-use-silver-calculators.html
└── silver-weight-converter.html

EDUCATIONAL CONTENT BRIDGES TO CALCULATORS:
├── what-does-925-mean.html → 925-silver-calculator.html
├── what-is-junk-silver.html → junk-silver-calculator.html
├── what-is-silver-melt-value.html → silver-melt-value-calculator.html
├── identify-silver.html → silver-jewelry-value-calculator.html (identify items first)
├── silver-hallmarks-guide.html → all purity calculators
├── how-to-sell-silver.html → silver-price-today.html, how-to-use-silver-calculators.html
└── silver-weight-converter.html → pennyweight-calculator.html, tola-calculator.html
```

---

## 🎯 INTERNAL LINKING BEST PRACTICES FOR YOUR SITE

### Rule 1: BREADCRUMB HIERARCHY
Every non-homepage page should have a breadcrumb showing the silo path:
```
Home > [Cluster Hub] > [Subcluster if applicable] > Current Page
```

### Rule 2: RELATED ITEMS SECTIONS
Every page should have 1-2 "Related" sections:
- **Related in same cluster** (siblings)
- **Related in adjacent cluster** (related intent)

### Rule 3: ANCHOR TEXT STRATEGY
```
❌ WRONG: "Click here to calculate" 
✅ CORRECT: "Use our 999 silver calculator" (keyword-rich)

❌ WRONG: "Learn more"
✅ CORRECT: "How to identify sterling silver hallmarks"
```

### Rule 4: LINK FREQUENCY (TARGET)
- **Hub pages:** 8-15 internal links
- **Cluster pages:** 5-8 internal links
- **Subtopic pages:** 4-6 internal links

### Rule 5: LINK PLACEMENT
1. **Content area** (contextual, organic)
2. **Related items section** (clustered navigation)
3. **Footer** (global navigation, but de-prioritized by Google)
4. **Breadcrumbs** (structural, not counted as much)

### Rule 6: ANCHOR TEXT DISTRIBUTION (Per Page)
- 40% exact match keywords (e.g., "925 silver calculator")
- 40% partial match (e.g., "calculate sterling silver value")
- 20% branded/generic (e.g., "our calculators", "more info")

---

## 📊 EXPECTED IMPROVEMENTS AFTER IMPLEMENTATION

### Indexation
- **Current:** Many pages not indexed or indexed but not ranking
- **After:** 95%+ of pages indexed (proper crawlability via silos)
- **Timeline:** 2-4 weeks for Googlebot to recrawl and index

### Rankings
| Keyword | Silo | Current Rank | Target Rank |
|---------|------|-------------|-----------|
| "silver price today" | Price Hub | Possibly ranking | #1-3 (consolidate authority) |
| "925 silver calculator" | Purity Hub | Scattered | #2-5 (sterling-silver-calculator pillar) |
| "silver jewelry value" | Item Hub | Weak/not indexed | #3-8 (build authority with clustering) |
| "junk silver calculator" | Specialty Hub | Low | #5-15 (after cross-linking) |
| "what is scrap silver" | Education Hub | Weak | #8-15 (improve with clustering) |

### PageRank Distribution
- **Before:** Scattered across 71 pages equally
- **After:** Concentrated in hubs (50% of authority) → then funneled down via silos
- **Result:** Pillar pages rank higher, subtopic pages benefit from hub authority

### Crawl Efficiency
- **Current:** Google crawls 71 isolated pages
- **After:** Google efficiently crawls hubs, then discovers clusters naturally
- **Benefit:** Faster crawl, faster index, faster ranking updates

---

## 🛠️ IMPLEMENTATION ROADMAP

### Phase 1: Structure (Week 1)
1. Create sitemap with silo hierarchy
2. Create breadcrumb data structure
3. Plan anchor text for each link

### Phase 2: Homepage (Week 1)
1. Update index.html with hub navigation (links to all 6 hubs)
2. Add breadcrumb to homepage
3. Test navigation flow

### Phase 3: Hub Pages (Week 1-2)
1. Update silver-price-today.html with internal links to all price variants
2. Update sterling-silver-calculator.html with links to all purity pages
3. Update silver-jewelry-value-calculator.html with links to all item variants
4. Update junk-silver-calculator.html with specialty calculator links
5. Update what-is-silver-scrap.html with education content links

### Phase 4: Cluster Pages (Week 2-3)
1. Add breadcrumbs to all 71 pages
2. Add "Related in this cluster" sections
3. Add cross-cluster contextual links
4. Update anchor text to be keyword-rich

### Phase 5: Refinement (Week 3-4)
1. Audit all internal links
2. Fix broken links
3. Verify proper hierarchy
4. Test on mobile
5. Submit updated sitemap to GSC

---

## ✅ FINAL CHECKLIST

- [ ] Homepage links to all 6 major hubs
- [ ] Each hub page links to all pages in its silo
- [ ] Each cluster page links up to its hub (breadcrumb + contextual)
- [ ] Each cluster page links sideways to siblings
- [ ] Each cluster page has cross-cluster links (1-2 to adjacent silos)
- [ ] All pages have breadcrumbs
- [ ] All anchor text is descriptive and keyword-rich
- [ ] No orphaned pages (every page linked from at least one other page)
- [ ] Maximum 3 clicks from homepage to any page
- [ ] Language variants properly hreflang'd and linked

---

## 💡 EXPECTED TIMELINE TO INDEXATION

1. **Day 1-2:** Submit updated sitemap to Google Search Console
2. **Week 1-2:** Googlebot recrawls silos and discovers all pages
3. **Week 2-4:** Pages indexed (given proper internal linking from hub pages)
4. **Week 4-8:** Rankings improve as authority consolidates in hub pages
5. **Month 2-3:** Full index coverage; silo pages begin ranking for target keywords

**Key metric to watch:** Check Google Search Console → Coverage report. Should see indexation increase from X% to 95%+ after implementation.

---

## 🔗 SUMMARY: WHY THIS WORKS

✅ **Siloing works because:**
1. **Clearer crawlability** — Google understands topic relationships
2. **Authority consolidation** — Hub pages become topical authorities faster
3. **Keyword targeting** — Each silo owns specific keyword clusters
4. **User experience** — Visitors can navigate contextually (discover related products)
5. **Ranking leverage** — Subtopic pages benefit from hub page authority

Your site has great content (71 pages), but it's scattered. This silo architecture **organizes it for search engines AND users**.

