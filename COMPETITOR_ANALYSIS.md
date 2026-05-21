# Competitive Analysis: "Scrap Silver Calculator" Keyword
**Date:** May 15, 2026  
**Analysis Focus:** Homepage structure, H1-H3 hierarchy, content length, messaging strategy

---

## 📊 COMPETITORS ANALYZED

### 1. **OmniCalculator** (omnicalculator.com/finance/scrap-silver)
- **Page Title:** Scrap Silver Calculator
- **H1:** Scrap Silver Calculator
- **Content Length:** ~2,100 words (educational + calculator)
- **Key Headings:**
  - H2: Silver's characteristics and usage
  - H2: How much is silver worth?
  - H2: Scrap silver value calculator – an example
  - H2: Interesting facts about silver
  - H2: Sources
- **Strategy:** Long-form educational content with detailed explanations, historical context, and worked examples. Heavy SEO optimization with 2000+ words of supporting copy around calculator.
- **Key Messaging:** "Estimates your silver value based on weight, purity, and market price. Eliminates tedious calculations."
- **Tone:** Educational, technical, trustworthy

### 2. **United PMR** (unitedpmr.com/calculators/sterling-silver-scrap-calculator/)
- **Page Title:** Sterling Silver Scrap Calculator - Scrap Silver Price - United PMR
- **H1:** Sterling Silver Scrap Calculator
- **Content Length:** ~400-500 words (compact)
- **Key Headings:**
  - H2: Spot Prices
  - H2: SERVICES
  - H2: GET IN TOUCH
  - H2: RESOURCES
  - H3: More Calculators
- **Strategy:** Business-focused with minimal educational content. Emphasizes services (refining pickups, account creation) and other calculator links. Quick tool utility + call-to-action heavy.
- **Key Messaging:** "We have updated our refining terms in order to continue serving our customers." (Services pitch)
- **Tone:** Professional, sales-focused, service-oriented

---

## 🏠 YOUR HOMEPAGE ANALYSIS (scrapsilvercalculator.com)

### Current Structure
- **Page Title:** Scrap Silver Calculator – Instant Silver Melt Value & Live Prices
- **H1:** Scrap Silver Calculator (with tagline)
- **Estimated Content Length:** ~500-800 words (moderate)
- **Current Heading Structure:**
  1. **H2:** Silver Price by Purity (with text repetition issue: "— Live Per Gram & Per Ounce — Live Per Gram..." ⚠️)
  2. **H2:** Today's Scrap Silver Prices — All Purities (text repetition issue: "— All Purities — All Purities" ⚠️)
  3. **H2:** Popular Silver Searches Answered
     - **H3:** What is 925 silver worth?
     - **H3:** Sterling silver melt value
     - **H3:** Coin silver value (pre-1965)
     - **H3:** Silver price per gram today
  4. **H2:** Try a Real-World Example
  5. **H2:** How to Calculate Scrap Silver (schema markup, not visible H2)

### Current Messaging Strategy
- Calculator-first (tool above the fold)
- Quick answer block ("How much is scrap silver worth today?")
- Trust bar (Live prices, Private, Instant, Mobile-friendly, Free)
- Live price strip prominently displayed
- Intent-based search cards (4 common questions)
- Example cards (pre-fill calculator with scenarios)

---

## 🎯 COMPARATIVE ANALYSIS: GAPS & OPPORTUNITIES

