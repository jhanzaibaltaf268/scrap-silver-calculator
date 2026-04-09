const fs = require('fs');
const path = require('path');
const baseDir = path.resolve(__dirname);
const { languages } = require('./js/generate-languages');
const moreLangs = require('./js/generate-languages-data');

const allLangs = [...languages, ...moreLangs];
const allCodes = allLangs.map(l => l.code);

function hreflangTags() {
  let tags = `<link rel="alternate" hreflang="en" href="https://scrapsilvercalculater.com/">\n`;
  tags += `  <link rel="alternate" hreflang="x-default" href="https://scrapsilvercalculater.com/">\n`;
  allCodes.forEach(c => {
    tags += `  <link rel="alternate" hreflang="${c}" href="https://scrapsilvercalculater.com/${c}/">\n`;
  });
  return tags;
}

function langSwitcher(currentCode) {
  const flags = {es:'≡ƒç¬≡ƒç╕',fr:'≡ƒç½≡ƒç╖',de:'≡ƒç⌐≡ƒç¬',pt:'≡ƒçº≡ƒç╖',hi:'≡ƒç«≡ƒç│',ur:'≡ƒç╡≡ƒç░',ar:'≡ƒç╕≡ƒçª',tr:'≡ƒç╣≡ƒç╖',it:'≡ƒç«≡ƒç╣',zh:'≡ƒç¿≡ƒç│',ru:'≡ƒç╖≡ƒç║'};
  let html = '<div class="lang-switcher">';
  html += `<a href="/" class="lang-btn ${currentCode === 'en' ? 'active' : ''}">≡ƒç¼≡ƒçº EN</a>`;
  allLangs.forEach(l => {
    html += `<a href="/${l.code}/" class="lang-btn ${l.code===currentCode?'active':''}">${flags[l.code]||'≡ƒîÉ'} ${l.code.toUpperCase()}</a>`;
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
  <link rel="canonical" href="https://scrapsilvercalculater.com/${lang.code}/">
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
    .content-scroll-block ul li::before { content: 'ΓÇó'; color: var(--accent-primary); margin-right: var(--space-sm); }
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
          <div class="calc-widget-title"><span class="icon">ΓÜû∩╕Å</span> ${t.calcTitle || t.calcWidgetTitle || 'Silver Scrap Value Calculator'}</div>

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
              <option value="0.999">999 ΓÇö Fine (99.9%)</option>
              <option value="0.958">958 ΓÇö Britannia (95.8%)</option>
              <option value="0.925" selected>925 ΓÇö Sterling (92.5%)</option>
              <option value="0.900">900 ΓÇö Coin (90.0%)</option>
              <option value="0.835">835 ΓÇö (83.5%)</option>
              <option value="0.800">800 ΓÇö (80.0%)</option>
              <option value="0.500">500 ΓÇö (50.0%)</option>
            </select>
          </div>

          <div class="result-display" id="hero-result">
            <div class="result-label">${t.meltValue || 'Estimated Melt Value'}</div>
            <div class="result-value" id="hero-result-value">$0.00</div>
            <div class="result-detail" id="hero-result-detail">${t.spot}: $--/oz ┬╖ ${t.purityLabel}: 92.5% ┬╖ ${t.totalSilver}: 0.000 oz</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-compact" style="background: var(--bg-secondary);">
      <div class="container text-center">
        <span class="section-badge">≡ƒº░ ${t.allCalcTitle}</span>
        <h2 class="section-title">${t.allCalcTitle}</h2>
        <p class="section-subtitle">${t.allCalcSub}</p>
        <div class="category-grid stagger">
          <a href="/silver-scrap-calculator/" class="category-card"><div class="category-icon">ΓÖ╗∩╕Å</div><h3>${t.scrapCalc}</h3><p>${t.scrapCalcDesc}</p></a>
          <a href="/silver-melt-value-calculator/" class="category-card"><div class="category-icon">≡ƒöÑ</div><h3>${t.meltCalc}</h3><p>${t.meltCalcDesc}</p></a>
          <a href="/sterling-silver-calculator/" class="category-card"><div class="category-icon">Γ£¿</div><h3>${t.sterlingCalc}</h3><p>${t.sterlingCalcDesc}</p></a>
          <a href="/junk-silver-calculator/" class="category-card"><div class="category-icon">≡ƒ¬Ö</div><h3>${t.junkCalc}</h3><p>${t.junkCalcDesc}</p></a>
          <a href="/silver-coin-value-calculator/" class="category-card"><div class="category-icon">≡ƒÅ¢∩╕Å</div><h3>${t.coinCalc}</h3><p>${t.coinCalcDesc}</p></a>
          <a href="/gold-and-silver-calculator/" class="category-card"><div class="category-icon">≡ƒÑç</div><h3>${t.goldSilverCalc}</h3><p>${t.goldSilverCalcDesc}</p></a>
          <a href="/silver-bar-value-calculator/" class="category-card"><div class="category-icon">≡ƒº▒</div><h3>${t.barCalc}</h3><p>${t.barCalcDesc}</p></a>
          <a href="/silver-jewelry-value-calculator/" class="category-card"><div class="category-icon">≡ƒÆì</div><h3>${t.jewelryCalc}</h3><p>${t.jewelryCalcDesc}</p></a>
          <a href="/silverware-value-calculator/" class="category-card"><div class="category-icon">≡ƒì┤</div><h3>${t.silverwareCalc}</h3><p>${t.silverwareCalcDesc}</p></a>
          <a href="/silver-price-per-gram/" class="category-card"><div class="category-icon">≡ƒôè</div><h3>${t.priceGram}</h3><p>${t.priceGramDesc}</p></a>
          <a href="/silver-price-per-ounce/" class="category-card"><div class="category-icon">≡ƒÆ▓</div><h3>${t.priceOz}</h3><p>${t.priceOzDesc}</p></a>
        </div>
      </div>
    </section>

    <section class="section-compact">
      <div class="container text-center">
        <span class="section-badge">≡ƒ¢á∩╕Å</span>
        <h2 class="section-title">${t.toolsTitle}</h2>
        <p class="section-subtitle">${t.toolsSub}</p>
        <div class="category-grid stagger" style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));">
          <a href="/silver-profit-calculator/" class="category-card"><div class="category-icon">≡ƒôê</div><h3>${t.profitCalc}</h3><p>${t.profitCalcDesc}</p></a>
          <a href="/face-value-silver-calculator/" class="category-card"><div class="category-icon">≡ƒÆ╡</div><h3>${t.faceValCalc}</h3><p>${t.faceValCalcDesc}</p></a>
          <a href="/silver-batch-calculator/" class="category-card"><div class="category-icon">≡ƒôï</div><h3>${t.batchCalc}</h3><p>${t.batchCalcDesc}</p></a>
          <a href="/silver-weight-converter/" class="category-card"><div class="category-icon">ΓÜû∩╕Å</div><h3>${t.converterCalc}</h3><p>${t.converterCalcDesc}</p></a>
          <a href="/silver-sell-or-hold/" class="category-card"><div class="category-icon">≡ƒôê</div><h3>${t.sellHold}</h3><p>${t.sellHoldDesc}</p></a>
          <a href="/silver-price-all-currencies/" class="category-card"><div class="category-icon">≡ƒîì</div><h3>${t.currencies}</h3><p>${t.currenciesDesc}</p></a>
        </div>
      </div>
    </section>

    <section class="section-compact" style="background: var(--bg-secondary);">
      <div class="container text-center">
        <span class="section-badge">≡ƒôï</span>
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
      if (weight <= 0) { resultValue.textContent = '$0.00'; resultDetail.textContent = '${t.spot}: --'; return; }
      const weightGrams = SilverCalc.toGrams(weight, unit);
      const result = SilverCalc.meltValue(weightGrams, purity, spotPrice);
      resultValue.textContent = SilverCalc.formatCurrency(result.value);
      resultDetail.textContent = result.silverContentGrams + 'g · ' + result.silverContentOz + ' troy oz · ${t.spot}: $' + spotPrice.toFixed(2) + '/oz';
    }

    weightInput.addEventListener('input', calculate);
    unitSelect.addEventListener('change', calculate);
    puritySelect.addEventListener('change', calculate);
    SilverPrice.onPriceUpdate(() => calculate());
    calculate();

    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => { btn.closest('.faq-item').classList.toggle('open'); });
    });

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
  <link rel="canonical" href="https://scrapsilvercalculater.com/${lang.code}/silver-scrap-calculator/">
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
        <div class="calc-widget-title"><span class="icon">ΓÖ╗∩╕Å</span> ${t.calcWidgetTitleScrap}</div>
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
          <a href="/silver-melt-value-calculator/" class="category-card" style="padding: var(--space-md);">≡ƒöÑ ${t.meltCalc}</a>
          <a href="/sterling-silver-calculator/" class="category-card" style="padding: var(--space-md);">Γ£¿ ${t.sterlingCalc}</a>
          <a href="/silver-jewelry-value-calculator/" class="category-card" style="padding: var(--space-md);">≡ƒÆì ${t.jewelryCalc}</a>
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
      {label: homeMenuText, href:'/${lang.code}/'},
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
      document.getElementById('result-melt-detail').textContent = result.silverContentGrams + 'g ┬╖ ' + result.silverContentOz + ' oz ┬╖ ${t.spot}: $' + spot.toFixed(2) + '/oz';
      document.getElementById('result-scrap').textContent = payoutVal;
      document.getElementById('result-scrap-detail').textContent = '-' + (disc*100).toFixed(0) + '% (ΓêÆ' + discountVal + ')';
    }
    [w,u,p,d].forEach(el => el.addEventListener('input', calc));
    [u,p,d].forEach(el => el.addEventListener('change', calc));
    SilverPrice.onPriceUpdate(() => calc());
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

