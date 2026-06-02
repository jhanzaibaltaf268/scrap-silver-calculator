#!/usr/bin/env node
/**
 * add-schema.js
 * Adds static JSON-LD schema (BreadcrumbList + WebApplication/Article + FAQPage)
 * to every English HTML file at root level that is missing it.
 * Run: node add-schema.js
 */

const fs   = require('fs');
const path = require('path');

const ROOT     = __dirname;
const BASE_URL = 'https://scrapsilvercalculater.com';

// ── FAQ database ──────────────────────────────────────────────────────────────
const FAQ_DB = [
  [/silver-ring/,         [{q:'How much is a silver ring worth?',a:'A typical sterling silver (925) ring weighs 3–12 grams. Use our calculator above for an instant live melt value at today\'s spot price.'},{q:'What hallmark means sterling silver on a ring?',a:'Look for 925, STERLING, or STER stamped inside the band. These all indicate 92.5% pure silver.'},{q:'What will a dealer pay for a silver ring?',a:'Dealers pay 65–95% of melt value. Online refineries offer the most. Calculate melt value above first.'}]],
  [/silver-chain/,        [{q:'How much is a silver chain worth?',a:'Chains weigh 5–60 grams depending on length and style. Enter the weight above for a live melt value.'},{q:'Is a 925 chain real silver?',a:'Yes — 925 means sterling silver (92.5% pure). Genuine silver, not plated.'},{q:'How do I weigh a silver chain?',a:'Use a digital scale accurate to 0.1g. Remove non-silver clasps if possible, then enter the weight above.'}]],
  [/silver-necklace/,     [{q:'How much is a silver necklace worth?',a:'Most silver necklaces are 925 sterling. Enter the weight above for an instant live melt value.'},{q:'Does 925 on a necklace mean real silver?',a:'Yes. 925 is the hallmark for sterling silver — 92.5% pure silver, not plated.'},{q:'What will a pawn shop pay for a silver necklace?',a:'Pawn shops pay 50–70% of melt value. Use the calculator above to find melt first.'}]],
  [/silver-bracelet/,     [{q:'How much is a silver bracelet worth?',a:'Silver bracelets weigh 8–50 grams. Enter weight and purity above for the exact live melt value.'},{q:'How do I know if my bracelet is real silver?',a:'Look for 925, 800, or STERLING on the clasp. Real silver is also non-magnetic.'},{q:'What do jewelers pay for silver bracelets?',a:'Jewelers typically offer 65–80% of melt value. Calculate melt above before accepting any offer.'}]],
  [/silver-spoon/,        [{q:'How much is a silver spoon worth?',a:'A teaspoon weighs 20–30g; a tablespoon 40–60g. Enter the exact weight above for a live melt value.'},{q:'How do I tell real silver from silver-plated spoons?',a:'Check the back of the handle. 925 or STERLING = solid silver. EPNS, EP, or A1 = plated (minimal value).'},{q:'Where should I sell silver spoons?',a:'Online refineries pay 90–98% of melt. Antique dealers may pay more for complete sets or branded pieces.'}]],
  [/silver-fork/,         [{q:'How much is a silver fork worth?',a:'Silver forks typically weigh 25–50 grams. Enter the weight above for a live melt value.'},{q:'Is my silver fork real silver?',a:'Check the back of the handle. 925 or STERLING = solid silver. EPNS, EP = plated (nearly worthless as scrap).'},{q:'Where can I sell silver forks?',a:'Online refineries offer the best rates (90–98% of melt). Coin dealers also buy silver flatware.'}]],
  [/silver-knife/,        [{q:'Are silver knives real silver?',a:'Most silver knives have solid sterling handles but stainless steel blades. Only calculate the handle weight for scrap value.'},{q:'How much is a silver knife worth?',a:'Sterling knife handles weigh 30–50 grams of silver. Enter handle weight above for a live melt value.'},{q:'Where is the hallmark on a silver knife?',a:'Check the bottom of the handle or the bolster. Look for 925, STERLING, 800, or STER.'}]],
  [/silver-tray/,         [{q:'How much is a silver tray worth?',a:'Silver trays weigh 200–2000 grams typically. Enter the exact weight above for a live melt value.'},{q:'How do I check if a serving tray is solid silver?',a:'Check the underside. 925 or STERLING = solid silver. EPNS or Sheffield Plate = plated (very low value).'},{q:'Should I sell a silver tray as scrap or antique?',a:'If it carries a maker\'s mark (Gorham, Tiffany), get an antique appraisal first — it may be worth more than melt.'}]],
  [/silver-cup/,          [{q:'How much is a silver cup worth?',a:'Silver cups weigh 50–300 grams. Enter weight and purity above for an exact live melt value.'},{q:'Are silver trophies real silver?',a:'Antique trophies often are. Look for 925 or STERLING hallmarks. Modern trophies are usually silver-plated.'},{q:'What will a dealer pay for a silver cup?',a:'Dealers pay 65–95% of melt value. Calculate melt above first, then compare quotes.'}]],
  [/silver-plate-value/,  [{q:'Is silver plate worth anything as scrap?',a:'Solid silver plates (925 or STERLING) are valuable. Silver-plated plates (EPNS, EP) have virtually no scrap value.'},{q:'How much does a solid silver dinner plate weigh?',a:'Solid sterling dinner plates typically weigh 200–400 grams — significant melt value at current prices.'},{q:'How do I tell solid silver from silver-plated?',a:'Check the underside. 925, STERLING, or 800 = solid silver. EP, EPNS, or Silver Plate = plated.'}]],
  [/silver-dime/,         [{q:'What years of dimes are silver?',a:'US dimes minted 1964 and earlier are 90% silver. Dimes from 1965 onward are copper-nickel with no silver.'},{q:'How much silver is in a silver dime?',a:'A pre-1965 US dime contains 2.25g of pure silver (0.07234 troy oz) in a 2.5g coin.'},{q:'What is a 1964 dime worth in silver?',a:'Melt value = 0.07234 × current spot price per oz. Use the calculator above for today\'s live value.'}]],
  [/silver-quarter/,      [{q:'What years of quarters are silver?',a:'US quarters minted 1964 and earlier are 90% silver. Quarters from 1965 onward contain no silver.'},{q:'How much silver is in a silver quarter?',a:'A pre-1965 Washington quarter contains 0.18084 troy oz of pure silver (5.625g) in a 6.25g coin.'},{q:'What is a silver quarter worth today?',a:'Melt value = 0.18084 × current spot price per oz. Use the calculator above for today\'s live value.'}]],
  [/silver-dollar/,       [{q:'How much silver is in a Morgan or Peace dollar?',a:'Both contain 0.7734 troy oz of pure silver (26.73g at 90% purity).'},{q:'Are all silver dollars worth the same in melt?',a:'All Morgan and Peace dollars have identical silver content (0.7734 oz), but rare dates command numismatic premiums above melt.'},{q:'What is the melt value of a silver dollar?',a:'Melt value = 0.7734 × current spot price. Enter quantity above for the total live value.'}]],
  [/junk-silver/,         [{q:'What is junk silver?',a:'Junk silver refers to pre-1965 US coins sold purely for silver content. $1 face value ≈ 0.715 troy oz of pure silver.'},{q:'Is junk silver a good investment?',a:'Yes — it is divisible, recognizable, and carries low premiums over spot price.'},{q:'How do I calculate junk silver value?',a:'Multiply face value by 0.715 to get troy ounces, then multiply by spot price. The calculator above does this automatically.'}]],
  [/canadian/,            [{q:'What Canadian coins are silver?',a:'Coins from 1920–1966 are 80% silver. Pre-1920 coins are 92.5% sterling. Some 1967–1968 coins are 50% silver (non-magnetic ones).'},{q:'How do I tell if a 1968 Canadian coin is silver?',a:'Magnet test: if it sticks, it is 100% nickel. If it does not stick, it is 50% silver.'},{q:'How much is a Canadian silver dollar worth?',a:'An 80% silver Canadian dollar weighs 23.33g and contains ~0.6 troy oz of pure silver. Use the calculator for live melt value.'}]],
  [/face-value/,          [{q:'What is the face value method for silver coins?',a:'$1 face value of pre-1965 US 90% silver coins = 0.715 troy oz of pure silver — the industry standard.'},{q:'Why is the multiplier 0.715 not 0.723?',a:'0.723 oz is theoretical for unworn coins. The 0.715 standard accounts for metal lost through decades of circulation wear.'},{q:'Does face value work for silver dollars?',a:'No — Morgan and Peace dollars use 0.7734 oz per dollar. Calculate them separately.'}]],
  [/999-silver/,          [{q:'What is 999 fine silver?',a:'999 fine silver is 99.9% pure silver — used in bullion bars, coins, and rounds.'},{q:'Is 999 silver more valuable than 925?',a:'Yes — 999 silver has 7.97% more pure silver per gram than 925 sterling at the same spot price.'},{q:'What is 999 silver worth per gram?',a:'999 silver per gram = spot price ÷ 31.1035. Use the calculator above for today\'s live price.'}]],
  [/958-silver/,          [{q:'What is 958 Britannia silver?',a:'958 Britannia silver is 95.8% pure — higher purity than sterling (925), used in fine British silverware since 1697.'},{q:'Is Britannia silver worth more than sterling?',a:'Yes — 958 contains 95.8% silver vs 92.5% for sterling, worth about 3.6% more per gram.'},{q:'How do I identify Britannia silver?',a:'Look for the Britannia figure hallmark, the number 958, or the word BRITANNIA on British pieces.'}]],
  [/925-silver-calculator/, [{q:'What is 925 sterling silver?',a:'925 sterling silver is 92.5% pure silver alloyed with 7.5% copper. The world\'s most common silver standard for jewelry and flatware.'},{q:'How much is 925 silver worth per gram?',a:'925 silver per gram = (spot price ÷ 31.1035) × 0.925. Use the calculator above for today\'s live value.'},{q:'What does the 925 hallmark mean?',a:'The 925 stamp confirms the item is sterling silver — 92.5% pure. Genuine silver, not plated.'}]],
  [/900-silver/,          [{q:'What is 900 coin silver?',a:'900 silver contains 90% pure silver. It is the standard for pre-1965 US coins and some historical American silverware marked COIN.'},{q:'What items are made of 900 silver?',a:'Pre-1965 US dimes, quarters, half-dollars, and Morgan/Peace dollars, plus historical flatware marked COIN.'},{q:'What is 900 silver worth per gram?',a:'900 silver per gram = (spot price ÷ 31.1035) × 0.900. Use the calculator above for today\'s live value.'}]],
  [/835-silver/,          [{q:'What is 835 silver?',a:'835 silver contains 83.5% pure silver. A common European standard found on Dutch, German, and Scandinavian silverware.'},{q:'Is 835 silver valuable?',a:'Yes — 835 silver has significant silver content. Use the calculator above for a live melt value.'},{q:'Where is 835 silver found?',a:'Most commonly on antique European flatware and serving pieces from Germany, Netherlands, and Scandinavia.'}]],
  [/800-silver/,          [{q:'What is 800 silver?',a:'800 silver contains 80% pure silver and 20% other metals. A common European standard found on German, Italian, and Austrian silverware.'},{q:'Is 800 silver worth buying?',a:'Yes — 800 silver has significant silver content worth calculating. Use the calculator above.'},{q:'How do I identify 800 silver?',a:'Look for the number 800 stamped on the item, usually on the underside or handle.'}]],
  [/1oz-silver/,          [{q:'How much is 1 troy ounce of silver worth?',a:'One troy oz of 999 fine silver equals the current spot price. Use the calculator above for today\'s live value.'},{q:'What is a troy ounce?',a:'A troy ounce is 31.1035 grams — the standard unit for precious metals. Slightly heavier than a regular ounce (28.35g).'},{q:'What does 1oz silver weigh in grams?',a:'1 troy ounce of silver = exactly 31.1035 grams.'}]],
  [/2oz-silver/,          [{q:'How much is 2 oz of silver worth?',a:'2 troy oz of 999 fine silver = 2 × current spot price. Use the calculator above for today\'s live value.'},{q:'What 2oz silver products are available?',a:'2oz silver rounds and high-relief collector coins are the most common 2oz products.'},{q:'How heavy is a 2oz silver coin in grams?',a:'A 2oz silver coin weighs exactly 62.207 grams.'}]],
  [/5oz-silver/,          [{q:'How much is 5 oz of silver worth?',a:'5 troy oz of 999 fine silver = 5 × current spot price. Use the calculator above for today\'s live value.'},{q:'Are 5oz silver bars worth buying?',a:'5oz bars offer lower premiums than 1oz coins while remaining affordable — a good mid-size investment.'},{q:'How heavy is a 5oz silver bar?',a:'A 5oz silver bar weighs exactly 155.517 grams.'}]],
  [/10oz-silver/,         [{q:'How much is 10 oz of silver worth?',a:'10 troy oz of 999 fine silver = 10 × current spot price. Use the calculator above for today\'s live value.'},{q:'Are 10oz silver bars a good investment?',a:'Yes — 10oz bars are the most popular retail silver investment, offering low premiums and high liquidity.'},{q:'How heavy is a 10oz silver bar?',a:'A 10oz silver bar weighs exactly 311.035 grams.'}]],
  [/100oz-silver/,        [{q:'How much is 100 oz of silver worth?',a:'100 troy oz of silver = 100 × current spot price. Use the calculator above for today\'s exact live value.'},{q:'Are 100oz silver bars good for investors?',a:'100oz bars carry the lowest premiums over spot of any standard retail silver bar — highly efficient for larger purchases.'},{q:'How heavy is a 100oz silver bar?',a:'A 100oz silver bar weighs 3,110.35 grams (3.11 kilograms).'}]],
  [/1kg-silver/,          [{q:'How much is 1 kilogram of silver worth?',a:'1kg of 999 fine silver = 32.1507 troy oz × spot price. Use the calculator above for today\'s exact live value.'},{q:'Is a 1kg silver bar a good investment?',a:'Kilo bars carry some of the lowest premiums over spot of any retail silver product — very efficient.'},{q:'How many troy ounces is 1 kilogram?',a:'1 kilogram = 32.1507 troy ounces.'}]],
  [/what-does-925/,       [{q:'What does 925 mean on silver?',a:'925 means sterling silver — 92.5% pure silver and 7.5% other metals. The international standard for quality silver.'},{q:'Is 925 real silver?',a:'Yes. 925 is genuine sterling silver — not silver-plated. Items marked 925 have real, calculable scrap value.'},{q:'Is 925 silver worth buying?',a:'Yes. Sterling silver has significant intrinsic value. Use our calculator to find the exact current worth of any 925 item.'}]],
  [/what-is-sterling/,    [{q:'What is sterling silver?',a:'Sterling silver is 92.5% pure silver alloyed with 7.5% copper. The most widely used silver standard in jewelry and silverware worldwide.'},{q:'How do I identify sterling silver?',a:'Look for hallmarks: 925, STERLING, STER, or a lion passant (British). Sterling silver tarnishes and is non-magnetic.'},{q:'Is sterling silver more valuable than silver-plated?',a:'Yes, significantly. Sterling contains real silver throughout (92.5%), while plated items only have a thin coating worth almost nothing as scrap.'}]],
  [/identify-silver/,     [{q:'How can I tell if something is real silver?',a:'Check for hallmarks (925, 800, STERLING). Test with a magnet — real silver is not magnetic. Silver also melts ice unusually fast.'},{q:'What does EPNS mean on silver?',a:'EPNS = Electroplated Nickel Silver. Only a thin silver coating over base metal — minimal scrap value.'},{q:'What are the best home tests for silver?',a:'1) Hallmark check (925/STERLING = real), 2) Magnet test (real silver is not magnetic), 3) Ice test (silver conducts heat faster than other metals).'}]],
  [/how-to-sell/,         [{q:'Where is the best place to sell silver?',a:'Online refineries offer 90–98% of melt value. Coin dealers offer 75–90% with immediate payment. Pawn shops offer only 50–70%.'},{q:'How do I get the best price for scrap silver?',a:'Know your melt value first (use our free calculator), then get at least 3 quotes from different buyers.'},{q:'How long does it take to sell silver online?',a:'Most online refineries pay within 5–10 business days. Local dealers offer same-day payment at lower rates.'}]],
  [/sell-or-hold/,        [{q:'Should I sell silver now or wait?',a:'Use the scenario analysis above to model performance at different price points. Key factors: current trend, your purchase price, and timeline.'},{q:'When do silver prices typically rise?',a:'Silver prices rise with inflation, weak dollar, strong industrial demand, and supply shortages.'},{q:'What return should I target before selling silver?',a:'Most investors target 15–30% ROI. Use the sell-or-hold tool to set your target price.'}]],
  [/purity-chart/,        [{q:'What are the silver purity grades?',a:'999 (99.9% fine), 958 (Britannia), 925 (sterling), 900 (coin), 835 (European), 800 (European). The number = parts per 1000 of pure silver.'},{q:'What is the most common silver purity?',a:'925 sterling silver is the most common worldwide — used in most jewelry, flatware, and decorative pieces.'},{q:'Which silver purity is worth the most per gram?',a:'999 fine silver has the highest silver content and is worth the most per gram, followed by 958, then 925.'}]],
  [/hallmarks/,           [{q:'What hallmarks mean real silver?',a:'Real silver hallmarks: 999, 958, 925, 900, 835, 800, STERLING, STER, COIN. Items with these marks contain genuine silver.'},{q:'What hallmarks mean silver-plated?',a:'Plated items are marked: EPNS, EP, A1, Silver Plate, IS, or WM Rogers. These have minimal scrap value.'},{q:'Where do I find hallmarks on silver items?',a:'Inside ring bands, on necklace clasps, on the back of spoon/fork handles, and on the underside of trays and plates.'}]],
  [/silver-profit/,       [{q:'How do I calculate profit on silver?',a:'Profit = current melt value minus your purchase price. The tool above calculates this automatically with live spot prices.'},{q:'What ROI can I expect from silver?',a:'Silver historically averages 5–10% annual returns with periods of significant outperformance.'},{q:'When should I sell silver for maximum profit?',a:'When spot is trending up and you have reached your target ROI. Use the sell-or-hold analysis to model different scenarios.'}]],
  [/silver-batch/,        [{q:'What is a batch silver calculator?',a:'A batch calculator values multiple silver items at once — different weights, purities, and quantities in a single total.'},{q:'Can I calculate multiple silver items simultaneously?',a:'Yes. Add a row for each item with its own weight, unit, and purity. The calculator totals everything automatically.'},{q:'How do I value a mixed silver collection?',a:'Use the batch calculator to add each item separately (rings, coins, flatware) with individual weights and purities.'}]],
  [/weight-converter/,    [{q:'How do I convert grams to troy ounces for silver?',a:'Divide grams by 31.1035 to get troy ounces. Example: 100g ÷ 31.1035 = 3.215 troy oz.'},{q:'What is a pennyweight in silver?',a:'One pennyweight (dwt) = 1.5552 grams = 0.05 troy oz. Used widely by US jewelers.'},{q:'How many grams is a tola of silver?',a:'1 tola = 11.6638 grams = 0.375 troy oz. The standard precious metals unit in India and Pakistan.'}]],
  [/pennyweight/,         [{q:'What is pennyweight in silver?',a:'1 pennyweight (dwt) = 1.5552 grams = 0.05 troy oz. 20 pennyweights = 1 troy ounce. Standard unit in the US jewelry trade.'},{q:'How do I convert pennyweight to grams?',a:'Multiply pennyweight by 1.5552 to get grams. Example: 10 dwt × 1.5552 = 15.552 grams.'},{q:'Why do jewelers use pennyweight?',a:'Pennyweight is the traditional precious metals unit in the US jewelry trade. Many appraisers still quote prices in dwt.'}]],
  [/tola/,                [{q:'What is a tola of silver?',a:'A tola is a South Asian unit of mass: 1 tola = 11.6638 grams = 0.375 troy ounces.'},{q:'How many tolas in 1 troy ounce?',a:'1 troy ounce = 2.6667 tolas. Conversely, 1 tola = 0.375 troy ounces.'},{q:'What is the silver price per tola today?',a:'Silver per tola = spot price × 0.375. Use the calculator above for today\'s live tola price.'}]],
  [/sona-chandi/,         [{q:'What is Sona Chandi calculator?',a:'The Sona Chandi calculator converts gold and silver weights between tola, grams, and troy ounces at live spot prices for South Asian markets.'},{q:'What is the silver price in tola today?',a:'1 tola = 0.375 troy oz. Multiply the spot price by 0.375 for today\'s tola price. The calculator above shows this automatically.'},{q:'How do I calculate chandi price per tola?',a:'Chandi per tola = spot price × 0.375. For 925 sterling: multiply by 0.375 × 0.925. Use the calculator above.'}]],
  [/silver-price-per-gram/, [{q:'What is the silver price per gram today?',a:'Silver per gram = spot price ÷ 31.1035. See the live price in the calculator above, updated hourly.'},{q:'How do I calculate silver value in grams?',a:'(grams × purity ÷ 31.1035) × spot price. Example for 925: (weight × 0.925 ÷ 31.1035) × spot.'},{q:'What is 925 silver worth per gram?',a:'925 silver per gram = (spot ÷ 31.1035) × 0.925. At $33/oz spot ≈ $0.98/gram.'}]],
  [/silver-price-per-ounce/, [{q:'What is the silver price per ounce today?',a:'Silver spot price per troy ounce is the global benchmark, updated live above every hour from COMEX.'},{q:'Is silver priced in troy or regular ounces?',a:'Always in troy ounces (31.1035g). This is the global precious metals standard.'},{q:'What drives the silver price per ounce?',a:'Industrial demand, investor sentiment, US dollar strength, and mine supply are the main drivers.'}]],
  [/925-sterling-silver-price/, [{q:'What is 925 sterling silver price per gram today?',a:'925 price per gram = (spot ÷ 31.1035) × 0.925. See the live stat cards above, updated automatically.'},{q:'Why is 925 silver cheaper per gram than 999?',a:'Because 925 is only 92.5% pure. You pay for the pure silver content, so 925 is worth 92.5% of 999 fine silver per gram.'},{q:'How often does the 925 silver price change?',a:'The 925 price updates hourly, directly tracking the global silver spot price from COMEX.'}]],
  [/gold-and-silver/,     [{q:'Can I calculate gold and silver value together?',a:'Yes. Enter separate weights and purities for gold and silver above for a combined live value.'},{q:'How do gold and silver prices compare?',a:'Gold typically trades 60–80× higher than silver per troy ounce. The ratio fluctuates with market conditions.'},{q:'Is it better to invest in gold or silver?',a:'Silver has higher industrial demand and more volatility. Gold is more stable. Many investors hold both for diversification.'}]],
  [/silver-bar/,          [{q:'How much is a silver bar worth?',a:'Bar value = (weight in troy oz) × spot price × purity. Use the calculator above for any size.'},{q:'What silver bar sizes are available?',a:'Common retail sizes: 1oz, 5oz, 10oz, 100oz, and 1kg. The 10oz bar is the most popular retail investment size.'},{q:'Are silver bars better than coins for investment?',a:'Bars carry lower premiums over spot, making them more efficient for large purchases. Coins are more divisible.'}]],
  [/silverware-value/,    [{q:'How much is silverware worth?',a:'Silverware value depends on weight, purity, and whether it is solid silver or plated. Sterling (925) is valuable; EPNS-plated pieces have minimal scrap value.'},{q:'How do I know if my silverware is solid silver?',a:'Check the back of the handle: 925 or STERLING = solid silver. EPNS, EP, or A1 = silver-plated (little scrap value).'},{q:'Where can I sell silverware for the best price?',a:'Online refineries offer 90–98% of melt. Antique dealers may pay more for complete hallmarked sets.'}]],
  [/silver-jewelry/,      [{q:'How do I calculate silver jewelry value?',a:'Weigh the piece, identify the purity (usually 925), and use the calculator above for an instant live melt value.'},{q:'Is silver jewelry worth scrapping?',a:'Sterling (925) jewelry has solid scrap value. Only scrap items with no designer or collector value.'},{q:'What is the best way to sell silver jewelry?',a:'Online refineries pay 90–98% of melt. Local jewelers offer 65–80%. Designer pieces may fetch more on eBay.'}]],
  [/silver-melt/,         [{q:'What is silver melt value?',a:'Silver melt value is the intrinsic value of an item\'s pure silver content at the current spot price — the minimum baseline value of any silver piece.'},{q:'How do I calculate silver melt value?',a:'Melt value = (weight in grams × purity ÷ 31.1035) × spot price per troy oz. The calculator above does this automatically.'},{q:'What is the difference between melt value and spot price?',a:'Spot price is the market price for pure (999) silver per troy oz. Melt value is what your specific item is worth based on its actual weight and purity.'}]],
  [/silver-scrap/,        [{q:'What is scrap silver?',a:'Scrap silver is any silver item sold for its metal content — broken jewelry, flatware, old coins.'},{q:'What counts as scrap silver?',a:'Sterling jewelry, flatware, coin silver items. Silver-plated items (EPNS) have minimal scrap value.'},{q:'Where can I sell scrap silver for the best price?',a:'Online refineries offer the best rates (90–98% of melt). Local coin dealers offer 75–90%. Calculate melt above first.'}]],
  [/silver-coin-value/,   [{q:'How do I calculate silver coin value?',a:'Select your coin type and quantity above for an instant live melt value based on today\'s spot price.'},{q:'Are pre-1965 US coins worth more than face value?',a:'Yes — their silver melt value is typically 10–20× face value depending on current spot prices.'},{q:'What US coins are made of silver?',a:'Dimes, quarters, half-dollars minted 1964 and earlier (90% silver), and Morgan/Peace silver dollars (90% silver).'}]],
  [/silver-sell-or-hold/, [{q:'Should I sell silver now or wait?',a:'Use the scenario analysis above to model your silver\'s performance at different price points.'},{q:'What factors should I consider when deciding to sell silver?',a:'Current spot price trend, your purchase price, storage costs, and your financial timeline.'},{q:'What return should I target before selling silver?',a:'Most investors target 15–30% ROI. Use the tool above to calculate your breakeven and target price.'}]],
  [/how-silver-prices/,   [{q:'How are silver prices determined?',a:'Silver prices are set by global supply and demand on exchanges like COMEX. Key drivers: industrial demand, investor flows, dollar strength.'},{q:'What moves silver prices up and down?',a:'Up: inflation, weak dollar, strong industrial demand. Down: strong dollar, rising interest rates, reduced demand.'},{q:'What is the gold-silver ratio?',a:'The gold-silver ratio shows how many oz of silver equal one oz of gold. Historically it averages 60–80:1.'}]],
  [/price-all-currencies/, [{q:'What is the silver price in different currencies?',a:'Silver is priced globally in USD per troy oz, then converted to local currencies at live exchange rates. Our tool shows 30+ currencies.'},{q:'Why does silver price vary by currency?',a:'The USD spot price is fixed globally, but local prices shift with exchange rate movements against the US dollar.'},{q:'Which currencies are shown?',a:'USD, EUR, GBP, JPY, CAD, AUD, CHF, INR, PKR, CNY, AED, SAR and 20+ more, all updated live.'}]],
  [/what-is-junk/,        [{q:'What is junk silver?',a:'Junk silver refers to pre-1965 US coins sold purely for silver content at no collector premium. $1 face value ≈ 0.715 troy oz of pure silver.'},{q:'Is junk silver a good investment?',a:'Yes — it is divisible, recognizable, widely accepted, and carries low premiums over spot price.'},{q:'How do I store junk silver?',a:'Store in coin tubes or bags by denomination. Keep in a cool, dry place. A fireproof safe is recommended for larger quantities.'}]],
  [/what-is-silver-bullion/, [{q:'What is silver bullion?',a:'Silver bullion refers to silver in pure or near-pure form (bars, rounds, government coins) bought primarily for its silver content.'},{q:'What is the best type of silver bullion to buy?',a:'For investment: 10oz or 100oz bars offer the lowest premiums. For divisibility: 1oz coins or rounds.'},{q:'Where can I buy silver bullion?',a:'Reputable dealers include APMEX, JM Bullion, SD Bullion, and local coin shops. Always compare premiums over spot before purchasing.'}]],
  [/what-is-silver-melt/, [{q:'What is silver melt value?',a:'Silver melt value is the raw intrinsic value of the pure silver content in any object — what the metal would be worth if refined to pure silver.'},{q:'How do you calculate melt value?',a:'Melt value = (weight in grams × purity decimal ÷ 31.1035) × spot price per troy oz.'},{q:'Is melt value the same as what a dealer will pay?',a:'No. Dealers pay 65–98% of melt value depending on buyer type. Refineries pay the most; pawn shops the least.'}]],
  [/what-is-silver-scrap/, [{q:'What is silver scrap?',a:'Silver scrap is any silver-containing item sold for its metal content — broken jewelry, damaged flatware, old coins, industrial silver waste.'},{q:'How do I know if my silver is worth scrapping?',a:'If it has hallmarks (925, 800, STERLING) confirming solid silver, it has scrap value. Calculate the melt value above.'},{q:'What is the minimum amount of silver worth scrapping?',a:'Even small amounts have value. A single sterling spoon (40g) is worth approximately $35–$45 at current prices.'}]],
  [/what-is-troy-ounce/,  [{q:'What is a troy ounce?',a:'A troy ounce is 31.1035 grams — the standard unit for precious metals worldwide. About 10% heavier than a regular (avoirdupois) ounce of 28.35 grams.'},{q:'Why is silver measured in troy ounces?',a:'Troy weight has been the precious metals standard since medieval times. All silver and gold prices globally are quoted in troy ounces.'},{q:'How many grams is a troy ounce of silver?',a:'Exactly 31.1035 grams. A 1oz silver coin or bar will weigh 31.1 grams on a digital scale.'}]],
  [/silver-spot-price/,   [{q:'What is the silver spot price?',a:'The silver spot price is the current market price for immediate delivery of one troy ounce of 999 fine silver, set by global commodity exchanges.'},{q:'How often does the silver spot price change?',a:'The spot price changes continuously during market hours (Mon–Fri). Our tool updates it every hour automatically.'},{q:'What is a good silver spot price to buy at?',a:'There is no universal answer — buy when you believe the price is below fair value relative to inflation and industrial demand trends.'}]],
  [/silver-price-all-currencies/, [{q:'What is the silver price in different currencies?',a:'Silver trades globally in USD per troy oz, then converted to local currencies. Our tool shows live prices in 30+ currencies.'},{q:'Why does the silver price differ by country?',a:'The global spot price is in USD. Local prices reflect currency exchange rates against the dollar.'},{q:'How do I find the silver price in my currency?',a:'Use the currency table above — it shows today\'s live silver price in USD, EUR, GBP, INR, PKR, AED, and 25+ more currencies.'}]],
];

