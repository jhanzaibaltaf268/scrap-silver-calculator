"""
Second pass: adds a 'How to Get the Best Price' / FAQ section to each thin page
to push static word count to 500+ words.
"""
import os, re, sys
sys.stdout.reconfigure(encoding='utf-8')
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

EXTRA = {
    '1oz-silver-value.html': """<h3>How to Sell a 1 oz Silver Coin or Bar</h3>
<p>The best venues for selling 1 oz silver depend on how quickly you need to sell and how close to spot price you want. Local coin shops offer immediate cash but typically pay 90–95% of spot. Online dealers like APMEX, JM Bullion, and Kitco often post buyback prices within 1–3% of spot and ship is straightforward for small quantities. Peer-to-peer platforms (eBay, Facebook Marketplace) can yield spot or better but require more effort and carry counterparty risk.</p>
<p>For maximum value, sell during periods of elevated silver prices, avoid rush selling when spot is near a local low, and present coins or bars in their original packaging with any certificates of authenticity.</p>""",

    '2oz-silver-value.html': """<h3>Getting the Best Price for 2 oz Silver</h3>
<p>Two-ounce silver items occupy a niche in the market — they are less common than 1 oz or 10 oz pieces, which can sometimes work in your favor (limited-edition designs) or against you (fewer buyers). For scrap purposes, any dealer will pay based on silver weight regardless of denomination size. For premium products, target buyers who collect that specific mint or series.</p>
<p>Online precious metals dealers generally offer the best buyback rates for 2 oz bars in assay packaging. Local coin shops are convenient for quick sales but may not always have immediate demand for less-standard sizes. Refiners accept 2 oz bars as bulk scrap with no size premium or penalty.</p>""",

    '5oz-silver-value.html': """<h3>Selling 5 oz Silver: Best Strategies</h3>
<p>Five-ounce silver can be sold through coin shops, online dealers, or directly to refiners. For branded bars (PAMP, Engelhard, Royal Canadian Mint), online buyers and auction platforms yield the best prices — sometimes 5–15% above generic bar pricing. For generic 5 oz rounds, local coin shops and bulk online buyers offer comparable rates around 94–97% of spot.</p>
<p>ATB (America the Beautiful) 5 oz coins have a dual market: collectors and bullion buyers. Check current collector premiums before selling — some low-mintage designs consistently trade above spot. As always, wait for strong spot prices and avoid selling during sharp corrections if possible.</p>""",

    '10oz-silver-value.html': """<h3>Maximizing Returns on 10 oz Silver Bars</h3>
<p>When selling 10 oz silver bars, presentation and provenance matter. A bar in original assay packaging with maker's mark intact typically commands a higher dealer offer than a bare bar with no documentation. Major bullion dealers post daily buyback prices; shop around between two or three buyers before committing.</p>
<p>For vintage Engelhard or Johnson Matthey bars, check current collector premiums on eBay completed listings. These bars regularly sell for $15–$50 above their silver melt value due to collector demand. Selling a vintage name-brand bar to a scrap dealer at melt means leaving money on the table.</p>""",

    '100oz-silver-value.html': """<h3>Selling 100 oz Silver Bars</h3>
<p>One hundred ounce silver bars are most efficiently sold through large bullion dealers or directly to refiners. Major buyers include APMEX, Kitco, SD Bullion, and regional refiners. For brand-name bars (Engelhard, Johnson Matthey, NTR Metals), dealer buyback offers are typically 98–99% of spot — among the best available for any silver product.</p>
<p>If selling a significant quantity (multiple 100 oz bars), request quotes from two or three buyers simultaneously. Shipping is an important cost factor at this weight — most dealers provide prepaid, insured shipping labels for purchases above a minimum value. Always confirm insurance coverage and tracking before shipping high-value silver.</p>""",

    '1kg-silver-value.html': """<h3>Selling a 1 kg Silver Bar</h3>
<p>Kilogram bars are efficiently sold through international and domestic bullion dealers. LBMA-accredited brand bars (PAMP, Valcambi, Perth Mint, Metalor) command the tightest spreads — typically 98–99% of spot at major dealers. Non-branded kilo bars may fetch 96–98% of spot. Refiners will accept any .999 kilo bar and pay near-spot less their refining margin.</p>
<p>Currency fluctuations are relevant for kilo bars since silver is quoted in USD but kilo bars are popular in markets using EUR, GBP, or AUD. Use our calculator to see current value in your preferred currency. For cross-border sales, verify import/export regulations, as some countries require documentation for large precious metal shipments.</p>""",

    '800-silver-calculator.html': """<h3>Selling 800 Silver: What to Expect</h3>
<p>Most scrap dealers and refiners readily accept 800 silver flatware and hollowware. Because it is 80% pure, the melt payout is lower per gram than sterling — a difference of about 13.5 cents per gram at typical silver prices. Dealers familiar with European silver will pay accurately on the 80% content. Less-experienced buyers may lump it with "coin silver" or sterling — always verify they are calculating on the correct 0.80 purity factor.</p>
<p>If you have a large collection of 800 silver — a full tea service, extensive flatware set — consider getting quotes from two or three buyers. Antique dealers may pay above melt for complete, well-preserved sets with maker's marks from recognized German or Dutch silversmiths.</p>""",

    '835-silver-calculator.html': """<h3>Finding the Right Buyer for 835 Silver</h3>
<p>Because 835 silver is less familiar to many buyers than sterling or coin silver, it is especially important to verify that the buyer you're working with understands the purity. Reputable scrap dealers and refiners will acid-test or X-ray fluorescence (XRF) test the piece to confirm content before offering a price. Always ask how purity is being verified if not stated.</p>
<p>Online precious metals buyers who handle European silver regularly are often the best option for larger lots of 835 silver. Local coin shops in areas with large German-American or Dutch-American communities tend to have familiarity with Continental European standards and may offer competitive rates. Always collect at least two quotes for significant quantities.</p>""",

    '900-silver-calculator.html': """<h3>Selling Coin Silver and 90% Silver Items</h3>
<p>US 90% silver coins are among the easiest precious metal items to sell. Their silver content is universally recognized, and nearly every coin shop, pawn shop, and online dealer buys them. Junk silver coins (pre-1965 US dimes, quarters, half dollars) typically sell by the face value of the coins — for example, $1 face value of 90% silver coins contains approximately 0.715 troy oz of silver.</p>
<p>For non-coin 900 silver items (antique American flatware stamped "COIN" or "C"), the same 90% purity applies. Complete antique coin-silver sets from notable makers (Gorham, Tiffany, Ball Black & Co.) should be evaluated for collector value before scrapping, as they often exceed melt at auction or through specialist dealers.</p>""",

    '925-silver-calculator.html': """<h3>Where to Sell Sterling Silver</h3>
<p>Sterling silver jewelry and flatware are among the easiest precious metals to sell in most cities. Coin shops, jewelry stores with buy counters, pawn shops, and estate buyers all purchase sterling regularly. Online platforms (Kitco, APMEX, Cash for Silver USA) offer competitive buyback programs with prepaid shipping for larger lots.</p>
<p>For small quantities (under 50 grams), local buyers are generally most convenient. For larger amounts — a full flatware service, multiple pounds of sterling — online buyers and refiners offer better per-gram rates and post transparent pricing based on daily spot. Always weigh your items on a calibrated postal or kitchen scale before any transaction so you can verify the dealer's weight reading.</p>""",

    '958-silver-calculator.html': """<h3>Selling Britannia Silver</h3>
<p>Antique Britannia silver pieces are scarce and often valuable beyond their melt. Before scrapping any piece with Britannia hallmarks (Britannia figure, lion's head erased, date letter), consult a specialist in British antique silver. The London Silver Vaults and major auction houses (Christie's, Sotheby's, Bonhams) regularly handle Britannia-standard antiques, and even modest pieces can exceed melt by a significant margin.</p>
<p>For modern Britannia silver bullion coins (.999 fine, post-2013), major dealers buy them at near-spot just like American Eagles or Maple Leafs. The premium on Britannia coins is supported by collector demand and their status as UK legal tender. Online dealers typically post live buyback prices within 1–2% of spot for uncirculated Britannia coins.</p>""",

    '999-silver-calculator.html': """<h3>Selling .999 Fine Silver</h3>
<p>Fine silver bullion is the most straightforward form of silver to sell. Major dealers (APMEX, Kitco, JM Bullion, SD Bullion) post daily buyback prices for common products — American Silver Eagles, Canadian Maple Leafs, and major brand bars — within 1–3% of spot. Submitting a price-lock order when spot is at a favorable level locks in a rate before shipping.</p>
<p>For large quantities (over 100 oz), refiners often offer better rates than retail dealers. COMEX-approved refiners process large lots efficiently and pay close to spot minus a small refining fee. For rare or collectible .999 silver items, eBay's completed listings will show real-time market premiums, which may substantially exceed spot for low-mintage pieces.</p>""",

    'silver-bracelet-value.html': """<h3>Frequently Asked Questions: Silver Bracelets</h3>
<p><strong>My bracelet has no stamp — could it still be silver?</strong> Possibly. Some older pieces predate mandatory hallmarking requirements, and stamps can wear off over time. A professional jeweler can perform an acid test or XRF test to confirm. If the piece tests positive for silver, its value is based on weight × purity.</p>
<p><strong>Does the clasp affect the value?</strong> If the clasp is spring-ring, lobster, or box style and made of the same silver alloy as the bracelet, it adds to the overall weight. A gold-filled or stainless clasp would be deducted. Most dealers will weigh the full bracelet and adjust for non-silver components.</p>
<p><strong>Are wide bangle bracelets worth more?</strong> Per gram, no — all silver is valued equally per gram of pure silver content. However, wide bangles are often heavier, so they deliver more total silver content and therefore more total value.</p>""",

    'silver-chain-value.html': """<h3>Frequently Asked Questions: Silver Chains</h3>
<p><strong>My chain turned my skin green — is it silver?</strong> Not necessarily. Real silver can sometimes cause green discoloration in people with specific sensitivities, but it is far more commonly caused by copper in the alloy or a copper base under silver plating. Have the piece acid-tested to confirm.</p>
<p><strong>Can I sell a tangled or broken chain?</strong> Yes. Refiners and scrap buyers purchase broken chains by weight — the condition or functionality does not affect scrap value. Straighten the chain enough to get an accurate weight on a scale.</p>
<p><strong>How are very thin chains assessed?</strong> Lightweight chains (under 2 grams) are still purchased by weight. Very light pieces are often grouped together and weighed as a batch by dealers.</p>""",

    'silver-cup-value.html': """<h3>Frequently Asked Questions: Silver Cups</h3>
<p><strong>My trophy cup has an inscription — does that reduce its value?</strong> For scrap purposes, inscriptions have no effect on value. The silver content is unchanged. For collector or antique purposes, a significant engraved inscription (a notable sporting event, a prestigious club) can actually increase value to collectors.</p>
<p><strong>How do I check if a cup is solid silver or silver-plated?</strong> Check the base and interior rim for hallmarks. Solid silver cups carry purity marks (925, 800, STERLING) and assay office marks. Plated cups often show "EPNS", "A1", "Silver Plate", or maker's names associated with electroplating (Walker & Hall, Elkington).</p>
<p><strong>What about a weighted base?</strong> If your cup has a sealed base that appears to contain a filler material, tell the buyer. They will discount for the estimated fill weight, or the piece may need to be drilled and drained before accurate weight can be taken.</p>""",

    'silver-fork-value.html': """<h3>Frequently Asked Questions: Silver Forks</h3>
<p><strong>How do I know if my forks are sterling or silver-plated?</strong> Turn the fork over and look at the back of the handle near the neck. Solid sterling forks are stamped "925", "STERLING", or carry British hallmarks. Plated forks show "EPNS", "A1", "EP", "Sheffield Plate", or simply no silver mark at all.</p>
<p><strong>Should I sell a matched flatware set together or individually?</strong> Together, as a set. Matched sterling flatware services have collector and replacement value that exceeds melt — antique dealers and flatware matching services (Replacements Ltd.) often pay 120–300% of melt for complete sets in original patterns.</p>
<p><strong>What if handles are hollow?</strong> Some high-end dinner forks have hollow handles filled with resin for balance and comfort. These weigh more than the silver content alone — a dealer will note hollow handles and deduct the fill weight from the silver calculation.</p>""",

    'silver-knife-value.html': """<h3>Frequently Asked Questions: Silver Knives</h3>
<p><strong>Why are silver knives worth less per piece than forks or spoons?</strong> Because the blade is almost always stainless steel, not silver. Only the handle contributes to silver scrap value. A typical sterling silver knife handle weighs 15–25 grams of actual silver, while a matching fork of comparable size weighs 40–60 grams total in silver.</p>
<p><strong>Can I scrap just the handles?</strong> Dealers will calculate value based on verified silver content regardless of whether handles are separated. Some buyers prefer handles intact; others prefer them loose so the handle fill can be assessed. Check with your specific buyer.</p>
<p><strong>What if the handle is hollow and filled?</strong> Many sterling knife handles are hollow and filled with pitch or cement for weight and balance. A buyer will estimate the fill weight and deduct it, or request that the handle be drained/weighed empty to calculate the true silver shell weight.</p>""",

    'silver-necklace-value.html': """<h3>Frequently Asked Questions: Silver Necklaces</h3>
<p><strong>My necklace has a pendant with a stone — how is it valued?</strong> The stone and its setting are evaluated separately. If the pendant is silver with a mounted stone, the silver portion contributes to melt value. The stone's value depends on what it is — diamonds and colored gemstones have independent value; glass, cubic zirconia, and synthetic stones are typically deducted.</p>
<p><strong>Can I sell a necklace and bracelet set together?</strong> Yes — many dealers are happy to assess a full jewelry lot in one transaction. Selling as a lot can sometimes secure a slightly better combined rate than piece-by-piece negotiation.</p>
<p><strong>Does tarnish significantly affect payout?</strong> No. Tarnish is surface oxidation and does not reduce the weight or purity of the silver beneath. Dealers and refiners melt all silver regardless of surface appearance.</p>""",

    'silver-plate-value.html': """<h3>Frequently Asked Questions: Silver Plates</h3>
<p><strong>I have a set marked "Silver Plate" — is it worth anything?</strong> As silver scrap, very little. A silver-plated dinner plate might contain 2–5 grams of actual silver, worth less than $0.50 at current prices. However, electroplated silverware from notable manufacturers (Gorham, Reed & Barton, Tiffany) can have collectible value to buyers of decorative antiques.</p>
<p><strong>How do I find the weight of just the silver in a plated piece?</strong> You can't practically extract it at home. Refiners who process silver-plated material typically quote a flat rate per pound of plated items — currently $0.30–$0.80 per pound depending on silver thickness grades.</p>
<p><strong>I have a heavy plate stamped "800" — is that different?</strong> Yes — significantly. A plate stamped "800" is solid 80% silver, not plated. This is a completely different category with substantial melt value. Use the weight and the 0.80 purity factor to calculate its value with this calculator.</p>""",

    'silver-ring-value.html': """<h3>Frequently Asked Questions: Silver Rings</h3>
<p><strong>My ring is stamped "925" but also has "10K" inside — which is it?</strong> These marks indicate different parts of the ring. "925" refers to the silver band; "10K" may refer to a gold accent or attached component. You would value the silver portions at 92.5% purity and any gold components separately.</p>
<p><strong>What are rings with large gemstones worth for scrap?</strong> The silver setting contributes to melt value. Genuine gemstones (diamonds, sapphires, rubies, emeralds) have independent appraisal value — often exceeding the silver by a large margin. Never scrap a ring with genuine stones without first having the stones appraised.</p>
<p><strong>I have dozens of small silver rings — is it worth selling them?</strong> Yes. Small rings sold as a batch (by total weight) are efficiently handled by scrap dealers. Even at 3–5 grams per ring, a lot of 20 rings represents 60–100 grams of sterling silver.</p>""",

    'silver-spoon-value.html': """<h3>Frequently Asked Questions: Silver Spoons</h3>
<p><strong>How can I tell a plated spoon from a solid silver one?</strong> The stamp is the key indicator. Solid silver spoons are marked "925", "STERLING", "COIN", "800", or carry British hallmarks (lion passant, etc.). Plated spoons show "EPNS", "A1", "IS" (International Silver), or simply a pattern name with no silver content marking.</p>
<p><strong>My grandmother's spoons have ornate backs with a pattern — does design affect value?</strong> For scrap purposes, design does not affect value. For resale to collectors or flatware matching services, highly decorative patterns from major makers can significantly exceed melt. Check the pattern and maker before deciding to scrap decorative antique spoons.</p>
<p><strong>What are souvenir spoons worth?</strong> Most souvenir spoons are sterling silver (925) and sell for their silver weight at scrap. However, spoons with notable subjects, early dates, or unusual makers have collector markets. A simple search of eBay completed listings will show you current collector demand for any specific spoon.</p>""",

    'silver-tray-value.html': """<h3>Frequently Asked Questions: Silver Trays</h3>
<p><strong>My tray has handles — are they included in the silver weight?</strong> If the handles are integral to the silver body (cast or stamped from the same sheet as the tray), yes. If handles are attached wooden grips, bakelite inserts, or separate non-silver components, they should be excluded. Dealers will assess and deduct as appropriate.</p>
<p><strong>Should I polish the tray before selling?</strong> No. Polishing removes a very thin layer of silver sulfide from the surface — the net effect on value is negligible to negative. Dealers do not pay more for polished silver. Leave the tray in its natural state and let the buyer assess the silver weight objectively.</p>
<p><strong>I have an antique tray with a family crest engraved — is it still worth full melt?</strong> Yes, for scrap. However, an engraved family crest or coat of arms can add collector interest to antique pieces. Present the tray to a specialist in antique silver before committing to a scrap sale — a Victorian silver tray with armorial engraving can sometimes command 3–5× its melt value at specialist auctions.</p>""",
}

