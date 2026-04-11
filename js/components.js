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
        <div class="header-inner">
          <a href="${s('/')}" class="header-logo">
            <div class="logo-icon">⚖️</div>
            <span>Scrap Silver<span style="font-weight:400">Calculator</span></span>
          </a>
          <nav class="main-nav">${navHTML}</nav>
          <button class="mobile-menu-btn" aria-label="Toggle Menu" id="mobile-toggle">
            <span></span><span></span><span></span>
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
      document.getElementById('mobile-nav')?.classList.toggle('open');
    });
  }

  function renderContent() {
    const stepsEl = document.getElementById('dynamic-steps');
    const understandEl = document.getElementById('dynamic-understand');
    const faqEl = document.getElementById('dynamic-faq');

    if (stepsEl) {
      stepsEl.innerHTML = `
      <section class="section-compact" style="background: var(--bg-secondary);">
        <div class="container text-center">
          <span class="section-badge">📋</span>
          <h2 class="section-title">${t('how_it_works')}</h2>
          <p class="section-subtitle">${t('how_it_works_sub')}</p>
          <div class="steps-grid stagger">
            <div class="step-card"><div class="step-number">1</div><h4>${t('step1_title')}</h4><p>${t('step1_text')}</p></div>
            <div class="step-card"><div class="step-number">2</div><h4>${t('step2_title')}</h4><p>${t('step2_text')}</p></div>
            <div class="step-card"><div class="step-number">3</div><h4>${t('step3_title')}</h4><p>${t('step3_text')}</p></div>
          </div>
        </div>
      </section>`;
    }

    if (understandEl) {
      understandEl.innerHTML = `
      <section class="content-section">
        <div class="container">
          <div class="content-body">
            <h2>${t('understand_title')}</h2>
            <div class="content-scroll-block">
              <h3>${t('understand_h3')}</h3>
              <p>${t('understand_text')}</p>
            </div>
          </div>
        </div>
      </section>`;
    }

    if (faqEl) {
      faqEl.innerHTML = `
      <section class="section-compact" id="faq">
        <div class="container">
          <h2 class="section-title text-center">${t('faq_title')}</h2>
          <div class="faq-list">
            <div class="faq-item"><h3>${t('faq1_title')}</h3><p>${t('faq1_text')}</p></div>
            <div class="faq-item"><h3>${t('faq2_title')}</h3><p>${t('faq2_text')}</p></div>
            <div class="faq-item"><h3>${t('faq3_title')}</h3><p>${t('faq3_text')}</p></div>
          </div>
        </div>
      </section>`;
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

    el.innerHTML = `<footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="${s('/')}" class="header-logo">
              <div class="logo-icon">⚖️</div>
              <span>Scrap Silver<span style="font-weight:400">Calculator</span></span>
            </a>
            <p>${t('footer_desc') !== 'footer_desc' ? t('footer_desc') : 'Free, accurate scrap silver melt value calculator using live spot prices.'}</p>
          </div>
          ${colsHTML}
        </div>
        <div class="footer-bottom">
          <span>&copy; ${new Date().getFullYear()} Scrap Silver Calculator</span>
          <span>Live spot prices updated every 60 seconds</span>
        </div>
      </div>
    </footer>`;
  }

  // Expose for FAQ schema injection
  window.SiteComponents = window.SiteComponents || {};
  window.SiteComponents.injectFAQSchema = function(faqs) {
    if (!faqs || !faqs.length) return;
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  };

  window.SiteComponents.copyCalculation = function(btn) {
    const resultVal = document.getElementById('hero-result-value');
    const resultDet = document.getElementById('hero-result-detail');
    if (!resultVal) return;
    const text = `Silver Value: ${resultVal.textContent}\n${resultDet ? resultDet.textContent : ''}\nCalculated at scrapsilvercalculater.com`;
    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add('copied');
      const orig = btn.innerHTML;
      btn.innerHTML = '<span class="icon">✓</span> Copied!';
      setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = orig; }, 2000);
    });
  };

  window.SiteComponents.shareResult = function(platform) {
    const resultVal = document.getElementById('hero-result-value');
    if (!resultVal) return;
    const text = encodeURIComponent(`My silver is worth ${resultVal.textContent}! Check yours at scrapsilvercalculater.com`);
    const url = encodeURIComponent('https://scrapsilvercalculater.com');
    const urls = {
      whatsapp: `https://wa.me/?text=${text}`,
      x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`
    };
    if (urls[platform]) window.open(urls[platform], '_blank', 'width=600,height=400');
  };

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
