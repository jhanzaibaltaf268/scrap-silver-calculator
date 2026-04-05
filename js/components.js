/* ============================================
   SHARED COMPONENTS
   Header, Navigation, Footer — injected via JS
   ============================================ */

const SiteComponents = (() => {
  /* ---- Navigation Structure ---- */
  const NAV_ITEMS = [
    { label: 'Home', href: 'index.html' },
    {
      label: 'Calculators', dropdown: [
        { label: 'Gold & Silver Calculator', href: 'gold-and-silver-calculator.html' },
        { label: 'Silver Melt Value', href: 'silver-melt-value-calculator.html' },
        { label: 'Sterling Silver Calculator', href: 'sterling-silver-calculator.html' },
        { label: 'Junk Silver Calculator', href: 'junk-silver-calculator.html' },
        { label: 'Silver Coin Value', href: 'silver-coin-value-calculator.html' },
        { label: 'Silver Bar Value', href: 'silver-bar-value-calculator.html' },
        { label: 'Silver Jewelry Value', href: 'silver-jewelry-value-calculator.html' },
        { label: 'Silverware Value', href: 'silverware-value-calculator.html' },
      ]
    },
    {
      label: 'Purity', dropdown: [
        { label: '999 Fine Silver', href: '999-silver-calculator.html' },
        { label: '958 Britannia Silver', href: '958-silver-calculator.html' },
        { label: '925 Sterling Silver', href: '925-silver-calculator.html' },
        { label: '900 Coin Silver', href: '900-silver-calculator.html' },
        { label: '835 Silver', href: '835-silver-calculator.html' },
        { label: '800 Silver', href: '800-silver-calculator.html' },
        { label: 'Silver Purity Chart', href: 'silver-purity-chart.html' },
      ]
    },
    {
      label: 'Pricing', dropdown: [
        { label: 'Silver Spot Price Today', href: 'silver-spot-price-today.html' },
        { label: 'Silver Price Per Gram', href: 'silver-price-per-gram.html' },
        { label: '925 Sterling Price / Gram', href: '925-sterling-silver-price-per-gram.html' },
        { label: 'Silver Price Per Ounce', href: 'silver-price-per-ounce.html' },
        { label: 'Price in All Currencies', href: 'silver-price-all-currencies.html' },
        { label: '1/10oz Silver Value', href: '1-10oz-silver-value.html' },
        { label: '1oz Silver Value', href: '1oz-silver-value.html' },
        { label: '2oz Silver Value', href: '2oz-silver-value.html' },
        { label: '5oz Silver Value', href: '5oz-silver-value.html' },
        { label: '10oz Silver Value', href: '10oz-silver-value.html' },
        { label: '100oz Silver Value', href: '100oz-silver-value.html' },
        { label: '1kg Silver Value', href: '1kg-silver-value.html' },
      ]
    },
    {
      label: 'Tools', dropdown: [
        { label: 'Silver Profit Calculator', href: 'silver-profit-calculator.html' },
        { label: 'Batch Calculator', href: 'silver-batch-calculator.html' },
        { label: 'Sona Chandi Calculator', href: 'sona-chandi-calculator.html' },
        { label: 'Face Value Calculator', href: 'face-value-silver-calculator.html' },
        { label: 'Weight Converter', href: 'silver-weight-converter.html' },
        { label: 'Pennyweight (DWT) Calc', href: 'pennyweight-calculator.html' },
        { label: 'Tola Calculator', href: 'tola-calculator.html' },
        { label: 'Sell or Hold Analysis', href: 'silver-sell-or-hold.html' },
        { label: 'Silver Identifier', href: 'identify-silver.html' },
      ]
    },
    {
      label: 'Guides', dropdown: [
        { label: 'How to Use Our Calculators', href: 'how-to-use-silver-calculators.html' },
      ]
    }
  ];

  const FOOTER_COLS = [
    {
      title: 'Calculators',
      links: [
        { label: 'Gold & Silver', href: 'gold-and-silver-calculator.html' },
        { label: 'Silver Profit', href: 'silver-profit-calculator.html' },
        { label: 'Melt Value', href: 'silver-melt-value-calculator.html' },
        { label: 'Junk Silver', href: 'junk-silver-calculator.html' },
        { label: 'Silver Coins', href: 'silver-coin-value-calculator.html' },
        { label: 'Silver Dollar', href: 'silver-dollar-calculator.html' },
        { label: 'Silver Quarter', href: 'silver-quarter-calculator.html' },
        { label: 'Silver Dime', href: 'silver-dime-calculator.html' },
        { label: 'Jewelry Value', href: 'silver-jewelry-value-calculator.html' },
        { label: 'Silverware Value', href: 'silverware-value-calculator.html' },
      ]
    },
    {
      title: 'Silver Purity',
      links: [
        { label: '999 Fine Silver', href: '999-silver-calculator.html' },
        { label: '925 Sterling', href: '925-silver-calculator.html' },
        { label: '900 Coin Silver', href: '900-silver-calculator.html' },
        { label: '835 Silver', href: '835-silver-calculator.html' },
        { label: '800 Silver', href: '800-silver-calculator.html' },
        { label: 'Purity Chart', href: 'silver-purity-chart.html' },
      ]
    },
    {
      title: 'Tools & Guides',
      links: [
        { label: 'How to Use Calculators', href: 'how-to-use-silver-calculators.html' },
        { label: 'Sona Chandi Calc', href: 'sona-chandi-calculator.html' },
        { label: 'Face Value Calc', href: 'face-value-silver-calculator.html' },
        { label: 'Batch Calculator', href: 'silver-batch-calculator.html' },
        { label: 'Weight Converter', href: 'silver-weight-converter.html' },
        { label: 'Sell or Hold', href: 'silver-sell-or-hold.html' },
        { label: 'Silver Identifier', href: 'identify-silver.html' },
      ]
    }
  ];

  function getCurrentPage() {
    const path = window.location.pathname;
    const parts = path.split('/');
    return parts[parts.length - 1] || 'index.html';
  }

  function getBasePath() {
    return window.location.pathname.match(/\/(es|fr|de|pt|hi|ur|ar|tr|it|zh|ru)\//) ? '../' : '';
  }

  function t(text) {
    if (window.MenuTranslations && window.MenuTranslations[text]) {
      return window.MenuTranslations[text];
    }
    return text;
  }

  function s(href) {
    if (window.MenuTranslations && window.MenuTranslations.slugs && window.MenuTranslations.slugs[href]) {
      return window.MenuTranslations.slugs[href];
    }
    return href;
  }

  function renderHeader() {
    const el = document.getElementById('site-header');
    if (!el) return;
    const currentPage = getCurrentPage();
    const bp = getBasePath();

    let navHTML = NAV_ITEMS.map(item => {
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
      // Keep Home pointing to the current language's index.html
      const h = s(item.href);
      return `<a href="${h}" class="nav-link ${h===currentPage?'active':''}">${label}</a>`;
    }).join('');

    // Mobile nav links
    let mobileNavHTML = '';
    NAV_ITEMS.forEach(item => {
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

    el.innerHTML = `
      <header class="site-header" id="main-header">
        <div class="header-inner">
          <a href="index.html" class="header-logo">
            <span>Scrap Silver Calculator</span>
          </a>
          <nav class="main-nav" id="desktop-nav">${navHTML}</nav>
          <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
        <div class="mobile-nav" id="mobile-nav">${mobileNavHTML}</div>
      </header>`;

    // Mobile menu toggle
    const btn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    if (btn && mobileNav) {
      btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        mobileNav.classList.toggle('open');
        document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
      });
    }

    // Scroll effect
    const header = document.getElementById('main-header');
    if (header) {
      window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
      });
    }
  }

  function renderFooter() {
    const el = document.getElementById('site-footer');
    if (!el) return;
    const bp = getBasePath();

    const colsHTML = FOOTER_COLS.map(col => `
      <div class="footer-col">
        <h4>${t(col.title)}</h4>
        ${col.links.map(l => {
          const h = s(l.href);
          return `<a href="${h}">${t(l.label)}</a>`;
        }).join('')}
      </div>`
    ).join('');

    const langHTML = `
      <div class="footer-langs" style="margin-top:var(--space-2xl); padding-top:var(--space-xl); border-top:1px solid var(--border-subtle);">
        <h4 style="margin-bottom:var(--space-md);color:var(--text-muted);font-size:var(--fs-xs);text-transform:uppercase;letter-spacing:0.1em;text-align:center;">${t('Change Language')}</h4>
        <div class="lang-grid" style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-bottom:var(--space-xl);">
          <a href="${bp}index.html" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇬🇧 EN</a>
          <a href="${bp}es/index.html" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇪🇸 ES</a>
          <a href="${bp}fr/index.html" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇫🇷 FR</a>
          <a href="${bp}de/index.html" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇩🇪 DE</a>
          <a href="${bp}pt/index.html" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇧🇷 PT</a>
          <a href="${bp}hi/index.html" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇮🇳 HI</a>
          <a href="${bp}ur/index.html" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇵🇰 UR</a>
          <a href="${bp}ar/index.html" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇸🇦 AR</a>
          <a href="${bp}tr/index.html" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇹🇷 TR</a>
          <a href="${bp}it/index.html" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇮🇹 IT</a>
          <a href="${bp}zh/index.html" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇨🇳 ZH</a>
          <a href="${bp}ru/index.html" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇷🇺 RU</a>
        </div>
      </div>
    `;

    el.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a href="index.html" class="header-logo">
                <span>Scrap Silver Calculator</span>
              </a>
              <p>${t('Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.')}</p>
            </div>
            ${colsHTML}
          </div>
          ${langHTML}
          <div class="footer-bottom">
            <span>&copy; ${new Date().getFullYear()} ${t('Scrap Silver Calculator')}. ${t('All rights reserved.')}</span>
            <span>${t('Prices are for informational purposes only.')}</span>
          </div>
        </div>
      </footer>`;
  }

  function renderPriceTicker(containerId) {
    const el = document.getElementById(containerId || 'price-ticker');
    if (!el) return;
    const price = typeof SilverPrice !== 'undefined' ? SilverPrice.getPrice() : 32.50;
    const isCustom = typeof SilverPrice !== 'undefined' && SilverPrice.isCustom();
    el.innerHTML = `
      <div class="price-ticker">
        <span class="dot ${isCustom ? 'custom' : ''}"></span>
        <span class="label">${isCustom ? 'Custom Price' : 'Live Silver Spot'}</span>
        <span class="price" id="spot-price-display">$${price.toFixed(2)}/oz</span>
      </div>`;

    // Update when price changes
    if (typeof SilverPrice !== 'undefined') {
      SilverPrice.onPriceUpdate((newPrice) => {
        const display = document.getElementById('spot-price-display');
        if (display) display.textContent = `$${newPrice.toFixed(2)}/oz`;
      });
    }
  }

  function renderBreadcrumb(containerId, crumbs) {
    const el = document.getElementById(containerId || 'breadcrumb');
    if (!el) return;
    const items = crumbs.map((c, i) => {
      if (i === crumbs.length - 1) return `<span>${c.label}</span>`;
      return `<a href="${c.href}">${c.label}</a><span class="sep">›</span>`;
    }).join(' ');
    el.innerHTML = `<nav class="breadcrumb" aria-label="Breadcrumb">${items}</nav>`;
  }

  // Schema.org FAQ markup helper
  function injectFAQSchema(faqs) {
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
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  // Schema.org Calculator/WebApp markup
  function injectCalcSchema(name, description, url) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": name,
      "description": description,
      "url": url,
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  function init() {
    renderHeader();
    renderFooter();
  }

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { renderHeader, renderFooter, renderPriceTicker, renderBreadcrumb, injectFAQSchema, injectCalcSchema, init };
})();
