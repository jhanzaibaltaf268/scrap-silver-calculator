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
  function getCurrentPage() {
    const path = window.location.pathname;
    if (path === '/' || path === '/index' || path === '/index.html') return '/';
    return path.endsWith('/') ? path : path + '/';
  }

  function getBasePath() {
    const path = window.location.pathname;
    const langMatch = path.match(/\/(es|fr|de|pt|hi|ur|ar|tr|it|zh|ru)\//);
    if (langMatch) return `/${langMatch[1]}/`;
    return '/';
  }

  function getLangCode() {
    const bp = getBasePath();
    return bp === '/' ? 'en' : bp.replace(/\//g, '');
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
    if (!href || href === '/' || href === 'index' || href === 'index.html') return getBasePath();
    const cleanHref = href.replace(/^\/|\/$/g, '').replace(/\.html$/, '');
    if (window.MenuTranslations && window.MenuTranslations.slugs && window.MenuTranslations.slugs[cleanHref]) {
      const slug = window.MenuTranslations.slugs[cleanHref];
      return `${getBasePath()}${slug}/`;
    }
    if (href.startsWith('http')) return href;
    const path = href.startsWith('/') ? href : `/${href}`;
    return path.replace(/\.html$/, '').replace(/\/$/, '') + '/';
  }

  /* ---- Component Rendering ---- */
  function renderHeader() {
    const el = document.getElementById('site-header');
    if (!el) return;
    const currentPage = getCurrentPage();
    const bp = getBasePath();

    const navHTML = NAV_ITEMS.map(item => {
      const label = t(item.label);
      if (item.dropdown) {
        const links = item.dropdown.map(d => {
          const h = s(d.href);
          return `<a href="${h}" ${h===currentPage?'class="active"':''}>${t(d.label)}</a>`;
        }).join('');
        const isActive = item.dropdown.some(d => s(d.href) === currentPage);
        return `
          <div class="nav-dropdown">
            <a class="nav-link nav-dropdown-trigger ${isActive?'active':''}">${label}</a>
            <div class="nav-dropdown-menu">${links}</div>
          </div>`;
      }
      const h = s(item.href);
      return `<a href="${h}" class="nav-link ${h===currentPage?'active':''}">${label}</a>`;
    }).join('');

    let mobileNavHTML = `<a href="${bp}">${t('Home')}</a>`;
    NAV_ITEMS.filter(i => i.label !== 'Home').forEach(item => {
      const label = t(item.label);
      if (item.dropdown) {
        mobileNavHTML += `<div class="mobile-nav-group-title">${label}</div>`;
        item.dropdown.forEach(d => {
          const h = s(d.href);
          mobileNavHTML += `<a href="${h}" ${h===currentPage?'class="active"':''}>${t(d.label)}</a>`;
        });
      } else {
        const h = s(item.href);
        mobileNavHTML += `<a href="${h}" ${h===currentPage?'class="active"':''}>${label}</a>`;
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
        for (const [en, loc] of Object.entries(window.MenuTranslations.slugs)) {
            if (loc === pageSlug) {
                englishBaseSlug = en;
                break;
            }
        }
    }

    const generateLangHref = (targetLang) => {
        if (!englishBaseSlug) return targetLang === 'en' ? '/' : `/${targetLang}/`;
        if (targetLang === 'en') return `/${englishBaseSlug}/`;
        if (window.MenuTranslations && window.MenuTranslations.slugs && window.MenuTranslations.slugs[englishBaseSlug]) {
            return `/${targetLang}/${window.MenuTranslations.slugs[englishBaseSlug]}/`;
        }
        return `/${targetLang}/${englishBaseSlug}/`;
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

  function init() {
    renderHeader();
    renderFooter();
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

  return { renderHeader, renderFooter, renderPriceTicker, renderBreadcrumb, copyCalculation, toast, init };
})();
