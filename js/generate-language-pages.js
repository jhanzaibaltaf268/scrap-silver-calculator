const fs = require('fs');
const path = require('path');
const baseDir = path.resolve(__dirname, '..');
const { languages } = require('./generate-languages');
const moreLangs = require('./generate-languages-data');

const allLangs = [...languages, ...moreLangs];
const allCodes = allLangs.map(l => l.code);

function hreflangTags() {
  let tags = `<link rel="alternate" hreflang="en" href="https://silvercalc.com/">\n`;
  tags += `  <link rel="alternate" hreflang="x-default" href="https://silvercalc.com/">\n`;
  allCodes.forEach(c => {
    tags += `  <link rel="alternate" hreflang="${c}" href="https://silvercalc.com/${c}/">\n`;
  });
  return tags;
}

function langSwitcher(currentCode) {
  const flags = {es:'🇪🇸',fr:'🇫🇷',de:'🇩🇪',pt:'🇧🇷',hi:'🇮🇳',ur:'🇵🇰',ar:'🇸🇦',tr:'🇹🇷',it:'🇮🇹',zh:'🇨🇳',ru:'🇷🇺'};
  let html = '<div class="lang-switcher">';
  html += `<a href="../index.html" class="lang-btn ${currentCode === 'en' ? 'active' : ''}">🇬🇧 EN</a>`;
  allLangs.forEach(l => {
    html += `<a href="../${l.code}/index.html" class="lang-btn ${l.code===currentCode?'active':''}">${flags[l.code]||'🌐'} ${l.code.toUpperCase()}</a>`;
  });
  html += '</div>';
  return html;
}