const GENERIC_FAQS = [
  {q:'How do I calculate scrap silver value?', a:'Multiply weight (grams) by purity decimal, divide by 31.1035, then multiply by the current spot price. Our free calculators do this automatically with live prices.'},
  {q:'How often are silver prices updated?', a:'Our calculators update silver spot prices every hour using live market data from COMEX and major precious metals exchanges.'},
  {q:'What does 925 mean on silver?', a:'925 means sterling silver — 92.5% pure silver alloyed with 7.5% copper. The most common hallmark on silver jewelry, flatware, and decorative items.'},
];

function getFAQs(slug) {
  for (const [pattern, faqs] of FAQ_DB) {
    if (pattern.test(slug)) return faqs;
  }
  return GENERIC_FAQS;
}

// ── Page type detection ───────────────────────────────────────────────────────
function getPageType(slug) {
  if (/calculator|converter|calc(?!ulator)|value|pennyweight|tola|sona-chandi|face-value|silver-profit|silver-batch|silver-scrap|silver-melt|sterling-silver|junk-silver|silver-bar|silverware|silver-jewelry|silver-price-per|sell-or-hold|price-all-currencies|silver-sell|coin-value/.test(slug)) return 'calculator';
  if (/what-is|what-does|how-to|how-silver|identify|hallmarks|purity-chart|silver-bullion|troy-ounce|silver-news|silver-price-forecast|silver-market/.test(slug)) return 'article';
  return 'webpage';
}

