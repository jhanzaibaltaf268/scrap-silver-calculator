// Script to generate purity pages and other templated pages
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');

// ---- Purity Page Template ----
function purityPage(purityCode, purityPct, purityName, description, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${purityCode} Silver Calculator — ${purityName} Value by Weight</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="https://scrapsilvercalculater.com/${purityCode.toLowerCase()}-silver-calculator/">
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <div id="site-header"></div>
  <main>
    <div class="container"><div id="breadcrumb"></div></div>
    <section class="page-hero"><div class="container"><div id="price-ticker"></div><h1>${purityCode} Silver <span class="highlight">Calculator</span></h1><p>Calculate the value of ${purityName.toLowerCase()} (${purityPct}% pure) by weight using live spot prices.</p></div></section>
    <div class="calc-page-layout">
      <div class="calc-widget">
        <div class="calc-widget-title"><span class="icon">🔢</span> ${purityCode} Silver Calculator</div>
        <div class="form-row">
          <div class="form-group"><label class="form-label" for="weight">Weight</label><input type="number" class="form-input" id="weight" placeholder="e.g. 10" step="0.01" min="0" value="10"></div>
          <div class="form-group"><label class="form-label" for="unit">Unit</label><select class="form-select" id="unit"><option value="g" selected>Grams</option><option value="oz">Troy Ounces</option><option value="dwt">Pennyweight</option><option value="kg">Kilograms</option></select></div>
        </div>
        <div class="callout info">
          <div class="callout-title">Purity: ${purityPct}% (${purityName})</div>
          <p style="font-size:var(--fs-sm);color:var(--text-secondary);margin:0;">${purityName} contains ${purityPct}% pure silver. This calculator is pre-set to this purity.</p>
        </div>
        <div class="result-display">
          <div class="result-label">${purityCode} Silver Value</div>
          <div class="result-value" id="result-value">$0.00</div>
          <div class="result-detail" id="result-detail"></div>
        </div>
      </div>
      <div class="content-body">${content}</div>
      <div><h3 style="margin-bottom:var(--space-lg);">Related Calculators</h3><div class="related-grid">
        <a href="/silver-scrap-calculator/" class="related-link"><span class="r-icon">♻️</span> Scrap Calculator</a>
        <a href="/silver-melt-value-calculator/" class="related-link"><span class="r-icon">🔥</span> Melt Value</a>
        <a href="/sterling-silver-calculator/" class="related-link"><span class="r-icon">✨</span> Sterling Silver</a>
        <a href="/silver-purity-chart/" class="related-link"><span class="r-icon">📊</span> Purity Chart</a>
      </div></div>
    </div>
  </main>
  <div id="site-footer"></div>
  <script src="/js/silver-price.js"></script><script src="/js/calculator.js"></script><script src="/js/components.js"></script>
  <script>
    SiteComponents.renderPriceTicker('price-ticker');
    SiteComponents.renderBreadcrumb('breadcrumb',[{label:'Home',href:'/'},{label:'${purityCode} Silver Calculator'}]);
    const w=document.getElementById('weight'),u=document.getElementById('unit');
    function calc(){const weight=parseFloat(w.value)||0;const grams=SilverCalc.toGrams(weight,u.value);const spot=SilverPrice.getPrice();const r=SilverCalc.meltValue(grams,${purityPct/100},spot);document.getElementById('result-value').textContent=SilverCalc.formatCurrency(r.value);document.getElementById('result-detail').textContent=\`\${r.silverContentGrams}g pure silver (${purityPct}%) · \${r.silverContentOz} oz · Spot: $\${spot.toFixed(2)}/oz\`;}
    w.addEventListener('input',calc);u.addEventListener('change',calc);SilverPrice.onPriceUpdate(()=>calc());calc();
  </script>
</body>
</html>`;
}

// Generate purity pages
const purities = [
  { code: '999', pct: 99.9, name: 'Fine Silver', desc: 'Calculate the value of 999 fine silver (99.9% pure) by weight. Used in bullion bars and coins.',
    content: '<h2>What Is 999 Fine Silver?</h2><p>999 fine silver, also called "three nines fine," contains 99.9% pure silver. It is the purest commercially available form of silver and is used in:</p><ul><li>Silver bullion bars</li><li>Government-issued silver coins (American Eagles, Canadian Maple Leafs)</li><li>Silver rounds from private mints</li><li>Industrial applications requiring high purity</li></ul><h3>999 vs 925 Sterling Silver</h3><p>Unlike sterling silver (92.5%), fine silver is too soft for everyday jewelry. However, its higher purity means more silver per gram, making it more valuable by weight.</p>' },
  { code: '958', pct: 95.8, name: 'Britannia Silver', desc: 'Calculate the value of 958 Britannia silver (95.8% pure). A high-purity silver alloy used in British silver.',
    content: '<h2>What Is Britannia Silver?</h2><p>Britannia silver is a silver alloy containing 95.8% silver and 4.2% copper. It was introduced in Britain in 1697 and is still used today.</p><ul><li>Higher purity than sterling silver (92.5%)</li><li>Used in fine British silverware and specialty items</li><li>Hallmarked with the Britannia figure</li><li>More valuable per gram than sterling due to higher silver content</li></ul>' },
  { code: '925', pct: 92.5, name: 'Sterling Silver', desc: 'Calculate the value of 925 sterling silver (92.5% pure) by weight using live prices.',
    content: '<h2>What Is 925 Sterling Silver?</h2><p>925 sterling silver is the world\'s most popular silver alloy, containing 92.5% silver and 7.5% other metals (usually copper). The "925" stamp indicates this standard.</p><ul><li>Standard for silver jewelry worldwide</li><li>Used in flatware, decorative items, and high-end accessories</li><li>Harder and more durable than fine silver</li><li>The most commonly traded form of silver items</li></ul><p>Learn more: <a href="/what-does-925-mean/">What Does 925 Mean on Silver?</a></p>' },
  { code: '900', pct: 90.0, name: 'Coin Silver', desc: 'Calculate the value of 900 coin silver (90% pure) by weight. Found in pre-1965 US silver coins.',
    content: '<h2>What Is 900 Coin Silver?</h2><p>900 silver, commonly called "coin silver," contains 90% silver and 10% copper. It is the standard alloy used in US silver coinage minted before 1965.</p><ul><li>US dimes, quarters, and half dollars (pre-1965)</li><li>Morgan and Peace silver dollars</li><li>Some European and Latin American coins</li><li>Historical silverware marked "COIN"</li></ul><p>Use our <a href="/junk-silver-calculator/">Junk Silver Calculator</a> for specific US coin values.</p>' },
  { code: '835', pct: 83.5, name: 'European Silver', desc: 'Calculate the value of 835 silver (83.5% pure). Common European silver standard for silverware and coins.',
    content: '<h2>What Is 835 Silver?</h2><p>835 silver contains 83.5% silver and 16.5% other metals. It was a common standard in continental Europe, especially in Germany and the Netherlands.</p><ul><li>Common in antique European silverware</li><li>Used in some European coins</li><li>Often found on imported silver items</li><li>Lower silver content than sterling but still valuable</li></ul>' },
  { code: '800', pct: 80.0, name: 'European Silver', desc: 'Calculate the value of 800 silver (80% pure). A common European silverware standard.',
    content: '<h2>What Is 800 Silver?</h2><p>800 silver contains 80% silver and 20% copper or other metals. It is one of the most common silver standards found in European antiques and silverware.</p><ul><li>Standard for Italian, German, and Austrian silverware</li><li>Common in antique serving pieces and cutlery</li><li>Lower purity means lower melt value per gram</li><li>May have "800" stamped on items</li></ul><h3>800 vs 925 Silver</h3><p>800 silver has significantly less silver than sterling (80% vs 92.5%). A 100g piece of 800 silver contains 80g of pure silver, compared to 92.5g in sterling — a 15.6% difference in melt value.</p>' }
];

purities.forEach(p => {
  const filename = `${p.code}-silver-calculator.html`;
  // Generate canonical with clean URL
  const cleanUrl = `https://scrapsilvercalculater.com/${p.code}-silver-calculator/`;
  fs.writeFileSync(path.join(baseDir, filename), purityPage(p.code, p.pct, p.name, p.desc, p.content));
  console.log(`Created ${filename}`);
});

// ---- Weight Value Page Template ----
function weightPage(sizeLabel, sizeOz, filename, desc, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${sizeLabel} Silver Value — Current Price of ${sizeLabel} Silver</title>
  <meta name="description" content="${desc}">
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <div id="site-header"></div>
  <main>
    <div class="container"><div id="breadcrumb"></div></div>
    <section class="page-hero"><div class="container"><div id="price-ticker"></div><h1>${sizeLabel} Silver <span class="highlight">Value</span></h1><p>Current value of ${sizeLabel} of silver at today's live spot price.</p></div></section>
    <div class="calc-page-layout">
      <div class="calc-widget">
        <div class="calc-widget-title"><span class="icon">🧱</span> ${sizeLabel} Silver Value</div>
        <div class="form-group"><label class="form-label" for="qty">Quantity</label><input type="number" class="form-input" id="qty" value="1" min="1" step="1"></div>
        <div class="result-display">
          <div class="result-label">${sizeLabel} Silver Value</div>
          <div class="result-value" id="result-value">$0.00</div>
          <div class="result-detail" id="result-detail"></div>
        </div>
        <h4 style="margin:var(--space-xl) 0 var(--space-md);">Value by Quantity</h4>
        <table class="purity-table">
          <thead><tr><th>Quantity</th><th>Total Weight</th><th>Value</th></tr></thead>
          <tbody id="qty-table"></tbody>
        </table>
      </div>
      <div class="content-body">${content}</div>
      <div><h3 style="margin-bottom:var(--space-lg);">Related Pages</h3><div class="related-grid">
        <a href="/silver-bar-value-calculator/" class="related-link"><span class="r-icon">🧱</span> Bar Calculator</a>
        <a href="/silver-price-per-ounce/" class="related-link"><span class="r-icon">📊</span> Price Per Ounce</a>
        <a href="/silver-price-per-gram/" class="related-link"><span class="r-icon">📊</span> Price Per Gram</a>
        <a href="/silver-scrap-calculator/" class="related-link"><span class="r-icon">♻️</span> Scrap Calculator</a>
      </div></div>
    </div>
  </main>
  <div id="site-footer"></div>
  <script src="/js/silver-price.js"></script><script src="/js/calculator.js"></script><script src="/js/components.js"></script>
  <script>
    SiteComponents.renderPriceTicker('price-ticker');
    SiteComponents.renderBreadcrumb('breadcrumb',[{label:'Home',href:'/'},{label:'${sizeLabel} Silver Value'}]);
    const q=document.getElementById('qty');
    function calc(){const qty=parseInt(q.value)||1;const spot=SilverPrice.getPrice();const totalOz=${sizeOz}*qty;const val=totalOz*spot;document.getElementById('result-value').textContent='$'+val.toFixed(2);document.getElementById('result-detail').textContent=qty+'× ${sizeLabel} · '+totalOz.toFixed(2)+' oz total · Spot: $'+spot.toFixed(2)+'/oz';
      const qtys=[1,2,5,10,25,50,100];document.getElementById('qty-table').innerHTML=qtys.map(n=>'<tr><td>'+n+'</td><td>'+(${sizeOz}*n).toFixed(2)+' oz</td><td>$'+(${sizeOz}*n*spot).toFixed(2)+'</td></tr>').join('');}
    q.addEventListener('input',calc);SilverPrice.onPriceUpdate(()=>calc());calc();
  </script>
</body>
</html>`;
}

const weights = [
  { label: '1oz', oz: 1, file: '1oz-silver-value.html', slug: '1oz-silver-value', desc: 'Current value of 1 ounce of silver. Live spot price and quantity calculator.',
    content: '<h2>How Much Is 1 Ounce of Silver Worth?</h2><p>One troy ounce (31.1035 grams) of .999 fine silver is worth the current spot price. This is the base unit for silver pricing worldwide.</p><p>1oz silver bars and coins are the most popular investment size due to their affordability and easy divisibility.</p>' },
  { label: '2oz', oz: 2, file: '2oz-silver-value.html', slug: '2oz-silver-value', desc: 'Current value of 2 ounces of silver. Live spot price and quantity calculator.',
    content: '<h2>How Much Is 2 Ounces of Silver Worth?</h2><p>Two troy ounces (62.207 grams) of .999 fine silver is worth double the current spot price. 2oz silver rounds and high-relief coins are popular collectibles and investments.</p>' },
  { label: '5oz', oz: 5, file: '5oz-silver-value.html', slug: '5oz-silver-value', desc: 'Current value of 5 ounces of silver. Live spot price and quantity calculator for 5oz bars.',
    content: '<h2>How Much Is 5 Ounces of Silver Worth?</h2><p>5 troy ounces (155.517 grams) of .999 fine silver is a popular size for silver bars. It offers lower premiums than 1oz sizes while remaining highly liquid.</p>' },
  { label: '10oz', oz: 10, file: '10oz-silver-value.html', slug: '10oz-silver-value', desc: 'Current value of 10 ounces of silver. The most popular bar size for silver investors.',
    content: '<h2>How Much Is 10 Ounces of Silver Worth?</h2><p>10 troy ounces (311.035 grams) is the most popular silver bar size for individual investors. These bars typically carry lower premiums than smaller sizes.</p><p>10oz silver bars are easy to store, widely recognized, and highly liquid in the secondary market.</p>' },
  { label: '100oz', oz: 100, file: '100oz-silver-value.html', slug: '100oz-silver-value', desc: 'Current value of 100 ounces of silver bar. Live spot price and quantity calculator for 100oz bars.',
    content: '<h2>How Much Is 100 Ounces of Silver Worth?</h2><p>100 troy ounces (3.11 kilograms) is the standard large-size silver bar for serious investors. 100oz bars typically carry the lowest premium over spot price of any retail silver product.</p>' },
  { label: '1/10oz', oz: 0.1, file: '1-10oz-silver-value.html', slug: '1-10oz-silver-value', desc: 'Current value of 1/10 ounce of silver. Live spot price for fractional silver rounds.',
    content: '<h2>How Much Is 1/10 Ounce of Silver Worth?</h2><p>Fractional silver, such as 1/10th troy ounce rounds, are popular for bartering and small investments. While they carry higher premiums, calculating their raw melt value is important before buying or selling.</p>' },
  { label: '1kg', oz: 32.1507, file: '1kg-silver-value.html', slug: '1kg-silver-value', desc: 'Current value of 1 kilogram of silver. International standard bar size.',
    content: '<h2>How Much Is 1 Kilogram of Silver Worth?</h2><p>One kilogram of silver equals 32.1507 troy ounces (1,000 grams). Kilo bars are the international standard size, especially popular in Europe, Asia, and Australia.</p><p>Kilo bars offer some of the lowest premiums over spot price, making them efficient for larger investments.</p>' }
];

weights.forEach(w => {
  fs.writeFileSync(path.join(baseDir, w.file), weightPage(w.label, w.oz, w.file, w.desc, w.content));
  console.log(`Created ${w.file}`);
});

// ---- Jewelry/Silverware Page Template ----
function itemPage(itemName, itemEmoji, defaultWeight, defaultPurity, pageFile, desc, content, related) {
  const titleName = itemName.charAt(0).toUpperCase() + itemName.slice(1);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Silver ${titleName} Value — How Much Is a Silver ${titleName} Worth?</title>
  <meta name="description" content="${desc}">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div id="site-header"></div>
  <main>
    <div class="container"><div id="breadcrumb"></div></div>
    <section class="page-hero"><div class="container"><div id="price-ticker"></div><h1>Silver ${titleName} <span class="highlight">Value</span></h1><p>Calculate how much your silver ${itemName.toLowerCase()} is worth based on weight and purity.</p></div></section>
    <div class="calc-page-layout">
      <div class="calc-widget">
        <div class="calc-widget-title"><span class="icon">${itemEmoji}</span> Silver ${titleName} Calculator</div>
        <div class="form-row">
          <div class="form-group"><label class="form-label" for="weight">Weight (grams)</label><input type="number" class="form-input" id="weight" value="${defaultWeight}" step="0.1" min="0"></div>
          <div class="form-group"><label class="form-label" for="qty">Quantity</label><input type="number" class="form-input" id="qty" value="1" min="1" step="1"></div>
        </div>
        <div class="form-group"><label class="form-label" for="purity">Purity</label><select class="form-select" id="purity"><option value="0.999">999 Fine</option><option value="0.958">958 Britannia</option><option value="0.925" ${defaultPurity===0.925?'selected':''}>925 Sterling</option><option value="0.900" ${defaultPurity===0.900?'selected':''}>900 Coin Silver</option><option value="0.835">835 European</option><option value="0.800" ${defaultPurity===0.800?'selected':''}>800 European</option></select></div>
        <div class="result-display">
          <div class="result-label">Silver ${titleName} Value</div>
          <div class="result-value" id="result-value">$0.00</div>
          <div class="result-detail" id="result-detail"></div>
        </div>
      </div>
      <div class="content-body">${content}</div>
      <div><h3 style="margin-bottom:var(--space-lg);">Related Calculators</h3><div class="related-grid">${related}</div></div>
    </div>
  </main>
  <div id="site-footer"></div>
  <script src="js/silver-price.js"></script><script src="js/calculator.js"></script><script src="js/components.js"></script>
  <script>
    SiteComponents.renderPriceTicker('price-ticker');
    SiteComponents.renderBreadcrumb('breadcrumb',[{label:'Home',href:'/'},{label:'Silver ${titleName} Value'}]);
    const w=document.getElementById('weight'),q=document.getElementById('qty'),p=document.getElementById('purity');
    function calc(){const weight=(parseFloat(w.value)||0)*(parseInt(q.value)||1);const purity=parseFloat(p.value);const spot=SilverPrice.getPrice();const r=SilverCalc.meltValue(weight,purity,spot);document.getElementById('result-value').textContent=SilverCalc.formatCurrency(r.value);document.getElementById('result-detail').textContent=r.silverContentGrams+'g pure silver · '+r.silverContentOz+' oz · Spot: $'+spot.toFixed(2)+'/oz';}
    [w,q].forEach(el=>el.addEventListener('input',calc));p.addEventListener('change',calc);SilverPrice.onPriceUpdate(()=>calc());calc();
  </script>
</body>
</html>`;
}

// Jewelry pages
const jewelryRelated = `
  <a href="/silver-jewelry-value-calculator/" class="related-link"><span class="r-icon">💍</span> Jewelry Calculator</a>
  <a href="/sterling-silver-calculator/" class="related-link"><span class="r-icon">✨</span> Sterling Silver</a>
  <a href="/silver-scrap-calculator/" class="related-link"><span class="r-icon">♻️</span> Scrap Calculator</a>
  <a href="/925-silver-calculator/" class="related-link"><span class="r-icon">🔢</span> 925 Silver</a>`;

const jewelry = [
  { name: 'Ring', emoji: '💍', weight: 6, purity: 0.925, file: 'silver-ring-value.html',
    desc: 'Calculate how much a silver ring is worth. Typical silver rings weigh 3-12 grams.',
    content: '<h2>How Much Is a Silver Ring Worth?</h2><p>A typical silver ring weighs between 3 and 12 grams, depending on the style and size. Most silver rings are made from 925 sterling silver.</p><h3>Typical Silver Ring Weights</h3><ul><li><strong>Thin band</strong>: 3-5 grams</li><li><strong>Standard band</strong>: 5-8 grams</li><li><strong>Wide/chunky ring</strong>: 8-12 grams</li><li><strong>Statement ring</strong>: 10-20 grams</li></ul><p>The melt value of a silver ring depends on weight, purity, and the current silver spot price. Designer or antique silver rings may be worth more than their melt value.</p>' },
  { name: 'Chain', emoji: '⛓️', weight: 25, purity: 0.925, file: 'silver-chain-value.html',
    desc: 'Calculate the value of a silver chain by weight. Typical chains weigh 10-60 grams.',
    content: '<h2>How Much Is a Silver Chain Worth?</h2><p>Silver chains vary widely in weight depending on length, thickness, and link style. Most silver chains are 925 sterling silver.</p><h3>Typical Silver Chain Weights</h3><ul><li><strong>Delicate chain (16")</strong>: 5-10 grams</li><li><strong>Medium chain (18")</strong>: 15-25 grams</li><li><strong>Heavy chain (20-24")</strong>: 30-60 grams</li><li><strong>Cuban link chain</strong>: 40-100+ grams</li></ul>' },
  { name: 'Necklace', emoji: '📿', weight: 30, purity: 0.925, file: 'silver-necklace-value.html',
    desc: 'Calculate the value of a silver necklace by weight. Includes pendant weight estimation.',
    content: '<h2>How Much Is a Silver Necklace Worth?</h2><p>Silver necklaces include chains with pendants, chokers, and collar necklaces. When weighing, include the pendant for total melt value.</p><h3>Typical Weights</h3><ul><li><strong>Pendant necklace</strong>: 10-20 grams</li><li><strong>Choker</strong>: 15-30 grams</li><li><strong>Statement necklace</strong>: 30-80 grams</li></ul><p>Tip: Weigh the chain and pendant separately if the pendant contains gemstones, as stones don\'t contribute to silver melt value.</p>' },
  { name: 'Bracelet', emoji: '⌚', weight: 20, purity: 0.925, file: 'silver-bracelet-value.html',
    desc: 'Calculate silver bracelet value by weight. Typical bracelets weigh 10-50 grams.',
    content: '<h2>How Much Is a Silver Bracelet Worth?</h2><p>Silver bracelets range from delicate bangles to heavy cuff styles. Most are made from 925 sterling silver.</p><h3>Typical Bracelet Weights</h3><ul><li><strong>Thin bangle</strong>: 8-15 grams</li><li><strong>Chain bracelet</strong>: 10-25 grams</li><li><strong>Cuff bracelet</strong>: 20-50 grams</li><li><strong>Charm bracelet</strong>: 25-60 grams</li></ul>' }
];

jewelry.forEach(j => {
  fs.writeFileSync(path.join(baseDir, j.file), itemPage(j.name, j.emoji, j.weight, j.purity, j.file, j.desc, j.content, jewelryRelated));
  console.log(`Created ${j.file}`);
});

// Silverware pages
const silverwareRelated = `
  <a href="/silverware-value-calculator/" class="related-link"><span class="r-icon">🍴</span> Silverware Calculator</a>
  <a href="/sterling-silver-calculator/" class="related-link"><span class="r-icon">✨</span> Sterling Silver</a>
  <a href="/silver-scrap-calculator/" class="related-link"><span class="r-icon">♻️</span> Scrap Calculator</a>
  <a href="/how-to-sell-silver/" class="related-link"><span class="r-icon">📖</span> How to Sell Silver</a>`;

const silverware = [
  { name: 'Spoon', emoji: '🥄', weight: 40, purity: 0.925, file: 'silver-spoon-value.html',
    desc: 'Calculate the value of a silver spoon. Typical sterling silver spoons weigh 20-80 grams.',
    content: '<h2>How Much Is a Silver Spoon Worth?</h2><p>Silver spoons vary greatly in size and weight, from small teaspoons to large serving spoons.</p><h3>Typical Weights</h3><ul><li><strong>Teaspoon</strong>: 20-30 grams</li><li><strong>Dessert spoon</strong>: 30-40 grams</li><li><strong>Tablespoon</strong>: 40-60 grams</li><li><strong>Serving spoon</strong>: 60-80 grams</li></ul><p>Look for hallmarks: "925", "STERLING", or "800" to determine purity. Some silver-plated spoons are NOT solid silver and have minimal melt value.</p>' },
  { name: 'Fork', emoji: '🍴', weight: 40, purity: 0.925, file: 'silver-fork-value.html',
    desc: 'Calculate silver fork value by weight. Sterling silver forks typically weigh 25-70 grams.',
    content: '<h2>How Much Is a Silver Fork Worth?</h2><p>Silver forks are commonly found in vintage and antique flatware sets.</p><h3>Typical Weights</h3><ul><li><strong>Salad fork</strong>: 25-35 grams</li><li><strong>Dinner fork</strong>: 35-50 grams</li><li><strong>Serving fork</strong>: 50-70 grams</li></ul>' },
  { name: 'Knife', emoji: '🔪', weight: 55, purity: 0.925, file: 'silver-knife-value.html',
    desc: 'Calculate silver knife value. Note: most silver knives have stainless steel blades with silver handles.',
    content: '<h2>Silver Knife Value</h2><p>Important: Most "silver" knives have solid sterling handles with stainless steel blades. Only the handle is silver.</p><h3>Typical Handle Weights</h3><ul><li><strong>Butter knife (all silver)</strong>: 25-40 grams</li><li><strong>Dinner knife (handle only)</strong>: 30-50 grams silver</li><li><strong>Hollow handle discount</strong>: Deduct 50-60% of total weight for hollow handles</li></ul><p>Weigh the entire knife, then estimate the silver handle weight. Hollow handles contain cement/pitch filler, so actual silver content is less than the handle weight.</p>' },
  { name: 'Tray', emoji: '🍽️', weight: 500, purity: 0.925, file: 'silver-tray-value.html',
    desc: 'Calculate silver tray value. Silver serving trays can weigh 200-2000+ grams.',
    content: '<h2>How Much Is a Silver Tray Worth?</h2><p>Silver trays are among the heaviest pieces of household silver and can contain significant amounts of pure silver.</p><h3>Typical Weights</h3><ul><li><strong>Small bread tray</strong>: 200-400 grams</li><li><strong>Medium serving tray</strong>: 400-800 grams</li><li><strong>Large serving tray</strong>: 800-1,500 grams</li><li><strong>Tea service tray</strong>: 1,000-2,000+ grams</li></ul><p>Silver trays are some of the most valuable scrap silver items due to their substantial weight. Always verify with hallmarks — many trays are silver-plated, not solid silver.</p>' },
  { name: 'Cup', emoji: '🏆', weight: 150, purity: 0.925, file: 'silver-cup-value.html',
    desc: 'Calculate silver cup value. Silver cups and goblets typically weigh 50-300 grams.',
    content: '<h2>Silver Cup Value</h2><p>Silver cups, goblets, and chalices can range from small cordial cups to large trophy-style pieces.</p><h3>Typical Weights</h3><ul><li><strong>Small cordial cup</strong>: 50-80 grams</li><li><strong>Standard cup</strong>: 100-200 grams</li><li><strong>Goblet</strong>: 150-300 grams</li><li><strong>Trophy cup</strong>: 200-500+ grams</li></ul>' },
  { name: 'Plate', emoji: '🍽️', weight: 250, purity: 0.925, file: 'silver-plate-value.html',
    desc: 'Calculate silver plate value. Solid silver plates typically weigh 100-500 grams.',
    content: '<h2>Silver Plate Value</h2><p><strong>Important distinction:</strong> A "silver plate" (solid silver serving plate) is very different from "silver-plated" items coated with thin silver.</p><h3>How to Tell the Difference</h3><ul><li><strong>Solid silver</strong>: Stamped "925", "STERLING", or "800" — valuable</li><li><strong>Silver-plated</strong>: Stamped "EP", "EPNS", "Silver Plate" — minimal silver value</li></ul><h3>Typical Solid Silver Plate Weights</h3><ul><li><strong>Bread plate</strong>: 100-200 grams</li><li><strong>Dinner plate</strong>: 200-400 grams</li><li><strong>Charger plate</strong>: 300-500 grams</li></ul>' }
];

silverware.forEach(s => {
  fs.writeFileSync(path.join(baseDir, s.file), itemPage(s.name, s.emoji, s.weight, s.purity, s.file, s.desc, s.content, silverwareRelated));
  console.log(`Created ${s.file}`);
});

console.log('\\nAll pages generated successfully!');