function generateHomepage(lang) {
  const t = lang.t;
  const dirAttr = lang.dir === 'rtl' ? ' dir="rtl"' : '';
  const rtlCSS = lang.dir === 'rtl' ? `
      body { direction: rtl; text-align: right; }
      .nav-links { flex-direction: row-reverse; }
      .category-grid { direction: rtl; }
      .step-card { text-align: right; }
      .lang-switcher { direction: ltr; }
      .faq-question { text-align: right; }
      .content-scroll-block ul li::before { margin-right: 0; margin-left: var(--space-sm); }` : '';

  return `<!DOCTYPE html>
<html lang="${lang.code}"${dirAttr}>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.siteTitle}</title>
  <meta name="description" content="${t.metaDesc}">
  <link rel="canonical" href="https://silvercalc.com/${lang.code}/">
  ${hreflangTags()}
  <link rel="stylesheet" href="../css/style.css?v=2.1">
  <style>
    .section-compact { padding: var(--space-2xl) 0; }
    .section-compact .section-title { margin-bottom: var(--space-sm); }
    .section-compact .section-subtitle { margin: 0 auto var(--space-lg); }
    .hero-compact { padding: var(--space-2xl) 0 var(--space-xl); }
    .hero-compact h1 { margin-bottom: var(--space-sm); }
    .hero-compact .hero-subtitle { margin: 0 auto var(--space-lg); }
    .lang-switcher { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; padding: 8px 0; background: rgba(5,5,10,0.95); border-bottom: 1px solid rgba(255,255,255,0.08); position: fixed; top: 0; left: 0; right: 0; z-index: 1100; }
    body { padding-top: calc(var(--header-height) + 36px) !important; }
    .site-header { top: 36px !important; }
    .lang-btn { padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; color: var(--text-secondary); text-decoration: none; transition: all 0.2s; background: rgba(255,255,255,0.05); }
    .lang-btn:hover, .lang-btn.active { background: var(--accent-primary); color: #fff; }
    .faq-scroll-panel { max-height: 480px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: var(--silver-600) transparent; padding-right: var(--space-sm); }
    .faq-scroll-panel::-webkit-scrollbar { width: 6px; }
    .faq-scroll-panel::-webkit-scrollbar-track { background: transparent; }
    .faq-scroll-panel::-webkit-scrollbar-thumb { background: var(--silver-600); border-radius: 3px; }
    .content-scroll-block { max-height: 500px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: var(--silver-600) transparent; padding-right: var(--space-md); margin: var(--space-lg) 0; }
    .content-scroll-block::-webkit-scrollbar { width: 6px; }
    .content-scroll-block::-webkit-scrollbar-track { background: transparent; }
    .content-scroll-block::-webkit-scrollbar-thumb { background: var(--silver-600); border-radius: 3px; }
    .content-scroll-block h3 { margin-top: var(--space-xl); margin-bottom: var(--space-sm); }
    .content-scroll-block p, .content-scroll-block ul { margin-bottom: var(--space-md); }
    .content-scroll-block ul li { padding: var(--space-xs) 0; color: var(--text-secondary); }
    .content-scroll-block ul li::before { content: '•'; color: var(--accent-primary); margin-right: var(--space-sm); }
    .entity-scroller { display: flex; flex-wrap: nowrap; gap: var(--space-sm); overflow-x: auto; padding: var(--space-sm) 0 var(--space-md); scrollbar-width: thin; scrollbar-color: var(--silver-600) transparent; -webkit-overflow-scrolling: touch; }
    .entity-scroller::-webkit-scrollbar { height: 5px; }
    .entity-scroller::-webkit-scrollbar-thumb { background: var(--silver-600); border-radius: 3px; }
    .entity-pill { flex-shrink: 0; padding: 6px var(--space-md); background: linear-gradient(135deg, rgba(192,192,192,0.08), rgba(192,192,192,0.02)); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); font-size: var(--fs-xs); color: var(--text-muted); white-space: nowrap; }
    ${rtlCSS}
  </style>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "${t.h1}",
    "description": "${t.metaDesc}",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "inLanguage": "${lang.code}",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  }
  </script>
</head>
<body>
  ${langSwitcher(lang.code)}
  <div id="site-header"></div>

  <main>
    <section class="hero hero-compact">
      <div class="container hero-content">
        <div id="price-ticker"></div>
        <h1><span class="highlight">${t.h1}</span></h1>
        <p class="hero-subtitle">${t.heroSub}</p>

        <!-- Main Calculator Widget -->
        <div class="calc-widget slide-up" id="hero-calc" style="max-width:600px;margin:0 auto;">
          <div class="calc-widget-title"><span class="icon">⚖️</span> ${t.calcTitle || t.calcWidgetTitle || 'Silver Scrap Value Calculator'}</div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="calc-weight">${t.weight}</label>
              <div class="input-group">
                <input type="number" class="form-input" id="calc-weight" placeholder="10" step="0.01" min="0" value="10">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="calc-unit">${t.unit}</label>
              <select class="form-select" id="calc-unit">
                <option value="g" selected>${t.grams}</option>
                <option value="ozt">${t.troyOz}</option>
                <option value="oz">${t.ozReg}</option>
                <option value="kg">${t.kg}</option>
                <option value="dwt">${t.dwt}</option>
                <option value="tola">${t.tola}</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="calc-purity">${t.purity}</label>
            <select class="form-select" id="calc-purity">
              <option value="0.999">999 — Fine (99.9%)</option>
              <option value="0.958">958 — Britannia (95.8%)</option>
              <option value="0.925" selected>925 — Sterling (92.5%)</option>
              <option value="0.900">900 — Coin (90.0%)</option>
              <option value="0.835">835 — (83.5%)</option>
              <option value="0.800">800 — (80.0%)</option>
              <option value="0.500">500 — (50.0%)</option>
            </select>
          </div>

          <div class="result-display" id="hero-result">
            <div class="result-label">${t.meltValue || 'Estimated Melt Value'}</div>
            <div class="result-value" id="hero-result-value">$0.00</div>
            <div class="result-detail" id="hero-result-detail">${t.spot}: $--/oz · ${t.purityLabel}: 92.5% · ${t.totalSilver}: 0.000 oz</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-compact" style="background: var(--bg-secondary);">
      <div class="container text-center">
        <span class="section-badge">🧰 ${t.allCalcTitle}</span>
        <h2 class="section-title">${t.allCalcTitle}</h2>
        <p class="section-subtitle">${t.allCalcSub}</p>
        <div class="category-grid stagger">
          <a href="../silver-scrap-calculator.html" class="category-card"><div class="category-icon">♻️</div><h3>${t.scrapCalc}</h3><p>${t.scrapCalcDesc}</p></a>
          <a href="../silver-melt-value-calculator.html" class="category-card"><div class="category-icon">🔥</div><h3>${t.meltCalc}</h3><p>${t.meltCalcDesc}</p></a>
          <a href="../sterling-silver-calculator.html" class="category-card"><div class="category-icon">✨</div><h3>${t.sterlingCalc}</h3><p>${t.sterlingCalcDesc}</p></a>
          <a href="../junk-silver-calculator.html" class="category-card"><div class="category-icon">🪙</div><h3>${t.junkCalc}</h3><p>${t.junkCalcDesc}</p></a>
          <a href="../silver-coin-value-calculator.html" class="category-card"><div class="category-icon">🏛️</div><h3>${t.coinCalc}</h3><p>${t.coinCalcDesc}</p></a>
          <a href="../gold-and-silver-calculator.html" class="category-card"><div class="category-icon">🥇</div><h3>${t.goldSilverCalc}</h3><p>${t.goldSilverCalcDesc}</p></a>
          <a href="../silver-bar-value-calculator.html" class="category-card"><div class="category-icon">🧱</div><h3>${t.barCalc}</h3><p>${t.barCalcDesc}</p></a>
          <a href="../silver-jewelry-value-calculator.html" class="category-card"><div class="category-icon">💍</div><h3>${t.jewelryCalc}</h3><p>${t.jewelryCalcDesc}</p></a>
          <a href="../silverware-value-calculator.html" class="category-card"><div class="category-icon">🍴</div><h3>${t.silverwareCalc}</h3><p>${t.silverwareCalcDesc}</p></a>
          <a href="../silver-price-per-gram.html" class="category-card"><div class="category-icon">📊</div><h3>${t.priceGram}</h3><p>${t.priceGramDesc}</p></a>
          <a href="../silver-price-per-ounce.html" class="category-card"><div class="category-icon">💲</div><h3>${t.priceOz}</h3><p>${t.priceOzDesc}</p></a>
        </div>
      </div>
    </section>

    <section class="section-compact">
      <div class="container text-center">
        <span class="section-badge">🛠️</span>
        <h2 class="section-title">${t.toolsTitle}</h2>
        <p class="section-subtitle">${t.toolsSub}</p>
        <div class="category-grid stagger" style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));">
          <a href="../silver-profit-calculator.html" class="category-card"><div class="category-icon">📈</div><h3>${t.profitCalc}</h3><p>${t.profitCalcDesc}</p></a>
          <a href="../face-value-silver-calculator.html" class="category-card"><div class="category-icon">💵</div><h3>${t.faceValCalc}</h3><p>${t.faceValCalcDesc}</p></a>
          <a href="../silver-batch-calculator.html" class="category-card"><div class="category-icon">📋</div><h3>${t.batchCalc}</h3><p>${t.batchCalcDesc}</p></a>
          <a href="../silver-weight-converter.html" class="category-card"><div class="category-icon">⚖️</div><h3>${t.converterCalc}</h3><p>${t.converterCalcDesc}</p></a>
          <a href="../silver-sell-or-hold.html" class="category-card"><div class="category-icon">📈</div><h3>${t.sellHold}</h3><p>${t.sellHoldDesc}</p></a>
          <a href="../silver-price-all-currencies.html" class="category-card"><div class="category-icon">🌍</div><h3>${t.currencies}</h3><p>${t.currenciesDesc}</p></a>
        </div>
      </div>
    </section>

    <section class="section-compact" style="background: var(--bg-secondary);">
      <div class="container text-center">
        <span class="section-badge">📋</span>
        <h2 class="section-title">${t.howTitle}</h2>
        <p class="section-subtitle">${t.howSub}</p>
        <div class="steps-grid stagger">
          <div class="step-card"><div class="step-number">1</div><h4>${t.step1}</h4><p>${t.step1Desc}</p></div>
          <div class="step-card"><div class="step-number">2</div><h4>${t.step2}</h4><p>${t.step2Desc}</p></div>
          <div class="step-card"><div class="step-number">3</div><h4>${t.step3}</h4><p>${t.step3Desc}</p></div>
        </div>
      </div>
    </section>

    <section class="section-compact">
      <div class="container">
        <div class="content-body">
          <h2>${t.contentTitle}</h2>
          <div class="content-scroll-block">
            ${t.contentBody || getDefaultContentBody(lang.code)}
          </div>
        </div>
      </div>
    </section>

    <section class="section-compact" style="background: var(--bg-secondary);">
      <div class="container">
        <h3 class="text-center" style="font-size:var(--fs-lg);margin-bottom:var(--space-md);">${t.entitiesTitle || 'Silver & Precious Metals'}</h3>
        <div class="entity-scroller">
          <span class="entity-pill">Silver (Ag)</span>
          <span class="entity-pill">Troy Ounce</span>
          <span class="entity-pill">Spot Price</span>
          <span class="entity-pill">COMEX</span>
          <span class="entity-pill">LBMA</span>
          <span class="entity-pill">Sterling 925</span>
          <span class="entity-pill">Fine Silver 999</span>
          <span class="entity-pill">Coin Silver 900</span>
          <span class="entity-pill">Melt Value</span>
          <span class="entity-pill">Scrap Metal</span>
          <span class="entity-pill">Precious Metals</span>
          <span class="entity-pill">Bullion</span>
          <span class="entity-pill">Hallmark</span>
          <span class="entity-pill">Pennyweight</span>
          <span class="entity-pill">Numismatic</span>
          <span class="entity-pill">Junk Silver</span>
          <span class="entity-pill">Silver Alloy</span>
          <span class="entity-pill">Tola</span>
          <span class="entity-pill">XRF Analysis</span>
          <span class="entity-pill">Morgan Dollar</span>
          <span class="entity-pill">Silver Eagle</span>
        </div>
      </div>
    </section>

    <section class="section-compact" id="faq">
      <div class="container">
        <div class="text-center">
          <h2 class="section-title">${t.faqTitle}</h2>
        </div>
        <div class="faq-scroll-panel">
          <div class="faq-list">
            ${getFAQItems(lang.code, t)}
          </div>
        </div>
      </div>
    </section>
  </main>

  <div id="site-footer"></div>

  <script>
    window.MenuTranslations = ${JSON.stringify(getMenuTranslations(lang.code))};
  </script>
  <script src="../js/silver-price.js?v=2.1"></script>
  <script src="../js/calculator.js?v=2.1"></script>
  <script src="../js/components.js?v=2.1"></script>
  <script>
    SiteComponents.renderPriceTicker('price-ticker');

    const weightInput = document.getElementById('calc-weight');
    const unitSelect = document.getElementById('calc-unit');
    const puritySelect = document.getElementById('calc-purity');
    const resultValue = document.getElementById('hero-result-value');
    const resultDetail = document.getElementById('hero-result-detail');

    function calculate() {
      const weight = parseFloat(weightInput.value) || 0;
      const unit = unitSelect.value;
      const purity = parseFloat(puritySelect.value);
      const spotPrice = SilverPrice.getPrice();
      if (weight <= 0) { resultValue.textContent = '$0.00'; resultDetail.textContent = t.spot + ': --'; return; }
      const weightGrams = SilverCalc.toGrams(weight, unit);
      const result = SilverCalc.meltValue(weightGrams, purity, spotPrice);
      resultValue.textContent = SilverCalc.formatCurrency(result.value);
      resultDetail.textContent = result.silverContentGrams + 'g · ' + result.silverContentOz + ' troy oz · ' + t.spot + ': $' + spotPrice.toFixed(2) + '/oz';
    }

    weightInput.addEventListener('input', calculate);
    unitSelect.addEventListener('change', calculate);
    puritySelect.addEventListener('change', calculate);
    SilverPrice.onPriceUpdate(() => calculate());
    calculate();

    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => { btn.closest('.faq-item').classList.toggle('open'); });
    });
  </script>
</body>
</html>`;
}