function getDefaultContentBody(code) {
  const content = {
    es: `<h3>C├│mo se Calcula el Valor de Fusi├│n de la Plata</h3><p>El valor de cualquier art├¡culo de plata depende de tres factores: <strong>peso</strong>, <strong>pureza</strong> y <strong>precio spot</strong>. La f├│rmula es: Valor = Peso (onzas troy) ├ù Pureza ├ù Precio Spot.</p><ul><li><strong>Peso</strong> ΓÇö El peso total en gramos, onzas troy o kilogramos</li><li><strong>Pureza</strong> ΓÇö Porcentaje de plata real: 999 fina (99.9%), 925 esterlina (92.5%), 900 moneda (90%)</li><li><strong>Precio Spot</strong> ΓÇö Precio actual por onza troy en mercados globales como COMEX y LBMA</li></ul><h3>┬┐Qu├⌐ es la Plata de Desecho?</h3><p>La plata de desecho es cualquier art├¡culo de plata valorado principalmente por su contenido met├ílico. Incluye: joyer├¡a rota, cubiertos viejos, monedas de plata anteriores a 1965 y residuos industriales.</p><h3>C├│mo Identificar Plata Real</h3><p>Busque sellos: 925, 800, 999, STERLING. La plata real NO es magn├⌐tica. Los art├¡culos chapados (EP, EPNS) contienen muy poca plata y no valen como desecho.</p><h3>┬┐Cu├ínto Pagan los Compradores?</h3><ul><li>Refinadores en l├¡nea: 90-97% del valor de fusi├│n</li><li>Compradores locales: 85-95%</li><li>Casas de empe├▒o: 50-80%</li></ul>`,

    fr: `<h3>Comment la Valeur de Fonte est Calcul├⌐e</h3><p>La valeur de tout article en argent d├⌐pend de trois facteurs : <strong>poids</strong>, <strong>puret├⌐</strong> et <strong>prix spot</strong>. La formule : Valeur = Poids (once troy) ├ù Puret├⌐ ├ù Prix Spot.</p><ul><li><strong>Poids</strong> ΓÇö En grammes, onces troy ou kilogrammes</li><li><strong>Puret├⌐</strong> ΓÇö Pourcentage d'argent : 999 fin (99.9%), 925 sterling (92.5%), 900 pi├¿ce (90%)</li><li><strong>Prix Spot</strong> ΓÇö Prix actuel sur les march├⌐s mondiaux</li></ul><h3>Qu'est-ce que la Ferraille d'Argent ?</h3><p>Tout article en argent vendu pour sa teneur en m├⌐tal : bijoux cass├⌐s, couverts anciens, pi├¿ces de monnaie en argent. Notre calculateur vous montre la valeur exacte.</p><h3>Comment Identifier le Vrai Argent</h3><p>Cherchez les poin├ºons : 925, 800, 999, STERLING. L'argent r├⌐el n'est PAS magn├⌐tique. Les articles plaqu├⌐s contiennent tr├¿s peu d'argent.</p>`,

    de: `<h3>Wie der Schmelzwert Berechnet Wird</h3><p>Der Wert eines Silberartikels h├ñngt von drei Faktoren ab: <strong>Gewicht</strong>, <strong>Reinheit</strong> und <strong>Spotpreis</strong>. Formel: Wert = Gewicht (Feinunzen) ├ù Reinheit ├ù Spotpreis.</p><ul><li><strong>Gewicht</strong> ΓÇö In Gramm, Feinunzen oder Kilogramm</li><li><strong>Reinheit</strong> ΓÇö Silberanteil: 999 (99.9%), 925 Sterling (92.5%), 900 M├╝nze (90%)</li><li><strong>Spotpreis</strong> ΓÇö Aktueller Marktpreis an B├╢rsen wie COMEX</li></ul><h3>Was ist Silberschrott?</h3><p>Silberschrott umfasst besch├ñdigten Schmuck, altes Besteck, Silberm├╝nzen und industrielle Abf├ñlle ΓÇö alles, was f├╝r seinen Silbergehalt verkauft wird.</p><h3>Echtes Silber Erkennen</h3><p>Suchen Sie nach Stempeln: 925, 800, 999, STERLING. Silber ist NICHT magnetisch. Versilberte Gegenst├ñnde (EP, EPNS) haben kaum Silberwert.</p>`,

    pt: `<h3>Como o Valor de Fus├úo ├⌐ Calculado</h3><p>O valor de qualquer item de prata depende de: <strong>peso</strong>, <strong>pureza</strong> e <strong>pre├ºo spot</strong>. F├│rmula: Valor = Peso (on├ºas troy) ├ù Pureza ├ù Pre├ºo Spot.</p><ul><li><strong>Peso</strong> ΓÇö Em gramas, on├ºas troy ou quilogramas</li><li><strong>Pureza</strong> ΓÇö Porcentagem de prata: 999 (99.9%), 925 esterlina (92.5%), 900 moeda (90%)</li><li><strong>Pre├ºo Spot</strong> ΓÇö Pre├ºo atual nos mercados globais</li></ul><h3>O Que ├⌐ Prata Sucata?</h3><p>Prata sucata inclui joias quebradas, talheres antigos, moedas de prata e res├¡duos industriais vendidos pelo valor do metal.</p>`,

    hi: `<h3>αñÜαñ╛αñéαñªαÑÇ αñòαñ╛ αñ¬αñ┐αñÿαñ▓ αñ«αÑéαñ▓αÑìαñ» αñòαÑêαñ╕αÑç αñ¿αñ┐αñòαñ╛αñ▓αÑçαñé</h3><p>αñòαñ┐αñ╕αÑÇ αñ¡αÑÇ αñÜαñ╛αñéαñªαÑÇ αñòαÑç αñåαñçαñƒαñ« αñòαñ╛ αñ«αÑéαñ▓αÑìαñ» αññαÑÇαñ¿ αñòαñ╛αñ░αñòαÑïαñé αñ¬αñ░ αñ¿αñ┐αñ░αÑìαñ¡αñ░ αñòαñ░αññαñ╛ αñ╣αÑê: <strong>αñ╡αñ£αñ╝αñ¿</strong>, <strong>αñ╢αÑüαñªαÑìαñºαññαñ╛</strong>, αñöαñ░ <strong>αñ╕αÑìαñ¬αÑëαñƒ αñ«αÑéαñ▓αÑìαñ»</strong>αÑñ αñ╕αÑéαññαÑìαñ░: αñ«αÑéαñ▓αÑìαñ» = αñ╡αñ£αñ╝αñ¿ (αñƒαÑìαñ░αÑëαñ» αñöαñéαñ╕) ├ù αñ╢αÑüαñªαÑìαñºαññαñ╛ ├ù αñ╕αÑìαñ¬αÑëαñƒ αñ«αÑéαñ▓αÑìαñ»αÑñ</p><ul><li><strong>αñ╡αñ£αñ╝αñ¿</strong> ΓÇö αñùαÑìαñ░αñ╛αñ«, αñƒαÑìαñ░αÑëαñ» αñöαñéαñ╕ αñ»αñ╛ αñòαñ┐αñ▓αÑïαñùαÑìαñ░αñ╛αñ« αñ«αÑçαñé</li><li><strong>αñ╢αÑüαñªαÑìαñºαññαñ╛</strong> ΓÇö αñÜαñ╛αñéαñªαÑÇ αñòαñ╛ αñ¬αÑìαñ░αññαñ┐αñ╢αññ: 999 (99.9%), 925 αñ╕αÑìαñƒαñ░αÑìαñ▓αñ┐αñéαñù (92.5%), 900 (90%)</li><li><strong>αñ╕αÑìαñ¬αÑëαñƒ αñ«αÑéαñ▓αÑìαñ»</strong> ΓÇö COMEX αñ£αÑêαñ╕αÑç αñ¼αñ╛αñ£αñ╝αñ╛αñ░αÑïαñé αñ╕αÑç αñ▓αñ╛αñçαñ╡ αñ«αÑéαñ▓αÑìαñ»</li></ul><h3>αñÜαñ╛αñéαñªαÑÇ αñòαñ╛ αñ╕αÑìαñòαÑìαñ░αÑêαñ¬ αñòαÑìαñ»αñ╛ αñ╣αÑê?</h3><p>αñƒαÑéαñƒαÑç αñåαñ¡αÑéαñ╖αñú, αñ¬αÑüαñ░αñ╛αñ¿αÑç αñ¼αñ░αÑìαññαñ¿, αñÜαñ╛αñéαñªαÑÇ αñòαÑç αñ╕αñ┐αñòαÑìαñòαÑç ΓÇö αñòαÑïαñê αñ¡αÑÇ αñÜαÑÇαñ£αñ╝ αñ£αÑï αñàαñ¬αñ¿αÑÇ αñºαñ╛αññαÑü αñ╕αñ╛αñ«αñùαÑìαñ░αÑÇ αñòαÑç αñ▓αñ┐αñÅ αñ¼αÑçαñÜαÑÇ αñ£αñ╛αññαÑÇ αñ╣αÑêαÑñ</p>`,

    ur: `<h3>┌å╪º┘å╪»█î ┌⌐█î ┘╛┌»┌╛┘ä ┘é█î┘à╪¬ ┌⌐█î╪│█Æ ┘à╪╣┘ä┘ê┘à ┌⌐╪▒█î┌║</h3><p>┌⌐╪│█î ╪¿┌╛█î ┌å╪º┘å╪»█î ┌⌐█î ┌å█î╪▓ ┌⌐█î ┘é█î┘à╪¬ ╪¬█î┘å ┌å█î╪▓┘ê┌║ ┘╛╪▒ ┘à┘å╪¡╪╡╪▒ █ü█Æ: <strong>┘ê╪▓┘å</strong>╪î <strong>╪«╪º┘ä╪╡█î╪¬</strong>╪î ╪º┘ê╪▒ <strong>╪│┘╛╪º┘╣ ┘é█î┘à╪¬</strong>█ö ┘ü╪º╪▒┘à┘ê┘ä╪º: ┘é█î┘à╪¬ = ┘ê╪▓┘å (┘╣╪▒╪º╪ª█Æ ╪º┘ê┘å╪│) ├ù ╪«╪º┘ä╪╡█î╪¬ ├ù ╪│┘╛╪º┘╣ ┘é█î┘à╪¬█ö</p><ul><li><strong>┘ê╪▓┘å</strong> ΓÇö ┌»╪▒╪º┘à╪î ┘╣╪▒╪º╪ª█Æ ╪º┘ê┘å╪│ █î╪º ┌⌐┘ä┘ê┌»╪▒╪º┘à ┘à█î┌║</li><li><strong>╪«╪º┘ä╪╡█î╪¬</strong> ΓÇö ┌å╪º┘å╪»█î ┌⌐╪º ┘ü█î╪╡╪»: 999 (99.9%)╪î 925 ╪│┘╣╪▒┘ä┘å┌» (92.5%)╪î 900 (90%)</li><li><strong>╪│┘╛╪º┘╣ ┘é█î┘à╪¬</strong> ΓÇö ╪╣╪º┘ä┘à█î ┘à┘å┌ê█î┘ê┌║ ╪│█Æ ┘ä╪º╪ª█î┘ê ┘é█î┘à╪¬</li></ul><h3>┌å╪º┘å╪»█î ┌⌐╪º ╪│┌⌐╪▒█î┘╛ ┌⌐█î╪º █ü█Æ╪ƒ</h3><p>┘╣┘ê┘╣█Æ █ü┘ê╪ª█Æ ╪▓█î┘ê╪▒╪º╪¬╪î ┘╛╪▒╪º┘å█Æ ╪¿╪▒╪¬┘å╪î ┌å╪º┘å╪»█î ┌⌐█Æ ╪│┌⌐█Æ ΓÇö ┌⌐┘ê╪ª█î ╪¿┌╛█î ┌å█î╪▓ ╪¼┘ê ╪º┘╛┘å█î ╪»┌╛╪º╪¬█î ┘é█î┘à╪¬ ┌⌐█Æ ┘ä█î█Æ ╪¿█î┌å█î ╪¼╪º╪ª█Æ█ö</p>`,

    ar: `<h3>┘â┘è┘ü ┘è╪¬┘à ╪¡╪│╪º╪¿ ┘é┘è┘à╪⌐ ╪º┘ä╪º┘å╪╡┘ç╪º╪▒</h3><p>╪¬╪╣╪¬┘à╪» ┘é┘è┘à╪⌐ ╪ú┘è ┘é╪╖╪╣╪⌐ ┘ü╪╢┘è╪⌐ ╪╣┘ä┘ë ╪½┘ä╪º╪½╪⌐ ╪╣┘ê╪º┘à┘ä: <strong>╪º┘ä┘ê╪▓┘å</strong>╪î <strong>╪º┘ä┘å┘é╪º╪í</strong>╪î ┘ê<strong>╪º┘ä╪│╪╣╪▒ ╪º┘ä┘ü┘ê╪▒┘è</strong>. ╪º┘ä┘à╪╣╪º╪»┘ä╪⌐: ╪º┘ä┘é┘è┘à╪⌐ = ╪º┘ä┘ê╪▓┘å (╪ú┘ê┘é┘è╪⌐ ╪¬╪▒┘ê┘è) ├ù ╪º┘ä┘å┘é╪º╪í ├ù ╪º┘ä╪│╪╣╪▒ ╪º┘ä┘ü┘ê╪▒┘è.</p><ul><li><strong>╪º┘ä┘ê╪▓┘å</strong> ΓÇö ╪¿╪º┘ä╪¼╪▒╪º┘à ╪ú┘ê ╪ú┘ê┘é┘è╪⌐ ╪¬╪▒┘ê┘è ╪ú┘ê ┘â┘è┘ä┘ê╪¼╪▒╪º┘à</li><li><strong>╪º┘ä┘å┘é╪º╪í</strong> ΓÇö ┘å╪│╪¿╪⌐ ╪º┘ä┘ü╪╢╪⌐: 999 (99.9%)╪î 925 ╪Ñ╪│╪¬╪▒┘ä┘è┘å┘è (92.5%)╪î 900 ╪╣┘à┘ä╪⌐ (90%)</li><li><strong>╪º┘ä╪│╪╣╪▒ ╪º┘ä┘ü┘ê╪▒┘è</strong> ΓÇö ╪º┘ä╪│╪╣╪▒ ╪º┘ä╪¡╪º┘ä┘è ┘à┘å ╪º┘ä╪¿┘ê╪▒╪╡╪º╪¬ ╪º┘ä╪╣╪º┘ä┘à┘è╪⌐</li></ul><h3>┘à╪º ┘ç┘è ╪«╪▒╪»╪⌐ ╪º┘ä┘ü╪╢╪⌐╪ƒ</h3><p>╪º┘ä┘à╪¼┘ê┘ç╪▒╪º╪¬ ╪º┘ä┘à┘â╪│┘ê╪▒╪⌐╪î ╪º┘ä╪ú┘ê╪º┘å┘è ╪º┘ä┘é╪»┘è┘à╪⌐╪î ╪º┘ä╪╣┘à┘ä╪º╪¬ ╪º┘ä┘ü╪╢┘è╪⌐ ΓÇö ╪ú┘è ╪┤┘è╪í ┘è┘Å╪¿╪º╪╣ ┘ä┘é┘è┘à╪¬┘ç ╪º┘ä┘à╪╣╪»┘å┘è╪⌐.</p>`,

    tr: `<h3>Eritme De─ƒeri Nas─▒l Hesaplan─▒r</h3><p>Herhangi bir g├╝m├╝┼ƒ e┼ƒyan─▒n de─ƒeri ├╝├º fakt├╢re ba─ƒl─▒d─▒r: <strong>a─ƒ─▒rl─▒k</strong>, <strong>safl─▒k</strong> ve <strong>spot fiyat</strong>. Form├╝l: De─ƒer = A─ƒ─▒rl─▒k (troy ons) ├ù Safl─▒k ├ù Spot Fiyat.</p><ul><li><strong>A─ƒ─▒rl─▒k</strong> ΓÇö Gram, troy ons veya kilogram cinsinden</li><li><strong>Safl─▒k</strong> ΓÇö G├╝m├╝┼ƒ y├╝zdesi: 999 (%99.9), 925 ayar (%92.5), 900 (%90)</li><li><strong>Spot Fiyat</strong> ΓÇö COMEX gibi borsalardan canl─▒ fiyat</li></ul><h3>Hurda G├╝m├╝┼ƒ Nedir?</h3><p>K─▒r─▒k tak─▒lar, eski sofra tak─▒mlar─▒, g├╝m├╝┼ƒ paralar ΓÇö metal de─ƒeri i├ºin sat─▒lan her ┼ƒey.</p>`,

    it: `<h3>Come si Calcola il Valore di Fusione</h3><p>Il valore di qualsiasi articolo in argento dipende da: <strong>peso</strong>, <strong>purezza</strong> e <strong>prezzo spot</strong>. Formula: Valore = Peso (oncia troy) ├ù Purezza ├ù Prezzo Spot.</p><ul><li><strong>Peso</strong> ΓÇö In grammi, once troy o chilogrammi</li><li><strong>Purezza</strong> ΓÇö Percentuale di argento: 999 (99.9%), 925 sterling (92.5%), 900 moneta (90%)</li><li><strong>Prezzo Spot</strong> ΓÇö Prezzo attuale dai mercati globali</li></ul><h3>Cos'├¿ l'Argento Rottame?</h3><p>Gioielli rotti, argenteria vecchia, monete d'argento ΓÇö qualsiasi cosa venduta per il suo contenuto metallico.</p>`,

    zh: `<h3>τÖ╜Θô╢τåöτé╝Σ╗╖σÇ╝σªéΣ╜òΦ«íτ«ù</h3><p>Σ╗╗Σ╜òτÖ╜Θô╢τë⌐σôüτÜäΣ╗╖σÇ╝σÅûσå│Σ║ÄΣ╕ëΣ╕¬σ¢áτ┤á∩╝Ü<strong>ΘçìΘçÅ</strong>πÇü<strong>τ║»σ║ª</strong>σÆî<strong>τÄ░Φ┤ºΣ╗╖µá╝</strong>πÇéσà¼σ╝Å∩╝ÜΣ╗╖σÇ╝ = ΘçìΘçÅ∩╝êΘçæΦííτ¢ÄσÅ╕∩╝ë├ù τ║»σ║ª ├ù τÄ░Φ┤ºΣ╗╖µá╝πÇé</p><ul><li><strong>ΘçìΘçÅ</strong> ΓÇö Σ╗ÑσàïπÇüΘçæΦííτ¢ÄσÅ╕µêûσìâσàïΣ╕║σìòΣ╜ì</li><li><strong>τ║»σ║ª</strong> ΓÇö Θô╢σÉ½ΘçÅτÖ╛σêåµ»ö∩╝Ü999τ║»Θô╢(99.9%)πÇü925τ║»Θô╢(92.5%)πÇü900Θô╢σ╕ü(90%)</li><li><strong>τÄ░Φ┤ºΣ╗╖µá╝</strong> ΓÇö µ¥ÑΦç¬COMEXτ¡ëσà¿τÉâΣ║ñµÿôµëÇτÜäσ«₧µù╢Σ╗╖µá╝</li></ul><h3>Σ╗ÇΣ╣êµÿ»σ║ƒΘô╢∩╝ƒ</h3><p>τá┤µìƒτÜäΘªûΘÑ░πÇüµùºΘô╢σÖ¿πÇüΘô╢σ╕ü ΓÇö Σ╗╗Σ╜òΣ╗Ñσà╢Θçæσ▒₧σÉ½ΘçÅσç║σö«τÜäΘô╢σê╢σôüπÇé</p>`,

    ru: `<h3>╨Ü╨░╨║ ╨á╨░╤ü╤ü╤ç╨╕╤é╤ï╨▓╨░╨╡╤é╤ü╤Å ╨í╤é╨╛╨╕╨╝╨╛╤ü╤é╤î ╨ƒ╨╗╨░╨▓╨║╨╕</h3><p>╨í╤é╨╛╨╕╨╝╨╛╤ü╤é╤î ╨╗╤Ä╨▒╨╛╨│╨╛ ╤ü╨╡╤Ç╨╡╨▒╤Ç╤Å╨╜╨╛╨│╨╛ ╨╕╨╖╨┤╨╡╨╗╨╕╤Å ╨╖╨░╨▓╨╕╤ü╨╕╤é ╨╛╤é ╤é╤Ç╤æ╤à ╤ä╨░╨║╤é╨╛╤Ç╨╛╨▓: <strong>╨▓╨╡╤ü</strong>, <strong>╤ç╨╕╤ü╤é╨╛╤é╨░</strong> ╨╕ <strong>╤ü╨┐╨╛╤é-╤å╨╡╨╜╨░</strong>. ╨ñ╨╛╤Ç╨╝╤â╨╗╨░: ╨í╤é╨╛╨╕╨╝╨╛╤ü╤é╤î = ╨Æ╨╡╤ü (╤é╤Ç╨╛╨╣╤ü╨║╨╕╨╡ ╤â╨╜╤å╨╕╨╕) ├ù ╨º╨╕╤ü╤é╨╛╤é╨░ ├ù ╨í╨┐╨╛╤é-╤å╨╡╨╜╨░.</p><ul><li><strong>╨Æ╨╡╤ü</strong> ΓÇö ╨Æ ╨│╤Ç╨░╨╝╨╝╨░╤à, ╤é╤Ç╨╛╨╣╤ü╨║╨╕╤à ╤â╨╜╤å╨╕╤Å╤à ╨╕╨╗╨╕ ╨║╨╕╨╗╨╛╨│╤Ç╨░╨╝╨╝╨░╤à</li><li><strong>╨º╨╕╤ü╤é╨╛╤é╨░</strong> ΓÇö ╨ƒ╤Ç╨╛╤å╨╡╨╜╤é ╤ü╨╡╤Ç╨╡╨▒╤Ç╨░: 999 (99.9%), 925 ╤ü╤é╨╡╤Ç╨╗╨╕╨╜╨│ (92.5%), 900 ╨╝╨╛╨╜╨╡╤é╨╜╨╛╨╡ (90%)</li><li><strong>╨í╨┐╨╛╤é-╤å╨╡╨╜╨░</strong> ΓÇö ╨ó╨╡╨║╤â╤ë╨░╤Å ╤å╨╡╨╜╨░ ╤ü ╨╝╨╕╤Ç╨╛╨▓╤ï╤à ╨▒╨╕╤Ç╨╢</li></ul><h3>╨º╤é╨╛ ╨ó╨░╨║╨╛╨╡ ╨í╨╡╤Ç╨╡╨▒╤Ç╤Å╨╜╤ï╨╣ ╨¢╨╛╨╝?</h3><p>╨í╨╗╨╛╨╝╨░╨╜╨╜╤ï╨╡ ╤â╨║╤Ç╨░╤ê╨╡╨╜╨╕╤Å, ╤ü╤é╨░╤Ç╨╛╨╡ ╤ü╤é╨╛╨╗╨╛╨▓╨╛╨╡ ╤ü╨╡╤Ç╨╡╨▒╤Ç╨╛, ╤ü╨╡╤Ç╨╡╨▒╤Ç╤Å╨╜╤ï╨╡ ╨╝╨╛╨╜╨╡╤é╤ï ΓÇö ╨▓╤ü╤æ, ╤ç╤é╨╛ ╨┐╤Ç╨╛╨┤╨░╤æ╤é╤ü╤Å ╨╖╨░ ╨╝╨╡╤é╨░╨╗╨╗╨╕╤ç╨╡╤ü╨║╨╛╨╡ ╤ü╨╛╨┤╨╡╤Ç╨╢╨░╨╜╨╕╨╡.</p>`,
  };
  return content[code] || content['es'];
}