// ── Extract from HTML via simple regex ────────────────────────────────────────
function extract(html, pattern, group) {
  const m = html.match(pattern);
  return m ? (m[group || 1] || '').trim() : '';
}

// ── Build schema blocks ───────────────────────────────────────────────────────
function buildSchemas(slug, title, desc, url) {
  const pageName = title.replace(/\s*[—–|].*$/, '').trim();
  const type     = getPageType(slug);
  const blocks   = [];

  // BreadcrumbList
  blocks.push({
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: pageName, item: url },
    ],
  });

  // WebApplication
  if (type === 'calculator') {
    blocks.push({
      '@context': 'https://schema.org',
      '@type':    'WebApplication',
      name:       pageName,
      url,
      description: desc || title,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      inLanguage: 'en-US',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      isPartOf: { '@type': 'WebSite', name: 'Scrap Silver Calculator', url: BASE_URL + '/' },
    });
  } else if (type === 'article') {
    blocks.push({
      '@context': 'https://schema.org',
      '@type':    'Article',
      headline:   pageName,
      description: desc || title,
      url,
      inLanguage: 'en-US',
      publisher: {
        '@type': 'Organization',
        name:    'Scrap Silver Calculator',
        url:     BASE_URL,
      },
    });
  } else {
    blocks.push({
      '@context': 'https://schema.org',
      '@type':    'WebPage',
      name:       title,
      description: desc || title,
      url,
      inLanguage: 'en-US',
      isPartOf: { '@type': 'WebSite', name: 'Scrap Silver Calculator', url: BASE_URL + '/' },
    });
  }

  // FAQPage
  const faqs = getFAQs(slug);
  if (faqs.length > 0) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type':    'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name:    f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return blocks;
}