function generateScrapCalculatorPage(lang) {
  const t = lang.t;
  const dirAttr = lang.dir === 'rtl' ? ' dir="rtl"' : '';
  const rtlCSS = lang.dir === 'rtl' ? `
      body { direction: rtl; text-align: right; }
      .nav-links { flex-direction: row-reverse; }
      .category-grid { direction: rtl; }
      .lang-switcher { direction: ltr; }
      .calc-widget { text-align: right; }
      .content-body ul li { text-align: right; }` : '';

  return `<!DOCTYPE html>
<html lang="${lang.code}"${dirAttr}>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.innerScrapTitle}</title>
  <meta name="description" content="${t.innerScrapDesc}">
  <link rel="canonical" href="https://silvercalc.com/${lang.code}/silver-scrap-calculator.html">
  <link rel="stylesheet" href="../css/style.css">
  <style>
    .lang-switcher { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; padding: 8px 0; background: rgba(5,5,10,0.95); border-bottom: 1px solid rgba(255,255,255,0.08); position: fixed; top: 0; left: 0; right: 0; z-index: 1100; }
    body { padding-top: calc(var(--header-height) + 36px) !important; }
    .site-header { top: 36px !important; }
    .lang-btn { padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; color: var(--text-secondary); text-decoration: none; transition: all 0.2s; background: rgba(255,255,255,0.05); }
    .lang-btn:hover, .lang-btn.active { background: var(--accent-primary); color: #fff; }
    ${rtlCSS}
  </style>
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"WebApplication","name":"${t.calcWidgetTitleScrap}","description":"${t.innerScrapDesc}","applicationCategory":"FinanceApplication","inLanguage":"${lang.code}","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}
  </script>
</head>
<body>
  ${langSwitcher(lang.code)}
  <div id="site-header"></div>
  <main>
    <div class="container">
      <div id="breadcrumb"></div>
    </div>
    <section class="page-hero">
      <div class="container">
        <div id="price-ticker"></div>
        <h1>${t.innerScrapH1}</h1>
        <p>${t.innerScrapSub}</p>
      </div>
    </section>
    <div class="calc-page-layout">
      <div class="calc-widget" style="max-width: 600px; margin: 0 auto;">
        <div class="calc-widget-title"><span class="icon">♻️</span> ${t.calcWidgetTitleScrap}</div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="weight">${t.weight}</label>
            <input type="number" class="form-input" id="weight" placeholder="15" step="0.01" min="0" value="10">
          </div>
          <div class="form-group">
            <label class="form-label" for="unit">${t.unit}</label>
            <select class="form-select" id="unit">
              <option value="g" selected>${t.grams}</option>
              <option value="oz">${t.troyOz}</option>
              <option value="dwt">${t.dwt}</option>
              <option value="kg">${t.kg}</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="purity">${t.purity}</label>
          <select class="form-select" id="purity">
            <option value="0.999">999 (99.9%)</option>
            <option value="0.958">958 (95.8%)</option>
            <option value="0.925" selected>925 (92.5%)</option>
            <option value="0.900">900 (90%)</option>
            <option value="0.835">835 (83.5%)</option>
            <option value="0.800">800 (80%)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label" for="discount">${t.dealerDiscount}</label>
          <select class="form-select" id="discount">
            <option value="0">${t.discount0}</option>
            <option value="0.05">${t.discount5}</option>
            <option value="0.10">${t.discount10}</option>
            <option value="0.15" selected>${t.discount15}</option>
            <option value="0.20">${t.discount20}</option>
            <option value="0.25">${t.discount25}</option>
          </select>
        </div>
        <div class="result-display">
          <div class="result-label">${t.meltValue}</div>
          <div class="result-value" id="result-melt">$0.00</div>
          <div class="result-detail" id="result-melt-detail"></div>
        </div>
        <div class="result-display" style="margin-top: var(--space-md); border-color: var(--accent-green); background: linear-gradient(135deg, rgba(52,211,153,0.08) 0%, rgba(52,211,153,0.02) 100%);">
          <div class="result-label">${t.estDealerPayout}</div>
          <div class="result-value" id="result-scrap" style="background: linear-gradient(135deg, #34d399, #6ee7b7); -webkit-background-clip: text; background-clip: text;">$0.00</div>
          <div class="result-detail" id="result-scrap-detail"></div>
        </div>
      </div>

      <div class="content-body" style="max-width: 800px; margin: var(--space-2xl) auto;">
        <h2>${t.innerScrapContent1H2}</h2>
        <p>${t.innerScrapContent1P}</p>
        <ul>
          <li>${t.innerScrapContent1L1}</li>
          <li>${t.innerScrapContent1L2}</li>
          <li>${t.innerScrapContent1L3}</li>
        </ul>
        <h2>${t.innerScrapContent2H2}</h2>
        <p>${t.innerScrapContent2P}</p>
        <ul>
          <li>${t.innerScrapContent2L1}</li>
          <li>${t.innerScrapContent2L2}</li>
          <li>${t.innerScrapContent2L3}</li>
          <li>${t.innerScrapContent2L4}</li>
          <li>${t.innerScrapContent2L5}</li>
        </ul>
        <h2>${t.innerScrapContent3H2}</h2>
        <ul>
          <li>${t.innerScrapContent3L1}</li>
          <li>${t.innerScrapContent3L2}</li>
          <li>${t.innerScrapContent3L3}</li>
          <li>${t.innerScrapContent3L4}</li>
          <li>${t.innerScrapContent3L5}</li>
        </ul>
      </div>
      
      <div class="container text-center" style="max-width: 800px; margin: 0 auto; margin-bottom: var(--space-4xl);">
        <h3 style="margin-bottom: var(--space-lg);">${t.relatedCalcs}</h3>
        <div class="category-grid" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
          <a href="../silver-melt-value-calculator.html" class="category-card" style="padding: var(--space-md);">🔥 ${t.meltCalc}</a>
          <a href="../sterling-silver-calculator.html" class="category-card" style="padding: var(--space-md);">✨ ${t.sterlingCalc}</a>
          <a href="../silver-jewelry-value-calculator.html" class="category-card" style="padding: var(--space-md);">💍 ${t.jewelryCalc}</a>
        </div>
      </div>
    </div>
  </main>
  <div id="site-footer"></div>
  <script>
    window.MenuTranslations = ${JSON.stringify(getMenuTranslations(lang.code))};
  </script>
  <script src="../js/silver-price.js?v=2.1"></script>
  <script src="../js/calculator.js?v=2.1"></script>
  <script src="../js/components.js?v=2.1"></script>
  <script>
    SiteComponents.renderPriceTicker('price-ticker');
    
    // Attempting to render simple translated breadcrumb
    const homeMenuText = window.MenuTranslations["Home"] || "Home";
    SiteComponents.renderBreadcrumb('breadcrumb', [
      {label: homeMenuText, href:'index.html'},
      {label:'${t.calcWidgetTitleScrap}'}
    ]);
    
    const w = document.getElementById('weight');
    const u = document.getElementById('unit');
    const p = document.getElementById('purity');
    const d = document.getElementById('discount');
    function calc() {
      const weight = parseFloat(w.value) || 0;
      const grams = SilverCalc.toGrams(weight, u.value);
      const purity = parseFloat(p.value);
      const disc = parseFloat(d.value);
      const spot = SilverPrice.getPrice();
      const result = SilverCalc.scrapValue(grams, purity, spot, disc);
      
      const payoutVal = SilverCalc.formatCurrency(result.scrapValue);
      const discountVal = SilverCalc.formatCurrency(result.discount);
      
      document.getElementById('result-melt').textContent = SilverCalc.formatCurrency(result.value);
      document.getElementById('result-melt-detail').textContent = result.silverContentGrams + 'g · ' + result.silverContentOz + ' oz · ${t.spot}: $' + spot.toFixed(2) + '/oz';
      document.getElementById('result-scrap').textContent = payoutVal;
      document.getElementById('result-scrap-detail').textContent = '-' + (disc*100).toFixed(0) + '% (−' + discountVal + ')';
    }
    [w,u,p,d].forEach(el => el.addEventListener('input', calc));
    [u,p,d].forEach(el => el.addEventListener('change', calc));
    SilverPrice.onPriceUpdate(() => calc());
    calc();
  </script>
</body>
</html>`;
}

