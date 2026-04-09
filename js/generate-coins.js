const fs = require('fs');
const path = require('path');
const baseDir = path.join(__dirname, '..');

function coinPage(coinName, coinWeight, coinPurity, filename, desc, content) {
  const titleName = coinName;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titleName} Melt Value Calculator — Live Prices</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="https://scrapsilvercalculater.com/${filename.replace('.html', '')}/">
  <link rel="stylesheet" href="/css/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..900&family=Outfit:wght@400..800&display=swap" rel="stylesheet">
</head>
<body>
  <div id="site-header"></div>
  <main>
    <div class="container"><div id="breadcrumb"></div></div>
    <section class="page-hero"><div class="container"><div id="price-ticker"></div><h1>${titleName} <span class="highlight">Calculator</span></h1><p>Calculate the live silver melt value of ${titleName.toLowerCase()}s instantly.</p></div></section>
    <div class="calc-page-layout">
      <div class="calc-widget">
        <div class="calc-widget-title"><span class="icon">🪙</span> ${titleName} Calculator</div>
        
        <div class="form-group">
          <label class="form-label" for="qty">Quantity of Coins</label>
          <input type="number" class="form-input" id="qty" value="1" min="1" step="1">
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="weight">Weight Per Coin (g)</label>
            <input type="number" class="form-input" id="weight" value="${coinWeight}" step="0.01" readonly style="background:#f3f4f6; color:#6b7280; border-color:#d1d5db;">
          </div>
          <div class="form-group">
            <label class="form-label" for="purity">Purity</label>
            <input type="text" class="form-input" id="purity" value="${(coinPurity*100).toFixed(1)}%" readonly style="background:#f3f4f6; color:#6b7280; border-color:#d1d5db;">
          </div>
        </div>

        <button class="btn btn-primary btn-full" id="calc-btn" style="margin-top:var(--space-md);">Calculate Melt Value</button>
        <div class="result-display">
          <div class="result-label">Total Melt Value</div>
          <div class="result-value" id="result-value">$0.00</div>
          <div class="result-detail" id="result-detail"></div>
        </div>
      </div>
      <div class="content-body">${content}</div>
      <div><h3 style="margin-bottom:var(--space-lg);">Related Coin Tools</h3><div class="related-grid">
        <a href="/junk-silver-calculator/" class="related-link"><span class="r-icon">🪙</span> Junk Silver Calc</a>
        <a href="/face-value-silver-calculator/" class="related-link"><span class="r-icon">💵</span> Face Value Calc</a>
        <a href="/silver-coin-value-calculator/" class="related-link"><span class="r-icon">🏛️</span> All Silver Coins</a>
      </div></div>
    </div>
  </main>
  <div id="site-footer"></div>
  <script src="/js/silver-price.js" defer></script><script src="/js/calculator.js" defer></script><script src="/js/components.js" defer></script>
  <script>
    SiteComponents.renderPriceTicker('price-ticker');
    SiteComponents.renderBreadcrumb('breadcrumb',[{label:'Home',href:'/'},{label:'${titleName} Calculator'}]);
    
    const q=document.getElementById('qty');
    function calc() {
      const qty=parseInt(q.value)||0;
      const totalWeightGrams = qty * ${coinWeight};
      const purity = ${coinPurity};
      const spot=SilverPrice.getPrice();
      
      const r=SilverCalc.meltValue(totalWeightGrams, purity, spot);
      
      if(qty > 0) {
        document.getElementById('result-value').textContent=SilverCalc.formatCurrency(r.value);
        document.getElementById('result-detail').textContent=r.silverContentGrams+'g pure silver · '+r.silverContentOz+' oz · Spot: $'+spot.toFixed(2)+'/oz';
      } else {
        document.getElementById('result-value').textContent='$0.00';
        document.getElementById('result-detail').textContent='Enter quantity';
      }
    }
    q.addEventListener('input',calc);
    SilverPrice.onPriceUpdate(()=>calc());
    calc();

    // Add listener to Calculate button
    const cb = document.getElementById('calc-btn');
    if (cb) {
      const fn = typeof calculate === 'function' ? calculate : (typeof calc === 'function' ? calc : null);
      if (fn) cb.addEventListener('click', fn);
    }
  </script>