### ✅ What You're Doing Well
1. **Live Price Integration** — Real-time spot price updates (OmniCalculator has this, United PMR doesn't advertise it)
2. **Interactive Examples** — Pre-fill functionality is unique; competitors just have calculator + explanations
3. **Trust Signals** — Visible trust bar with benefits (Live, Private, Instant, etc.)
4. **Mobile-First Design** — Responsive layout is stronger than most competitors
5. **Quick Answer Format** — Addresses the core question immediately
6. **Multi-Calculator Links** — Cross-selling to other calculators (parity with United PMR)

### ❌ Critical Gaps vs. OmniCalculator (2,100 words)
1. **Content Depth** — Your homepage lacks supporting content. OmniCalculator has:
   - H2 section on "Silver's characteristics and usage" (600+ words of educational context)
   - H2 section "How much is silver worth?" (detailed explanation of melt value, spot price, factors)
   - Worked example section showing real calculations
   - Historical facts about silver

2. **Heading Structure Issues** — **URGENT FIX NEEDED:**
   - H2 "Silver Price by Purity" has text repetition: "— Live Per Gram & Per Ounce — Live Per Gram & Per Ounce — Live Per Gram & Per Ounce" (appears 3× in title)
   - H2 "Today's Scrap Silver Prices" has text repetition: "— All Purities — All Purities — All Purities"
   - These are **SEO/UX red flags** — looks like placeholder/broken copy

3. **Missing Core Educational Sections** — No H2 sections for:
   - "What is scrap silver & how to value it?" (foundational explanation)
   - "Purity grades & their values" (why 925 vs 999 vs 900 matters)
   - "Melt value vs. dealer payout" (key distinction for users)
   - "How to get the most money for scrap silver" (actionable guide)

4. **Weak H2 Hierarchy** — Your main content H2s are:
   - "Silver Price by Purity" (feature, not educational)
   - "Today's Scrap Silver Prices" (feature, not educational)
   - "Popular Silver Searches Answered" (Q&A format, but minimal depth per answer)
   
   **vs. OmniCalculator's approach:**
   - "How much is silver worth?" (user question)
   - "Silver's characteristics and usage" (context)
   - "Scrap silver value calculator - an example" (explained with worked example)

---

## 📋 RECOMMENDED CHANGES (Priority Order)

### 🔴 PRIORITY 1: FIX HEADING TEXT ISSUES (IMMEDIATE)
**Lines affected in index.html:**
- Line 354: H2 title has "— Live Per Gram & Per Ounce" repeated 3×
- Line 410: H2 title has "— All Purities" repeated 3×

**Action:** Clean up these titles:
- Change: "Silver Price by Purity — Live Per Gram & Per Ounce — Live Per Gram & Per Ounce — Live Per Gram & Per Ounce"
- To: "Silver Prices by Purity Grade — Live Per Gram & Per Ounce"

- Change: "Today's Scrap Silver Prices — All Purities — All Purities — All Purities"
- To: "Live Melt Value Table — All Silver Purities"

### 🟠 PRIORITY 2: ADD EDUCATIONAL CONTENT (HIGH)
Add 2-3 new H2 sections **before** the calculator to compete with OmniCalculator's 2,100 words:

**Option A: Insert after "Quick Answer" block**
```
<h2>What Is Scrap Silver & How Much Is It Worth?</h2>
[300-400 words explaining: what scrap silver is, why it has value, what melt value means, examples]

<h2>Understanding Silver Purity Grades</h2>
[300-400 words explaining: 999 vs 925 vs 900 vs 800, why purity matters, hallmarks, common uses]

<h2>Melt Value vs. What Dealers Actually Pay</h2>
[300-400 words explaining: gap between spot price & dealer payout, why dealers discount, realistic ranges by dealer type]
```

**Expected Outcome:** Increase homepage content from ~600 words → ~1,500-1,800 words (closer to OmniCalculator's 2,100)

### 🟡 PRIORITY 3: REORGANIZE H2 STRUCTURE
Restructure from:
1. Quick Answer (H2)
2. Purity Cards (H2)
3. Prices Table (H2)
4. Popular Searches (H2)

**To:**
1. "How Much Is Scrap Silver Worth Today?" (H2 — educational, answers user intent)
2. "Understanding Silver Purity Grades" (H2 — foundational knowledge)
3. "Live Silver Prices by Purity" (H2 — data display of purity cards)
4. "Melt Value Reference Table" (H2 — the big prices table)
5. "Quick Answers to Common Questions" (H2 — the intent cards)
6. "Real-World Examples" (H2 — example cards)

### 🟢 PRIORITY 4: ENHANCE MESSAGING
Currently your homepage emphasizes:
- **Tool benefits:** Instant, Live, Free, Private
- **Features:** Multiple calculators, live updates, per-gram rates

**To compete with OmniCalculator's approach, add:**
- **Problem solved:** "Eliminate tedious manual calculations" / "Know the exact value of your silver"
- **Educational value:** "Understand purity grades, melt value, and dealer payouts"
- **Trust through expertise:** Educational content + worked examples + transparent formulas

---

## 📊 COMPARISON TABLE

| Aspect | OmniCalculator | United PMR | **Your Site (Current)** | **Your Site (Target)** |
|--------|---|---|---|---|
| **Content Length** | 2,100 words | 400-500 words | ~600 words | 1,500-1,800 words |
| **Main H1** | Scrap Silver Calculator | Sterling Silver Scrap Calculator | Scrap Silver Calculator | ✅ Same |
| **Educational H2 Sections** | 5 substantive sections | 0 (service-focused) | 0 (feature-focused) | **3-4 new sections** |
| **Worked Examples** | Yes, detailed | No | Yes, example cards | ✅ Keep + enhance |
| **Live Price Display** | Basic | Yes | Yes, prominent | ✅ Keep |
| **Trust Signals** | Implicit (authority) | Explicit (services) | Explicit (trust bar) | ✅ Keep |
| **H3 Sub-headings** | Few | Few | 4 Q&A items | Keep Q&A + new sections |
| **Mobile Responsive** | Yes | Likely | Yes | ✅ Keep |
| **Heading Text Issues** | None | None | **2 critical issues** | **FIX IMMEDIATELY** |

---

## 🎬 NEXT STEPS

1. ✅ **Fix heading text repetition** (5 min) — Remove duplicate text in H2 titles
2. 📝 **Write 3 new educational sections** (1-2 hours) — Each 300-400 words on purity, melt value, dealer payouts
3. 🔄 **Reorganize H2 order** (30 min) — Move educational content before features
4. 🧪 **A/B test on Search Console** — Monitor CTR change with new structure
5. 📊 **Target word count: 1,500-1,800** to match OmniCalculator's engagement depth

---

## 💡 Key Insight
Your site has **better UX & features** than competitors (live updates, interactive examples, prominent trust signals).  
But you're **losing SEO battle** on content depth. Users searching "scrap silver calculator" on Google now see OmniCalculator's 2,100-word educational page as "more authoritative" even though YOUR tool is actually more useful.

**The fix:** Add the educational content your competitors have, while keeping your superior UX. Best of both worlds.