function getFAQItems(code, t) {
  const faqs = {
    es: [
      ['┬┐Qu├⌐ tan precisa es esta calculadora?', 'Nuestra calculadora utiliza precios spot en vivo y f├│rmulas precisas. El valor mostrado es te├│rico; los compradores pagan 80-97% del valor de fusi├│n.'],
      ['┬┐C├│mo s├⌐ qu├⌐ pureza tiene mi plata?', 'Busque sellos: 925 (esterlina), 999 (fina), 800. Si no hay sello, un joyero puede hacer una prueba de ├ícido.'],
      ['┬┐Por qu├⌐ cambia el precio durante el d├¡a?', 'La plata se cotiza en mercados globales como COMEX. El precio fluct├║a por oferta, demanda y condiciones econ├│micas.'],
      ['┬┐Cu├íl es la diferencia entre valor de fusi├│n y valor de reventa?', 'El valor de fusi├│n es el valor del metal puro. Monedas raras o joyer├¡a antigua pueden valer m├ís.'],
      ['┬┐Qu├⌐ es una onza troy?', 'Una onza troy (31.1035g) es la unidad est├índar para metales preciosos. Es ~10% m├ís pesada que una onza regular.'],
      ['┬┐Cu├ínto vale mi plata esterlina?', 'La plata esterlina (marcada 925) es 92.5% de plata pura. Utilice nuestra calculadora de plata esterlina o ingrese el peso de su art├¡culo para ver el valor exacto seg├║n el mercado actual.'],
      ['┬┐Tienen valor de desecho los cubiertos ba├▒ados en plata?', 'Los art├¡culos ba├▒ados en plata (Silver Plate, EPNS) contienen una capa muy delgada sobre metal base y generalmente solo valen $1-5. Solo los art├¡culos de plata s├│lida (marcados 925, 800, 999 o STERLING) tienen valor significativo como desecho.'],
      ['┬┐Qu├⌐ son las monedas de plata antiguas (junk silver) y c├│mo calculo su valor?', 'Las denominadas "junk silver" son monedas de EE. UU. anteriores a 1965 (de diez, veinticinco centavos y medio d├│lar) que contienen un 90% de plata. $1 de valor nominal contiene 0.715 oz troy de plata. Utilice nuestra calculadora espec├¡fica introduciendo el valor nominal.'],
      ['┬┐C├│mo vendo mi plata al mejor precio?', 'Primero conozca su valor de fusi├│n con nuestra calculadora. Luego: 1) obtenga 3+ cotizaciones, 2) prefiera refinadores en l├¡nea (pagan 90-97% del valor) frente a casas de empe├▒o (pagan 50-80%), y 3) venda en grandes lotes si es posible.'],
      ['┬┐Puedo calcular varios art├¡culos de plata a la vez?', '┬íS├¡! Nuestra calculadora por lotes le permite agregar m├║ltiples art├¡culos con diferentes pesos y purezas, y le mostrar├í el valor total combinado listo para imprimir o copiar al visitar al comprador.'],
      ['┬┐Qu├⌐ significa 925 en la plata?', 'El sello 925 significa que el art├¡culo es de plata esterlina: 92.5% de plata pura y 7.5% de aleaci├│n de cobre. Es la marca de pureza de plata m├ís com├║n en todo el mundo.'],
      ['┬┐C├│mo afectan los precios spot de la plata al valor de desecho?', 'El valor de la plata se mueve en sincron├¡a con el precio spot internacional. Cuando el spot sube un 10%, su plata de desecho vale un 10% m├ís. Los precios spot se fijan en el mercado COMEX y se negocian casi 24/5.'],
    ],
    fr: [
      ['Quelle est la pr├⌐cision de ce calculateur ?', 'Notre calculateur utilise des prix spot en direct. La valeur affich├⌐e est th├⌐orique ; les acheteurs paient 80-97% de la valeur de fonte.'],
      ['Comment conna├«tre la puret├⌐ de mon argent ?', 'Cherchez les poin├ºons : 925, 999, 800, STERLING. Un bijoutier peut effectuer un test d\'acide.'],
      ['Pourquoi le prix change-t-il pendant la journ├⌐e ?', 'L\'argent est cot├⌐ sur les march├⌐s mondiaux. Le prix fluctue selon l\'offre et la demande.'],
      ['Qu\'est-ce qu\'une once troy ?', 'Une once troy (31.1035g) est l\'unit├⌐ standard des m├⌐taux pr├⌐cieux, ~10% plus lourde qu\'une once r├⌐guli├¿re.'],
    ],
    de: [
      ['Wie genau ist dieser Rechner?', 'Unser Rechner verwendet Live-Spotpreise. Der angezeigte Wert ist theoretisch; H├ñndler zahlen 80-97% des Schmelzwerts.'],
      ['Why does the price change?', 'Silver trades on global exchanges. Price fluctuates with supply and demand.'],
      ['What is a troy ounce?', 'A troy ounce (31.1035g) is the standard unit for precious metals, ~10% heavier than a regular ounce.'],
    ],
    pt: [
      ['Qu├úo precisa ├⌐ esta calculadora?', 'Nossa calculadora usa pre├ºos spot ao vivo. O valor exibido ├⌐ te├│rico; compradores pagam 80-97%.'],
      ['Como sei a pureza da minha prata?', 'Procure marcas: 925, 999, 800. Um joalheiro pode fazer um teste de ├ícido.'],
      ['Por que o pre├ºo muda?', 'A prata ├⌐ negociada globalmente. O pre├ºo flutua com a oferta e a demanda.'],
    ],
    hi: [
      ['αñ»αñ╣ αªòαºìαª»αª╛αª▓αªòαºüαª▓αºçαªƒαª░ αñòαñ┐αññαñ¿αñ╛ αñ╕αñƒαÑÇαñò αñ╣αÑê?', 'αñ╣αñ« αñ▓αñ╛αñçαñ╡ αñ╕αÑìαñ¬αÑëαñƒ αñ«αÑéαñ▓αÑìαñ» αñòαñ╛ αñëαñ¬αñ»αÑïαñù αñòαñ░αññαÑç αñ╣αÑêαñéαÑñ αñªαñ┐αñûαñ╛αñ»αñ╛ αñùαñ»αñ╛ αñ«αÑéαñ▓αÑìαñ» αñºαñ╛αññαÑü αñòαñ╛ αñ╣αÑê; αñûαñ░αÑÇαñªαñ╛αñ░ 80-97% αñªαÑçαññαÑç αñ╣αÑêαñéαÑñ'],
      ['αñ«αÑüαñ¥αÑç αñàαñ¬αñ¿αÑÇ αñÜαñ╛αñéαñªαÑÇ αñòαÑÇ αñ╢αÑüαñªαÑìαñºαññαñ╛ αñòαÑêαñ╕αÑç αñ¬αññαñ╛ αñÜαñ▓αÑçαñùαÑÇ?', 'αñ╕αÑìαñƒαÑêαñ«αÑìαñ¬ αñªαÑçαñûαÑçαñé: 925, 999, 800αÑñ'],
      ['αñòαÑÇαñ«αññ αñòαÑìαñ»αÑïαñé αñ¼αñªαñ▓αññαÑÇ αñ╣αÑê?', 'αñÜαñ╛αñéαñªαÑÇ αñòαñ╛ αñ╡αÑìαñ»αñ╛αñ¬αñ╛αñ░ αñ╡αÑêαñ╢αÑìαñ╡αñ┐αñò αñ¼αñ╛αñ£αñ╝αñ╛αñ░αÑïαñé αñ«αÑçαñé αñ╣αÑïαññαñ╛ αñ╣αÑêαÑñ αñ«αñ╛αñéαñù αñöαñ░ αñåαñ¬αÑéαñ░αÑìαññαñ┐ αñòαÑç αñ╕αñ╛αñÑ αñòαÑÇαñ«αññ αñ¼αñªαñ▓αññαÑÇ αñ╣αÑêαÑñ'],
    ],
    ur: [
      ['█î█ü ┌⌐█î┘ä┌⌐┘ê┘ä█î┘╣╪▒ ┌⌐╪¬┘å╪º ╪»╪▒╪│╪¬ █ü█Æ╪ƒ', '█ü┘à ┘ä╪º╪ª█î┘ê ╪│┘╛╪º┘╣ ┘é█î┘à╪¬ ╪º╪│╪¬╪╣┘à╪º┘ä ┌⌐╪▒╪¬█Æ █ü█î┌║█ö ╪»┌⌐┌╛╪º╪ª█î ┌»╪ª█î ┘é█î┘à╪¬ ╪»┌╛╪º╪¬ ┌⌐█î █ü█Æ╪¢ ╪«╪▒█î╪»╪º╪▒ 80-97┘¬ ╪»█î╪¬█Æ █ü█î┌║█ö'],
      ['┘à╪¼┌╛█Æ ╪º┘╛┘å█î ┌å╪º┘å╪»█î ┌⌐█î ╪«╪º┘ä╪╡█î╪¬ ┌⌐█î╪│█Æ ┘╛╪¬█ü ┌å┘ä█Æ ┌»█î╪ƒ', '┘à█ü╪▒█î┌║ ╪»█î┌⌐┌╛█î┌║: 925╪î 999╪î 800█ö'],
      ['┘é█î┘à╪¬ ┌⌐█î┘ê┌║ ╪¿╪»┘ä╪¬█î █ü█Æ╪ƒ', '┌å╪º┘å╪»█î ┌⌐█î ╪¬╪¼╪º╪▒╪¬ ╪╣╪º┘ä┘à█î ┘à┘å┌ê█î┘ê┌║ ┘à█î┌║ █ü┘ê╪¬█î █ü█Æ╪î ┘é█î┘à╪¬ ╪╖┘ä╪¿ ╪º┘ê╪▒ ╪▒╪│╪» ╪│█Æ ╪¿╪»┘ä╪¬█î █ü█Æ█ö'],
    ],
    ar: [
      ['┘à╪º ┘à╪»┘ë ╪»┘é╪⌐ ┘ç╪░┘ç ╪º┘ä╪¡╪º╪│╪¿╪⌐╪ƒ', '┘å╪¡┘å ┘å╪│╪¬╪«╪»┘à ╪º┘ä╪ú╪│╪╣╪º╪▒ ╪º┘ä┘ü┘ê╪▒┘è╪⌐ ╪º┘ä╪¡┘è╪⌐. ╪º┘ä┘é┘è┘à╪⌐ ╪º┘ä┘à╪╣╪▒┘ê╪╢╪⌐ ┘ç┘è ┘ä┘ä┘à╪╣╪»┘å╪¢ ┘è╪»┘ü╪╣ ╪º┘ä┘à╪┤╪¬╪▒┘ê┘å 80-97┘¬.'],
      ['┘â┘è┘ü ╪ú╪╣╪▒┘ü ┘å┘é╪º╪í ╪º┘ä┘ü╪╢╪⌐╪ƒ', '╪º╪¿╪¡╪½ ╪╣┘å ╪º┘ä╪ú╪«╪¬╪º┘à: 925╪î 999╪î 800.'],
      ['┘ä┘à╪º╪░╪º ┘è╪¬╪║┘è╪▒ ╪º┘ä╪│╪╣╪▒╪ƒ', '╪º┘ä┘ü╪╢╪⌐ ╪¬╪¬╪»╪º┘ê┘ä ┘ü┘è ╪º┘ä╪ú╪│┘ê╪º┘é ╪º┘ä╪╣╪º┘ä┘à┘è╪⌐. ┘è╪¬╪║┘è╪▒ ╪º┘ä╪│╪╣╪▒ ┘à╪╣ ╪º┘ä╪╣╪▒╪╢ ┘ê╪º┘ä╪╖┘ä╪¿.'],
    ],
    tr: [
      ['Bu hesap makinesi ne kadar do─ƒru?', 'Canl─▒ spot fiyatlar─▒ kullan─▒yoruz. G├╢sterilen de─ƒer teoriktir; al─▒c─▒lar %80-97 ├╢der.'],
      ['G├╝m├╝┼ƒ├╝m├╝n safl─▒─ƒ─▒n─▒ nas─▒l anlar─▒m?', 'Damgalara bak─▒n: 925, 999, 800.'],
      ['Fiyat neden de─ƒi┼ƒiyor?', 'G├╝m├╝┼ƒ k├╝resel borsalarda i┼ƒlem g├╢r├╝r. Fiyat arz ve talebe g├╢re dalgalan─▒r.'],
    ],
    it: [
      ['Quanto ├¿ accurato questo calcolatore?', 'Usiamo prezzi spot in tempo reale. Il valore mostrato ├¿ teorico; gli acquirenti pagano l\'80-97%.'],
      ['Come verifico la purezza?', 'Cerca i marchi: 925, 999, 800. Un gioielliere pu├▓ fare un test con acido.'],
      ['Perch├⌐ il prezzo cambia?', 'L\'argento ├¿ scambiato sui mercati globali. Il prezzo fluttua con la domanda e l\'offerta.'],
    ],
    zh: [
      ['Φ┐ÖΣ╕¬Φ«íτ«ùσÖ¿µ£ëσñÜσçåτí«∩╝ƒ', 'µêæΣ╗¼Σ╜┐τö¿σ«₧µù╢τÄ░Φ┤ºΣ╗╖µá╝πÇéµÿ╛τñ║τÜäσÇ╝µÿ»τÉåΦ«║Σ╕èτÜäτåöτé╝Σ╗╖σÇ╝∩╝¢Σ╣░σ«╢µö»Σ╗ÿ80-97%πÇé'],
      ['µêæµÇÄΣ╣êτƒÑΘüôΘô╢τÜäτ║»σ║ª∩╝ƒ', 'σ»╗µë╛σì░Φ«░∩╝Ü925πÇü999πÇü800πÇéτÅáσ«¥σòåσÅ»Σ╗ÑΦ┐¢Φíîµ╡ïΦ»òπÇé'],
      ['Σ╕║Σ╗ÇΣ╣êΣ╗╖µá╝Σ╝ÜσÅÿσè¿∩╝ƒ', 'τÖ╜Θô╢σ£¿σà¿τÉâΣ║ñµÿôµëÇΣ║ñµÿôπÇéΣ╗╖µá╝ΘÜÅΣ╛¢Θ£Çµ│óσè¿πÇé'],
    ],
    ru: [
      ['╨¥╨░╤ü╨║╨╛╨╗╤î╨║╨╛ ╤é╨╛╤ç╨╡╨╜ ╤ì╤é╨╛╤é ╨║╨░╨╗╤î╨║╤â╨╗╤Å╤é╨╛╤Ç?', '╨£╤ï ╨╕╤ü╨┐╨╛╨╗╤î╨╖╤â╨╡╨╝ ╨░╨║╤é╤â╨░╨╗╤î╨╜╤ï╨╡ ╤ü╨┐╨╛╤é-╤å╨╡╨╜╤ï. ╨ƒ╨╛╨║╨░╨╖╨░╨╜╨╜╨╛╨╡ ╨╖╨╜╨░╤ç╨╡╨╜╨╕╨╡ ╤é╨╡╨╛╤Ç╨╡╤é╨╕╤ç╨╡╤ü╨║╨╛╨╡; ╨┐╨╛╨║╤â╨┐╨░╤é╨╡╨╗╨╕ ╨┐╨╗╨░╤é╤Å╤é 80-97%.'],
      ['╨Ü╨░╨║ ╤â╨╖╨╜╨░╤é╤î ╤ç╨╕╤ü╤é╨╛╤é╤â ╤ü╨╡╤Ç╨╡╨▒╤Ç╨░?', '╨ÿ╤ë╨╕╤é╨╡ ╨║╨╗╨╡╨╣╨╝╨░: 925, 999, 800.'],
      ['╨ƒ╨╛╤ç╨╡╨╝╤â ╤å╨╡╨╜╨░ ╨╝╨╡╨╜╤Å╨╡╤é╤ü╤Å?', '╨í╨╡╤Ç╨╡╨▒╤Ç╨╛ ╤é╨╛╤Ç╨│╤â╨╡╤é╤ü╤Å ╨╜╨░ ╨╝╨╕╤Ç╨╛╨▓╤ï╤à ╨▒╨╕╤Ç╨╢╨░╤à. ╨ª╨╡╨╜╨░ ╨║╨╛╨╗╨╡╨▒╨╗╨╡╤é╤ü╤Å ╨▓ ╨╖╨░╨▓╨╕╤ü╨╕╨╝╨╛╤ü╤é╨╕ ╨╛╤é ╤ü╨┐╤Ç╨╛╤ü╨░ ╨╕ ╨┐╤Ç╨╡╨┤╨╗╨╛╨╢╨╡╨╜╨╕╤Å.'],
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
      "Silver Melt Value": "Valor de Fusi├│n de la Plata",
      "Sterling Silver Calculator": "Calculadora de Plata Esterlina",
      "Junk Silver Calculator": "Calculadora de Plata Basura",
      "Silver Coin Value": "Valor de Moneda de Plata",
      "Silver Bar Value": "Valor de Lingote de Plata",
      "Silver Jewelry Value": "Valor de Joyer├¡a de Plata",
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
      "Sell or Hold Analysis": "An├ílisis de Vender o Mantener",
      "Silver Identifier": "Identificador de Plata",
      "Guides": "Gu├¡as",
      "How to Use Our Calculators": "C├│mo Usar Nuestras Calculadoras",
      "What Is Silver Scrap?": "┬┐Qu├⌐ es la Plata de Desecho?",
      "What Is Melt Value?": "┬┐Qu├⌐ es el Valor de Fusi├│n?",
      "What Is Junk Silver?": "┬┐Qu├⌐ es la Plata Basura?",
      "What Is a Troy Ounce?": "┬┐Qu├⌐ es una Onza Troy?",
      "What Is Silver Bullion?": "┬┐Qu├⌐ es un Lingote de Plata?",
      "How Silver Prices Work": "C├│mo Funcionan los Precios de la Plata",
      "Silver Hallmarks Guide": "Gu├¡a de Sellos de Plata",
      "What Does 925 Mean?": "┬┐Qu├⌐ Significa 925?",
      "What Is Sterling Silver?": "┬┐Qu├⌐ es la Plata Esterlina?",
      "How to Sell Silver": "C├│mo Vender Plata",
      "Scrap Silver": "Plata de Desecho",
      "Gold & Silver": "Oro y Plata",
      "Silver Profit": "Ganancia de Plata",
      "Melt Value": "Valor de Fusi├│n",
      "Junk Silver": "Plata Basura",
      "Silver Coins": "Monedas de Plata",
      "Silver Dollar": "D├│lar de Plata",
      "Silver Quarter": "Cuarto de D├│lar de Plata",
      "Silver Dime": "Moneda de Diez Centavos de Plata",
      "Jewelry Value": "Valor de Joyer├¡a",
      "925 Sterling": "Esterlina 925",
      "Purity Chart": "Tabla de Pureza",
      "How to Use Calculators": "C├│mo Usar las Calculadoras",
      "Sona Chandi Calc": "Calc. Sona Chandi",
      "Face Value Calc": "Calc. Valor Nominal",
      "Sell or Hold": "Vender o Mantener",
      "About": "Acerca de",
      "Privacy": "Privacidad",
      "Terms": "T├⌐rminos",
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
      "Silver Coin Value": "Valeur des Pi├¿ces d'Argent",
      "Silver Bar Value": "Valeur des Lingots d'Argent",
      "Silver Jewelry Value": "Valeur des Bijoux en Argent",
      "Silverware Value": "Valeur de l'Argenterie",
      "Purity": "Puret├⌐",
      "999 Fine Silver": "Argent Fin 999",
      "958 Britannia Silver": "Argent Britannia 958",
      "925 Sterling Silver": "Argent Sterling 925",
      "900 Coin Silver": "Argent de Pi├¿ce 900",
      "835 Silver": "Argent 835",
      "800 Silver": "Argent 800",
      "Silver Purity Chart": "Tableau de Puret├⌐ de l'Argent",
      "Pricing": "Prix",
      "Silver Price Per Gram": "Prix de l'Argent au Gramme",
      "Silver Price Per Ounce": "Prix de l'Argent ├á l'Once",
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
      "Silver Hallmarks Guide": "Guide des Poin├ºons d'Argent",
      "What Does 925 Mean?": "Que Signifie 925 ?",
      "What Is Sterling Silver?": "Qu'est-ce que l'Argent Sterling ?",
      "How to Sell Silver": "Comment Vendre de l'Argent",
      "Scrap Silver": "Ferraille d'Argent",
      "Gold & Silver": "Or et Argent",
      "Silver Profit": "Profit d'Argent",
      "Melt Value": "Valeur de Fonte",
      "Junk Silver": "Argent de Circulation",
      "Silver Coins": "Pi├¿ces d'Argent",
      "Silver Dollar": "Dollar en Argent",
      "Silver Quarter": "Quart de Dollar en Argent",
      "Silver Dime": "Pi├¿ce de Dix Cents en Argent",
      "Jewelry Value": "Valeur des Bijoux",
      "925 Sterling": "Sterling 925",
      "Purity Chart": "Tableau de Puret├⌐",
      "How to Use Calculators": "Comment Utiliser les Calculateurs",
      "Sona Chandi Calc": "Calc. Sona Chandi",
      "Face Value Calc": "Calc. Valeur Nominale",
      "Sell or Hold": "Vendre ou Garder",
      "About": "├Ç Propos",
      "Privacy": "Confidentialit├⌐",
      "Terms": "Conditions",
      "All rights reserved.": "Tous droits r├⌐serv├⌐s.",
      "Prices are for informational purposes only.": "Les prix sont ├á titre informatif.",
      "Primary Calculators": "Calculateurs Principaux",
      "Item Calculators": "Calculateurs d'Articles",
      "Popular Coins": "Pi├¿ces Populaires",
      "Silver Purity": "Puret├⌐ de l'Argent",
      "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "Calculateurs gratuits utilisant les prix en direct. Calculez la valeur de votre ferraille d'argent instantan├⌐ment."
    },
    de: {
      "Home": "Startseite", "Calculators": "Rechner", "Purity": "Reinheit", "Pricing": "Preise", "Tools": "Werkzeuge", "Guides": "Ratgeber",
      "Primary Calculators": "Hauptrechner", "Item Calculators": "Artikelrechner", "Popular Coins": "Beliebte M├╝nzen", "Silver Purity": "Silberreinheit",
      "Silver Scrap Calculator": "Silberschrott-Rechner", "About": "├£ber uns", "Privacy": "Datenschutz", "Terms": "Bedingungen",
      "All rights reserved.": "Alle Rechte vorbehalten.", "Prices are for informational purposes only.": "Preise dienen nur zu Informationszwecken.",
      "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "Kostenlose Rechner mit Live-Spotpreisen. Berechnen Sie den Schmelzwert Ihres Silbers blitzschnell."
    },
    pt: {
      "Home": "In├¡cio", "Calculators": "Calculadoras", "Purity": "Pureza", "Pricing": "Pre├ºos", "Tools": "Ferramentas", "Guides": "Guias",
      "Primary Calculators": "Calculadoras Principais", "Item Calculators": "Calculadoras de Itens", "Popular Coins": "Moedas Populares", "Silver Purity": "Pureza da Prata",
      "Silver Scrap Calculator": "Calculadora de Sucata", "About": "Sobre", "Privacy": "Privacidade", "Terms": "Termos",
      "All rights reserved.": "Todos os direitos reservados.", "Prices are for informational purposes only.": "Os pre├ºos s├úo apenas para fins informativos.",
      "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "Calculadoras precisas usando pre├ºos ao vivo. Calcule o valor de sua sucata de prata instantaneamente."
    },
    hi: {
      "Home": "αñ«αÑüαñûαÑìαñ» αñ¬αÑâαñ╖αÑìαñá", "Calculators": "αñòαÑêαñ▓αñòαÑüαñ▓αÑçαñƒαñ░", "Purity": "αñ╢αÑüαñªαÑìαñºαññαñ╛", "Pricing": "αñòαÑÇαñ«αññαÑçαñé", "Tools": "αñƒαÑéαñ▓αÑìαñ╕", "Guides": "αñùαñ╛αñçαñíαÑìαñ╕",
      "Primary Calculators": "αñ¬αÑìαñ░αñ╛αñÑαñ«αñ┐αñò αñòαÑêαñ▓αñòαÑüαñ▓αÑçαñƒαñ░", "Item Calculators": "αñåαñçαñƒαñ« αñòαÑêαñ▓αñòαÑüαñ▓αÑçαñƒαñ░", "Popular Coins": "αñ▓αÑïαñòαñ¬αÑìαñ░αñ┐αñ» αñ╕αñ┐αñòαÑìαñòαÑç", "Silver Purity": "αñÜαñ╛αñéαñªαÑÇ αñòαÑÇ αñ╢αÑüαñªαÑìαñºαññαñ╛",
      "Silver Scrap Calculator": "αñ╕αñ┐αñ▓αÑìαñ╡αñ░ αñ╕αÑìαñòαÑìαñ░αÑêαñ¬ αñòαÑêαñ▓αñòαÑüαñ▓αÑçαñƒαñ░", "About": "αñ╣αñ«αñ╛αñ░αÑç αñ¼αñ╛αñ░αÑç αñ«αÑçαñé", "Privacy": "αñùαÑïαñ¬αñ¿αÑÇαñ»αññαñ╛", "Terms": "αñ╢αñ░αÑìαññαÑçαñé",
      "All rights reserved.": "αñ╕αñ░αÑìαñ╡αñ╛αñºαñ┐αñòαñ╛αñ░ αñ╕αÑüαñ░αñòαÑìαñ╖αñ┐αññαÑñ", "Prices are for informational purposes only.": "αñòαÑÇαñ«αññαÑçαñé αñòαÑçαñ╡αñ▓ αñ╕αÑéαñÜαñ¿αñ╛αññαÑìαñ«αñò αñëαñªαÑìαñªαÑçαñ╢αÑìαñ»αÑïαñé αñòαÑç αñ▓αñ┐αñÅ αñ╣αÑêαñéαÑñ",
      "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "αñ▓αñ╛αñçαñ╡ αñ╕αÑìαñ¬αÑëαñƒ αñòαÑÇαñ«αññαÑïαñé αñòαÑç αñ╕αñ╛αñÑ αñÜαñ╛αñéαñªαÑÇ αñòαÑêαñ▓αñòαÑüαñ▓αÑçαñƒαñ░αÑñ αññαÑüαñ░αñéαññ αñàαñ¬αñ¿αÑÇ αñ╕αÑìαñòαÑìαñ░αÑêαñ¬ αñÜαñ╛αñéαñªαÑÇ αñòαñ╛ αñ«αÑéαñ▓αÑìαñ» αñ¿αñ┐αñòαñ╛αñ▓αÑçαñéαÑñ"
    },
    ur: {
      "Home": "█ü┘ê┘à", "Calculators": "┌⌐█î┘ä┌⌐┘ê┘ä█î┘╣╪▒", "Purity": "╪«╪º┘ä╪╡█î╪¬", "Pricing": "┘é█î┘à╪¬█î┌║", "Tools": "┘╣┘ê┘ä╪▓", "Guides": "┌»╪º╪ª█î┌ê╪▓",
      "Primary Calculators": "╪¿┘å█î╪º╪»█î ┌⌐█î┘ä┌⌐┘ê┘ä█î┘╣╪▒╪▓", "Item Calculators": "╪ó╪ª┘╣┘à ┌⌐█î┘ä┌⌐┘ê┘ä█î┘╣╪▒╪▓", "Popular Coins": "┘à╪┤█ü┘ê╪▒ ╪│┌⌐█Æ", "Silver Purity": "┌å╪º┘å╪»█î ┌⌐█î ╪«╪º┘ä╪╡█î╪¬",
      "Silver Scrap Calculator": "┌å╪º┘å╪»█î ┌⌐╪º ┌⌐█î┘ä┌⌐┘ê┘ä█î┘╣╪▒", "About": "█ü┘à╪º╪▒█Æ ╪¿╪º╪▒█Æ ┘à█î┌║", "Privacy": "╪▒╪º╪▓╪»╪º╪▒█î", "Terms": "╪┤╪▒╪º╪ª╪╖",
      "All rights reserved.": "╪¼┘à┘ä█ü ╪¡┘é┘ê┘é ┘à╪¡┘ü┘ê╪╕ █ü█î┌║█ö", "Prices are for informational purposes only.": "┘é█î┘à╪¬█î┌║ ╪╡╪▒┘ü ┘à╪╣┘ä┘ê┘à╪º╪¬█î █ü█î┌║█ö",
      "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "┘ä╪º╪ª█î┘ê ┘é█î┘à╪¬┘ê┌║ ┌⌐█Æ ╪│╪º╪¬┌╛ ┘à┘ü╪¬ ╪º┘ê╪▒ ╪»╪▒╪│╪¬ ┌⌐█î┘ä┌⌐┘ê┘ä█î┘╣╪▒█ö ╪º┘╛┘å█î ┌å╪º┘å╪»█î ┌⌐█î ┘╛┌»┌╛┘ä ┘é█î┘à╪¬ ╪¼╪º┘å█î┌║█ö"
    },
    ar: {
      "Home": "╪º┘ä╪▒╪ª┘è╪│┘è╪⌐", "Calculators": "╪¡╪º╪│╪¿╪º╪¬", "Purity": "┘å┘é╪º╪í", "Pricing": "╪º┘ä╪¬╪│╪╣┘è╪▒", "Tools": "╪ú╪»┘ê╪º╪¬", "Guides": "╪ú╪»┘ä╪⌐",
      "Primary Calculators": "╪º┘ä╪¡╪º╪│╪¿╪º╪¬ ╪º┘ä╪ú╪│╪º╪│┘è╪⌐", "Item Calculators": "╪¡╪º╪│╪¿╪º╪¬ ╪º┘ä╪╣┘å╪º╪╡╪▒", "Popular Coins": "╪º┘ä╪╣┘à┘ä╪º╪¬ ╪º┘ä╪┤┘ç┘è╪▒╪⌐", "Silver Purity": "┘å┘é╪º╪í ╪º┘ä┘ü╪╢╪⌐",
      "Silver Scrap Calculator": "╪¡╪º╪│╪¿╪⌐ ╪«╪▒╪»╪⌐ ╪º┘ä┘ü╪╢╪⌐", "About": "╪¡┘ê┘ä", "Privacy": "╪º┘ä╪«╪╡┘ê╪╡┘è╪⌐", "Terms": "╪º┘ä╪┤╪▒┘ê╪╖",
      "All rights reserved.": "╪¼┘à┘è╪╣ ╪º┘ä╪¡┘é┘ê┘é ┘à╪¡┘ü┘ê╪╕╪⌐.", "Prices are for informational purposes only.": "╪º┘ä╪ú╪│╪╣╪º╪▒ ┘ä╪ú╪║╪▒╪º╪╢ ╪Ñ╪╣┘ä╪º┘à┘è╪⌐ ┘ü┘é╪╖.",
      "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "╪¡╪º╪│╪¿╪º╪¬ ┘ü╪╢╪⌐ ╪»┘é┘è┘é╪⌐ ┘ê┘à╪¼╪º┘å┘è╪⌐ ╪¬╪╣╪¬┘à╪» ╪╣┘ä┘ë ╪º┘ä╪ú╪│╪╣╪º╪▒ ╪º┘ä┘ü┘ê╪▒┘è╪⌐. ╪º╪¡╪│╪¿ ┘é┘è┘à╪⌐ ╪º┘ä┘ü╪╢╪⌐ ┘ü┘ê╪▒┘ï╪º."
    },
    tr: {
      "Home": "Ana Sayfa", "Calculators": "Hesaplay─▒c─▒lar", "Purity": "Safl─▒k", "Pricing": "Fiyatland─▒rma", "Tools": "Ara├ºlar", "Guides": "K─▒lavuzlar",
      "Primary Calculators": "Ana Hesaplay─▒c─▒lar", "Item Calculators": "├û─ƒe Hesaplay─▒c─▒lar─▒", "Popular Coins": "Pop├╝ler Paralar", "Silver Purity": "G├╝m├╝┼ƒ Safl─▒─ƒ─▒",
      "Silver Scrap Calculator": "Hurda G├╝m├╝┼ƒ Hesaplay─▒c─▒", "About": "Hakk─▒nda", "Privacy": "Gizlilik", "Terms": "┼₧artlar",
      "All rights reserved.": "T├╝m haklar─▒ sakl─▒d─▒r.", "Prices are for informational purposes only.": "Fiyatlar bilgi ama├ºl─▒d─▒r.",
      "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "Canl─▒ spot fiyatlar─▒ kullanan ├╝cretsiz g├╝m├╝┼ƒ hesaplay─▒c─▒lar─▒. Hurda g├╝m├╝┼ƒ├╝n├╝z├╝n de─ƒerini hemen hesaplay─▒n."
    },
    it: {
      "Home": "Home", "Calculators": "Calcolatori", "Purity": "Purezza", "Pricing": "Prezzi", "Tools": "Strumenti", "Guides": "Guide",
      "Primary Calculators": "Calcolatori Principali", "Item Calculators": "Calcolatori di Articoli", "Popular Coins": "Monete Popolari", "Silver Purity": "Purezza dell'Argento",
      "Silver Scrap Calculator": "Calcolatore di Argento", "About": "Chi siamo", "Privacy": "Privacy", "Terms": "Termini",
      "All rights reserved.": "Tutti i diritti riservati.", "Prices are for informational purposes only.": "I prezzi sono solo a scopo informativo.",
      "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "Calcolatori gratuiti che utilizzano i prezzi spot. Calcola il valore del tuo rottame d'argento all'istante."
    },
    zh: {
      "Home": "ΘªûΘí╡", "Calculators": "Φ«íτ«ùσÖ¿", "Purity": "τ║»σ║ª", "Pricing": "Σ╗╖µá╝", "Tools": "σ╖Ñσà╖", "Guides": "µîçσìù",
      "Primary Calculators": "Σ╕╗ΦªüΦ«íτ«ùσÖ¿", "Item Calculators": "τë⌐σôüΦ«íτ«ùσÖ¿", "Popular Coins": "τâ¡Θù¿Θô╢σ╕ü", "Silver Purity": "τÖ╜Θô╢τ║»σ║ª",
      "Silver Scrap Calculator": "σ║ƒΘô╢Φ«íτ«ùσÖ¿", "About": "σà│Σ║ÄµêæΣ╗¼", "Privacy": "ΘÜÉτºü", "Terms": "µ¥íµ¼╛",
      "All rights reserved.": "τëêµ¥âµëÇµ£ëπÇé", "Prices are for informational purposes only.": "Σ╗╖µá╝Σ╗àΣ╛¢σÅéΦÇâπÇé",
      "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "Σ╜┐τö¿σ«₧µù╢τÄ░Φ┤ºΣ╗╖µá╝τÜäσàìΦ┤╣τÖ╜Θô╢Φ«íτ«ùσÖ¿πÇéτ½ïσì│Φ«íτ«ùµé¿τÜäσ║ƒΘô╢Σ╗╖σÇ╝πÇé"
    },
    ru: {
      "Home": "╨ô╨╗╨░╨▓╨╜╨░╤Å", "Calculators": "╨Ü╨░╨╗╤î╨║╤â╨╗╤Å╤é╨╛╤Ç╤ï", "Purity": "╨º╨╕╤ü╤é╨╛╤é╨░", "Pricing": "╨ª╨╡╨╜╤ï", "Tools": "╨ÿ╨╜╤ü╤é╤Ç╤â╨╝╨╡╨╜╤é╤ï", "Guides": "╨á╤â╨║╨╛╨▓╨╛╨┤╤ü╤é╨▓╨░",
      "Primary Calculators": "╨₧╤ü╨╜╨╛╨▓╨╜╤ï╨╡ ╨Ü╨░╨╗╤î╨║╤â╨╗╤Å╤é╨╛╤Ç╤ï", "Item Calculators": "╨Ü╨░╨╗╤î╨║╤â╨╗╤Å╤é╨╛╤Ç╤ï ╨ÿ╨╖╨┤╨╡╨╗╨╕╨╣", "Popular Coins": "╨ƒ╨╛╨┐╤â╨╗╤Å╤Ç╨╜╤ï╨╡ ╨£╨╛╨╜╨╡╤é╤ï", "Silver Purity": "╨º╨╕╤ü╤é╨╛╤é╨░ ╨í╨╡╤Ç╨╡╨▒╤Ç╨░",
      "Silver Scrap Calculator": "╨Ü╨░╨╗╤î╨║╤â╨╗╤Å╤é╨╛╤Ç ╨¢╨╛╨╝╨░ ╨í╨╡╤Ç╨╡╨▒╤Ç╨░", "About": "╨₧ ╨╜╨░╤ü", "Privacy": "╨Ü╨╛╨╜╤ä╨╕╨┤╨╡╨╜╤å╨╕╨░╨╗╤î╨╜╨╛╤ü╤é╤î", "Terms": "╨ú╤ü╨╗╨╛╨▓╨╕╤Å",
      "All rights reserved.": "╨Æ╤ü╨╡ ╨┐╤Ç╨░╨▓╨░ ╨╖╨░╤ë╨╕╤ë╨╡╨╜╤ï.", "Prices are for informational purposes only.": "╨ª╨╡╨╜╤ï ╨╜╨╛╤ü╤Å╤é ╨╕╨╜╤ä╨╛╤Ç╨╝╨░╤å╨╕╨╛╨╜╨╜╤ï╨╣ ╤à╨░╤Ç╨░╨║╤é╨╡╤Ç.",
      "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "╨æ╨╡╤ü╨┐╨╗╨░╤é╨╜╤ï╨╡ ╨║╨░╨╗╤î╨║╤â╨╗╤Å╤é╨╛╤Ç╤ï ╤ü╨╡╤Ç╨╡╨▒╤Ç╨░ ╤ü ╨╕╤ü╨┐╨╛╨╗╤î╨╖╨╛╨▓╨░╨╜╨╕╨╡╨╝ ╨░╨║╤é╤â╨░╨╗╤î╨╜╤ï╤à ╤ü╨┐╨╛╤é-╤å╨╡╨╜. ╨£╨│╨╜╨╛╨▓╨╡╨╜╨╜╨╛ ╤Ç╨░╤ü╤ü╤ç╨╕╤é╨░╨╣╤é╨╡ ╤ü╤é╨╛╨╕╨╝╨╛╤ü╤é╤î ╨╗╨╛╨╝╨░."
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
  
  console.log(`Created ${lang.code}/index (${lang.name})`);
});

console.log(`\nGenerated ${allLangs.length} language versions with full content!`);