MARKER_BEFORE = '</div>\n      <div>'  # closing tag of content-body

updated = []
errors = []

for filename, extra in EXTRA.items():
    if not os.path.exists(filename):
        errors.append(f'NOT FOUND: {filename}')
        continue

    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()

    # Find content-body end (first </div> after content-body)
    cb_start = html.find('class="content-body"')
    if cb_start == -1:
        errors.append(f'No content-body: {filename}')
        continue

    end_idx = html.find('</div>', cb_start)
    if end_idx == -1:
        errors.append(f'No closing div: {filename}')
        continue

    after = html[end_idx:end_idx+80]
    if 'Related' not in after:
        errors.append(f'Unexpected structure: {filename}: {repr(after[:60])}')
        continue

    new_html = html[:end_idx] + '\n' + extra + '\n' + html[end_idx:]

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_html)

    # Count words (static only, body, strip scripts/styles)
    body_m = re.search(r'<body[^>]*>(.*?)</body>', new_html, re.DOTALL)
    if body_m:
        body = re.sub(r'<script[^>]*>.*?</script>', ' ', body_m.group(1), flags=re.DOTALL)
        body = re.sub(r'<style[^>]*>.*?</style>', ' ', body, flags=re.DOTALL)
        text = re.sub(r'<[^>]+>', ' ', body)
        wc = len([w for w in text.split() if w.strip()])
    else:
        wc = 0

    updated.append(f'{filename}: {wc} static words')

print('UPDATED:')
for s in updated:
    print(' ', s)
if errors:
    print('ERRORS:')
    for e in errors:
        print(' ', e)
