/* ============================================
   SHARED COMPONENTS
   Header, Navigation, Footer — injected via JS
   ============================================ */

const SiteComponents = (() => {
  /* ---- Navigation Structure ---- */
  const NAV_ITEMS = [
    { label: 'Home', href: '/' },
    {
      label: 'Calculators', dropdown: [
        { label: 'Gold & Silver Calculator', href: '/gold-and-silver-calculator/' },
        { label: 'Silver Melt Value', href: '/silver-melt-value-calculator/' },
        { label: 'Sterling Silver Calculator', href: '/sterling-silver-calculator/' },
        { label: 'Junk Silver Calculator', href: '/junk-silver-calculator/' },
        { label: 'Silver Coin Value', href: '/silver-coin-value-calculator/' },
        { label: 'Silver Bar Value', href: '/silver-bar-value-calculator/' },
        { label: 'Silver Jewelry Value', href: '/silver-jewelry-value-calculator/' },
        { label: 'Silverware Value', href: '/silverware-value-calculator/' },
      ]
    },
    {
      label: 'Purity', dropdown: [
        { label: '999 Fine Silver', href: '/999-silver-calculator/' },
        { label: '958 Britannia Silver', href: '/958-silver-calculator/' },
        { label: '925 Sterling Silver', href: '/925-silver-calculator/' },
        { label: '900 Coin Silver', href: '/900-silver-calculator/' },
        { label: '835 Silver', href: '/835-silver-calculator/' },
        { label: '800 Silver', href: '/800-silver-calculator/' },
        { label: 'Silver Purity Chart', href: '/silver-purity-chart/' },
      ]
    },
    {
      label: 'Pricing', dropdown: [
        { label: 'Silver Spot Price Today', href: '/silver-spot-price-today/' },
        { label: 'Silver Price Per Gram', href: '/silver-price-per-gram/' },
        { label: '925 Sterling Price / Gram', href: '/925-sterling-silver-price-per-gram/' },
        { label: 'Silver Price Per Ounce', href: '/silver-price-per-ounce/' },
        { label: 'Price in All Currencies', href: '/silver-price-all-currencies/' },
        { label: '1/10oz Silver Value', href: '/1-10oz-silver-value/' },
        { label: '1oz Silver Value', href: '/1oz-silver-value/' },
        { label: '2oz Silver Value', href: '/2oz-silver-value/' },
        { label: '5oz Silver Value', href: '/5oz-silver-value/' },
        { label: '10oz Silver Value', href: '/10oz-silver-value/' },
        { label: '100oz Silver Value', href: '/100oz-silver-value/' },
        { label: '1kg Silver Value', href: '/1kg-silver-value/' },
      ]
    },
    {
      label: 'Tools', dropdown: [
        { label: 'Silver Profit Calculator', href: '/silver-profit-calculator/' },
        { label: 'Batch Calculator', href: '/silver-batch-calculator/' },
        { label: 'Sona Chandi Calculator', href: '/sona-chandi-calculator/' },
        { label: 'Face Value Calculator', href: '/face-value-silver-calculator/' },
        { label: 'Weight Converter', href: '/silver-weight-converter/' },
        { label: 'Pennyweight (DWT) Calc', href: '/pennyweight-calculator/' },
        { label: 'Tola Calculator', href: '/tola-calculator/' },
        { label: 'Sell or Hold Analysis', href: '/silver-sell-or-hold/' },
        { label: 'Silver Identifier', href: '/identify-silver/' },
      ]
    },
    {
      label: 'Guides', dropdown: [
        { label: 'How to Use Our Calculators', href: '/how-to-use-silver-calculators/' },
      ]
    }
  ];

  const FOOTER_COLS = [
    {
      title: 'Calculators',
      links: [
        { label: 'Gold & Silver', href: '/gold-and-silver-calculator/' },
        { label: 'Silver Profit', href: '/silver-profit-calculator/' },
        { label: 'Melt Value', href: '/silver-melt-value-calculator/' },
        { label: 'Junk Silver', href: '/junk-silver-calculator/' },
        { label: 'Silver Coins', href: '/silver-coin-value-calculator/' },
        { label: 'Silver Dollar', href: '/silver-dollar-calculator/' },
        { label: 'Silver Quarter', href: '/silver-quarter-calculator/' },
        { label: 'Silver Dime', href: '/silver-dime-calculator/' },
        { label: 'Jewelry Value', href: '/silver-jewelry-value-calculator/' },
        { label: 'Silverware Value', href: '/silverware-value-calculator/' },
      ]
    },
    {
      title: 'Silver Purity',
      links: [
        { label: '999 Fine Silver', href: '/999-silver-calculator/' },
        { label: '925 Sterling', href: '/925-silver-calculator/' },
        { label: '900 Coin Silver', href: '/900-silver-calculator/' },
        { label: '835 Silver', href: '/835-silver-calculator/' },
        { label: '800 Silver', href: '/800-silver-calculator/' },
        { label: 'Purity Chart', href: '/silver-purity-chart/' },
      ]
    },
    {
      title: 'Tools & Guides',
      links: [
        { label: 'How to Use Calculators', href: '/how-to-use-silver-calculators/' },
        { label: 'Sona Chandi Calc', href: '/sona-chandi-calculator/' },
        { label: 'Face Value Calc', href: '/face-value-silver-calculator/' },
        { label: 'Batch Calculator', href: '/silver-batch-calculator/' },
        { label: 'Weight Converter', href: '/silver-weight-converter/' },
        { label: 'Sell or Hold', href: '/silver-sell-or-hold/' },
        { label: 'Silver Identifier', href: '/identify-silver/' },
      ]
    }
  ];


  function getCurrentPage() {
    const path = window.location.pathname;
    if (path === '/' || path === '/index') return '/';
    // If it ends with a slash, we want the name before it
    if (path.endsWith('/')) {
      const parts = path.split('/').filter(Boolean);
      if (parts.length === 0) return '/';
      const last = parts[parts.length - 1];
      // If the last part is a language code, it's an index page
      if (['es','fr','de','pt','hi','ur','ar','tr','it','zh','ru'].includes(last)) return '/';
      return `/${last}/`;
    }
    const parts = path.split('/');
    const last = parts[parts.length - 1];
    if (last.endsWith('.html')) return `/${last.replace('.html', '')}/`;
    return `/${last}/` || '/';
  }

  function getBasePath() {
    const path = window.location.pathname;
    const langMatch = path.match(/\/(es|fr|de|pt|hi|ur|ar|tr|it|zh|ru)\//);
    if (langMatch) return `/${langMatch[1]}/`;
    return '/';
  }


  function t(text) {
    if (window.MenuTranslations && window.MenuTranslations[text]) {
      return window.MenuTranslations[text];
    }
    return text;
  }

  function s(href) {
    if (!href || href === '/' || href === 'index') return getBasePath();
    
    // Normalize href: remove leading/trailing slashes and .html extension for lookup
    const cleanHref = href.replace(/^\/|\/$/g, '').replace(/\.html$/, '');
    
    if (window.MenuTranslations && window.MenuTranslations.slugs && window.MenuTranslations.slugs[cleanHref]) {
      const slug = window.MenuTranslations.slugs[cleanHref];
      const bp = getBasePath();
      // Ensure the translated slug is return as a clean URL with proper slashes
      return `${bp}${slug}/`;
    }
    
    // Fallback: Ensure the original href is returned clean
    if (href.startsWith('http')) return href;
    const path = href.startsWith('/') ? href : `/${href}`;
    return path.replace(/\.html$/, '').replace(/\/$/, '') + '/';
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
      // Keep Home pointing to the current language's index
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
          <a href="/" class="header-logo">
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
          <a href="/" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇬🇧 EN</a>
          <a href="/es/" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇪🇸 ES</a>
          <a href="/fr/" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇫🇷 FR</a>
          <a href="/de/" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇩🇪 DE</a>
          <a href="/pt/" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇧🇷 PT</a>
          <a href="/hi/" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇮🇳 HI</a>
          <a href="/ur/" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇵🇰 UR</a>
          <a href="/ar/" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇸🇦 AR</a>
          <a href="/tr/" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇹🇷 TR</a>
          <a href="/it/" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇮🇹 IT</a>
          <a href="/zh/" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇨🇳 ZH</a>
          <a href="/ru/" class="lang-btn" style="padding:6px 12px;background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:14px;text-decoration:none;">🇷🇺 RU</a>
        </div>
      </div>

    `;

    el.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a href="/" class="header-logo">
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

  function copyCalculation(btn) {
    const resultValue = document.getElementById('hero-result-value')?.textContent || '';
    const resultDetail = document.getElementById('hero-result-detail')?.textContent || '';
    const spotPrice = document.getElementById('spot-price-display')?.textContent || '';
    const pageTitle = document.title.split('—')[0].trim();
    
    if (!resultValue || resultValue === '$0.00') return;

    const shareText = `${pageTitle}\nValue: ${resultValue}\nDetails: ${resultDetail}\nSpot: ${spotPrice}\nCheck yours at: ${window.location.href}`;

    navigator.clipboard.writeText(shareText).then(() => {
      const originalText = btn.innerHTML;
      const copiedText = t('copied') || 'Copied!';
      btn.innerHTML = `<span class="icon">✅</span> ${copiedText}`;
      btn.classList.add('copied');
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove('copied');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

  function shareResult(platform) {
    const resultValue = document.getElementById('hero-result-value')?.textContent || '';
    const resultDetail = document.getElementById('hero-result-detail')?.textContent || '';
    const pageTitle = document.title.split('—')[0].trim();
    const url = window.location.href;
    
    if (!resultValue || resultValue === '$0.00') return;

    const message = `My ${pageTitle}: ${resultValue} (${resultDetail})`;
    const encodedMsg = encodeURIComponent(message);
    const encodedUrl = encodeURIComponent(url);

    let shareUrl = '';
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodedMsg}%20${encodedUrl}`;
        break;
      case 'x':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedMsg}&url=${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
    }

    if (shareUrl) window.open(shareUrl, '_blank');
  }

  return { renderHeader, renderFooter, renderPriceTicker, renderBreadcrumb, injectFAQSchema, injectCalcSchema, copyCalculation, shareResult, init };
})();