function getDefaultContentBody(code) {
  const content = {
    es: `<h3>Cómo se Calcula el Valor de Fusión de la Plata</h3><p>El valor de cualquier artículo de plata depende de tres factores: <strong>peso</strong>, <strong>pureza</strong> y <strong>precio spot</strong>. La fórmula es: Valor = Peso (onzas troy) × Pureza × Precio Spot.</p><ul><li><strong>Peso</strong> — El peso total en gramos, onzas troy o kilogramos</li><li><strong>Pureza</strong> — Porcentaje de plata real: 999 fina (99.9%), 925 esterlina (92.5%), 900 moneda (90%)</li><li><strong>Precio Spot</strong> — Precio actual por onza troy en mercados globales como COMEX y LBMA</li></ul><h3>¿Qué es la Plata de Desecho?</h3><p>La plata de desecho es cualquier artículo de plata valorado principalmente por su contenido metálico. Incluye: joyería rota, cubiertos viejos, monedas de plata anteriores a 1965 y residuos industriales.</p><h3>Cómo Identificar Plata Real</h3><p>Busque sellos: 925, 800, 999, STERLING. La plata real NO es magnética. Los artículos chapados (EP, EPNS) contienen muy poca plata y no valen como desecho.</p><h3>¿Cuánto Pagan los Compradores?</h3><ul><li>Refinadores en línea: 90-97% del valor de fusión</li><li>Compradores locales: 85-95%</li><li>Casas de empeño: 50-80%</li></ul>`,

    fr: `<h3>Comment la Valeur de Fonte est Calculée</h3><p>La valeur de tout article en argent dépend de trois facteurs : <strong>poids</strong>, <strong>pureté</strong> et <strong>prix spot</strong>. La formule : Valeur = Poids (once troy) × Pureté × Prix Spot.</p><ul><li><strong>Poids</strong> — En grammes, onces troy ou kilogrammes</li><li><strong>Pureté</strong> — Pourcentage d'argent : 999 fin (99.9%), 925 sterling (92.5%), 900 pièce (90%)</li><li><strong>Prix Spot</strong> — Prix actuel sur les marchés mondiaux</li></ul><h3>Qu'est-ce que la Ferraille d'Argent ?</h3><p>Tout article en argent vendu pour sa teneur en métal : bijoux cassés, couverts anciens, pièces de monnaie en argent. Notre calculateur vous montre la valeur exacte.</p><h3>Comment Identifier le Vrai Argent</h3><p>Cherchez les poinçons : 925, 800, 999, STERLING. L'argent réel n'est PAS magnétique. Les articles plaqués contiennent très peu d'argent.</p>`,

    de: `<h3>Wie der Schmelzwert Berechnet Wird</h3><p>Der Wert eines Silberartikels hängt von drei Faktoren ab: <strong>Gewicht</strong>, <strong>Reinheit</strong> und <strong>Spotpreis</strong>. Formel: Wert = Gewicht (Feinunzen) × Reinheit × Spotpreis.</p><ul><li><strong>Gewicht</strong> — In Gramm, Feinunzen oder Kilogramm</li><li><strong>Reinheit</strong> — Silberanteil: 999 (99.9%), 925 Sterling (92.5%), 900 Münze (90%)</li><li><strong>Spotpreis</strong> — Aktueller Marktpreis an Börsen wie COMEX</li></ul><h3>Was ist Silberschrott?</h3><p>Silberschrott umfasst beschädigten Schmuck, altes Besteck, Silbermünzen und industrielle Abfälle — alles, was für seinen Silbergehalt verkauft wird.</p><h3>Echtes Silber Erkennen</h3><p>Suchen Sie nach Stempeln: 925, 800, 999, STERLING. Silber ist NICHT magnetisch. Versilberte Gegenstände (EP, EPNS) haben kaum Silberwert.</p>`,

    pt: `<h3>Como o Valor de Fusão é Calculado</h3><p>O valor de qualquer item de prata depende de: <strong>peso</strong>, <strong>pureza</strong> e <strong>preço spot</strong>. Fórmula: Valor = Peso (onças troy) × Pureza × Preço Spot.</p><ul><li><strong>Peso</strong> — Em gramas, onças troy ou quilogramas</li><li><strong>Pureza</strong> — Porcentagem de prata: 999 (99.9%), 925 esterlina (92.5%), 900 moeda (90%)</li><li><strong>Preço Spot</strong> — Preço atual nos mercados globais</li></ul><h3>O Que é Prata Sucata?</h3><p>Prata sucata inclui joias quebradas, talheres antigos, moedas de prata e resíduos industriais vendidos pelo valor do metal.</p>`,

    hi: `<h3>चांदी का पिघल मूल्य कैसे निकालें</h3><p>किसी भी चांदी के आइटम का मूल्य तीन कारकों पर निर्भर करता है: <strong>वज़न</strong>, <strong>शुद्धता</strong>, और <strong>स्पॉट मूल्य</strong>। सूत्र: मूल्य = वज़न (ट्रॉय औंस) × शुद्धता × स्पॉट मूल्य।</p><ul><li><strong>वज़न</strong> — ग्राम, ट्रॉय औंस या किलोग्राम में</li><li><strong>शुद्धता</strong> — चांदी का प्रतिशत: 999 (99.9%), 925 स्टर्लिंग (92.5%), 900 (90%)</li><li><strong>स्पॉट मूल्य</strong> — COMEX जैसे बाज़ारों से लाइव मूल्य</li></ul><h3>चांदी का स्क्रैप क्या है?</h3><p>टूटे आभूषण, पुराने बर्तन, चांदी के सिक्के — कोई भी चीज़ जो अपनी धातु सामग्री के लिए बेची जाती है।</p>`,

    ur: `<h3>چاندی کی پگھل قیمت کیسے معلوم کریں</h3><p>کسی بھی چاندی کی چیز کی قیمت تین چیزوں پر منحصر ہے: <strong>وزن</strong>، <strong>خالصیت</strong>، اور <strong>سپاٹ قیمت</strong>۔ فارمولا: قیمت = وزن (ٹرائے اونس) × خالصیت × سپاٹ قیمت۔</p><ul><li><strong>وزن</strong> — گرام، ٹرائے اونس یا کلوگرام میں</li><li><strong>خالصیت</strong> — چاندی کا فیصد: 999 (99.9%)، 925 سٹرلنگ (92.5%)، 900 (90%)</li><li><strong>سپاٹ قیمت</strong> — عالمی منڈیوں سے لائیو قیمت</li></ul><h3>چاندی کا سکریپ کیا ہے؟</h3><p>ٹوٹے ہوئے زیورات، پرانے برتن، چاندی کے سکے — کوئی بھی چیز جو اپنی دھاتی قیمت کے لیے بیچی جائے۔</p>`,

    ar: `<h3>كيف يتم حساب قيمة الانصهار</h3><p>تعتمد قيمة أي قطعة فضية على ثلاثة عوامل: <strong>الوزن</strong>، <strong>النقاء</strong>، و<strong>السعر الفوري</strong>. المعادلة: القيمة = الوزن (أوقية تروي) × النقاء × السعر الفوري.</p><ul><li><strong>الوزن</strong> — بالجرام أو أوقية تروي أو كيلوجرام</li><li><strong>النقاء</strong> — نسبة الفضة: 999 (99.9%)، 925 إسترليني (92.5%)، 900 عملة (90%)</li><li><strong>السعر الفوري</strong> — السعر الحالي من البورصات العالمية</li></ul><h3>ما هي خردة الفضة؟</h3><p>المجوهرات المكسورة، الأواني القديمة، العملات الفضية — أي شيء يُباع لقيمته المعدنية.</p>`,

    tr: `<h3>Eritme Değeri Nasıl Hesaplanır</h3><p>Herhangi bir gümüş eşyanın değeri üç faktöre bağlıdır: <strong>ağırlık</strong>, <strong>saflık</strong> ve <strong>spot fiyat</strong>. Formül: Değer = Ağırlık (troy ons) × Saflık × Spot Fiyat.</p><ul><li><strong>Ağırlık</strong> — Gram, troy ons veya kilogram cinsinden</li><li><strong>Saflık</strong> — Gümüş yüzdesi: 999 (%99.9), 925 ayar (%92.5), 900 (%90)</li><li><strong>Spot Fiyat</strong> — COMEX gibi borsalardan canlı fiyat</li></ul><h3>Hurda Gümüş Nedir?</h3><p>Kırık takılar, eski sofra takımları, gümüş paralar — metal değeri için satılan her şey.</p>`,

    it: `<h3>Come si Calcola il Valore di Fusione</h3><p>Il valore di qualsiasi articolo in argento dipende da: <strong>peso</strong>, <strong>purezza</strong> e <strong>prezzo spot</strong>. Formula: Valore = Peso (oncia troy) × Purezza × Prezzo Spot.</p><ul><li><strong>Peso</strong> — In grammi, once troy o chilogrammi</li><li><strong>Purezza</strong> — Percentuale di argento: 999 (99.9%), 925 sterling (92.5%), 900 moneta (90%)</li><li><strong>Prezzo Spot</strong> — Prezzo attuale dai mercati globali</li></ul><h3>Cos'è l'Argento Rottame?</h3><p>Gioielli rotti, argenteria vecchia, monete d'argento — qualsiasi cosa venduta per il suo contenuto metallico.</p>`,

    zh: `<h3>白银熔炼价值如何计算</h3><p>任何白银物品的价值取决于三个因素：<strong>重量</strong>、<strong>纯度</strong>和<strong>现货价格</strong>。公式：价值 = 重量（金衡盎司）× 纯度 × 现货价格。</p><ul><li><strong>重量</strong> — 以克、金衡盎司或千克为单位</li><li><strong>纯度</strong> — 银含量百分比：999纯银(99.9%)、925纯银(92.5%)、900银币(90%)</li><li><strong>现货价格</strong> — 来自COMEX等全球交易所的实时价格</li></ul><h3>什么是废银？</h3><p>破损的首饰、旧银器、银币 — 任何以其金属含量出售的银制品。</p>`,

    ru: `<h3>Как Рассчитывается Стоимость Плавки</h3><p>Стоимость любого серебряного изделия зависит от трёх факторов: <strong>вес</strong>, <strong>чистота</strong> и <strong>спот-цена</strong>. Формула: Стоимость = Вес (тройские унции) × Чистота × Спот-цена.</p><ul><li><strong>Вес</strong> — В граммах, тройских унциях или килограммах</li><li><strong>Чистота</strong> — Процент серебра: 999 (99.9%), 925 стерлинг (92.5%), 900 монетное (90%)</li><li><strong>Спот-цена</strong> — Текущая цена с мировых бирж</li></ul><h3>Что Такое Серебряный Лом?</h3><p>Сломанные украшения, старое столовое серебро, серебряные монеты — всё, что продаётся за металлическое содержание.</p>`,
  };
  return content[code] || content['es'];
}

