/* ============================================
   SHARED COMPONENTS (MASTERPIECE VERSION)
   Header, Navigation, Footer — injected via JS
   ============================================ */

const SiteComponents = (() => {
  /* ---- Navigation Structure ---- */
  const NAV_ITEMS = [
    { label: 'nav_home', href: '/' },
    {
      label: 'nav_calculators', dropdown: [
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
      label: 'nav_purity', dropdown: [
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
      label: 'nav_tools', dropdown: [
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
    { label: 'nav_guide', href: '/how-to-use-silver-calculators/' }
  ];

  const NAV_LABELS = {
    nav_home:         { en:'Home', es:'Inicio', fr:'Accueil', de:'Startseite', it:'Home', pt:'Início', ru:'Главная', ar:'الرئيسية', hi:'होम', ur:'ہوم', tr:'Anasayfa', zh:'首页' },
    nav_calculators:  { en:'Calculators', es:'Calculadoras', fr:'Calculateurs', de:'Rechner', it:'Calcolatrici', pt:'Calculadoras', ru:'Калькуляторы', ar:'الحاسبات', hi:'कैलकुलेटर', ur:'کیلکولیٹر', tr:'Hesaplayıcılar', zh:'计算器' },
    nav_purity:       { en:'Purity', es:'Pureza', fr:'Pureté', de:'Reinheit', it:'Purezza', pt:'Pureza', ru:'Проба', ar:'النقاء', hi:'शुद्धता', ur:'پاکیزگی', tr:'Saflık', zh:'纯度' },
    nav_tools:        { en:'Tools', es:'Herramientas', fr:'Outils', de:'Werkzeuge', it:'Strumenti', pt:'Ferramentas', ru:'Инструменты', ar:'الأدوات', hi:'उपकरण', ur:'اوزار', tr:'Araçlar', zh:'工具' },
    nav_guide:        { en:'Guide', es:'Guía', fr:'Guide', de:'Ratgeber', it:'Guida', pt:'Guia', ru:'Руководство', ar:'الدليل', hi:'गाइड', ur:'گائیڈ', tr:'Rehber', zh:'指南' },
    nav_gold_silver:  { en:'Gold & Silver', es:'Oro y Plata', fr:'Or & Argent', de:'Gold & Silber', it:'Oro e Argento', pt:'Ouro e Prata', ru:'Золото и Серебро', ar:'الذهب والفضة', hi:'सोना और चाँदी', ur:'سونا اور چاندی', tr:'Altın ve Gümüş', zh:'黄金和白银' },
    nav_melt_value:   { en:'Silver Melt Value', es:'Valor de Fusión', fr:'Valeur de Fonte', de:'Schmelzwert', it:'Valore di Fusione', pt:'Valor de Fusão', ru:'Стоимость плавки', ar:'قيمة الصهر', hi:'गलाने का मूल्य', ur:'پگھلنے کی قیمت', tr:'Erime Değeri', zh:'熔化价值' },
    nav_sterling:     { en:'Sterling Silver', es:'Plata de Ley', fr:'Argent Sterling', de:'Sterlingsilber', it:'Argento Sterling', pt:'Prata Sterling', ru:'Серебро пробы', ar:'فضة إسترليني', hi:'स्टर्लिंग चाँदी', ur:'سٹرلنگ سلور', tr:'Gümüş', zh:'纯银' },
    nav_junk:         { en:'Junk Silver', es:'Plata Basura', fr:'Argent de Circulation', de:'Billon Silber', it:'Argento Spazzatura', pt:'Prata Lixo', ru:'Монетное серебро', ar:'الفضة غير المرغوب', hi:'जंक सिल्वर', ur:'ردی چاندی', tr:'Hurda Gümüş', zh:'垃圾银' },
    nav_coins:        { en:'Silver Coins', es:'Monedas de Plata', fr:'Pi\u00e8ces en Argent', de:'Silberm\u00fcnzen', it:'Monete d\u2019argento', pt:'Moedas de Prata', ru:'\u0421\u0435\u0440\u0435\u0431\u0440\u044f\u043d\u044b\u0435 \u043c\u043e\u043d\u0435\u0442\u044b', ar:'\u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0641\u0636\u064a\u0629', hi:'\u091a\u093e\u0901\u0926\u0940 \u0915\u0947 \u0938\u093f\u0915\u094d\u0915\u0947', ur:'\u0686\u0627\u0646\u062f\u06cc \u06a9\u06d2 \u0633\u06a9\u06d2', tr:'G\u00fcm\u00fc\u015f Paralar', zh:'\u94f6\u5e01' },
    nav_bar:          { en:'Silver Bar Value', es:'Valor de Lingote', fr:'Valeur des Lingots', de:'Silberbarren', it:'Valore Lingotto', pt:'Valor da Barra', ru:'Стоимость слитка', ar:'قيمة السبائك', hi:'बार वैल्यू', ur:'بار ویلیو', tr:'Külçe Değeri', zh:'银条价值' },
    nav_jewelry:      { en:'Jewelry Value', es:'Valor de Joyería', fr:'Valeur Bijoux', de:'Schmuckwert', it:'Valore Gioielli', pt:'Valor das Joias', ru:'Стоимость украшений', ar:'قيمة المجوهرات', hi:'आभूषण मूल्य', ur:'زیورات की कीमत', tr:'Mücevher Değeri', zh:'珠宝价值' },
    nav_silverware:   { en:'Silverware Value', es:'Valor de Cubertería', fr:'Valeur Argenterie', de:'Besteckwert', it:'Valore Argenteria', pt:'Valor Prataria', ru:'Стоимость серебра', ar:'قيمة أدوات المائدة', hi:'चाँدي के बर्तन', ur:'سلور ویئر', tr:'Gümüş Eşya', zh:'银器价值' },
    nav_999:          { en:'999 Fine Silver', es:'Plata Fina 999', fr:'Argent Fin 999', de:'999 Feinsilber', it:'Argento Fino 999', pt:'Prata Fina 999', ru:'999 проба', ar:'فضة خالصة 999', hi:'999 शुद्ध चाँदी', ur:'999 خالص چاندی', tr:'999 Saf Gümüş', zh:'999纯银' },
    nav_958:          { en:'958 Britannia', es:'Britannia 958', fr:'Britannia 958', de:'958 Britannia', it:'Britannia 958', pt:'Britannia 958', ru:'958 Britannia', ar:'بريتانيا 958', hi:'958 Britannia', ur:'958 برٹانیہ', tr:'958 Britannia', zh:'958布里塔尼亚' },
    nav_925:          { en:'925 Sterling', es:'925 Sterling', fr:'925 Sterling', de:'925 Sterling', it:'925 Sterling', pt:'925 Sterling', ru:'925 проба', ar:'925 إسترليني', hi:'925 स्टर्लिंग', ur:'925 سٹرلنگ', tr:'925 Gümüş', zh:'925纯银' },
    nav_900:          { en:'900 Coin Silver', es:'Plata de Moneda 900', fr:'Argent de Pièce 900', de:'900 Münzsilber', it:'Argento Moneta 900', pt:'Prata Moeda 900', ru:'900 монетное', ar:'فضة العملة 900', hi:'900 सिक्का चाँदी', ur:'900 سکہ چاندی', tr:'900 Sikke Gümüşü', zh:'900银币' },
    nav_835:          { en:'835 Silver', es:'Plata 835', fr:'Argent 835', de:'835 Silber', it:'Argento 835', pt:'Prata 835', ru:'835 серебро', ar:'فضة 835', hi:'835 चाँदी', ur:'835 چاندی', tr:'835 Gümüş', zh:'835银' },
    nav_800:          { en:'800 Silver', es:'Plata 800', fr:'Argent 800', de:'800 Silber', it:'Argento 800', pt:'Prata 800', ru:'800 серебро', ar:'فضة 800', hi:'800 चाँदी', ur:'800 چاندی', tr:'800 Gümüş', zh:'800银' },
    nav_purity_chart: { en:'Purity Chart', es:'Tabla de Pureza', fr:'Tableau de Pureté', de:'Reinheitstabelle', it:'Tabella Purezza', pt:'Tabela de Pureza', ru:'Таблица пробы', ar:'جدول النقاء', hi:'शुद्धता चार्ट', ur:'پیوریٹی चार्ट', tr:'Saflık Tablosu', zh:'纯度表' },
    nav_profit:       { en:'Profit Calculator', es:'Calculadora de Ganancias', fr:'Calculateur de Profit', de:'Gewinnrechner', it:'Calcolatore Profitto', pt:'Calculadora de Lucro', ru:'Калькулятор прибыли', ar:'حاسبة الأرباح', hi:'लाभ कैलकुलेटर', ur:'منافع کیلکولیٹر', tr:'Kâr Hesaplama', zh:'利润计算器' },
    nav_batch:        { en:'Batch Calculator', es:'Calculadora por Lotes', fr:'Calculateur par Lots', de:'Stapelrechner', it:'Calcolatore Batch', pt:'Calculadora de Lote', ru:'Пакетный калькулятор', ar:'حاسبة الدفعات', hi:'बैच कैलकुलेटर', ur:'بیچ کیلکولیٹر', tr:'Toplu Hesaplama', zh:'批量计算器' },
    nav_sona_chandi:  { en:'Sona Chandi', es:'Sona Chandi', fr:'Sona Chandi', de:'Sona Chandi', it:'Sona Chandi', pt:'Sona Chandi', ru:'Сона Чанди', ar:'سونا تشاندي', hi:'सोना चाँदी', ur:'سونا چاندی', tr:'Sona Chandi', zh:'索纳钱迪' },
    nav_face_value:   { en:'Face Value Calc', es:'Valor Nominal', fr:'Valeur Nominale', de:'Nennwert', it:'Valore Nominale', pt:'Valor Nominal', ru:'Номинальная стоимость', ar:'القيمة الاسمية', hi:'अंकित मूल्य', ur:'فیس ویلیو', tr:'Nominal Değer', zh:'面值计算' },
    nav_weight:       { en:'Weight Converter', es:'Convertidor de Peso', fr:'Convertisseur de Poids', de:'Gewichtsumrechner', it:'Convertitore Peso', pt:'Conversor de Peso', ru:'Конвертер веса', ar:'محول الوزن', hi:'वजन परिवर्तक', ur:'وزن کنورٹر', tr:'Ağırlık Dönüştürücü', zh:'重量转换器' },
    nav_pennyweight:  { en:'Pennyweight (DWT)', es:'Pennyweight DWT', fr:'Pennyweight DWT', de:'Pennyweight DWT', it:'Pennyweight DWT', pt:'Pennyweight DWT', ru:'Пеннивейт', ar:'بنس تروي', hi:'पेनीवेट', ur:'پینی ویٹ', tr:'Pennyweight', zh:'便士重量' },
    nav_tola:         { en:'Tola Calculator', es:'Calculadora Tola', fr:'Calculateur Tola', de:'Tola Rechner', it:'Calcolatore Tola', pt:'Calculadora Tola', ru:'Калькулятор Тола', ar:'حاسبة التولة', hi:'तोला कैलकुलेटर', ur:'تولہ کیلکولیٹر', tr:'Tola Hesaplayıcı', zh:'托拉计算器' },
    nav_sell_hold:    { en:'Sell or Hold', es:'Vender o Mantener', fr:'Vendre ou Garder', de:'Verkaufen oder Halten', it:'Vendere o Tenere', pt:'Vender ou Manter', ru:'Продать или держать', ar:'بيع أو احتفظ', hi:'बेचें या रखें', ur:'بیچیں یا रखें', tr:'Sat veya Tut', zh:'卖出或持有' },
    nav_identifier:   { en:'Silver Identifier', es:'Identificador de Plata', fr:'Identificateur Argent', de:'Silber-Identifikator', it:'Identificatore Argento', pt:'Identificador Prata', ru:'Определитель серебра', ar:'معرف الفضة', hi:'सिल्वर पहचानकर्ता', ur:'سلور آئیڈینٹیفائر', tr:'Gümüş Tanımlayıcı', zh:'银识别器' },
  };

  const FOOTER_COLS = [
    {
      title: 'nav_calculators',
      links: [
        { label: 'nav_melt_value', href: '/silver-melt-value-calculator/' },
        { label: 'nav_sterling', href: '/sterling-silver-calculator/' },
        { label: 'nav_junk', href: '/junk-silver-calculator/' },
        { label: 'nav_gold_silver', href: '/gold-and-silver-calculator/' },
        { label: 'nav_coins', href: '/silver-coin-value-calculator/' },
        { label: 'nav_bar', href: '/silver-bar-value-calculator/' },
        { label: 'nav_jewelry', href: '/silver-jewelry-value-calculator/' },
        { label: 'nav_silverware', href: '/silverware-value-calculator/' },
      ]
    },
    {
      title: 'nav_purity',
      links: [
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
      title: 'nav_tools',
      links: [
        { label: 'nav_profit', href: '/silver-profit-calculator/' },
        { label: 'nav_batch', href: '/silver-batch-calculator/' },
        { label: 'nav_sona_chandi', href: '/sona-chandi-calculator/' },
        { label: 'nav_face_value', href: '/face-value-silver-calculator/' },
        { label: 'nav_weight', href: '/silver-weight-converter/' },
        { label: 'nav_sell_hold', href: '/silver-sell-or-hold/' },
        { label: 'nav_identifier', href: '/identify-silver/' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'nav_guide', href: '/how-to-use-silver-calculators/' },
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
  }

  function getRelativePrefix() {
    const path = window.location.pathname;
    const langMatch = path.match(/\/(ar|de|es|fr|hi|it|pt|ru|tr|ur|zh)([/?#]|$)/);
    return langMatch ? '../' : './';
  }

  function getBasePath() {
    const currentLang = getLangCode();
    if (isLocal()) return getRelativePrefix() + 'index.html';
    return currentLang === 'en' ? '/' : `/${currentLang}/`;
  }

  function getLangCode() {
    const path = window.location.pathname;
    const langMatch = path.match(/\/(ar|de|es|fr|hi|it|pt|ru|tr|ur|zh)([/?#]|$)/);
    return langMatch ? langMatch[1] : 'en';
  }

  function t(text) {
    if (!window.MenuTranslations) return text;
    const lang = getLangCode();
    if (window.MenuTranslations[lang] && window.MenuTranslations[lang][text]) {
      return window.MenuTranslations[lang][text];
    }
    return text;
  }

  function tl(key) {
    const lang = getLangCode();
    if (NAV_LABELS[key]) {
        return NAV_LABELS[key][lang] || NAV_LABELS[key]['en'] || key;
    }
    return t(key);
  }

  function s(href) {
    if (!href || href === '#') return '#';
    if (href.startsWith('http')) return href;

    const currentLang = getLangCode();
    
    // Normalize target
    let target = href.split('?')[0].split('#')[0].replace(/^\/|\/$/g, '').replace(/\.html$/, '');
    if (target === '' || target === 'index') {
      if (currentLang === 'en') return isLocal() ? getRelativePrefix() + 'index.html' : '/';
      return isLocal() ? './index.html' : `/${currentLang}/`;
    }

    // Resolve localized slug
    let localizedTarget = target;
    if (currentLang !== 'en' && window.MenuTranslations && window.MenuTranslations.slugs) {
        const mapping = window.MenuTranslations.slugs[target];
        if (mapping && mapping[currentLang]) {
            localizedTarget = mapping[currentLang];
        }
    }

    if (isLocal()) {
      const prefix = getRelativePrefix();
      return prefix + (currentLang === 'en' ? '' : currentLang + '/') + localizedTarget + '.html';
    }

    if (currentLang === 'en') return '/' + target + '/';
    return `/${currentLang}/${localizedTarget}/`;
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
    const bp = getBasePath();
    const currentLang = getLangCode();

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
    let pageSlug = (pathParts[currentLang === 'en' ? 0 : 1] || '').replace(/\.html$/, '');
    if (!pageSlug || pageSlug === 'index') pageSlug = 'index';
    
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
        let slug = englishBaseSlug;
        if (targetLang !== 'en' && window.MenuTranslations && window.MenuTranslations.slugs) {
            const mapping = window.MenuTranslations.slugs[englishBaseSlug];
            if (mapping && mapping[targetLang]) {
                slug = mapping[targetLang];
            }
        }

        if (isLocal()) {
            const prefix = getRelativePrefix();
            if (targetLang === 'en') return prefix + (slug === 'index' ? 'index' : slug) + '.html';
            return prefix + targetLang + '/' + (slug === 'index' ? 'index' : slug) + '.html';
        }

        if (targetLang === 'en') return (slug === 'index') ? '/' : `/${slug}/`;
        return (slug === 'index') ? `/${targetLang}/` : `/${targetLang}/${slug}/`;
    };

    const langMenuHTML = languages.map(l => {
        return `<a href="${generateLangHref(l.code)}" class="${currentLang===l.code?'active':''}">${l.label}</a>`;
    }).join('');

    const navItemsHTML = NAV_ITEMS.map(item => {
        if (item.dropdown) {
            return `
                <div class="nav-dropdown">
                    <div class="nav-link nav-dropdown-trigger">${tl(item.label)} <span style="font-size:8px;opacity:0.6;margin-left:4px;">▼</span></div>
                    <div class="nav-dropdown-menu">
                        ${item.dropdown.map(d => `<a href="${s(d.href)}">${tl(d.label)}</a>`).join('')}
                    </div>
                </div>`;
        }
        return `<a href="${s(item.href)}" class="nav-link">${tl(item.label)}</a>`;
    }).join('');

    el.innerHTML = `
      <header class="main-header" id="main-header">
        <div class="container header-container">
          <a href="${bp}" class="header-logo">
            <div class="logo-icon">◈</div>
            <div class="logo-text">
                <span class="logo-main">Scrap Silver</span>
                <span class="logo-sub">Calculator</span>
            </div>
          </a>

          <nav class="desktop-nav">
            ${navItemsHTML}
          </nav>

          <div class="header-actions">
            <div class="nav-dropdown">
                <div class="nav-link nav-dropdown-trigger" style="font-weight:700;color:var(--accent2);">${currentLang.toUpperCase()}</div>
                <div class="nav-dropdown-menu lang-menu">
                    ${langMenuHTML}
                </div>
            </div>
            <button class="mobile-menu-btn" id="mobile-toggle">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      <div class="mobile-nav" id="mobile-nav">
        <div class="mobile-nav-content">
            <div style="padding:20px; display:flex; flex-direction:column; gap:8px;">
                ${NAV_ITEMS.map(item => {
                    if (item.dropdown) {
                        return `
                            <div style="margin-bottom:12px;">
                                <div style="font-size:11px;font-weight:800;color:var(--muted);text-transform:uppercase;margin-bottom:8px;padding-left:12px;">${tl(item.label)}</div>
                                ${item.dropdown.map(d => `<a href="${s(d.href)}" class="nav-link" style="padding-left:24px;">${tl(d.label)}</a>`).join('')}
                            </div>`;
                    }
                    return `<a href="${s(item.href)}" class="nav-link">${tl(item.label)}</a>`;
                }).join('')}
                <hr style="border:none;border-top:1px solid var(--border);margin:12px 0;">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                    ${languages.map(l => `<a href="${generateLangHref(l.code)}" class="nav-link ${currentLang===l.code?'active':''}" style="font-size:12px;text-align:center;">${l.label}</a>`).join('')}
                </div>
            </div>
        </div>
      </div>
    `;

    // Dropdown Logic
    el.querySelectorAll('.nav-dropdown-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const menu = trigger.nextElementSibling;
            const isOpen = menu.classList.contains('open');
            // Close others
            el.querySelectorAll('.nav-dropdown-menu.open').forEach(m => m.classList.remove('open'));
            if (!isOpen) menu.classList.add('open');
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown-menu')) {
            el.querySelectorAll('.nav-dropdown-menu.open').forEach(m => m.classList.remove('open'));
        }
    });

    // Mobile Toggle
    const mobBtn = el.querySelector('#mobile-toggle');
    const mobNav = el.querySelector('#mobile-nav');
    if (mobBtn && mobNav) {
        mobBtn.addEventListener('click', () => {
            mobBtn.classList.toggle('active');
            mobNav.classList.toggle('active');
            document.body.style.overflow = mobNav.classList.contains('active') ? 'hidden' : '';
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
        <h4>${tl(col.title)}</h4>
        ${col.links.map(l => `<a href="${s(l.href)}">${tl(l.label)}</a>`).join('')}
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
      faqSec.style.marginTop = '40px';
      faqSec.innerHTML = `<h3 style="margin-bottom:20px;">${t('Frequently Asked Questions')}</h3>` + 
        faqs.map(f => `
          <div class="faq-item" style="margin-bottom:16px; border-bottom:1px solid var(--border); padding-bottom:16px;">
            <div class="faq-q" style="font-weight:700; color:#fff; margin-bottom:8px; display:flex; gap:8px;">
              <span style="color:var(--accent);">Q:</span> ${f.q}
            </div>
            <div class="faq-a" style="color:var(--dim); font-size:14px; line-height:1.6;">
              ${f.a}
            </div>
          </div>
        `).join('');
      body.appendChild(faqSec);
    }
  }

  function renderLocalizedSections() {
    const currentLang = getLangCode();
    if (currentLang === 'en') return; 

    const stepsEl = document.getElementById('dynamic-steps');
    if (stepsEl) {
      stepsEl.innerHTML = `
        <section class="sec container">
          <div class="text-center" style="margin-bottom:40px;">
            <span class="hero-pill">${t('Simple Process')}</span>
            <h2 class="sec-title">${t('How It Works — 3 Simple Steps')}</h2>
          </div>
          <div class="cgrid">
            <div class="ccard" style="text-align: center;">
              <div class="ci" style="margin: 0 auto 16px;">1</div>
              <h3>${t('Weigh Your Silver')}</h3>
              <p>${t('Use a scale to weigh your silver in grams, troy ounces, or any unit.')}</p>
            </div>
            <div class="ccard" style="text-align: center;">
              <div class="ci" style="margin: 0 auto 16px;">2</div>
              <h3>${t('Select Purity')}</h3>
              <p>${t('Choose the purity — 925 for sterling, 900 for coin silver, or 999 for fine silver.')}</p>
            </div>
            <div class="ccard" style="text-align: center;">
              <div class="ci" style="margin: 0 auto 16px;">3</div>
              <h3>${t('Get Instant Value')}</h3>
              <p>${t('See the melt value based on live silver spot prices updated in real time.')}</p>
            </div>
          </div>
        </section>`;
    }

    const understandEl = document.getElementById('dynamic-understand');
    if (understandEl) {
      understandEl.innerHTML = `
        <section class="sec container" id="guide">
          <div>
            <span class="hero-pill">${t('Learn')}</span>
            <h2 class="sec-title">${t('What Is a Scrap Silver Calculator?')}</h2>
          </div>
          <div class="content-body">
            <p>${t('A scrap silver calculator determines the intrinsic melt value of a silver item — not its retail price or sentimental value. It answers: if you melted this item down to pure silver today, what would that metal be worth? Our engine utilizes real-time market data to provide the same valuation used by professional refineries.')}</p>
            <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:12px; border:1px solid var(--border); font-family:var(--f-mono); margin:24px 0; text-align:center;">Melt Value = (Weight × Purity) ÷ 31.1035 × Spot Price</div>
            <p>${t('Every calculation is performed with 4-point decimal precision — the same methodology used by major precious metals refineries and commodity trading desks worldwide.')}</p>
          </div>
        </section>`;
    }
  }

  function init() {
    renderHeader();
    renderFooter();
    renderLocalizedSections();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { renderHeader, renderFooter, renderPriceTicker, renderBreadcrumb, copyCalculation, toast, injectFAQSchema, init, getLangCode };
})();
