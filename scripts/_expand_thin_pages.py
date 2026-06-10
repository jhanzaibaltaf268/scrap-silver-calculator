"""
Expands thin calculator/value pages from ~350-440 words to 500+ words
by appending content to the content-body div of each page.
"""
import os, sys
sys.stdout.reconfigure(encoding='utf-8')
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

PAGES = {
    # oz/weight pages
    '1oz-silver-value.html': """<h3>1 oz Silver Bars &amp; Coins: What to Know</h3>
<p>The 1 troy ounce silver bar is the single most liquid silver product on the secondary market. Dealers buy and sell them at near-spot prices, and their size makes them easy to store, ship, and trade. Popular minted products — such as the American Silver Eagle, Canadian Maple Leaf, and Austrian Philharmonic — all weigh exactly 1 troy ounce (31.1035 g) and carry a .999 or .9999 fine silver content.</p>
<p>When calculating scrap or melt value, the key variable is always the current spot price. Because a 1 oz silver coin is 100% silver (for .999 fine), its theoretical melt value equals spot. In practice, dealers pay 90–97% of spot for most generic rounds, while numismatic coins with collector premiums can sell above spot.</p>
<h3>Frequently Asked Questions</h3>
<ul>
  <li><strong>Is a 1 oz silver coin worth spot price?</strong> For .999 fine coins, melt value equals spot. Dealer buyback is typically spot minus a 3–10% spread.</li>
  <li><strong>How do I weigh a 1 oz silver coin?</strong> Use a digital scale accurate to 0.01 g. A genuine 1 oz coin should weigh 31.10 ± 0.05 g.</li>
  <li><strong>What is the difference between troy and avoirdupois ounce?</strong> A troy ounce (31.1035 g) is about 10% heavier than a standard US ounce (28.35 g). Always use troy weight for silver.</li>
</ul>""",

    '2oz-silver-value.html': """<h3>2 oz Silver Bars: A Practical Mid-Size Option</h3>
<p>Two-troy-ounce silver bars and rounds occupy a practical middle ground between single-ounce pieces and larger 5 oz or 10 oz bars. They are popular with stackers who want to acquire silver in slightly larger increments without committing to the higher cost of bigger bars. Many private mints produce 2 oz rounds in limited-edition designs, which can carry modest collector premiums above their melt value.</p>
<p>For scrap purposes, a 2 oz piece of .999 fine silver contains exactly 62.207 grams of pure silver. Its melt value is simply 2 × current spot price. When selling to dealers, expect a buyback in the 93–97% of spot range for generic bars, with branded products like Scottsdale or Sunshine Mint typically commanding tighter spreads.</p>
<h3>Tips for Valuing 2 oz Silver</h3>
<ul>
  <li><strong>Check for assay cards</strong>: Bars sealed in original assay packaging often fetch a slight premium over loose bars.</li>
  <li><strong>Verify weight</strong>: A genuine 2 oz bar should weigh 62.21 ± 0.05 g on a precision scale.</li>
  <li><strong>Hallmarks to look for</strong>: ".999 FINE SILVER", "2 oz", and a maker's stamp are standard markings on legitimate bars.</li>
</ul>""",

    '5oz-silver-value.html': """<h3>5 oz Silver Bars: Balancing Liquidity and Value</h3>
<p>Five-troy-ounce silver bars are a popular choice for intermediate stackers seeking better per-ounce pricing than smaller pieces without the reduced liquidity of 10 oz or kilo bars. The US Mint's America the Beautiful (ATB) coin series — each weighing 5 troy ounces — turned this size into a widely recognized format with both bullion and collector demand.</p>
<p>A .999 fine 5 oz bar holds 155.517 grams of pure silver. Its melt value is 5 × spot price. Most dealers pay 94–97% of spot for recognizable brand bars (PAMP, Engelhard, Johnson Matthey), while generic or obscure-mint bars may fetch slightly less. Keep original packaging whenever possible, as it protects condition and can preserve premium.</p>
<h3>Common Questions</h3>
<ul>
  <li><strong>Are 5 oz bars harder to sell than 1 oz?</strong> Slightly less liquid at coin shops but equally easy to sell to online dealers and refiners.</li>
  <li><strong>Do ATB coins carry numismatic value?</strong> Some designs have collector premiums, but for melt purposes the spot-based formula applies.</li>
  <li><strong>How should I store 5 oz bars?</strong> In individual plastic flips or a dry, airtight container. Keep away from rubber compounds, which can tarnish silver.</li>
</ul>""",

    '10oz-silver-value.html': """<h3>10 oz Silver Bars: The Stacker's Sweet Spot</h3>
<p>Ten-troy-ounce bars are widely considered the sweet spot for silver stackers: low enough in cost to buy regularly, yet large enough to benefit from meaningfully lower per-ounce premiums compared to smaller denominations. Major refiners — Engelhard, Johnson Matthey, Sunshine Mint, PAMP Suisse — all produce recognizable 10 oz bars that are accepted by most dealers worldwide.</p>
<p>A .999 fine 10 oz bar contains 311.035 grams of pure silver. Dealer spreads on 10 oz bars tend to be tighter than on 1 oz products: typically 1–3% over spot when buying, and 2–5% under spot at buyback. Total melt value is simply 10 × current spot price.</p>
<h3>What Buyers and Dealers Look For</h3>
<ul>
  <li><strong>Brand recognition</strong>: Engelhard and Johnson Matthey vintage bars often command premiums of 10–30% over generic bars.</li>
  <li><strong>Surface condition</strong>: Milk spots, deep scratches, or oxidation reduce dealer offers slightly.</li>
  <li><strong>Assay seals</strong>: Bars in original assay packaging (OGP) sell faster and sometimes at slightly higher prices.</li>
</ul>""",

    '100oz-silver-value.html': """<h3>100 oz Silver Bars: High-Volume Investment Grade</h3>
<p>One hundred troy ounce silver bars are the standard denomination for institutional and high-volume retail investors. They represent a cost-effective way to acquire large quantities of silver at some of the lowest per-ounce premiums available — typically $0.50–$1.50 over spot at time of purchase, compared to $2–$5 over spot for 1 oz coins. A single .999 fine 100 oz bar contains 3,110.35 grams of silver.</p>
<p>Popular brands include Engelhard, Johnson Matthey, NTR Metals, and Sunshine Mint. These bars are easily recognized by professional dealers and refiners, ensuring smooth transactions. For large sales, refiners will often accept 100 oz bars directly and pay near-spot prices.</p>
<h3>Storage and Logistics</h3>
<ul>
  <li><strong>Weight</strong>: A 100 oz bar weighs approximately 6.86 lbs (3.11 kg) — plan storage accordingly.</li>
  <li><strong>Vault storage</strong>: Many investors store 100 oz bars in third-party vaults (Brinks, Loomis) to reduce insurance and handling risk.</li>
  <li><strong>Shipping</strong>: Selling remotely? Insured precious-metals shipping is essential; most services require declared value coverage.</li>
</ul>""",

    '1kg-silver-value.html': """<h3>1 Kilogram Silver Bars: A Global Standard</h3>
<p>One-kilogram silver bars (1,000 grams / 32.1507 troy oz) are widely used across European, Asian, and Australian markets — particularly by the Perth Mint, PAMP Suisse, and Valcambi — and are traded through the London Bullion Market Association (LBMA) network. Their larger size makes them one of the most cost-efficient ways to hold physical silver, with premiums often as low as $1–$2 per troy ounce above spot.</p>
<p>A .999 fine 1 kg bar has a theoretical melt value of 32.1507 × current spot price. When selling, reputable refiners and large online dealers will pay 97–99% of spot for LBMA-accredited brand bars, making kilo bars one of the most liquid formats for large silver holdings.</p>
<h3>Key Facts for Kilo Bar Owners</h3>
<ul>
  <li><strong>Dimensions</strong>: A typical 1 kg silver bar measures roughly 110 mm × 55 mm × 20 mm, similar to a large smartphone.</li>
  <li><strong>Hallmarks</strong>: Look for "1000g", ".999", "FINE SILVER", and the refiner's logo.</li>
  <li><strong>Tax considerations</strong>: In many EU countries, 1 kg investment bars qualify for VAT exemptions that apply to investment-grade silver.</li>
</ul>""",

    # purity pages
    '800-silver-calculator.html': """<h3>Where 800 Silver Is Commonly Found</h3>
<p>800 silver (80% pure) was the dominant flatware and hollowware standard in Germany, the Netherlands, Scandinavia, and parts of Eastern Europe from the mid-1800s through the mid-20th century. A significant portion of antique European silverware imported into the United States carries the 800 hallmark. Items include serving dishes, coffee and tea sets, decorative bowls, and cutlery.</p>
<p>Because 800 silver contains 20% base metal alloys (usually copper), it is harder and more resistant to daily wear than sterling but slightly less valuable per gram. When selling, refiners calculate value based on the 80% silver content. The melt value formula is: weight (grams) × 0.80 × (spot price ÷ 31.1035).</p>
<h3>Identifying 800 Silver</h3>
<ul>
  <li><strong>Common hallmarks</strong>: "800", "800S", a German crescent moon and crown mark, or Scandinavian assay office stamps.</li>
  <li><strong>Country stamps</strong>: Austrian (A), Italian (800 with assay mark), Dutch (lion passant variant) all indicate 800 standard.</li>
  <li><strong>Silver-plated vs. solid</strong>: "EPNS", "Silver Plate", or "A1" stamps indicate plating — no significant melt value.</li>
</ul>""",

    '835-silver-calculator.html': """<h3>835 Silver: The Continental European Standard</h3>
<p>835 silver (83.5% pure) is a distinctly Continental European hallmark found primarily on German, Dutch, Belgian, and Scandinavian flatware and decorative objects produced between approximately 1880 and 1960. It is slightly purer than 800 silver and was the legal minimum standard in Germany for many decades. Items stamped "835" are solid silver — not plated — and carry meaningful melt value.</p>
<p>The melt value formula: weight (grams) × 0.835 × (spot ÷ 31.1035). Because 835 silver is less commonly recognized by general audiences, some estate sellers inadvertently price it below its actual silver content. Scrap dealers, however, pay on the basis of purity, so 835 silver receives fair value when sold by weight.</p>
<h3>Quick Reference</h3>
<ul>
  <li><strong>Common items</strong>: German flatware sets, Dutch serving pieces, Scandinavian decorative silver, cigarette cases, and pill boxes.</li>
  <li><strong>Key hallmarks</strong>: "835", German crescent and crown (post-1888), Dutch assay marks with lion variants.</li>
  <li><strong>Buyer tip</strong>: Bring a complete set when selling — matched flatware sets often fetch above-melt from antique dealers.</li>
</ul>""",

    '900-silver-calculator.html': """<h3>900 Silver (Coin Silver): History and Uses</h3>
<p>900 silver — often called "coin silver" — was the standard for US circulating coins from 1792 until 1964. Dimes, quarters, half dollars, and silver dollars minted during this era are 90% silver and 10% copper. In addition to US coinage, Mexico's historical peso coins, pre-1920 British silver coins, and some Central and South American coinage also used the 900 standard.</p>
<p>Coin silver items command strong demand from both refiners (for silver content) and collectors (for numismatic premiums). For common-date circulating coins, melt value is typically the floor price. The formula: weight (grams) × 0.90 × (spot ÷ 31.1035). A standard US 90% silver dime weighs 2.5 g; a quarter 6.25 g.</p>
<h3>What to Look For</h3>
<ul>
  <li><strong>US 90% silver coins</strong>: Dimes, quarters, halves dated 1964 and earlier; Morgan and Peace silver dollars.</li>
  <li><strong>Flatware</strong>: Some 19th-century American flatware stamped "COIN" or "C" indicates 900 silver.</li>
  <li><strong>Warning</strong>: Post-1965 US coins are clad (copper-nickel) with no silver content — check dates before calculating.</li>
</ul>""",

    '925-silver-calculator.html': """<h3>Why 925 Sterling Is the World Standard</h3>
<p>Sterling silver's 92.5% purity was first codified in England in the 13th century and remains the benchmark for quality silver jewelry and flatware worldwide. The 7.5% alloy (typically copper) improves hardness and durability while preserving a bright, lustrous finish. Today, nearly all silver jewelry sold in the US, UK, and most of Asia carries the 925 or "STERLING" hallmark.</p>
<p>From a value perspective, 925 items are priced by weight and purity. The melt formula: weight (grams) × 0.925 × (spot ÷ 31.1035). Dealers typically pay 85–95% of melt for sterling jewelry, with higher payouts for heavier, simpler pieces (chains, bangles) and lower for intricate or gemstone-set pieces where labor adds no scrap value.</p>
<h3>Frequently Asked Questions</h3>
<ul>
  <li><strong>Is all sterling silver stamped 925?</strong> In the US and UK, yes. Older pieces may be stamped "STERLING" instead of "925" — both indicate 92.5% silver.</li>
  <li><strong>Does tarnish affect value?</strong> No. Silver tarnish (silver sulfide) does not reduce melt value. Refiners remelt everything regardless of surface condition.</li>
  <li><strong>Can I sell broken jewelry?</strong> Yes — broken chains, bent rings, and mismatched earrings all have scrap value based on their silver weight.</li>
</ul>""",

    '958-silver-calculator.html': """<h3>Britannia Silver: Britain's Premium Standard</h3>
<p>Britannia silver (958 fineness, 95.8% pure) was introduced in England in 1697 as a mandatory standard to prevent silversmiths from melting down coinage. While the standard requirement was lifted in 1720, Britannia silver remained a voluntary mark of exceptional quality. Today, modern British silversmiths and the Royal Mint produce Britannia silver bullion coins — most notably the 1 oz Britannia coin — using this higher-purity alloy.</p>
<p>At 95.8% silver, Britannia items have slightly higher melt values per gram than 925 sterling. The formula: weight (grams) × 0.958 × (spot ÷ 31.1035). Britannia coins are recognized internationally and command tight dealer spreads, often just 1–3% below spot at buyback.</p>
<h3>Identifying Britannia Silver</h3>
<ul>
  <li><strong>Hallmarks</strong>: A seated figure of Britannia (the goddess), lion's head erased (facing left), date letter, and assay office mark.</li>
  <li><strong>Modern coins</strong>: The UK Britannia bullion coin (.999 or .9999 fine from 2013 onward) is distinct from antique Britannia silverware.</li>
  <li><strong>Rarity</strong>: Antique Britannia-standard pieces are rare and often collectible — consider consulting an appraiser before scrapping.</li>
</ul>""",

    '999-silver-calculator.html': """<h3>999 Fine Silver: The Purest Bullion Standard</h3>
<p>Fine silver (.999) is the purest commercially produced form of silver, containing at least 99.9% silver with trace amounts of other elements. It is the standard for investment bullion coins, bars, and rounds worldwide. Products like the 1 oz American Silver Eagle (.999 fine), Canadian Maple Leaf (.9999 fine), and PAMP Suisse bars all meet or exceed this standard.</p>
<p>Because .999 silver is nearly pure, its melt value equals spot price per troy ounce. There are no deductions for alloy content. This makes 999 fine silver the easiest format to value and the closest to a "pure commodity" play on silver prices. Refiners pay 98–99.5% of spot for high-quality brand bars and modern bullion coins.</p>
<h3>Fine Silver vs. Sterling: Key Differences</h3>
<ul>
  <li><strong>Softness</strong>: Fine silver is softer than sterling — less suitable for everyday jewelry but preferred for bullion and collector coins.</li>
  <li><strong>Tarnish resistance</strong>: .999 silver tarnishes more slowly than sterling because there is less copper to oxidize.</li>
  <li><strong>Premium over sterling</strong>: Per gram, .999 silver commands a ~8% premium over 925 sterling on melt value alone.</li>
</ul>""",

    # jewelry/item pages
    'silver-bracelet-value.html': """<h3>How Dealers Assess Silver Bracelets</h3>
<p>When selling silver bracelets for scrap, dealers focus on three things: weight, purity, and whether the piece is solid silver or silver-plated. Solid silver bracelets stamped 925, 800, or 999 are valued at melt. Silver-plated bracelets (stamped "EPNS", "Silver Plate", or with no silver hallmark) have negligible melt value because the silver layer is microscopically thin — typically just 10–25 microns.</p>
<p>For solid sterling bracelets, the scrap formula is: weight × 0.925 × (spot ÷ 31.1035). Dealers typically offer 80–90% of this figure. Chunky bangles and heavy link chains yield the best returns per transaction; thin fashion bracelets with large clasps or mixed materials pay less because non-silver components are deducted.</p>
<h3>Quick Tips Before You Sell</h3>
<ul>
  <li><strong>Remove charms and attachments</strong>: Non-silver charms reduce the effective purity payment. Detach them if possible.</li>
  <li><strong>Group similar items</strong>: Selling a batch of sterling jewelry together can sometimes secure a better rate than individual pieces.</li>
  <li><strong>Check for maker's marks</strong>: Some vintage or designer bracelets (Georg Jensen, Tiffany) are worth far more than melt — get an appraisal first.</li>
</ul>""",

    'silver-chain-value.html': """<h3>Selling Silver Chains: What Affects the Price</h3>
<p>Silver chains are one of the most commonly scrapped silver items. Their value depends almost entirely on weight and hallmark. A 925 sterling silver chain is worth: weight × 0.925 × (spot ÷ 31.1035). Dealers typically pay 85–95% of this melt value, with heavier chains (20 g+) commanding better percentages than lightweight 3–5 g fashion chains.</p>
<p>Chain style has almost no bearing on scrap value — a simple box chain and an elaborate figaro chain of the same weight and purity are worth the same to a refiner. One exception: chains set with gemstones or featuring non-silver components (gold-filled lobster clasps, copper beading) will have those portions deducted from the silver weight.</p>
<h3>Identifying Real vs. Plated Silver Chains</h3>
<ul>
  <li><strong>Hallmarks</strong>: Look for "925", "STERLING", "800", or "999" stamped on the clasp or a small tag near the clasp.</li>
  <li><strong>Magnet test</strong>: Silver is not magnetic. If a chain clings to a magnet, it is base metal (possibly plated).</li>
  <li><strong>Acid test</strong>: Jewelers use nitric acid solution to confirm silver content — a reliable test for unmarked pieces.</li>
</ul>""",

    'silver-cup-value.html': """<h3>Silver Cups: What's the Scrap Value?</h3>
<p>Silver cups range from small christening cups (30–60 g) to large trophy cups (200–500 g or more). Most antique and modern silver cups are made from sterling (925) or Britannia (958) silver. Cups with hallmarks from recognized assay offices — including Birmingham (anchor), London (leopard's head), and Sheffield (York rose) — are easier to value and sell.</p>
<p>The melt formula for a 925 cup: weight × 0.925 × (spot ÷ 31.1035). For cups with decorative elements like gilding, enamel inlay, or non-silver handles, those components are excluded from the silver weight. Dealers weigh only the silver-content portions.</p>
<h3>Trophy and Presentation Cups</h3>
<ul>
  <li><strong>Hallmarked trophy cups</strong> often sell for more than melt to collectors — engraved sporting trophies with notable history can be particularly valuable.</li>
  <li><strong>Sheffield plate cups</strong> (copper with thin silver laminate) are not solid silver and have minimal melt value.</li>
  <li><strong>Weighted bases</strong>: Some cups have filled or weighted bases (pitch, cement, lead). Dealers will weigh the cup with the base and deduct the non-silver weight.</li>
</ul>""",

    'silver-fork-value.html': """<h3>Silver Forks: Identifying and Valuing Your Flatware</h3>
<p>Silver forks are among the most common pieces of silver flatware found at estate sales, in antique shops, and in family collections. Their value depends on whether they are solid silver or silver-plated, which is determined by the hallmark. Solid sterling forks (925) or European forks (800 or 835) have meaningful melt value; silver-plated forks stamped "EPNS" or "A1" have almost none.</p>
<p>A typical sterling dinner fork weighs 40–65 grams. At current spot prices, that translates to approximately 37–60 grams of pure silver per fork. For a full set of 12 dinner forks, the total silver weight adds up quickly — often making flatware sets one of the most valuable silver items found in households.</p>
<h3>Flatware Buying Tips</h3>
<ul>
  <li><strong>Complete sets</strong>: A full matched flatware set (forks, knives, spoons) often sells for a premium to antique dealers over its melt value.</li>
  <li><strong>Weighted handles</strong>: Some forks have hollow, weighted, or stainless steel handles — only the silver tines and collar have melt value.</li>
  <li><strong>Pattern identification</strong>: Popular patterns (Francis I, Grand Baroque, Chantilly) by major makers (Reed & Barton, Gorham, Tiffany) can sell above melt to pattern-matching services.</li>
</ul>""",

    'silver-knife-value.html': """<h3>Silver Knives: What's Actually Silver?</h3>
<p>Silver knives require special attention when calculating scrap value because most have hollow or stainless steel handles and only the blade — or in many cases, just the ferrule and bolster — is silver or silver-plated. Even in high-quality sterling flatware sets, the knife blade is typically stainless steel (for durability and food safety), with only the handle being solid silver or silver-plated over a base metal.</p>
<p>Before selling silver knives for scrap, verify which parts are actually silver. A hallmarked silver handle (925, 800) contributes meaningfully to melt value; a stainless blade contributes zero. When in doubt, a refiner will weigh and acid-test each component separately.</p>
<h3>Understanding Knife Construction</h3>
<ul>
  <li><strong>Solid silver handles</strong>: Uncommon; found in high-end antique sets. These contribute full melt value.</li>
  <li><strong>Hollow silver handles</strong>: Common in Victorian flatware — the handle is silver sheet filled with pitch or resin. Weigh minus fill weight.</li>
  <li><strong>Silver-plated handles</strong>: The most common type. Marked "EPNS", "A1", "EP", or by plating thickness (e.g., "10/0"). Minimal silver value.</li>
</ul>""",

    'silver-necklace-value.html': """<h3>Valuing Silver Necklaces for Scrap</h3>
<p>Silver necklaces span a wide range of weights and purities, from a delicate 3-gram fashion chain to a heavy 60-gram statement piece. The most important factor is whether the necklace is solid silver (925, 800, or 999) or silver-plated (EPNS, Silver Plate). Solid silver necklaces are valued at melt: weight × purity × (spot ÷ 31.1035).</p>
<p>Gemstones, enamel, and non-silver pendants reduce the net silver weight. If your necklace has a pendant, detach it and weigh chain and pendant separately — a gemstone pendant may have its own value (diamonds, sapphires), while a silver pendant contributes to the silver weight.</p>
<h3>Designer and Brand Considerations</h3>
<ul>
  <li><strong>Tiffany &amp; Co.</strong>: Sterling silver Tiffany necklaces often sell for 2–4× melt value due to brand demand — do not scrap without checking resale prices.</li>
  <li><strong>Georg Jensen</strong>: Danish silver jewelry frequently exceeds melt value at auction by a significant margin.</li>
  <li><strong>Generic 925 chains</strong>: These are commodity items — melt value is the right benchmark for pricing.</li>
</ul>""",

    'silver-plate-value.html': """<h3>Silver Plates and Trays: Flatware vs. Decorative Pieces</h3>
<p>The term "silver plate" has two distinct meanings that significantly affect value. A <em>solid silver plate</em> (a flat serving plate made of sterling or coin silver) is valued at full melt based on its weight and purity. A <em>silver-plated item</em> is a base-metal object (copper, brass, or nickel silver) with a thin electroplated silver coating — these have minimal scrap value.</p>
<p>Solid serving plates stamped 925, STERLING, 800, or 900 COIN are solid silver. Their weight can be substantial — a large dinner plate may weigh 300–500 grams, representing significant silver content. Always check the underside for hallmarks before assuming an item is plated.</p>
<h3>How to Tell Solid from Plated</h3>
<ul>
  <li><strong>Hallmarks</strong>: Solid silver will show purity marks (925, 800, 999, STERLING, COIN). Plated items show "EPNS", "EP", "A1", "Silverplate", or no silver mark at all.</li>
  <li><strong>Worn spots</strong>: On plated pieces, wear patterns reveal the yellow/orange base metal beneath. Solid silver wears to more silver.</li>
  <li><strong>Weight</strong>: Solid silver plates feel noticeably heavier than plated equivalents of the same size.</li>
</ul>""",

    'silver-ring-value.html': """<h3>Silver Rings: Calculating Scrap Value</h3>
<p>Silver rings are typically small — most weigh between 2 and 15 grams — but because millions of rings are in circulation, they represent a significant portion of silver jewelry scrap. Most modern silver rings are stamped 925 (sterling). Vintage and antique rings may carry 800, 835, 900, or even 958 marks depending on their country of origin.</p>
<p>When calculating scrap value, remove any gemstones that have independent value (diamonds, rubies, sapphires) before weighing. The setting (the silver prongs, band, and bezel) is all silver. For rings with large cubic zirconia or paste stones cemented in place, the stone weight is negligible and you can weigh the entire ring without deduction.</p>
<h3>Selling Silver Rings</h3>
<ul>
  <li><strong>Lot selling</strong>: Small rings command better total payouts when sold in bulk lots rather than individually.</li>
  <li><strong>Designer rings</strong>: Rings from Tiffany, Pandora, or signed studio jewelers frequently sell above melt at resale — compare before scrapping.</li>
  <li><strong>Sizing marks</strong>: US ring size stamps (e.g., "7", "8.5") are separate from silver purity marks — look specifically for 925 or STERLING stamps.</li>
</ul>""",

    'silver-spoon-value.html': """<h3>How to Maximize Value When Selling Silver Spoons</h3>
<p>Before selling silver spoons as scrap, it is worth investigating whether they have collector or pattern value. Antique flatware pattern-matching services (Replacements, Ltd. and similar retailers) actively buy discontinued sterling patterns — and often pay well above melt for complete or near-complete sets. Common patterns like "Repousse" by Kirk Stieff, "Grande Baroque" by Wallace, or "Chantilly" by Gorham can sell for $20–$80 per teaspoon as replacement pieces.</p>
<p>For spoons with no collector market, melt value applies: weight × purity × (spot ÷ 31.1035). Most dealers pay 85–95% of calculated melt for clean, hallmarked sterling spoons.</p>
<h3>Spoon Identification Guide</h3>
<ul>
  <li><strong>Sterling vs. coin silver</strong>: Pre-1870 American spoons often use "COIN" (900 silver); later American and most modern spoons use "STERLING" or "925".</li>
  <li><strong>British hallmarks</strong>: Look for the lion passant (walking lion) — this confirms at least 925 fineness on English pieces.</li>
  <li><strong>Souvenir spoons</strong>: Many decorative souvenir spoons are sterling and have niche collector markets beyond their silver value.</li>
</ul>""",

    'silver-tray-value.html': """<h3>Silver Trays: Large Weight, Significant Value</h3>
<p>Silver serving trays are among the heaviest pieces of household silver, making them particularly valuable at scrap. A large sterling silver tea tray can weigh 500–1,500 grams — at spot prices, that represents substantial silver value. Most formal silver trays produced in Britain, America, and Europe from the 19th century onward are either sterling (925), Britannia (958), or, for Continental European pieces, 800 or 835 silver.</p>
<p>When selling a silver tray, the formula is: weight (g) × purity decimal × (spot ÷ 31.1035). Handles, feet, and rim decorations are typically integral to the silver body and not deducted. However, some trays have wooden or bakelite handles that should be excluded if they are detachable.</p>
<h3>Before You Scrap a Silver Tray</h3>
<ul>
  <li><strong>Check hallmarks</strong>: UK trays carry assay office marks, date letters, and maker's marks. A London-hallmarked Georgian tray can be worth multiples of melt.</li>
  <li><strong>Condition matters for antiques</strong>: An undamaged antique tray may fetch 200–400% of melt at auction. Damaged, repaired, or monogrammed trays are closer to scrap value.</li>
  <li><strong>Sheffield plate</strong>: Victorian-era "Old Sheffield Plate" (copper bonded with silver) is not solid silver. Look for the characteristic copper edge showing at worn spots.</li>
</ul>""",
}