function getFAQItems(code, t) {
  const faqs = {
    es: [
      ['¿Qué tan precisa es esta calculadora?', 'Nuestra calculadora utiliza precios spot en vivo y fórmulas precisas. El valor mostrado es teórico; los compradores pagan 80-97% del valor de fusión.'],
      ['¿Cómo sé qué pureza tiene mi plata?', 'Busque sellos: 925 (esterlina), 999 (fina), 800. Si no hay sello, un joyero puede hacer una prueba de ácido.'],
      ['¿Por qué cambia el precio durante el día?', 'La plata se cotiza en mercados globales como COMEX. El precio fluctúa por oferta, demanda y condiciones económicas.'],
      ['¿Cuál es la diferencia entre valor de fusión y valor de reventa?', 'El valor de fusión es el valor del metal puro. Monedas raras o joyería antigua pueden valer más.'],
      ['¿Qué es una onza troy?', 'Una onza troy (31.1035g) es la unidad estándar para metales preciosos. Es ~10% más pesada que una onza regular.'],
      ['¿Cuánto vale mi plata esterlina?', 'La plata esterlina (marcada 925) es 92.5% de plata pura. Utilice nuestra calculadora de plata esterlina o ingrese el peso de su artículo para ver el valor exacto según el mercado actual.'],
      ['¿Tienen valor de desecho los cubiertos bañados en plata?', 'Los artículos bañados en plata (Silver Plate, EPNS) contienen una capa muy delgada sobre metal base y generalmente solo valen $1-5. Solo los artículos de plata sólida (marcados 925, 800, 999 o STERLING) tienen valor significativo como desecho.'],
      ['¿Qué son las monedas de plata antiguas (junk silver) y cómo calculo su valor?', 'Las denominadas "junk silver" son monedas de EE. UU. anteriores a 1965 (de diez, veinticinco centavos y medio dólar) que contienen un 90% de plata. $1 de valor nominal contiene 0.715 oz troy de plata. Utilice nuestra calculadora específica introduciendo el valor nominal.'],
      ['¿Cómo vendo mi plata al mejor precio?', 'Primero conozca su valor de fusión con nuestra calculadora. Luego: 1) obtenga 3+ cotizaciones, 2) prefiera refinadores en línea (pagan 90-97% del valor) frente a casas de empeño (pagan 50-80%), y 3) venda en grandes lotes si es posible.'],
      ['¿Puedo calcular varios artículos de plata a la vez?', '¡Sí! Nuestra calculadora por lotes le permite agregar múltiples artículos con diferentes pesos y purezas, y le mostrará el valor total combinado listo para imprimir o copiar al visitar al comprador.'],
      ['¿Qué significa 925 en la plata?', 'El sello 925 significa que el artículo es de plata esterlina: 92.5% de plata pura y 7.5% de aleación de cobre. Es la marca de pureza de plata más común en todo el mundo.'],
      ['¿Cómo afectan los precios spot de la plata al valor de desecho?', 'El valor de la plata se mueve en sincronía con el precio spot internacional. Cuando el spot sube un 10%, su plata de desecho vale un 10% más. Los precios spot se fijan en el mercado COMEX y se negocian casi 24/5.'],
    ],
    fr: [
      ['Quelle est la précision de ce calculateur ?', 'Notre calculateur utilise des prix spot en direct. La valeur affichée est théorique ; les acheteurs paient 80-97% de la valeur de fonte.'],
      ['Comment connaître la pureté de mon argent ?', 'Cherchez les poinçons : 925, 999, 800, STERLING. Un bijoutier peut effectuer un test d\'acide.'],
      ['Pourquoi le prix change-t-il pendant la journée ?', 'L\'argent est coté sur les marchés mondiaux. Le prix fluctue selon l\'offre et la demande.'],
      ['Qu\'est-ce qu\'une once troy ?', 'Une once troy (31.1035g) est l\'unité standard des métaux précieux, ~10% plus lourde qu\'une once régulière.'],
    ],
    de: [
      ['Wie genau ist dieser Rechner?', 'Unser Rechner verwendet Live-Spotpreise. Der angezeigte Wert ist theoretisch; Händler zahlen 80-97% des Schmelzwerts.'],
      ['Why does the price change?', 'Silver trades on global exchanges. Price fluctuates with supply and demand.'],
      ['What is a troy ounce?', 'A troy ounce (31.1035g) is the standard unit for precious metals, ~10% heavier than a regular ounce.'],
    ],
    pt: [
      ['Quão precisa é esta calculadora?', 'Nossa calculadora usa preços spot ao vivo. O valor exibido é teórico; compradores pagam 80-97%.'],
      ['Como sei a pureza da minha prata?', 'Procure marcas: 925, 999, 800. Um joalheiro pode fazer um teste de ácido.'],
      ['Por que o preço muda?', 'A prata é negociada globalmente. O preço flutua com a oferta e a demanda.'],
    ],
    hi: [
      ['यह ক্যালকুলেটর कितना सटीक है?', 'हम लाइव स्पॉट मूल्य का उपयोग करते हैं। दिखाया गया मूल्य धातु का है; खरीदार 80-97% देते हैं।'],
      ['मुझे अपनी चांदी की शुद्धता कैसे पता चलेगी?', 'स्टैम्प देखें: 925, 999, 800।'],
      ['कीमत क्यों बदलती है?', 'चांदी का व्यापार वैश्विक बाज़ारों में होता है। मांग और आपूर्ति के साथ कीमत बदलती है।'],
    ],
    ur: [
      ['یہ کیلکولیٹر کتنا درست ہے؟', 'ہم لائیو سپاٹ قیمت استعمال کرتے ہیں۔ دکھائی گئی قیمت دھات کی ہے؛ خریدار 80-97٪ دیتے ہیں۔'],
      ['مجھے اپنی چاندی کی خالصیت کیسے پتہ چلے گی؟', 'مہریں دیکھیں: 925، 999، 800۔'],
      ['قیمت کیوں بدلتی ہے؟', 'چاندی کی تجارت عالمی منڈیوں میں ہوتی ہے، قیمت طلب اور رسد سے بدلتی ہے۔'],
    ],
    ar: [
      ['ما مدى دقة هذه الحاسبة؟', 'نحن نستخدم الأسعار الفورية الحية. القيمة المعروضة هي للمعدن؛ يدفع المشترون 80-97٪.'],
      ['كيف أعرف نقاء الفضة؟', 'ابحث عن الأختام: 925، 999، 800.'],
      ['لماذا يتغير السعر؟', 'الفضة تتداول في الأسواق العالمية. يتغير السعر مع العرض والطلب.'],
    ],
    tr: [
      ['Bu hesap makinesi ne kadar doğru?', 'Canlı spot fiyatları kullanıyoruz. Gösterilen değer teoriktir; alıcılar %80-97 öder.'],
      ['Gümüşümün saflığını nasıl anlarım?', 'Damgalara bakın: 925, 999, 800.'],
      ['Fiyat neden değişiyor?', 'Gümüş küresel borsalarda işlem görür. Fiyat arz ve talebe göre dalgalanır.'],
    ],
    it: [
      ['Quanto è accurato questo calcolatore?', 'Usiamo prezzi spot in tempo reale. Il valore mostrato è teorico; gli acquirenti pagano l\'80-97%.'],
      ['Come verifico la purezza?', 'Cerca i marchi: 925, 999, 800. Un gioielliere può fare un test con acido.'],
      ['Perché il prezzo cambia?', 'L\'argento è scambiato sui mercati globali. Il prezzo fluttua con la domanda e l\'offerta.'],
    ],
    zh: [
      ['这个计算器有多准确？', '我们使用实时现货价格。显示的值是理论上的熔炼价值；买家支付80-97%。'],
      ['我怎么知道银的纯度？', '寻找印记：925、999、800。珠宝商可以进行测试。'],
      ['为什么价格会变动？', '白银在全球交易所交易。价格随供需波动。'],
    ],
    ru: [
      ['Насколько точен этот калькулятор?', 'Мы используем актуальные спот-цены. Показанное значение теоретическое; покупатели платят 80-97%.'],
      ['Как узнать чистоту серебра?', 'Ищите клейма: 925, 999, 800.'],
      ['Почему цена меняется?', 'Серебро торгуется на мировых биржах. Цена колеблется в зависимости от спроса и предложения.'],
    ],
  };

  const defaultFaqs = [
    [t.faqTitle ? 'Q1' : 'How accurate?', 'Uses live spot prices, 80-97% dealer payout.'],
    ['Purity?', 'Look for stamps: 925, 999, 800.'],
    ['Troy ounce?', '31.1035g, ~10% heavier than regular ounce.'],
  ];

  const items = faqs[code] || defaultFaqs;
  return items.map((faq, i) =>
    `<div class="faq-item">
              <button class="faq-question" id="faq-btn-${i+1}"><h3 style="font-size:inherit;font-weight:inherit;display:inline;">${faq[0]}</h3> <span class="faq-icon">+</span></button>
              <div class="faq-answer"><p>${faq[1]}</p></div>
            </div>`
  ).join('\n            ');
}

