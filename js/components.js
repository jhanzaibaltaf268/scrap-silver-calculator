/* ============================================
   SHARED COMPONENTS (MASTERPIECE VERSION)
   Header, Navigation, Footer — injected via JS
   ============================================ */

const SiteComponents = (() => {
  /* ---- Navigation Structure ---- */
  const NAV_ITEMS = [
    { label: 'Home', href: '/' },
    {
      label: 'Calculators', dropdown: [
        { label: 'Gold & Silver', href: '/gold-and-silver-calculator/' },
        { label: 'Silver Melt Value', href: '/silver-melt-value-calculator/' },
        { label: 'Sterling Silver', href: '/sterling-silver-calculator/' },
        { label: 'Junk Silver', href: '/junk-silver-calculator/' },
        { label: 'Silver Coins', href: '/silver-coin-value-calculator/' },
        { label: 'Silver Bar Value', href: '/silver-bar-value-calculator/' },
        { label: 'Jewelry Value', href: '/silver-jewelry-value-calculator/' },
        { label: 'Silverware Value', href: '/silverware-value-calculator/' },
      ]
    },
    {
      label: 'Purity', dropdown: [
        { label: '999 Fine Silver', href: '/999-silver-calculator/' },
        { label: '958 Britannia', href: '/958-silver-calculator/' },
        { label: '925 Sterling', href: '/925-silver-calculator/' },
        { label: '900 Coin Silver', href: '/900-silver-calculator/' },
        { label: '835 Silver', href: '/835-silver-calculator/' },
        { label: '800 Silver', href: '/800-silver-calculator/' },
        { label: 'Purity Chart', href: '/silver-purity-chart/' },
      ]
    },
    {
      label: 'Tools', dropdown: [
        { label: 'Profit Calculator', href: '/silver-profit-calculator/' },
        { label: 'Batch Calculator', href: '/silver-batch-calculator/' },
        { label: 'Sona Chandi', href: '/sona-chandi-calculator/' },
        { label: 'Face Value Calc', href: '/face-value-silver-calculator/' },
        { label: 'Weight Converter', href: '/silver-weight-converter/' },
        { label: 'Pennyweight (DWT)', href: '/pennyweight-calculator/' },
        { label: 'Tola Calculator', href: '/tola-calculator/' },
        { label: 'Sell or Hold', href: '/silver-sell-or-hold/' },
        { label: 'Silver Identifier', href: '/identify-silver/' },
      ]
    },
    { label: 'Guide', href: '/how-to-use-silver-calculators/' }
  ];

  const FOOTER_COLS = [
    {
      title: 'Calculators',
      links: [
        { label: 'Melt Value', href: '/silver-melt-value-calculator/' },
        { label: 'Sterling Silver', href: '/sterling-silver-calculator/' },
        { label: 'Junk Silver', href: '/junk-silver-calculator/' },
        { label: 'Gold & Silver', href: '/gold-and-silver-calculator/' },
        { label: 'Silver Coins', href: '/silver-coin-value-calculator/' },
        { label: 'Silver Bars', href: '/silver-bar-value-calculator/' },
        { label: 'Jewelry Value', href: '/silver-jewelry-value-calculator/' },
        { label: 'Silverware', href: '/silverware-value-calculator/' },
      ]
    },
    {
      title: 'Purity',
      links: [
        { label: '999 Fine Silver', href: '/999-silver-calculator/' },
        { label: '958 Britannia', href: '/958-silver-calculator/' },
        { label: '925 Sterling', href: '/925-silver-calculator/' },
        { label: '900 Coin Silver', href: '/900-silver-calculator/' },
        { label: '835 Silver', href: '/835-silver-calculator/' },
        { label: '800 Silver', href: '/800-silver-calculator/' },
        { label: 'Purity Chart', href: '/silver-purity-chart/' },
      ]
    },
    {
      title: 'Tools',
      links: [
        { label: 'Profit Calculator', href: '/silver-profit-calculator/' },
        { label: 'Batch Calculator', href: '/silver-batch-calculator/' },
        { label: 'Sona Chandi', href: '/sona-chandi-calculator/' },
        { label: 'Face Value', href: '/face-value-silver-calculator/' },
        { label: 'Weight Converter', href: '/silver-weight-converter/' },
        { label: 'Sell or Hold', href: '/silver-sell-or-hold/' },
        { label: 'Silver Identifier', href: '/identify-silver/' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'How to Use', href: '/how-to-use-silver-calculators/' },
        { label: 'Privacy Policy', href: '/privacy-policy/' },
        { label: 'Terms of Service', href: '/terms-of-service/' },
        { label: 'Disclaimer', href: '/disclaimer/' },
        { label: 'Contact Us', href: '/contact/' },
      ]
    }
  ];

  /* ---- Helpers ---- */
  function isLocal() {
    return window.location.protocol === 'file:';
  }  function getRelativePrefix() {
    const path = window.location.pathname;
    const langMatch = path.match(/\/(ar|de|es|fr|hi|it|pt|ru|tr|ur|zh)([/?#]|$)/);
    return langMatch ? '../' : './';
  }

  function getBasePath() {
    return getRelativePrefix();
  }

  function getLangCode() {
    const path = window.location.pathname;
    const langMatch = path.match(/\/(ar|de|es|fr|hi|it|pt|ru|tr|ur|zh)([/?#]|$)/);
    return langMatch ? langMatch[1] : 'en';
  }

  function t(text) {
    if (!window.MenuTranslations) return text;
    if (window.MenuTranslations[text]) return window.MenuTranslations[text];
    const lang = getLangCode();
    if (window.MenuTranslations[lang] && window.MenuTranslations[lang][text]) {
      return window.MenuTranslations[lang][text];
    }
    return text;
  }

  function s(href) {
    if (!href || href === '#') return '#';
    if (href.startsWith('http')) return href;

    const prefix = getRelativePrefix();
    const currentLang = getLangCode();
    
    // Normalize target
    let target = href.replace(/^\/|\/$/g, '').replace(/\.html$/, '');
    if (target === '' || target === 'index') {
      return isLocal() ? prefix + 'index.html' : prefix;
    }

    // Resolve localized slug if in a language
    let localizedTarget = target;
    if (currentLang !== 'en' && window.MenuTranslations && window.MenuTranslations.slugs && window.MenuTranslations.slugs[target]) {
        localizedTarget = window.MenuTranslations.slugs[target][currentLang] || target;
    }

    let finalPath = '';
    if (currentLang === 'en') {
      finalPath = prefix + target;
    } else {
      // If we are in /es (prefix is ../), then current lang links are ./localizedTarget
      // We use ./ to stay within the current language context
      finalPath = './' + localizedTarget;
    }

    if (isLocal()) return finalPath.replace(/\/$/, '') + '.html';
    // For Vercel with cleanUrls and trailingSlash: false, we don't want trailing slashes
    return finalPath.replace(/\/$/, '');
  }

  function getCurrentPage() {
    const path = window.location.pathname;
    const part = path.split('/').pop().replace(/\.html$/, '');
    return part || 'index';
  }

  /* ---- Component Rendering ---- */
  function renderHeader() {
    const el = document.getElementById('site-header');
    if (!el) return;
    const cur = getCurrentPage();
    const bp = getBasePath();

    const navHTML = NAV_ITEMS.map(item => {
      const label = t(item.label);
      if (item.dropdown) {
        const links = item.dropdown.map(d => {
          const h = s(d.href);
          const isAct = d.href.includes(cur) || (cur === 'index' && (d.href === '/' || d.href === 'index.html'));
          return `<a href="${h}" ${isAct?'class="active"':''}>${t(d.label)}</a>`;
        }).join('');
        const isActive = item.dropdown.some(d => d.href.includes(cur));
        return `
          <div class="nav-dropdown">
            <a class="nav-link nav-dropdown-trigger ${isActive?'active':''}">${label}</a>
            <div class="nav-dropdown-menu">${links}</div>
          </div>`;
      }
      const h = s(item.href);
      const isAct = (item.href === '/' && cur === 'index') || (item.href && item.href.includes(cur));
      return `<a href="${h}" class="nav-link ${isAct?'active':''}">${label}</a>`;
    }).join('');

    let mobileNavHTML = `<a href="${bp}">${t('Home')}</a>`;
    NAV_ITEMS.filter(i => i.label !== 'Home').forEach(item => {
      const label = t(item.label);
      if (item.dropdown) {
        mobileNavHTML += `<div class="mobile-nav-group-title">${label}</div>`;
        item.dropdown.forEach(d => {
          const h = s(d.href);
          const isAct = d.href.includes(cur);
          mobileNavHTML += `<a href="${h}" ${isAct?'class="active"':''}>${t(d.label)}</a>`;
        });
      } else {
        const h = s(item.href);
        const isAct = (item.href && item.href.includes(cur));
        mobileNavHTML += `<a href="${h}" ${isAct?'class="active"':''}>${label}</a>`;
      }
    });

    // Language Logic
    const languages = [
      { code: 'en', label: '🇺🇸 EN' },
      { code: 'es', label: '🇪🇸 ES' },
      { code: 'fr', label: '🇫🇷 FR' },
      { code: 'de', label: '🇩🇪 DE' },
      { code: 'pt', label: '🇵🇹 PT' },
      { code: 'hi', label: '🇮🇳 HI' },
      { code: 'ur', label: '🇵🇰 UR' },
      { code: 'ar', label: '🇸🇦 AR' },
      { code: 'tr', label: '🇹🇷 TR' },
      { code: 'it', label: '🇮🇹 IT' },
      { code: 'zh', label: '🇨🇳 ZH' },
      { code: 'ru', label: '🇷🇺 RU' }
    ];

    const currentLang = getLangCode();
    const pathParts = window.location.pathname.split('/').filter(p => p);
    const pageSlug = pathParts[currentLang === 'en' ? 0 : 1] || '';
    
    let englishBaseSlug = pageSlug;
    if (currentLang !== 'en' && window.MenuTranslations && window.MenuTranslations.slugs) {
        for (const [en, locs] of Object.entries(window.MenuTranslations.slugs)) {
            if (locs[currentLang] === pageSlug) {
                englishBaseSlug = en;
                break;
            }
        }
    }

     const generateLangHref = (targetLang) => {
        const prefix = getRelativePrefix();
        const pageSlug = englishBaseSlug || 'index';
        
        let targetPath = '';
        if (targetLang === 'en') {
            targetPath = (pageSlug === 'index') ? 'index' : pageSlug;
        } else {
            let slug = pageSlug;
            if (window.MenuTranslations && window.MenuTranslations.slugs && window.MenuTranslations.slugs[pageSlug]) {
                slug = window.MenuTranslations.slugs[pageSlug][targetLang] || pageSlug;
            }
            targetPath = `${targetLang}/${slug}`;
        }

        let final = prefix + targetPath;
        if (isLocal()) return final.replace(/\/$/, '') + '.html';
        return final.replace(/\/$/, '') + '/';
    };

    const desktopLangLinks = languages.map(l => {
        return `<a href="${generateLangHref(l.code)}" class="${currentLang===l.code?'active':''}" style="font-size:11px;padding:6px 8px;">${l.label}</a>`;
    }).join('');

    const mobileLangLinks = languages.slice(0, 8).map(l => {
        return `<a href="${generateLangHref(l.code)}" style="padding:4px 10px;border-radius:6px;background:rgba(255,255,255,0.05);border:1px solid var(--border);font-size:11px;${currentLang===l.code?'border-color:var(--accent);color:var(--accent);':''}">${l.code.toUpperCase()}</a>`;
    }).join('');

    el.innerHTML = `
      <header class="site-header" id="main-header">
        <div class="header-inner">
          <a href="${bp}" class="header-logo">
            <div style="width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,var(--accent),#a78bfa);display:grid;place-items:center;font-size:14px;color:#fff;">◈</div>
            <span>Scrap Silver Calculator</span>
          </a>
          
          <nav class="main-nav">
             ${navHTML}
             <div class="search-container">
                <span class="search-icon-btn">🔍</span>
                <input type="text" class="header-search-input" placeholder="${t('Search tools...')}" id="header-search">
                <div class="search-results-dropdown" id="search-results"></div>
             </div>
             <div class="nav-dropdown" style="margin-left:8px;">
                <button class="nav-link" style="padding:4px 8px;border:1px solid var(--border);border-radius:6px;background:rgba(255,255,255,0.03);display:flex;align-items:center;gap:4px;">🌐 ${currentLang.toUpperCase()}</button>
                <div class="nav-dropdown-menu" style="min-width:180px;grid-template-columns:1fr 1fr;display:grid;gap:4px;padding:8px;">
                    ${desktopLangLinks}
                </div>
             </div>
          </nav>

          <button class="mobile-menu-btn" id="mobile-menu-btn">
            <span></span><span></span><span></span>
          </button>
        </div>
        <div class="mobile-nav" id="mobile-nav">
           ${mobileNavHTML}
           <div class="mobile-nav-group-title">${t('Language')}</div>
           <div style="display:flex;flex-wrap:wrap;gap:6px;padding:8px 0;">
                ${mobileLangLinks}
           </div>
        </div>
      </header>
      <div class="ambient"><i></i><i></i><i></i></div>
      <div class="toast" id="toast">Copied to clipboard</div>`;

    // Init Logic
    const hSearch = document.getElementById('header-search');
    const hResults = document.getElementById('search-results');
    if (hSearch) {
        hSearch.addEventListener('input', (e) => {
            const q = e.target.value.toLowerCase().trim();
            if (q.length < 2) { hResults.classList.remove('active'); return; }
            const matches = NAV_ITEMS.flatMap(i => i.dropdown || [i]).filter(x => x.label.toLowerCase().includes(q)).slice(0, 8);
            hResults.innerHTML = matches.map(m => `<a href="${s(m.href)}" class="search-result-item"><strong>${t(m.label)}</strong></a>`).join('');
            hResults.classList.add('active');
        });
    }

    const mBtn = document.getElementById('mobile-menu-btn');
    const mNav = document.getElementById('mobile-nav');
    if (mBtn && mNav) {
        mBtn.addEventListener('click', () => {
            mBtn.classList.toggle('active');
            mNav.classList.toggle('open');
            document.body.style.overflow = mNav.classList.contains('open') ? 'hidden' : '';
        });
    }

    window.addEventListener('scroll', () => {
        document.getElementById('main-header')?.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  function renderFooter() {
    const el = document.getElementById('site-footer');
    if (!el) return;
    const bp = getBasePath();

    const colsHTML = FOOTER_COLS.map(col => `
      <div class="footer-col">
        <h4>${t(col.title)}</h4>
        ${col.links.map(l => `<a href="${s(l.href)}">${t(l.label)}</a>`).join('')}
      </div>`
    ).join('');

    el.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a href="${bp}" class="header-logo">
                <div style="width:24px;height:24px;border-radius:6px;background:linear-gradient(135deg,var(--accent),#a78bfa);display:grid;place-items:center;font-size:12px;color:#fff;">◈</div>
                <span>Scrap Silver Calculator</span>
              </a>
              <p>${t('Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.')}</p>
            </div>
            ${colsHTML}
          </div>
          <div class="footer-bottom">
            <span>&copy; ${new Date().getFullYear()} ${t('Scrap Silver Calculator')}. ${t('All rights reserved.')}</span>
            <div style="display:flex;gap:12px;">
                <a href="${s('/privacy-policy/')}">${t('Privacy')}</a>
                <a href="${s('/terms-of-service/')}">${t('Terms')}</a>
                <a href="${s('/disclaimer/')}">${t('Disclaimer')}</a>
                <a href="${s('/contact/')}">${t('Contact')}</a>
            </div>
          </div>
        </div>
      </footer>`;
  }

  function renderPriceTicker(containerId) {
    const el = document.getElementById(containerId || 'price-ticker');
    if (!el) return;
    if (typeof SilverPrice !== 'undefined') {
        SilverPrice.onPriceUpdate(p => {
            el.innerHTML = `<div class="hero-pill" style="margin-bottom:12px;"><span class="ldot"></span>${t('LIVE SPOT')}: $${p.toFixed(2)}</div>`;
            el.classList.add('visible');
        });
    }
  }

  function renderBreadcrumb(containerId, crumbs) {
    const el = document.getElementById(containerId || 'breadcrumb');
    if (!el) return;
    const items = crumbs.map((c, i) => {
      if (i === crumbs.length - 1) return `<span>${t(c.label)}</span>`;
      return `<a href="${s(c.href)}">${t(c.label)}</a><span class="sep">›</span>`;
    }).join(' ');
    el.innerHTML = `<nav class="breadcrumb">${items}</nav>`;
  }

  function toast(m) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = m;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }

  function copyCalculation() {
    const val = document.getElementById('result-value')?.textContent || document.getElementById('rv')?.textContent;
    const det = document.getElementById('result-detail')?.textContent || document.getElementById('rd')?.textContent;
    if (!val || val === '$0.00') return;
    const txt = `${document.title.split('|')[0]}: ${val} (${det}) | Check at scrapsilvercalculater.com`;
    navigator.clipboard.writeText(txt).then(() => toast(t('Copied to clipboard')));
  }

  function injectFAQSchema(faqs) {
    if (!faqs || !faqs.length) return;
    
    // 1. Inject JSON-LD
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    // 2. Render visible FAQ if content-body exists
    const body = document.querySelector('.content-body');
    if (body) {
      const faqSec = document.createElement('div');
      faqSec.className = 'faq-section';
      faqSec.style.marginTop = 'var(--space-xl)';
      faqSec.innerHTML = `<h3 style="margin-bottom:var(--space-lg);">${t('Frequently Asked Questions')}</h3>` + 
        faqs.map(f => `
          <div class="faq-item" style="margin-bottom:var(--space-md); border-bottom:1px solid var(--border-subtle); padding-bottom:var(--space-md);">
            <div class="faq-q" style="font-weight:700; color:var(--text-primary); margin-bottom:var(--space-xs); display:flex; gap:8px;">
              <span style="color:var(--accent);">Q:</span> ${f.q}
            </div>
            <div class="faq-a" style="color:var(--text-secondary); font-size:var(--fs-sm); line-height:1.6;">
              ${f.a}
            </div>
          </div>
        `).join('');
      body.appendChild(faqSec);
    }
  }

  function renderLocalizedSections() {
    const currentLang = getLangCode();
    if (currentLang === 'en') return; // English uses static content

    // 1. Render Steps
    const stepsEl = document.getElementById('dynamic-steps');
    if (stepsEl) {
      stepsEl.innerHTML = `
        <section class="sec container" style="background: var(--bg-secondary); border-radius: var(--radius-lg);">
          <div class="reveal text-center">
            <span class="sec-badge">📝 ${t('Simple Process')}</span>
            <h2 class="sec-title">${t('How It Works — 3 Simple Steps')}</h2>
          </div>
          <div class="cgrid reveal reveal-d1" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
            <div class="ccard" style="text-align: center;">
              <div class="ci" style="background: var(--accent); color: #fff; width: 40px; height: 40px; border-radius: 50%; margin: 0 auto var(--space-md); line-height: 40px;">1</div>
              <h4>${t('Weigh Your Silver')}</h4>
              <p>${t('Use a scale to weigh your silver in grams, troy ounces, or any unit.')}</p>
            </div>
            <div class="ccard" style="text-align: center;">
              <div class="ci" style="background: var(--accent); color: #fff; width: 40px; height: 40px; border-radius: 50%; margin: 0 auto var(--space-md); line-height: 40px;">2</div>
              <h4>${t('Select Purity')}</h4>
              <p>${t('Choose the purity — 925 for sterling, 900 for coin silver, or 999 for fine silver.')}</p>
            </div>
            <div class="ccard" style="text-align: center;">
              <div class="ci" style="background: var(--accent); color: #fff; width: 40px; height: 40px; border-radius: 50%; margin: 0 auto var(--space-md); line-height: 40px;">3</div>
              <h4>${t('Get Instant Value')}</h4>
              <p>${t('See the melt value based on live silver spot prices updated in real time.')}</p>
            </div>
          </div>
        </section>`;
    }

    // 2. Render Understanding/SEO Content
    const understandEl = document.getElementById('dynamic-understand');
    if (understandEl) {
      understandEl.innerHTML = `
        <section class="sec container container-tight" id="guide">
          <div class="reveal">
            <span class="sec-badge">📖 ${t('Learn')}</span>
            <h2 class="sec-title">${t('What Is a Scrap Silver Calculator?')}</h2>
          </div>
          <div class="content-body reveal reveal-d1">
            <p>${t('A scrap silver calculator determines the intrinsic melt value of a silver item — not its retail price or sentimental value. It answers: if you melted this item down to pure silver today, what would that metal be worth? Our engine utilizes real-time market data to provide the same valuation used by professional refineries.')}</p>
            <div class="formula-box">Melt Value = (Weight × Purity) ÷ 31.1035 × Spot Price</div>
            <p>${t('Every calculation is performed with 4-point decimal precision — the same methodology used by major precious metals refineries and commodity trading desks worldwide.')}</p>
            <h3>${t('Understanding Silver Purity marks')}</h3>
            <p>${t('Look for "925" (Sterling), "999" (Fine Silver), or "900" (Coin Silver). These tell you the percentage of silver in the alloy. Items marked "EPNS" or "Silver Plate" contain only a microscopic layer of silver — these have negligible scrap value.')}</p>
          </div>
        </section>`;
    }

    // 3. Render FAQ
    const faqEl = document.getElementById('dynamic-faq');
    if (faqEl) {
        const faqs = [
            { q: t('How do I calculate the value of scrap silver?'), a: t('Multiply the item\'s weight in troy ounces by its purity (decimal) and the current spot price. Our calculator handles the unit conversions and market updates automatically.') },
            { q: t('What is melt value vs spot price?'), a: t('Spot price is the market price for pure 999 silver. Melt value is what your specific item is worth based on its purity. For example, 925 sterling is worth 92.5% of the spot price per ounce.') },
            { q: t('How much will a dealer pay me for scrap silver?'), a: t('Most professional buyers pay 70–95% of melt value. Online silver refiners often offer the highest payouts, while local pawn shops may offer less due to higher overhead.') },
            { q: t('How can I tell if my silver is real?'), a: t('Look for hallmarks (925, STERLING, 900). You can also perform a magnet test (silver is not magnetic) or a "ping" test. For absolute certainty, an acid test or XRF analysis is required.') },
            { q: t('What is a troy ounce?'), a: t('A troy ounce (31.1035 grams) is the standard unit of measurement for precious metals. It is approximately 10% heavier than a standard "avoirdupois" ounce (28.35 grams).') }
        ];
        
        faqEl.innerHTML = `
            <section class="sec container container-tight" id="faq" style="background: var(--bg-secondary); border-radius: var(--radius-lg);">
              <div class="reveal text-center">
                <h2 class="sec-title">${t('Frequently Asked Questions')}</h2>
                <p class="sec-sub ma">${t('Everything you need to know about silver valuation.')}</p>
              </div>
              <div class="faq-list">
                ${faqs.map(f => `
                  <div class="faq-item">
                    <button class="faq-question">${f.q} <span class="faq-icon">+</span></button>
                    <div class="faq-answer"><p>${f.a}</p></div>
                  </div>
                `).join('')}
              </div>
            </section>`;
            
        // Re-attach FAQ event listeners
        faqEl.querySelectorAll('.faq-question').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('.faq-item').classList.toggle('open');
            });
        });
    }
  }

  function init() {
    renderHeader();
    renderFooter();
    renderLocalizedSections();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(init);
        } else {
            setTimeout(init, 0);
        }
    });
  } else {
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(init);
    } else {
        setTimeout(init, 0);
    }
  }

  return { renderHeader, renderFooter, renderPriceTicker, renderBreadcrumb, copyCalculation, toast, injectFAQSchema, init };
})();