// ── Skip list ─────────────────────────────────────────────────────────────────
const SKIP = new Set([
  '404.html', 'about.html', 'contact.html', 'privacy-policy.html',
  'terms-of-service.html', 'disclaimer.html', 'debug.html',
  'audit-report.html', 'sitemap.html',
  'scrapsilver-masterpiece.html', 'modern-dashboard-calculator.html',
  'silver-market-analysis-may18.html',
]);

// ── Main ──────────────────────────────────────────────────────────────────────
const files = fs.readdirSync(ROOT)
  .filter(f => f.endsWith('.html') && !SKIP.has(f));

let updated = 0;

files.forEach(file => {
  const filePath = path.join(ROOT, file);
  let html;
  try { html = fs.readFileSync(filePath, 'utf8'); } catch { return; }

  // Skip if already has static schema
  if (html.includes('application/ld+json')) return;

  const title    = extract(html, /<title>([^<]+)<\/title>/);
  const desc     = extract(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
  const canonical = extract(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);

  if (!title) { console.log(`⚠  Skipped (no title): ${file}`); return; }

  const url    = canonical || `${BASE_URL}/${file.replace('.html', '')}/`;
  const slug   = file.replace('.html', '');
  const blocks = buildSchemas(slug, title, desc, url);

  // Inject before </head>
  const schemaHtml = blocks
    .map(b => `  <script type="application/ld+json">\n${JSON.stringify(b, null, 2)}\n  </script>`)
    .join('\n');

  const updated_html = html.replace('</head>', `${schemaHtml}\n</head>`);

  if (updated_html === html) { console.log(`⚠  Could not inject into: ${file}`); return; }

  fs.writeFileSync(filePath, updated_html, 'utf8');
  console.log(`✅  ${file}  [${blocks.map(b => b['@type']).join(', ')}]`);
  updated++;
});

console.log(`\n✨  Done — ${updated} files updated.`);
