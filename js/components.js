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
        { label: 'nav_gold_silver', href: '/gold-and-silver-calculator/' },
        { label: 'nav_melt_value', href: '/silver-melt-value-calculator/' },
        { label: 'nav_sterling', href: '/sterling-silver-calculator/' },
        { label: 'nav_junk', href: '/junk-silver-calculator/' },
        { label: 'nav_coins', href: '/silver-coin-value-calculator/' },
        { label: 'nav_bar', href: '/silver-bar-value-calculator/' },
        { label: 'nav_jewelry', href: '/silver-jewelry-value-calculator/' },
        { label: 'nav_silverware', href: '/silverware-value-calculator/' },
      ]
    },
    {
      label: 'Purity', dropdown: [
        { label: 'nav_999', href: '/999-silver-calculator/' },
        { label: 'nav_958', href: '/958-silver-calculator/' },
        { label: 'nav_925', href: '/925-silver-calculator/' },
        { label: 'nav_900', href: '/900-silver-calculator/' },
        { label: 'nav_835', href: '/835-silver-calculator/' },
        { label: 'nav_800', href: '/800-silver-calculator/' },
        { label: 'nav_purity_chart', href: '/silver-purity-chart/' },
      ]
    },
    {
      label: 'Tools', dropdown: [
        { label: 'nav_profit', href: '/silver-profit-calculator/' },
        { label: 'nav_batch', href: '/silver-batch-calculator/' },
        { label: 'nav_sona_chandi', href: '/sona-chandi-calculator/' },
        { label: 'nav_face_value', href: '/face-value-silver-calculator/' },
        { label: 'nav_weight', href: '/silver-weight-converter/' },
        { label: 'nav_pennyweight', href: '/pennyweight-calculator/' },
        { label: 'nav_tola', href: '/tola-calculator/' },
        { label: 'nav_sell_hold', href: '/silver-sell-or-hold/' },
        { label: 'nav_identifier', href: '/identify-silver/' },
      ]
    },
    { label: 'Guide', href: '/how-to-use-silver-calculators/' }
  ];

  const NAV_LABELS = {
    nav_gold_silver:  { en:'Gold & Silver', es:'Oro y Plata', fr:'Or & Argent', de:'Gold & Silber', it:'Oro e Argento', pt:'Ouro e Prata', ru:'Золото и Серебро', ar:'الذهب والفضة', hi:'सोना और चाँदी', ur:'سونا اور چاندی', tr:'Altın ve Gümüş', zh:'黄金和白银' },
    nav_melt_value:   { en:'Silver Melt Value', es:'Valor de Fusión', fr:'Valeur de Fonte', de:'Schmelzwert', it:'Valore di Fusione', pt:'Valor de Fusão', ru:'Стоимость плавки', ar:'قيمة الصهر', hi:'गलाने का मूल्य', ur:'پگھلنے کی قیمت', tr:'Erime Değeri', zh:'熔化价值' },
    nav_sterling:     { en:'Sterling Silver', es:'Plata de Ley', fr:'Argent Sterling', de:'Sterlingsilber', it:'Argento Sterling', pt:'Prata Sterling', ru:'Серебро пробы', ar:'فضة إسترليني', hi:'स्टर्लिंग चाँदी', ur:'سٹرلنگ سلور', tr:'Gümüş', zh:'纯银' },
    nav_junk:         { en:'Junk Silver', es:'Plata Basura', fr:'Argent de Circulation', de:'Billon Silber', it:'Argento Spazzatura', pt:'Prata Lixo', ru:'Монетное серебро', ar:'الفضة غير المرغوب', hi:'जंक सिल्वर', ur:'ردی چاندی', tr:'Hurda Gümüş', zh:'垃圾银' },
    nav_coins:        { en:'Silver Coins', es:'Monedas de Plata', fr:'Pi\u00e8ces en Argent', de:'Silberm\u00fcnzen', it:'Monete d\u2019argento', pt:'Moedas de Prata', ru:'\u0421\u0435\u0440\u0435\u0431\u0440\u044f\u043d\u044b\u0435 \u043c\u043e\u043d\u0435\u0442\u044b', ar:'\u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0641\u0636\u064a\u0629', hi:'\u091a\u093e\u0901\u0926\u0940 \u0915\u0947 \u0938\u093f\u0915\u094d\u0915\u0947', ur:'\u0686\u0627\u0646\u062f\u06cc \u06a9\u06d2 \u0633\u06a9\u06d2', tr:'G\u00fcm\u00fc\u015f Paralar', zh:'\u94f6\u5e01' },
    nav_bar:          { en:'Silver Bar Value', es:'Valor de Lingote', fr:'Valeur des Lingots', de:'Silberbarren', it:'Valore Lingotto', pt:'Valor da Barra', ru:'Стоимость слитка', ar:'قيمة السبائك', hi:'बार वैल्यू', ur:'بار ویلیو', tr:'Külçe Değeri', zh:'银条价值' },
    nav_jewelry:      { en:'Jewelry Value', es:'Valor de Joyería', fr:'Valeur Bijoux', de:'Schmuckwert', it:'Valore Gioielli', pt:'Valor das Joias', ru:'Стоимость украшений', ar:'قيمة المجوهرات', hi:'आभूषण मूल्य', ur:'زیورات کی قیمت', tr:'Mücevher Değeri', zh:'珠宝价值' },
    nav_silverware:   { en:'Silverware Value', es:'Valor de Cubertería', fr:'Valeur Argenterie', de:'Besteckwert', it:'Valore Argenteria', pt:'Valor Prataria', ru:'Стоимость серебра', ar:'قيمة أدوات المائدة', hi:'चाँदी के बर्तन', ur:'سلور ویئر', tr:'Gümüş Eşya', zh:'银器价值' },
    nav_999:          { en:'999 Fine Silver', es:'Plata Fina 999', fr:'Argent Fin 999', de:'999 Feinsilber', it:'Argento Fino 999', pt:'Prata Fina 999', ru:'999 проба', ar:'فضة خالصة 999', hi:'999 शुद्ध चाँदी', ur:'999 خالص چاندی', tr:'999 Saf Gümüş', zh:'999纯银' },
    nav_958:          { en:'958 Britannia', es:'Britannia 958', fr:'Britannia 958', de:'958 Britannia', it:'Britannia 958', pt:'Britannia 958', ru:'958 Britannia', ar:'بريتانيا 958', hi:'958 Britannia', ur:'958 برٹانیہ', tr:'958 Britannia', zh:'958布里塔尼亚' },
    nav_925:          { en:'925 Sterling', es:'925 Sterling', fr:'925 Sterling', de:'925 Sterling', it:'925 Sterling', pt:'925 Sterling', ru:'925 проба', ar:'925 إسترليني', hi:'925 स्टर्लिंग', ur:'925 سٹرلنگ', tr:'925 Gümüş', zh:'925纯银' },
    nav_900:          { en:'900 Coin Silver', es:'Plata de Moneda 900', fr:'Argent de Pièce 900', de:'900 Münzsilber', it:'Argento Moneta 900', pt:'Prata Moeda 900', ru:'900 монетное', ar:'فضة العملة 900', hi:'900 सिक्का चाँदी', ur:'900 سکہ چاندی', tr:'900 Sikke Gümüşü', zh:'900银币' },
    nav_835:          { en:'835 Silver', es:'Plata 835', fr:'Argent 835', de:'835 Silber', it:'Argento 835', pt:'Prata 835', ru:'835 серебро', ar:'فضة 835', hi:'835 चाँदी', ur:'835 چاندی', tr:'835 Gümüş', zh:'835银' },
    nav_800:          { en:'800 Silver', es:'Plata 800', fr:'Argent 800', de:'800 Silber', it:'Argento 800', pt:'Prata 800', ru:'800 серебро', ar:'فضة 800', hi:'800 चाँदी', ur:'800 چاندی', tr:'800 Gümüş', zh:'800银' },
    nav_purity_chart: { en:'Purity Chart', es:'Tabla de Pureza', fr:'Tableau de Pureté', de:'Reinheitstabelle', it:'Tabella Purezza', pt:'Tabela de Pureza', ru:'Таблица пробы', ar:'جدول النقاء', hi:'शुद्धता चार्ट', ur:'پیوریٹی چارٹ', tr:'Saflık Tablosu', zh:'纯度表' },
    nav_profit:       { en:'Profit Calculator', es:'Calculadora de Ganancias', fr:'Calculateur de Profit', de:'Gewinnrechner', it:'Calcolatore Profitto', pt:'Calculadora de Lucro', ru:'Калькулятор прибыли', ar:'حاسبة الأرباح', hi:'लाभ कैलकुलेटर', ur:'منافع کیلکولیٹر', tr:'Kâr Hesaplama', zh:'利润计算器' },
    nav_batch:        { en:'Batch Calculator', es:'Calculadora por Lotes', fr:'Calculateur par Lots', de:'Stapelrechner', it:'Calcolatore Batch', pt:'Calculadora de Lote', ru:'Пакетный калькулятор', ar:'حاسبة الدفعات', hi:'बैच कैलकुलेटर', ur:'بیچ کیلکولیٹر', tr:'Toplu Hesaplama', zh:'批量计算器' },
    nav_sona_chandi:  { en:'Sona Chandi', es:'Sona Chandi', fr:'Sona Chandi', de:'Sona Chandi', it:'Sona Chandi', pt:'Sona Chandi', ru:'Сона Чанди', ar:'سونا تشاندي', hi:'सोना चाँदी', ur:'سونا چاندی', tr:'Sona Chandi', zh:'索纳钱迪' },
    nav_face_value:   { en:'Face Value Calc', es:'Valor Nominal', fr:'Valeur Nominale', de:'Nennwert', it:'Valore Nominale', pt:'Valor Nominal', ru:'Номинальная стоимость', ar:'القيمة الاسمية', hi:'अंकित मूल्य', ur:'فیس ویلیو', tr:'Nominal Değer', zh:'面值计算' },
    nav_weight:       { en:'Weight Converter', es:'Convertidor de Peso', fr:'Convertisseur de Poids', de:'Gewichtsumrechner', it:'Convertitore Peso', pt:'Conversor de Peso', ru:'Конвертер веса', ar:'محول الوزن', hi:'वजन परिवर्तक', ur:'وزن کنورٹر', tr:'Ağırlık Dönüştürücü', zh:'重量转换器' },
    nav_pennyweight:  { en:'Pennyweight (DWT)', es:'Pennyweight DWT', fr:'Pennyweight DWT', de:'Pennyweight DWT', it:'Pennyweight DWT', pt:'Pennyweight DWT', ru:'Пеннивейт', ar:'بنس تروي', hi:'पेनीवेट', ur:'پینی ویٹ', tr:'Pennyweight', zh:'便士重量' },
    nav_tola:         { en:'Tola Calculator', es:'Calculadora Tola', fr:'Calculateur Tola', de:'Tola Rechner', it:'Calcolatore Tola', pt:'Calculadora Tola', ru:'Калькулятор Тола', ar:'حاسبة التولة', hi:'तोला कैलकुलेटर', ur:'تولہ کیلکولیٹر', tr:'Tola Hesaplayıcı', zh:'托拉计算器' },
    nav_sell_hold:    { en:'Sell or Hold', es:'Vender o Mantener', fr:'Vendre ou Garder', de:'Verkaufen oder Halten', it:'Vendere o Tenere', pt:'Vender ou Manter', ru:'Продать или держать', ar:'بيع أو احتفظ', hi:'बेचें या रखें', ur:'بیچیں یا رکھیں', tr:'Sat veya Tut', zh:'卖出或持有' },
    nav_identifier:   { en:'Silver Identifier', es:'Identificador de Plata', fr:'Identificateur Argent', de:'Silber-Identifikator', it:'Identificatore Argento', pt:'Identificador Prata', ru:'Определитель серебра', ar:'معرف الفضة', hi:'सिल्वर पहचानकर्ता', ur:'سلور آئیڈینٹیفائر', tr:'Gümüş Tanımlayıcı', zh:'银识别器' },
  };

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
    if (currentLang !== 'en' && window.MenuTranslations && window.MenuTranslations.slugs) {
        const mapping = window.MenuTranslations.slugs[target];
        if (mapping && mapping[currentLang]) {
            localizedTarget = mapping[currentLang];
        }
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

    // Must be defined first — used in navHTML and mobileNavHTML
    const currentLang = getLangCode();
    const tnav = (key) => {
      if (NAV_LABELS[key]) return NAV_LABELS[key][currentLang] || NAV_LABELS[key]['en'] || key;
      return t(key);
    };

    const navHTML = NAV_ITEMS.map(item => {
      const label = tnav(item.label);
      if (item.dropdown) {
        const links = item.dropdown.map(d => {
          const h = s(d.href);
          const isAct = d.href.includes(cur) || (cur === 'index' && (d.href === '/' || d.href === 'index.html'));
          return `<a href="${h}" ${isAct?'class="active"':''}>${tnav(d.label)}</a>`;
        }).join('');
        const isActive = item.dropdown.some(d => d.href.includes(cur));
        return `
          <div class="nav-dropdown">
            <button class="nav-link nav-dropdown-trigger ${isActive?'active':''}" type="button">${label} <span style="font-size:9px;opacity:0.5;">▾</span></button>
            <div class="nav-dropdown-menu">${links}</div>
          </div>`;
      }
      const h = s(item.href);
      const isAct = (item.href === '/' && cur === 'index') || (item.href && item.href.includes(cur));
      return `<a href="${h}" class="nav-link ${isAct?'active':''}">${label}</a>`;
    }).join('');

    let mobileNavHTML = `<a href="${bp}">${tnav('Home')}</a>`;
    NAV_ITEMS.filter(i => i.label !== 'Home').forEach(item => {
      const label = tnav(item.label);
      if (item.dropdown) {
        mobileNavHTML += `<div class="mobile-nav-group-title">${label}</div>`;
        item.dropdown.forEach(d => {
          const h = s(d.href);
          const isAct = d.href.includes(cur);
          mobileNavHTML += `<a href="${h}" ${isAct?'class="active"':''}>${tnav(d.label)}</a>`;
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
            if (window.MenuTranslations && window.MenuTranslations.slugs) {
                const mapping = window.MenuTranslations.slugs[pageSlug];
                if (mapping && mapping[targetLang]) {
                    slug = mapping[targetLang];
                }
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
                <button class="nav-link nav-dropdown-trigger" type="button" style="padding:4px 10px;border:1px solid var(--border);border-radius:6px;background:rgba(255,255,255,0.04);display:flex;align-items:center;gap:5px;font-size:12px;">🌐 ${currentLang.toUpperCase()} <span style="font-size:9px;opacity:0.5;">▾</span></button>
                <div class="nav-dropdown-menu lang-menu" style="min-width:190px;grid-template-columns:1fr 1fr;gap:4px;padding:8px;">
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

    // CLICK-based dropdowns — not hover. Closes on outside click.
    el.querySelectorAll('.nav-dropdown-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const menu = trigger.nextElementSibling;
            const isOpen = menu.classList.contains('open');
            // Close all open dropdowns first
            el.querySelectorAll('.nav-dropdown-menu.open').forEach(m => m.classList.remove('open'));
            if (!isOpen) menu.classList.add('open');
        });
    });

    document.addEventListener('click', () => {
        el.querySelectorAll('.nav-dropdown-menu.open').forEach(m => m.classList.remove('open'));
    });

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

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { renderHeader, renderFooter, renderPriceTicker, renderBreadcrumb, copyCalculation, toast, injectFAQSchema, init };
})();