</body>
</html>`;
}

const coins = [
  { 
    name: 'Silver Dollar', weight: 26.73, purity: 0.90, file: 'silver-dollar-calculator',
    slug: 'silver-dollar-calculator',
    desc: 'Calculate the melt value of Morgan and Peace Silver Dollars based on live silver spot pricing.',
    content: '<h2>How Much is a Silver Dollar Worth?</h2><p>Pre-1935 US Silver Dollars (like Morgan Dollars and Peace Dollars) contain 90% silver and 10% copper. Each coin weighs 26.73 grams, meaning it contains exactly <strong>0.7734 troy ounces</strong> of pure silver.</p><h3>Melt Value vs. Numismatic Value</h3><p>Unlike common 90% silver dimes or quarters, Silver Dollars almost always carry a numismatic (collectible) premium. A Morgan Dollar in excellent condition can be worth hundreds of dollars, far above its basic melt value. Always check the mint mark and year before selling a silver dollar for scrap!</p>' 
  },
  { 
    name: 'Silver Quarter', weight: 6.25, purity: 0.90, file: 'silver-quarter-calculator',
    slug: 'silver-quarter-calculator',
    desc: 'Calculate the melt value of pre-1965 Washington Silver Quarters instantly.',
    content: '<h2>How Much is a Silver Quarter Worth?</h2><p>Any US Washington Quarter minted in 1964 or earlier is made of 90% silver. Each quarter weighs 6.25 grams and contains <strong>0.1808 troy ounces</strong> of pure silver content.</p><h3>How to Identify a Silver Quarter</h3><p>Look at the edge of the quarter. If you see a solid silver stripe, it is 90% silver. If you see a copper-colored stripe, it is a modern clad quarter (1965-present) with no silver content.</p>' 
  },
  { 
    name: 'Silver Dime', weight: 2.50, purity: 0.90, file: 'silver-dime-calculator',
    slug: 'silver-dime-calculator',
    desc: 'Calculate the live melt value of pre-1965 Roosevelt and Mercury Silver Dimes.',
    content: '<h2>How Much is a Silver Dime Worth?</h2><p>Pre-1965 US Dimes (Roosevelt and Mercury series) contain 90% silver. Each coin weighs 2.50 grams and yields <strong>0.0723 troy ounces</strong> of pure silver.</p><h3>The Most Common "Junk Silver"</h3><p>Silver dimes are highly favored by "stackers" and survivalists because their fractional silver content makes them excellent for small bartering scenarios. Remember: 10 silver dimes equals exactly the same amount of silver as 4 silver quarters.</p>' 
  },
  { 
    name: 'Canadian Silver Coin', weight: 23.33, purity: 0.80, file: 'canadian-silver-coin-calculator',
    slug: 'canadian-silver-coin-calculator',
    desc: 'Calculate the melt value of Canadian 80% and 50% silver coins.',
    content: '<h2>Canadian Silver Coin Value</h2><p>Unlike US junk silver which is uniformly 90%, pre-1968 Canadian silver coins are typically <strong>80% silver</strong>. (Note: 1967 and 1968 coins can be either 80% or 50% silver, requiring a magnet test to be sure).</p><p>This calculator defaults to the standard Canadian 80% silver purity. A pre-1968 Canadian silver dollar contains 0.600 troy ounces of pure silver.</p>' 
  }
];

coins.forEach(c => {
  const finalFilename = c.file.endsWith('.html') ? c.file : c.file + '.html';
  fs.writeFileSync(path.join(baseDir, finalFilename), coinPage(c.name, c.weight, c.purity, finalFilename, c.desc, c.content));
  console.log(`Created ${finalFilename}`);
});

// One special Face Value calculator
const faceValueHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Face Value Silver Calculator — 90% Junk Silver</title>
  <meta name="description" content="Calculate silver value by entering the total face value of your 90% US silver coins ($1 Face Value = 0.715 oz pure silver).">
  <link rel="canonical" href="https://scrapsilvercalculater.com/face-value-silver-calculator/">
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <div id="site-header"></div>
  <main>
    <div class="container"><div id="breadcrumb"></div></div>
    <section class="page-hero"><div class="container"><div id="price-ticker"></div><h1>Face Value Silver <span class="highlight">Calculator</span></h1><p>Find the melt value of your 90% silver coins based purely on their total face value.</p></div></section>
    <div class="calc-page-layout">
      <div class="calc-widget">
        <div class="calc-widget-title"><span class="icon">💵</span> Face Value Calculator</div>
        
        <div class="form-group">
          <label class="form-label" for="face-val">Total Face Value ($)</label>
          <div class="input-group">
            <span class="input-prefix">$</span>
            <input type="number" class="form-input" id="face-val" value="10.00" min="0.10" step="0.10">
          </div>
        </div>

        <button class="btn btn-primary btn-full" id="calc-btn" style="margin-top:var(--space-md);">Calculate Melt Value</button>
        <div class="result-display">
          <div class="result-label">Total Silver Melt Value</div>
          <div class="result-value" id="result-value">$0.00</div>
          <div class="result-detail" id="result-detail"></div>
        </div>
      </div>
      <div class="content-body">
        <h2>How to Calculate Silver by Face Value</h2>
        <p>If you have a mixed bag of pre-1965 US silver dimes, quarters, and half dollars, you don't need to count them out individually. You can simply add up their legal tender "Face Value".</p>
        <p>Because these coins were minted with proportional weights, <strong>$1.00 Face Value always equals roughly 0.715 troy ounces of pure silver</strong> (accounting for historical wear and tear).</p>
        <ul>
          <li>10 Dimes = $1.00 FV</li>
          <li>4 Quarters = $1.00 FV</li>
          <li>2 Half Dollars = $1.00 FV</li>
        </ul>
        <p><em>Note: This 0.715 multiplier applies to circulated 90% silver coins. Uncirculated coins contain closer to 0.723 oz, and Silver Dollars (Morgans/Peace) use a different multiplier entirely (0.7734 oz per dollar).</em></p>
      </div>
      <div><h3 style="margin-bottom:var(--space-lg);">Related Coin Tools</h3><div class="related-grid">
        <a href="/junk-silver-calculator/" class="related-link"><span class="r-icon">🪙</span> Junk Silver Calc</a>
        <a href="/silver-dime-calculator/" class="related-link"><span class="r-icon">🪙</span> Silver Dimes</a>
        <a href="/silver-quarter-calculator/" class="related-link"><span class="r-icon">🪙</span> Silver Quarters</a>
      </div></div>
    </div>
  </main>
  <div id="site-footer"></div>
  <script src="/js/silver-price.js" defer></script><script src="/js/calculator.js" defer></script><script src="/js/components.js" defer></script>
  <script>
    SiteComponents.renderPriceTicker('price-ticker');
    SiteComponents.renderBreadcrumb('breadcrumb',[{label:'Home',href:'/'},{label:'Face Value Calculator'}]);
    
    const f=document.getElementById('face-val');
    function calc() {
      const faceVal=parseFloat(f.value)||0;
      // $1 FV = 0.715 oz of pure silver
      const totalOz = faceVal * 0.715;
      const spot=SilverPrice.getPrice();
      const meltValue = totalOz * spot;
      
      if(faceVal > 0) {
        document.getElementById('result-value').textContent=SilverCalc.formatCurrency(meltValue);
        document.getElementById('result-detail').textContent=totalOz.toFixed(3)+' oz pure silver · Spot: $'+spot.toFixed(2)+'/oz';
      } else {
        document.getElementById('result-value').textContent='$0.00';
        document.getElementById('result-detail').textContent='Enter face value';
      }
    }
    f.addEventListener('input',calc);
    SilverPrice.onPriceUpdate(()=>calc());
    calc();

    // Add listener to Calculate button
    const cb = document.getElementById('calc-btn');
    if (cb) {
      const fn = typeof calculate === 'function' ? calculate : (typeof calc === 'function' ? calc : null);
      if (fn) cb.addEventListener('click', fn);
    }
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(baseDir, 'face-value-silver-calculator.html'), faceValueHTML);
console.log('Created face-value-silver-calculator.html');