# The insertion point: content-body's closing </div> before Related section
MARKER = '</div>\n      <div>'

updated = []
errors = []

for filename, extra_content in PAGES.items():
    if not os.path.exists(filename):
        errors.append(f'NOT FOUND: {filename}')
        continue

    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()

    cb_start = html.find('class="content-body"')
    if cb_start == -1:
        errors.append(f'No content-body: {filename}')
        continue

    # Find the closing </div> of content-body (first </div> after content-body start)
    end_idx = html.find('</div>', cb_start)
    if end_idx == -1:
        errors.append(f'No closing div: {filename}')
        continue

    # Verify next non-whitespace content is the Related section
    after = html[end_idx:end_idx+80]
    if 'Related' not in after:
        errors.append(f'Unexpected structure at end of content-body: {filename}: {repr(after[:60])}')
        continue

    # Insert extra_content before the closing </div>
    new_html = html[:end_idx] + '\n' + extra_content + '\n' + html[end_idx:]

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_html)

    # Count words
    import re
    body_match = re.search(r'<body[^>]*>(.*?)</body>', new_html, re.DOTALL)
    if body_match:
        text = re.sub(r'<[^>]+>', ' ', body_match.group(1))
        wc = len(text.split())
    else:
        wc = 0

    updated.append(f'{filename}: ~{wc} words')

print('UPDATED:')
for s in updated:
    print(' ', s)
if errors:
    print('\nERRORS:')
    for e in errors:
        print(' ', e)
