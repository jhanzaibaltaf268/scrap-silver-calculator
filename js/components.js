(function() {
  const NAV_ITEMS = [
    { label: 'Home', href: '/' },
    { 
      label: 'Calculators', 
      dropdown: [
        { label: 'Gold & Silver Calculator', href: '/gold-and-silver-calculator/' },
        { label: 'Sona Chandi Calculator', href: '/sona-chandi-calculator/' },
        { label: 'Face Value Silver Calculator', href: '/face-value-silver-calculator/' },
        { label: 'Silver Batch Calculator', href: '/silver-batch-calculator/' },
        { label: 'Silver Weight Converter', href: '/silver-weight-converter/' },
        { label: 'Sell or Hold', href: '/silver-sell-or-hold/' },
        { label: 'Silver Identifier', href: '/identify-silver/' },
      ]
    }
  ];

  const FOOTER_COLS = [
    {
      title: 'Tools',
      links: [
        { label: 'Gold & Silver Calculator', href: '/gold-and-silver-calculator/' },
        { label: 'Sona Chandi Calculator', href: '/sona-chandi-calculator/' },
        { label: 'Face Value Silver Calculator', href: '/face-value-silver-calculator/' },
        { label: 'Silver Batch Calculator', href: '/silver-batch-calculator/' },
        { label: 'Silver Weight Converter', href: '/silver-weight-converter/' }
      ]
    },
    {
      title: 'Guides',
      links: [
        { label: 'Sell or Hold', href: '/silver-sell-or-hold/' },
        { label: 'Silver Identifier', href: '/identify-silver/' }
      ]
    }
  ];

  function getBasePath() {
    const path = window.location.pathname;
    const langMatch = path.match(/^\/([a-z]{2})(\/|$)/);
    if (langMatch) {
      const lang = langMatch[1];
      const validLangs = ['es','fr','de','pt','hi','ur','ar','tr','it','zh','ru'];
      if (validLangs.includes(lang)) return `/${lang}/`;
    }
    return '/';
  }

  function getLangCode() {
    const bp = getBasePath();
    return bp === '/' ? 'en' : bp.replace(/\//g, '');
  }

  function t(key) {
    const lang = getLangCode();
    if (!window.MenuTranslations || !window.MenuTranslations[lang]) return key;
    return window.MenuTranslations[lang][key] || key;
  }

  function s(href) {
    if (!href || href === '/' || href === 'index' || href === '/index.html') return getBasePath();
    const bp = getBasePath();
    const clean = href.replace(/^\/|\/$/g, '').replace(/\.html$/, '');
    if (bp === '/') return `/${clean}/`;
    return `${bp}${clean}/`;
  }

  function renderHeader() {
    const el = document.getElementById('site-header');
    if (!el) return;
    const bp = getBasePath();
    const lang = getLangCode();

    const langSwitcherHTML = `
      <div class="lang-switcher">
        ${['en','es','fr','de','pt','hi','ur','ar','tr','it','zh','ru'].map(l => {
          const path = l === 'en' ? '/' : `/${l}/`;
          return `<a href="${path}" class="lang-btn ${lang === l ? 'active' : ''}">${l.toUpperCase()}</a>`;
        }).join('')}
      </div>`;

    let navHTML = NAV_ITEMS.map(item => {
      const label = t(item.label);
      if (item.dropdown) {
        const links = item.dropdown.map(d => `<a href="${s(d.href)}">${t(d.label)}</a>`).join('');
        return `
          <div class="nav-dropdown">
            <a class="nav-link nav-dropdown-trigger">${label}</a>
            <div class="nav-dropdown-menu">${links}</div>
          </div>`;
      }
      return `<a href="${s(item.href)}" class="nav-link">${label}</a>`;
    }).join('');

    el.innerHTML = `
      ${langSwitcherHTML}
      <header class="site-header">
        <div class="container header-content">
          <a href="${s('/')}" class="site-logo">
            <span class="logo-icon">⚖️</span>
            <span class="logo-text">Scrap Silver<span class="logo-accent">Calculator</span></span>
          </a>
          <nav class="site-nav"><ul class="nav-links"><li>${navHTML}</li></ul></nav>
          <button class="mobile-toggle" aria-label="Toggle Menu" id="mobile-toggle">
            <span class="bar"></span><span class="bar"></span><span class="bar"></span>
          </button>
        </div>
      </header>
      <div class="mobile-nav" id="mobile-nav">
        ${NAV_ITEMS.map(item => {
          const label = t(item.label);
          if (item.dropdown) {
            return `<div class="mobile-nav-group-title">${label}</div>` + 
              item.dropdown.map(d => `<a href="${s(d.href)}">${t(d.label)}</a>`).join('');
          }
          return `<a href="${s(item.href)}">${label}</a>`;
        }).join('')}
      </div>`;

    document.getElementById('mobile-toggle')?.addEventListener('click', function() {
      this.classList.toggle('active');
      document.getElementById('mobile-nav')?.classList.toggle('active');
    });
  }

  function renderContent() {
    const stepsEl = document.getElementById('dynamic-steps');
    const understandEl = document.getElementById('dynamic-understand');
    const faqEl = document.getElementById('dynamic-faq');
    const lang = getLangCode();

    if (stepsEl) {
      stepsEl.innerHTML = `
        <div class="container text-center">
          <span class="section-badge">📋</span>
          <h2 class="section-title">${t('how_it_works')}</h2>
          <p class="section-subtitle">${t('how_it_works_sub')}</p>
          <div class="steps-grid stagger">
            <div class="step-card"><div class="step-number">1</div><h4>${t('step1_title')}</h4><p>${t('step1_text')}</p></div>
            <div class="step-card"><div class="step-number">2</div><h4>${t('step2_title')}</h4><p>${t('step2_text')}</p></div>
            <div class="step-card"><div class="step-number">3</div><h4>${t('step3_title')}</h4><p>${t('step3_text')}</p></div>
          </div>
        </div>`;
    }

    if (understandEl) {
      understandEl.innerHTML = `
        <div class="container">
          <div class="content-body">
            <h2>${t('understand_title')}</h2>
            <div class="content-scroll-block">
              <h3>${t('understand_h3')}</h3>
              <p>${t('understand_text')}</p>
            </div>
          </div>
        </div>`;
    }

    if (faqEl) {
      faqEl.innerHTML = `
        <div class="container">
          <h2 class="section-title text-center">${t('faq_title')}</h2>
          <div class="faq-list">
            <div class="faq-item"><h3>${t('faq1_title')}</h3><p>${t('faq1_text')}</p></div>
            <div class="faq-item"><h3>${t('faq2_title')}</h3><p>${t('faq2_text')}</p></div>
            <div class="faq-item"><h3>${t('faq3_title')}</h3><p>${t('faq3_text')}</p></div>
          </div>
        </div>`;
    }
  }

  function renderFooter() {
    const el = document.getElementById('site-footer');
    if (!el) return;
    const colsHTML = FOOTER_COLS.map(col => `
      <div class="footer-col">
        <h4>${t(col.title)}</h4>
        <ul>${col.links.map(l => `<li><a href="${s(l.href)}">${t(l.label)}</a></li>`).join('')}</ul>
      </div>`).join('');

    el.innerHTML = `<footer class="site-footer"><div class="container footer-grid">${colsHTML}</div></footer>`;
  }

  function init() {
    renderHeader();
    renderContent();
    renderFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