function getMenuTranslations(code) {
  const dict = {
    es: {
      "Home": "Inicio",
      "Calculators": "Calculadoras",
      "Silver Scrap Calculator": "Calculadora de Plata de Desecho",
      "Gold & Silver Calculator": "Calculadora de Oro y Plata",
      "Silver Melt Value": "Valor de Fusión de la Plata",
      "Sterling Silver Calculator": "Calculadora de Plata Esterlina",
      "Junk Silver Calculator": "Calculadora de Plata Basura",
      "Silver Coin Value": "Valor de Moneda de Plata",
      "Silver Bar Value": "Valor de Lingote de Plata",
      "Silver Jewelry Value": "Valor de Joyería de Plata",
      "Silverware Value": "Valor de Cubiertos de Plata",
      "Purity": "Pureza",
      "999 Fine Silver": "Plata Fina 999",
      "958 Britannia Silver": "Plata Britannia 958",
      "925 Sterling Silver": "Plata Esterlina 925",
      "900 Coin Silver": "Plata de Moneda 900",
      "835 Silver": "Plata 835",
      "800 Silver": "Plata 800",
      "Silver Purity Chart": "Tabla de Pureza de la Plata",
      "Pricing": "Precios",
      "Silver Price Per Gram": "Precio de la Plata por Gramo",
      "Silver Price Per Ounce": "Precio de la Plata por Onza",
      "Price in All Currencies": "Precio en Todas las Monedas",
      "1/10oz Silver Value": "Valor de la Plata 1/10oz",
      "1oz Silver Value": "Valor de la Plata 1oz",
      "2oz Silver Value": "Valor de la Plata 2oz",
      "5oz Silver Value": "Valor de la Plata 5oz",
      "10oz Silver Value": "Valor de la Plata 10oz",
      "100oz Silver Value": "Valor de la Plata 100oz",
      "1kg Silver Value": "Valor de la Plata 1kg",
      "Tools": "Herramientas",
      "Silver Profit Calculator": "Calculadora de Ganancias de Plata",
      "Batch Calculator": "Calculadora por Lotes",
      "Sona Chandi Calculator": "Calculadora Sona Chandi",
      "Face Value Calculator": "Calculadora de Valor Nominal",
      "Weight Converter": "Conversor de Peso",
      "Pennyweight (DWT) Calc": "Calculadora Pennyweight (DWT)",
      "Tola Calculator": "Calculadora Tola",
      "Sell or Hold Analysis": "Análisis de Vender o Mantener",
      "Silver Identifier": "Identificador de Plata",
      "Guides": "Guías",
      "How to Use Our Calculators": "Cómo Usar Nuestras Calculadoras",
      "What Is Silver Scrap?": "¿Qué es la Plata de Desecho?",
      "What Is Melt Value?": "¿Qué es el Valor de Fusión?",
      "What Is Junk Silver?": "¿Qué es la Plata Basura?",
      "What Is a Troy Ounce?": "¿Qué es una Onza Troy?",
      "What Is Silver Bullion?": "¿Qué es un Lingote de Plata?",
      "How Silver Prices Work": "Cómo Funcionan los Precios de la Plata",
      "Silver Hallmarks Guide": "Guía de Sellos de Plata",
      "What Does 925 Mean?": "¿Qué Significa 925?",
      "What Is Sterling Silver?": "¿Qué es la Plata Esterlina?",
      "How to Sell Silver": "Cómo Vender Plata",
      "Scrap Silver": "Plata de Desecho",
      "Gold & Silver": "Oro y Plata",
      "Silver Profit": "Ganancia de Plata",
      "Melt Value": "Valor de Fusión",
      "Junk Silver": "Plata Basura",
      "Silver Coins": "Monedas de Plata",
      "Silver Dollar": "Dólar de Plata",
      "Silver Quarter": "Cuarto de Dólar de Plata",
      "Silver Dime": "Moneda de Diez Centavos de Plata",
      "Jewelry Value": "Valor de Joyería",
      "925 Sterling": "Esterlina 925",
      "Purity Chart": "Tabla de Pureza",
      "How to Use Calculators": "Cómo Usar las Calculadoras",
      "Sona Chandi Calc": "Calc. Sona Chandi",
      "Face Value Calc": "Calc. Valor Nominal",
      "Sell or Hold": "Vender o Mantener",
      "About": "Acerca de",
      "Privacy": "Privacidad",
      "Terms": "Términos",
      "All rights reserved.": "Todos los derechos reservados.",
      "Prices are for informational purposes only.": "Los precios son solo para fines informativos.",
      "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "Calculadoras de plata gratuitas usando precios spot en vivo. Calcule el valor de su sucata al instante."
    },
    fr: {
      "Home": "Accueil",
      "Calculators": "Calculateurs",
      "Silver Scrap Calculator": "Calculateur de Ferraille d'Argent",
      "Gold & Silver Calculator": "Calculateur Or et Argent",
      "Silver Melt Value": "Valeur de Fonte de l'Argent",
      "Sterling Silver Calculator": "Calculateur d'Argent Sterling",
      "Junk Silver Calculator": "Calculateur d'Argent de Circulation",
      "Silver Coin Value": "Valeur des Pièces d'Argent",
      "Silver Bar Value": "Valeur des Lingots d'Argent",
      "Silver Jewelry Value": "Valeur des Bijoux en Argent",
      "Silverware Value": "Valeur de l'Argenterie",
      "Purity": "Pureté",
      "999 Fine Silver": "Argent Fin 999",
      "958 Britannia Silver": "Argent Britannia 958",
      "925 Sterling Silver": "Argent Sterling 925",
      "900 Coin Silver": "Argent de Pièce 900",
      "835 Silver": "Argent 835",
      "800 Silver": "Argent 800",
      "Silver Purity Chart": "Tableau de Pureté de l'Argent",
      "Pricing": "Prix",
      "Silver Price Per Gram": "Prix de l'Argent au Gramme",
      "Silver Price Per Ounce": "Prix de l'Argent à l'Once",
      "Price in All Currencies": "Prix dans Toutes les Devises",
      "1/10oz Silver Value": "Valeur de l'Argent 1/10oz",
      "1oz Silver Value": "Valeur de l'Argent 1oz",
      "2oz Silver Value": "Valeur de l'Argent 2oz",
      "5oz Silver Value": "Valeur de l'Argent 5oz",
      "10oz Silver Value": "Valeur de l'Argent 10oz",
      "100oz Silver Value": "Valeur de l'Argent 100oz",
      "1kg Silver Value": "Valeur de l'Argent 1kg",
      "Tools": "Outils",
      "Silver Profit Calculator": "Calculateur de Profit d'Argent",
      "Batch Calculator": "Calculateur par Lots",
      "Sona Chandi Calculator": "Calculateur Sona Chandi",
      "Face Value Calculator": "Calculateur de Valeur Nominale",
      "Weight Converter": "Convertisseur de Poids",
      "Pennyweight (DWT) Calc": "Calculateur Pennyweight (DWT)",
      "Tola Calculator": "Calculateur Tola",
      "Sell or Hold Analysis": "Analyse Vendre ou Garder",
      "Silver Identifier": "Identificateur d'Argent",
      "Guides": "Guides",
      "How to Use Our Calculators": "Comment Utiliser nos Calculateurs",
      "What Is Silver Scrap?": "Qu'est-ce que la Ferraille d'Argent ?",
      "What Is Melt Value?": "Qu'est-ce que la Valeur de Fonte ?",
      "What Is Junk Silver?": "Qu'est-ce que l'Argent de Circulation ?",
      "What Is a Troy Ounce?": "Qu'est-ce qu'une Once Troy ?",
      "What Is Silver Bullion?": "Qu'est-ce qu'un Lingot d'Argent ?",
      "How Silver Prices Work": "Comment Fonctionnent les Prix de l'Argent",
      "Silver Hallmarks Guide": "Guide des Poinçons d'Argent",
      "What Does 925 Mean?": "Que Signifie 925 ?",
      "What Is Sterling Silver?": "Qu'est-ce que l'Argent Sterling ?",
      "How to Sell Silver": "Comment Vendre de l'Argent",
      "Scrap Silver": "Ferraille d'Argent",
      "Gold & Silver": "Or et Argent",
      "Silver Profit": "Profit d'Argent",
      "Melt Value": "Valeur de Fonte",
      "Junk Silver": "Argent de Circulation",
      "Silver Coins": "Pièces d'Argent",
      "Silver Dollar": "Dollar en Argent",
      "Silver Quarter": "Quart de Dollar en Argent",
      "Silver Dime": "Pièce de Dix Cents en Argent",
      "Jewelry Value": "Valeur des Bijoux",
      "925 Sterling": "Sterling 925",
      "Purity Chart": "Tableau de Pureté",
      "How to Use Calculators": "Comment Utiliser les Calculateurs",
      "Sona Chandi Calc": "Calc. Sona Chandi",
      "Face Value Calc": "Calc. Valeur Nominale",
      "Sell or Hold": "Vendre ou Garder",
      "About": "À Propos",
      "Privacy": "Confidentialité",
      "Terms": "Conditions",
      "All rights reserved.": "Tous droits réservés.",
      "Prices are for informational purposes only.": "Les prix sont à titre informatif.",
      "Primary Calculators": "Calculateurs Principaux",
      "Item Calculators": "Calculateurs d'Articles",
      "Popular Coins": "Pièces Populaires",
      "Silver Purity": "Pureté de l'Argent",
      "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "Calculateurs gratuits utilisant les prix en direct. Calculez la valeur de votre ferraille d'argent instantanément."
    },
    de: {
      "Home": "Startseite", "Calculators": "Rechner", "Purity": "Reinheit", "Pricing": "Preise", "Tools": "Werkzeuge", "Guides": "Ratgeber",
      "Primary Calculators": "Hauptrechner", "Item Calculators": "Artikelrechner", "Popular Coins": "Beliebte Münzen", "Silver Purity": "Silberreinheit",
      "Silver Scrap Calculator": "Silberschrott-Rechner", "About": "Über uns", "Privacy": "Datenschutz", "Terms": "Bedingungen",
      "All rights reserved.": "Alle Rechte vorbehalten.", "Prices are for informational purposes only.": "Preise dienen nur zu Informationszwecken.",
      "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "Kostenlose Rechner mit Live-Spotpreisen. Berechnen Sie den Schmelzwert Ihres Silbers blitzschnell."
    },
    pt: {
      "Home": "Início", "Calculators": "Calculadoras", "Purity": "Pureza", "Pricing": "Preços", "Tools": "Ferramentas", "Guides": "Guias",
      "Primary Calculators": "Calculadoras Principais", "Item Calculators": "Calculadoras de Itens", "Popular Coins": "Moedas Populares", "Silver Purity": "Pureza da Prata",
      "Silver Scrap Calculator": "Calculadora de Sucata", "About": "Sobre", "Privacy": "Privacidade", "Terms": "Termos",
      "All rights reserved.": "Todos os direitos reservados.", "Prices are for informational purposes only.": "Os preços são apenas para fins informativos.",
      "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "Calculadoras precisas usando preços ao vivo. Calcule o valor de sua sucata de prata instantaneamente."
    },
    hi: {
      "Home": "मुख्य पृष्ठ", "Calculators": "कैलकुलेटर", "Purity": "शुद्धता", "Pricing": "कीमतें", "Tools": "टूल्स", "Guides": "गाइड्स",
      "Primary Calculators": "प्राथमिक कैलकुलेटर", "Item Calculators": "आइटम कैलकुलेटर", "Popular Coins": "लोकप्रिय सिक्के", "Silver Purity": "चांदी की शुद्धता",
      "Silver Scrap Calculator": "सिल्वर स्क्रैप कैलकुलेटर", "About": "हमारे बारे में", "Privacy": "गोपनीयता", "Terms": "शर्तें",
      "All rights reserved.": "सर्वाधिकार सुरक्षित।", "Prices are for informational purposes only.": "कीमतें केवल सूचनात्मक उद्देश्यों के लिए हैं।",
      "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "लाइव स्पॉट कीमतों के साथ चांदी कैलकुलेटर। तुरंत अपनी स्क्रैप चांदी का मूल्य निकालें।"
    },
    ur: {
      "Home": "ہوم", "Calculators": "کیلکولیٹر", "Purity": "خالصیت", "Pricing": "قیمتیں", "Tools": "ٹولز", "Guides": "گائیڈز",
      "Primary Calculators": "بنیادی کیلکولیٹرز", "Item Calculators": "آئٹم کیلکولیٹرز", "Popular Coins": "مشہور سکے", "Silver Purity": "چاندی کی خالصیت",
      "Silver Scrap Calculator": "چاندی کا کیلکولیٹر", "About": "ہمارے بارے میں", "Privacy": "رازداری", "Terms": "شرائط",
      "All rights reserved.": "جملہ حقوق محفوظ ہیں۔", "Prices are for informational purposes only.": "قیمتیں صرف معلوماتی ہیں۔",
      "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "لائیو قیمتوں کے ساتھ مفت اور درست کیلکولیٹر۔ اپنی چاندی کی پگھل قیمت جانیں۔"
    },
    ar: {
      "Home": "الرئيسية", "Calculators": "حاسبات", "Purity": "نقاء", "Pricing": "التسعير", "Tools": "أدوات", "Guides": "أدلة",
      "Primary Calculators": "الحاسبات الأساسية", "Item Calculators": "حاسبات العناصر", "Popular Coins": "العملات الشهيرة", "Silver Purity": "نقاء الفضة",
      "Silver Scrap Calculator": "حاسبة خردة الفضة", "About": "حول", "Privacy": "الخصوصية", "Terms": "الشروط",
      "All rights reserved.": "جميع الحقوق محفوظة.", "Prices are for informational purposes only.": "الأسعار لأغراض إعلامية فقط.",
      "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "حاسبات فضة دقيقة ومجانية تعتمد على الأسعار الفورية. احسب قيمة الفضة فورًا."
    },
    tr: {
      "Home": "Ana Sayfa", "Calculators": "Hesaplayıcılar", "Purity": "Saflık", "Pricing": "Fiyatlandırma", "Tools": "Araçlar", "Guides": "Kılavuzlar",
      "Primary Calculators": "Ana Hesaplayıcılar", "Item Calculators": "Öğe Hesaplayıcıları", "Popular Coins": "Popüler Paralar", "Silver Purity": "Gümüş Saflığı",
      "Silver Scrap Calculator": "Hurda Gümüş Hesaplayıcı", "About": "Hakkında", "Privacy": "Gizlilik", "Terms": "Şartlar",
      "All rights reserved.": "Tüm hakları saklıdır.", "Prices are for informational purposes only.": "Fiyatlar bilgi amaçlıdır.",
      "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "Canlı spot fiyatları kullanan ücretsiz gümüş hesaplayıcıları. Hurda gümüşünüzün değerini hemen hesaplayın."
    },
    it: {
      "Home": "Home", "Calculators": "Calcolatori", "Purity": "Purezza", "Pricing": "Prezzi", "Tools": "Strumenti", "Guides": "Guide",
      "Primary Calculators": "Calcolatori Principali", "Item Calculators": "Calcolatori di Articoli", "Popular Coins": "Monete Popolari", "Silver Purity": "Purezza dell'Argento",
      "Silver Scrap Calculator": "Calcolatore di Argento", "About": "Chi siamo", "Privacy": "Privacy", "Terms": "Termini",
      "All rights reserved.": "Tutti i diritti riservati.", "Prices are for informational purposes only.": "I prezzi sono solo a scopo informativo.",
      "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "Calcolatori gratuiti che utilizzano i prezzi spot. Calcola il valore del tuo rottame d'argento all'istante."
    },
    zh: {
      "Home": "首页", "Calculators": "计算器", "Purity": "纯度", "Pricing": "价格", "Tools": "工具", "Guides": "指南",
      "Primary Calculators": "主要计算器", "Item Calculators": "物品计算器", "Popular Coins": "热门银币", "Silver Purity": "白银纯度",
      "Silver Scrap Calculator": "废银计算器", "About": "关于我们", "Privacy": "隐私", "Terms": "条款",
      "All rights reserved.": "版权所有。", "Prices are for informational purposes only.": "价格仅供参考。",
      "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "使用实时现货价格的免费白银计算器。立即计算您的废银价值。"
    },
    ru: {
      "Home": "Главная", "Calculators": "Калькуляторы", "Purity": "Чистота", "Pricing": "Цены", "Tools": "Инструменты", "Guides": "Руководства",
      "Primary Calculators": "Основные Калькуляторы", "Item Calculators": "Калькуляторы Изделий", "Popular Coins": "Популярные Монеты", "Silver Purity": "Чистота Серебра",
      "Silver Scrap Calculator": "Калькулятор Лома Серебра", "About": "О нас", "Privacy": "Конфиденциальность", "Terms": "Условия",
      "All rights reserved.": "Все права защищены.", "Prices are for informational purposes only.": "Цены носят информационный характер.",
      "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "Бесплатные калькуляторы серебра с использованием актуальных спот-цен. Мгновенно рассчитайте стоимость лома."
    }
  };
  return dict[code] || dict['es'];
}

// Generate all language directories and pages
allLangs.forEach(lang => {
  const dir = path.join(baseDir, lang.code);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), generateHomepage(lang));
  
  // If the language supports inner pages, generate them
  if (lang.t.innerScrapTitle) {
    fs.writeFileSync(path.join(dir, 'silver-scrap-calculator.html'), generateScrapCalculatorPage(lang));
    console.log(`Created ${lang.code}/silver-scrap-calculator.html`);
  }
  
  console.log(`Created ${lang.code}/index.html (${lang.name})`);
});

console.log(`\nGenerated ${allLangs.length} language versions with full content!`);
