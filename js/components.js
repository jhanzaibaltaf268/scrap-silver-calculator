/* ============================================
   SHARED COMPONENTS (MASTERPIECE VERSION)
   Header, Navigation, Footer — injected via JS
   ============================================ */

const SiteComponents = (() => {
  /* ---- Navigation Structure ---- */
  const NAV_ITEMS = [
    { label: 'nav_home', href: '/' },
    {
      label: 'nav_silver_price', dropdown: [
        { label: 'nav_price_today',   href: '/silver-price-today/' },
        { label: 'nav_price_per_oz',  href: '/silver-price-per-ounce/' },
        { label: 'nav_925_price_today', href: '/925-silver-price-today/' },
        { label: 'nav_999_price_today', href: '/999-silver-price-today/' },
        { label: 'nav_900_price_today', href: '/900-silver-price-today/' },
        { label: 'nav_800_price_today', href: '/800-silver-price-today/' },
        { label: 'nav_silver_news_today', href: '/silver-news-today/' },
        { label: 'nav_price_forecast_today', href: '/silver-price-forecast-today/' },
      ]
    },
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
    nav_silver_price:  { en:'Silver Prices', es:'Precios Plata', fr:'Prix Argent', de:'Silberpreise', it:'Prezzi Argento', pt:'Preços Prata', ru:'Цены Серебра', ar:'أسعار الفضة', hi:'चाँदी भाव', ur:'چاندی قیمت', tr:'Gümüş Fiyatları', zh:'银价' },
    nav_price_today:   { en:'Silver Price Today', es:'Precio Hoy', fr:'Prix Aujourd\'hui', de:'Silberpreis Heute', it:'Prezzo Oggi', pt:'Preço Hoje', ru:'Цена Сегодня', ar:'سعر الفضة اليوم', hi:'आज का भाव', ur:'آج کی قیمت', tr:'Bugünkü Fiyat', zh:'今日银价' },
    nav_price_per_oz:  { en:'Price Per Ounce', es:'Precio Por Onza', fr:'Prix Par Once', de:'Preis Pro Unze', it:'Prezzo All\'Oncia', pt:'Preço Por Onça', ru:'Цена За Унцию', ar:'السعر للأوقية', hi:'प्रति औंस भाव', ur:'فی اونس قیمت', tr:'Ons Başına Fiyat', zh:'每盎司价格' },
    nav_current_price: { en:'Current Silver Price', es:'Precio Actual', fr:'Prix Actuel', de:'Aktueller Preis', it:'Prezzo Attuale', pt:'Preço Atual', ru:'Текущая Цена', ar:'السعر الحالي', hi:'मौजूदा भाव', ur:'موجودہ قیمت', tr:'Güncel Fiyat', zh:'当前银价' },
    nav_925_price_today: { en:'925 Silver Price Today', es:'Precio 925 Hoy', fr:'Prix 925 Aujourd\'hui', de:'925 Silberpreis Heute', it:'Prezzo 925 Oggi', pt:'Preço 925 Hoje', ru:'Цена 925 Сегодня', ar:'سعر الفضة 925 اليوم', hi:'925 चाँदी भाव आज', ur:'925 چاندی قیمت آج', tr:'925 Gümüş Fiyatı Bugün', zh:'925白银今日价格' },
    nav_999_price_today: { en:'999 Pure Silver Price Today', es:'Precio 999 Puro Hoy', fr:'Prix 999 Pur Aujourd\'hui', de:'999 Reines Silber Heute', it:'Prezzo 999 Puro Oggi', pt:'Preço 999 Puro Hoje', ru:'Цена 999 Сегодня', ar:'سعر الفضة النقية 999 اليوم', hi:'999 शुद्ध चाँदी भाव आज', ur:'999 خالص چاندی قیمت آج', tr:'999 Saf Gümüş Fiyatı Bugün', zh:'999纯银今日价格' },
    nav_900_price_today: { en:'900 Coin Silver Price Today', es:'Precio Plata Moneda 900 Hoy', fr:'Prix Argent Pièce 900 Aujourd\'hui', de:'900 Münzsilber Preis Heute', it:'Prezzo Argento Moneta 900 Oggi', pt:'Preço Prata Moeda 900 Hoje', ru:'Цена монетного серебра 900 сегодня', ar:'سعر فضة العملة 900 اليوم', hi:'900 सिक्का चाँदी भाव आज', ur:'900 سکہ چاندی قیمت آج', tr:'900 Sikke Gümüş Fiyatı Bugün', zh:'900银币今日价格' },
    nav_800_price_today: { en:'800 Silver Price Today', es:'Precio Plata 800 Hoy', fr:'Prix Argent 800 Aujourd\'hui', de:'800 Silber Preis Heute', it:'Prezzo Argento 800 Oggi', pt:'Preço Prata 800 Hoje', ru:'Цена серебра 800 сегодня', ar:'سعر الفضة 800 اليوم', hi:'800 चाँदी भाव आज', ur:'800 چاندی قیمت آج', tr:'800 Gümüş Fiyatı Bugün', zh:'800银今日价格' },
    nav_silver_news_today: { en:'Silver News Today', es:'Noticias de Plata Hoy', fr:'Actualités Argent Aujourd\'hui', de:'Silbernachrichten Heute', it:'Notizie Argento Oggi', pt:'Notícias de Prata Hoje', ru:'Новости Серебра Сегодня', ar:'أخبار الفضة اليوم', hi:'चाँदी समाचार आज', ur:'چاندی خبریں آج', tr:'Gümüş Haberleri Bugün', zh:'今日白银新闻' },
    nav_price_forecast_today: { en:'Silver Price Forecast', es:'Pronóstico de Precios', fr:'Prévision des Prix', de:'Silberpreisprognose', it:'Previsione Prezzo', pt:'Previsão de Preço', ru:'Прогноз Цены', ar:'توقعات سعر الفضة', hi:'चाँदी भाव पूर्वानुमान', ur:'چاندی قیمت پیش گوئی', tr:'Gümüş Fiyat Tahmini', zh:'白银价格预测' },
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
        { label: 'nav_coins', href: '/silver-coin-value-calculator/' },
        { label: 'nav_bar', href: '/silver-bar-value-calculator/' },
      ]
    },
    {
      title: 'nav_silver_price',
      links: [
        { label: 'nav_price_today', href: '/silver-price-today/' },
        { label: 'nav_price_per_oz', href: '/silver-price-per-ounce/' },
        { label: 'nav_925_price_today', href: '/925-silver-price-today/' },
        { label: 'nav_999_price_today', href: '/999-silver-price-today/' },
        { label: 'nav_silver_news_today', href: '/silver-news-today/' },
      ]
    },
    {
      title: 'nav_guide',
      links: [
        { label: 'nav_guide', href: '/how-to-use-silver-calculators/' },
        { label: 'nav_purity_chart', href: '/silver-purity-chart/' },
        { label: 'nav_identifier', href: '/identify-silver/' },
        { label: 'How to Sell Silver', href: '/how-to-sell-silver/' },
        { label: 'About', href: '/about/' },
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

    // Resolve localized slug — fall back to English URL if no localized version exists
    let localizedTarget = target;
    let hasLocalizedSlug = false;
    if (currentLang !== 'en' && window.MenuTranslations && window.MenuTranslations.slugs) {
        const mapping = window.MenuTranslations.slugs[target];
        if (mapping && mapping[currentLang]) {
            localizedTarget = mapping[currentLang];
            hasLocalizedSlug = true;
        }
    }

    if (isLocal()) {
      const prefix = getRelativePrefix();
      return prefix + (currentLang === 'en' ? '' : currentLang + '/') + localizedTarget + '.html';
    }

    if (currentLang === 'en') return '/' + target + '/';
    // If no localized slug exists, link to the English page to avoid 404
    if (!hasLocalizedSlug) return '/' + target + '/';
    return `/${currentLang}/${localizedTarget}/`;
  }

  function getCurrentPage() {
    const path = window.location.pathname;
    const raw = path.split('/').filter(p => p).pop() || '';
    let part; try { part = decodeURIComponent(raw); } catch(e) { part = raw; }
    return part.replace(/\.html$/, '') || 'index';
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
    let rawSlug = (pathParts[currentLang === 'en' ? 0 : 1] || '').replace(/\.html$/, '');
    let pageSlug; try { pageSlug = decodeURIComponent(rawSlug); } catch(e) { pageSlug = rawSlug; }
    if (!pageSlug || pageSlug === 'index') pageSlug = 'index';

    let englishBaseSlug = pageSlug;
    if (currentLang !== 'en' && window.MenuTranslations && window.MenuTranslations.slugs) {
        for (const [en, locs] of Object.entries(window.MenuTranslations.slugs)) {
            const locSlug = locs[currentLang];
            if (locSlug && (locSlug === pageSlug || locSlug.toLowerCase() === pageSlug.toLowerCase())) {
                englishBaseSlug = en;
                break;
            }
        }
    }

    const generateLangHref = (targetLang) => {
        // For English, always use the English base slug
        let slug = englishBaseSlug;
        if (targetLang !== 'en' && window.MenuTranslations && window.MenuTranslations.slugs) {
            const mapping = window.MenuTranslations.slugs[englishBaseSlug];
            if (mapping && mapping[targetLang]) {
                slug = mapping[targetLang];
            } else {
                // Fallback: use English slug (not current localized slug) to avoid cross-language 404s
                slug = englishBaseSlug;
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
        return `<a href="${generateLangHref(l.code)}" class="${currentLang===l.code?'active':''}" title="${l.label}">${l.label}</a>`;
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
            <div class="nav-dropdown lang-switcher-wrap">
                <div class="nav-link nav-dropdown-trigger lang-trigger" title="Switch language">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg><span style="font-weight:700;color:var(--accent2);font-size:11px;vertical-align:middle;">${currentLang.toUpperCase()}</span>
                </div>
                <div class="nav-dropdown-menu lang-menu">
                    ${langMenuHTML}
                </div>
            </div>
            <button class="mobile-menu-btn" id="mobile-toggle" aria-label="Open menu">
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
            mobNav.classList.toggle('open');
            document.body.style.overflow = mobNav.classList.contains('open') ? 'hidden' : '';
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
        <div class="footer-top-bar"></div>
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a href="${bp}" class="footer-logo">
                <div class="footer-logo-mark">◈</div>
                <div><div class="footer-logo-name">Scrap Silver</div><div class="footer-logo-sub">Calculator</div></div>
              </a>
              <p class="footer-tagline">${t('Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.')}</p>
              <div class="footer-trust">
                <span class="footer-trust-badge"><span class="ldot" style="display:inline-block;margin-right:5px;"></span>${t('Live Prices')}</span>
                <span class="footer-trust-badge">🔒 ${t('100% Free')}</span>
                <span class="footer-trust-badge">⚡ ${t('Instant')}</span>
              </div>
            </div>
            ${colsHTML}
          </div>
          <div class="footer-bottom">
            <span class="footer-copy">&copy; ${new Date().getFullYear()} Scrap Silver Calculator. ${t('All rights reserved.')}</span>
            <div class="footer-legal">
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

  function injectPageSchema() {
    if (document.querySelector('script[type="application/ld+json"]')) return;
    const title = document.title || '';
    const desc = (document.querySelector('meta[name="description"]') || {}).content || '';
    const url = (document.querySelector('link[rel="canonical"]') || {}).href || location.href;
    if (!title || !desc) return;
    const schema = { '@context': 'https://schema.org', '@type': 'WebPage', 'name': title, 'description': desc, 'url': url, 'inLanguage': document.documentElement.lang || 'en', 'isPartOf': { '@type': 'WebSite', 'name': 'Scrap Silver Calculator', 'url': 'https://scrapsilvercalculater.com/' } };
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(schema);
    document.head.appendChild(s);
  }

  function updateSpotPriceDisplay() {
    if (typeof SilverPrice === 'undefined') return;

    SilverPrice.onPriceUpdate(price => {
      // Update main hero spot price
      const heroSpot = document.getElementById('hero-spot');
      if (heroSpot) heroSpot.textContent = '$' + price.toFixed(2);

      // Update price change indicator
      const heroChange = document.getElementById('hero-change');
      if (heroChange) {
        const change = SilverPrice.getChange();
        const changePercent = SilverPrice.getChangePercent();
        if (change !== null && changePercent !== null) {
          const changeStr = change >= 0 ? '+' : '';
          const arrow = change >= 0 ? '↑' : '↓';
          const className = change >= 0 ? 'up' : 'down';
          heroChange.textContent = `${arrow} ${changeStr}${change.toFixed(2)} (${changeStr}${changePercent.toFixed(2)}%)`;
          heroChange.className = className;
        }
      }

      // Update FAQ spot price
      const qaSpot = document.getElementById('qa-spot');
      if (qaSpot) qaSpot.textContent = '$' + price.toFixed(2);

      // Update purity-specific prices
      const pricePerGram = SilverPrice.getPricePerGram();
      const pricePerOz = price;

      // Map purity codes to their fractions
      const purities = {
        '999': 0.999,
        '958': 0.958,
        '925': 0.925,
        '900': 0.900,
        '835': 0.835,
        '800': 0.800
      };

      // Update .live-num elements with IDs like int-925-g, int-925-oz, etc.
      for (const [code, factor] of Object.entries(purities)) {
        const gramEl = document.getElementById(`int-${code}-g`);
        if (gramEl) gramEl.textContent = '$' + (pricePerGram * factor).toFixed(2);

        const ozEl = document.getElementById(`int-${code}-oz`);
        if (ozEl) ozEl.textContent = '$' + (pricePerOz * factor).toFixed(2);
      }

      // Update ticker elements
      const priceTickerEl = document.getElementById('price-ticker');
      if (priceTickerEl) {
        priceTickerEl.innerHTML = `<div class="hero-pill" style="margin-bottom:12px;"><span class="ldot"></span>${t('LIVE SPOT')}: $${price.toFixed(2)}</div>`;
        priceTickerEl.classList.add('visible');
      }

      // Update ticker items for different purities (tick-999, tick-925, etc.)
      for (const code of ['999', '925', '900', '800']) {
        const tickEl = document.getElementById(`tick-${code}`);
        if (tickEl) {
          const purityPrice = (pricePerOz * (purities[code] || 1)).toFixed(2);
          tickEl.textContent = `$${purityPrice}/oz`;
        }
      }
    });
  }

  function renderChatWidget() {
    if (document.getElementById('sac-chat-bubble')) return;

    // Inject responsive styles
    var s = document.createElement('style');
    s.textContent = [
      '#sac-chat-widget-container{position:fixed;bottom:20px;right:20px;width:380px;height:520px;background:#fff;border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,0.22);display:none;flex-direction:column;font-family:system-ui,sans-serif;z-index:999999;overflow:hidden;}',
      '#sac-chat-header{background:linear-gradient(135deg,#a78bfa,#8b5cf6);color:#fff;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0;}',
      '#sac-chat-header h3{margin:0;font-size:16px;font-weight:700;}',
      '#sac-chat-header p{margin:3px 0 0;font-size:12px;opacity:.85;}',
      '#sac-close-widget{background:none;border:none;color:#fff;font-size:26px;cursor:pointer;padding:0;line-height:1;min-width:36px;min-height:36px;display:flex;align-items:center;justify-content:center;}',
      '#sac-messages-container{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;background:#f8f8fb;-webkit-overflow-scrolling:touch;}',
      '#sac-chat-input-row{border-top:1px solid #e5e7eb;padding:10px 12px;display:flex;gap:8px;background:#fff;flex-shrink:0;padding-bottom:calc(10px + env(safe-area-inset-bottom,0px));}',
      '#sac-message-input{flex:1;border:1px solid #d1d5db;border-radius:24px;padding:10px 16px;font-size:16px;outline:none;background:#f9fafb;min-width:0;}',
      '#sac-message-input:focus{border-color:#8b5cf6;}',
      '#sac-send-button{background:#8b5cf6;color:#fff;border:none;border-radius:24px;padding:10px 18px;cursor:pointer;font-weight:700;font-size:15px;white-space:nowrap;min-height:44px;}',
      '#sac-chat-bubble{position:fixed;bottom:24px;right:24px;height:52px;padding:0 24px;border-radius:26px;background:linear-gradient(135deg,#6d28d9,#4c1d95);color:#fff;border:none;cursor:pointer;box-shadow:0 4px 20px rgba(76,29,149,.6);display:flex;align-items:center;z-index:999998;font-family:system-ui,sans-serif;font-size:16px;font-weight:700;}',
      '@media(max-width:480px){',
        '#sac-chat-widget-container{bottom:0;right:0;left:0;width:100%;height:85vh;height:85dvh;border-radius:20px 20px 0 0;border-bottom-left-radius:0;border-bottom-right-radius:0;}',
        '#sac-chat-bubble{bottom:16px;right:16px;font-size:15px;height:48px;padding:0 20px;}',
      '}'
    ].join('');
    document.head.appendChild(s);

    var widget = document.createElement('div');
    widget.innerHTML =
      '<div id="sac-chat-widget-container">' +
        '<div id="sac-chat-header">' +
          '<div><h3>Silver Calculator AI</h3><p>Ask about silver values &amp; prices</p></div>' +
          '<button id="sac-close-widget" aria-label="Close">×</button>' +
        '</div>' +
        '<div id="sac-messages-container"></div>' +
        '<div id="sac-chat-input-row">' +
          '<input id="sac-message-input" type="text" placeholder="Ask about silver..." autocomplete="off" enterkeyhint="send">' +
          '<button id="sac-send-button">Send</button>' +
        '</div>' +
      '</div>' +
      '<button id="sac-chat-bubble">Ask AI</button>';
    document.body.appendChild(widget);

    var container = document.getElementById('sac-chat-widget-container');
    var bubble    = document.getElementById('sac-chat-bubble');
    var closeBtn  = document.getElementById('sac-close-widget');
    var sendBtn   = document.getElementById('sac-send-button');
    var input     = document.getElementById('sac-message-input');
    var msgs      = document.getElementById('sac-messages-container');

    function addMsg(text, isUser) {
      var d = document.createElement('div');
      d.style.cssText = isUser
        ? 'background:#8b5cf6;color:#fff;padding:10px 14px;border-radius:18px 18px 4px 18px;max-width:80%;align-self:flex-end;font-size:15px;line-height:1.5;white-space:pre-wrap;word-break:break-word;'
        : 'background:#fff;color:#1f2937;padding:10px 14px;border-radius:18px 18px 18px 4px;max-width:85%;align-self:flex-start;font-size:15px;line-height:1.5;box-shadow:0 1px 4px rgba(0,0,0,.1);white-space:pre-wrap;word-break:break-word;';
      d.textContent = text;
      msgs.appendChild(d);
      // Batch scrollTop with requestAnimationFrame to avoid forced reflow
      requestAnimationFrame(function() { msgs.scrollTop = 999999; });
      return d;
    }

    function open() {
      container.style.display = 'flex';
      bubble.style.display = 'none';
      requestAnimationFrame(function() { input.focus(); });
    }

    function close() {
      container.style.display = 'none';
      bubble.style.display = 'flex';
    }

    // Conversation history — last 6 turns for memory
    var _history = [];

    function getPageContext() {
      var ctx = { page: window.location.pathname };
      // Grab live spot price if available
      if (typeof SilverPrice !== 'undefined') {
        try { ctx.spotPrice = SilverPrice.getPrice(); } catch(e) {}
      }
      // Grab calculator result if on a page that has one
      var rv = document.getElementById('rv') || document.getElementById('result-value');
      if (rv && rv.textContent && rv.textContent !== '—' && rv.textContent !== '$0.00') {
        ctx.calculatedValue = rv.textContent;
      }
      // Grab purity/mode if available (homepage)
      if (window._calcState) {
        ctx.purity = window._calcState.purity;
        ctx.mode = window._calcState.mode;
      }
      return ctx;
    }

    async function send() {
      var msg = input.value.trim();
      if (!msg) return;
      input.value = '';
      addMsg(msg, true);
      var thinking = addMsg('Thinking…', false);
      sendBtn.disabled = true;

      _history.push({ role: 'user', content: msg });
      if (_history.length > 12) _history = _history.slice(-12);

      try {
        var res = await fetch('/api/silver-agent/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: msg,
            history: _history.slice(0, -1), // prior turns only
            context: getPageContext()
          })
        });
        var data = await res.json();
        var reply = data.message || data.reply || 'No response received.';
        thinking.textContent = reply;
        _history.push({ role: 'assistant', content: reply });
        if (_history.length > 12) _history = _history.slice(-12);
      } catch (e) {
        thinking.textContent = 'Connection error. Please try again.';
        _history.pop(); // remove failed user message
      } finally {
        sendBtn.disabled = false;
        msgs.scrollTop = 999999;
      }
    }

    // Question pool — rotated per visit so returning users see fresh prompts
    var ALL_QS = [
      { icon: '📈', text: 'Is now a good time to sell silver?' },
      { icon: '🏷️', text: 'How do dealers price scrap silver?' },
      { icon: '💰', text: 'How do I get the best payout for scrap?' },
      { icon: '🔮', text: 'Will silver prices rise this year?' },
      { icon: '⚖️', text: 'Should I sell or hold my silver?' },
      { icon: '🪙', text: 'Which silver coins are worth the most?' },
      { icon: '🏦', text: 'Where can I sell silver for the best price?' },
      { icon: '📊', text: 'What drives silver spot price up and down?' },
      { icon: '💎', text: 'Is 925 sterling worth selling as scrap?' },
      { icon: '🔍', text: 'How do I know if my silver is genuine?' }
    ];

    // Pick 3 unseen questions, cycling through the pool via localStorage
    function pickQuestions() {
      var seen = [];
      try { seen = JSON.parse(localStorage.getItem('sac_seen') || '[]'); } catch(e) {}
      var unseen = ALL_QS.map(function(_,i){ return i; }).filter(function(i){ return seen.indexOf(i) === -1; });
      if (unseen.length < 3) { seen = []; unseen = ALL_QS.map(function(_,i){ return i; }); }
      var picked = unseen.slice(0, 3);
      try { localStorage.setItem('sac_seen', JSON.stringify(seen.concat(picked))); } catch(e) {}
      return picked.map(function(i){ return ALL_QS[i]; });
    }

    // Is this a returning visitor?
    var visitCount = 0;
    try { visitCount = parseInt(localStorage.getItem('sac_visits') || '0', 10); localStorage.setItem('sac_visits', visitCount + 1); } catch(e) {}
    var isReturning = visitCount > 0;

    var pickedQs = pickQuestions();

    // Build chips popup card
    var chipsEl = document.createElement('div');
    chipsEl.id = 'sac-chips';
    chipsEl.style.cssText = 'position:fixed;bottom:88px;right:20px;width:272px;z-index:999997;opacity:0;transform:translateY(8px);transition:opacity .3s ease,transform .3s ease;pointer-events:none;font-family:system-ui,sans-serif;';
    chipsEl.innerHTML =
      '<div style="background:#1e1b2e;border:1px solid rgba(139,92,246,.35);border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,.55);overflow:hidden;">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px 8px;border-bottom:1px solid rgba(255,255,255,.06);">' +
          '<span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:rgba(255,255,255,.4);">Ask the AI</span>' +
          '<button id="sac-chips-close" style="background:none;border:none;color:rgba(255,255,255,.35);font-size:18px;cursor:pointer;line-height:1;padding:0;width:20px;height:20px;display:flex;align-items:center;justify-content:center;">&times;</button>' +
        '</div>' +
        '<div style="padding:8px 10px 10px;">' +
          pickedQs.map(function(q) {
            return '<button style="display:flex;align-items:center;gap:9px;width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:9px 12px;font-size:13px;color:rgba(255,255,255,.85);cursor:pointer;text-align:left;margin-bottom:6px;transition:background .15s;" data-q="'+q.text+'" onmouseover="this.style.background=\'rgba(139,92,246,.2)\'" onmouseout="this.style.background=\'rgba(255,255,255,.05)\'"><span style="font-size:16px;flex-shrink:0;">'+q.icon+'</span><span>'+q.text+'</span></button>';
          }).join('') +
        '</div>' +
        '<div style="width:16px;height:10px;position:absolute;bottom:-10px;right:30px;overflow:hidden;">' +
          '<div style="width:16px;height:16px;background:#1e1b2e;border:1px solid rgba(139,92,246,.35);transform:rotate(45deg);margin-top:-8px;margin-left:0;"></div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(chipsEl);

    function showChips() { chipsEl.style.opacity='1'; chipsEl.style.transform='translateY(0)'; chipsEl.style.pointerEvents='auto'; }
    function hideChips() { chipsEl.style.opacity='0'; chipsEl.style.transform='translateY(8px)'; chipsEl.style.pointerEvents='none'; }

    document.getElementById('sac-chips-close').addEventListener('click', function(e) { e.stopPropagation(); hideChips(); });

    // Returning users: show chips after 8s (they know the site, just prompt)
    // New users: chips appear after post-calc trigger or after 15s idle
    if (isReturning) {
      setTimeout(function() { if (bubble.style.display !== 'none') showChips(); }, 8000);
    } else {
      setTimeout(function() { if (bubble.style.display !== 'none') showChips(); }, 15000);
    }

    chipsEl.querySelectorAll('button[data-q]').forEach(function(chip) {
      chip.addEventListener('click', function() {
        hideChips();
        open();
        setTimeout(function() { input.value = chip.dataset.q; send(); }, 300);
      });
    });

    function openWithQuestion(q) {
      if (container.style.display === 'flex') return;
      hideChips();
      open();
      setTimeout(function() { input.value = q; send(); }, 350);
    }

    bubble.addEventListener('click', function() { hideChips(); open(); });
    closeBtn.addEventListener('click', close);
    sendBtn.addEventListener('click', send);
    input.addEventListener('keypress', function(e) { if (e.key === 'Enter') send(); });
    addMsg('Hi! 👋 Ask me about scrap silver values, purity grades (925, 999, 900), or how to calculate silver melt value.', false);

    window.SACChat = { openWithQuestion: openWithQuestion, isReturning: isReturning };
  }

  function renderLeadCapture() {
    if (document.getElementById('sac-lead-overlay')) return;
    var FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdWn4DPNyUkxV3VDQ5bqaZ1wWIgATDcP5bFInLG2DYadBIP5A/formResponse';
    var overlay = document.createElement('div');
    overlay.id = 'sac-lead-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:1000000;display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif;';
    overlay.innerHTML =
      '<div style="background:white;border-radius:16px;padding:32px;width:90%;max-width:420px;box-shadow:0 20px 60px rgba(0,0,0,0.3);position:relative;">' +
        '<button id="sac-lead-close" style="position:absolute;top:12px;right:16px;background:none;border:none;font-size:22px;cursor:pointer;color:#6b7280;">×</button>' +
        '<div style="text-align:center;margin-bottom:20px;">' +
          '<div style="font-size:32px;margin-bottom:8px;">🪙</div>' +
          '<h2 style="margin:0 0 6px;font-size:20px;color:#1f2937;">Get Silver Price Alerts</h2>' +
          '<p style="margin:0;font-size:14px;color:#6b7280;">Leave your details and we\'ll keep you updated on silver prices.</p>' +
        '</div>' +
        '<div id="sac-lead-form">' +
          '<input id="sac-lead-name" type="text" placeholder="Full Name *" style="width:100%;box-sizing:border-box;border:1px solid #d1d5db;border-radius:8px;padding:11px 14px;font-size:14px;margin-bottom:10px;outline:none;" required/>' +
          '<input id="sac-lead-email" type="email" placeholder="Email Address *" style="width:100%;box-sizing:border-box;border:1px solid #d1d5db;border-radius:8px;padding:11px 14px;font-size:14px;margin-bottom:10px;outline:none;" required/>' +
          '<input id="sac-lead-phone" type="tel" placeholder="Phone Number *" style="width:100%;box-sizing:border-box;border:1px solid #d1d5db;border-radius:8px;padding:11px 14px;font-size:14px;margin-bottom:10px;outline:none;" required/>' +
          '<input id="sac-lead-whatsapp" type="tel" placeholder="WhatsApp Number (Optional)" style="width:100%;box-sizing:border-box;border:1px solid #d1d5db;border-radius:8px;padding:11px 14px;font-size:14px;margin-bottom:16px;outline:none;"/>' +
          '<button id="sac-lead-submit" style="width:100%;background:linear-gradient(135deg,#6d28d9,#4c1d95);color:white;border:none;border-radius:8px;padding:13px;font-size:15px;font-weight:700;cursor:pointer;">Submit →</button>' +
          '<p style="text-align:center;font-size:12px;color:#9ca3af;margin:10px 0 0;">No spam. Unsubscribe anytime.</p>' +
        '</div>' +
        '<div id="sac-lead-success" style="display:none;text-align:center;padding:20px 0;">' +
          '<div style="font-size:48px;margin-bottom:12px;">✅</div>' +
          '<h3 style="margin:0 0 8px;color:#1f2937;">Thank you!</h3>' +
          '<p style="margin:0;color:#6b7280;font-size:14px;">We\'ll be in touch with silver price updates.</p>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    function closeOverlay() { overlay.style.display = 'none'; }
    document.getElementById('sac-lead-close').addEventListener('click', closeOverlay);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) closeOverlay(); });

    document.getElementById('sac-lead-submit').addEventListener('click', function() {
      var name     = document.getElementById('sac-lead-name').value.trim();
      var email    = document.getElementById('sac-lead-email').value.trim();
      var phone    = document.getElementById('sac-lead-phone').value.trim();
      var whatsapp = document.getElementById('sac-lead-whatsapp').value.trim();
      if (!name || !email || !phone) {
        alert('Please fill in Name, Email and Phone.');
        return;
      }
      var body = new URLSearchParams();
      body.append('entry.2058238637', name);
      body.append('entry.1756944575', email);
      body.append('entry.1150577817', phone);
      body.append('entry.1174672913', whatsapp);
      fetch(FORM_URL, { method: 'POST', mode: 'no-cors', body: body });
      document.getElementById('sac-lead-form').style.display = 'none';
      document.getElementById('sac-lead-success').style.display = 'block';
      setTimeout(closeOverlay, 3000);
    });
  }

  /* ---- Dealer Payout Estimator ---- */
  function renderDealerPayout() {
    var path = window.location.pathname;
    // Skip pages that already show dealer info or have no single melt result
    if (path === '/' ||
        path.match(/\/(ar|de|es|fr|hi|it|pt|ru|tr|ur|zh)\/?$/) ||
        path.match(/silver-scrap-calculator|sell-or-hold|how-to-sell|silver-profit|price-today|price-per-gram|price-per-ounce|price-all-currencies|silver-price|purity-chart|hallmarks|identify|what-is|what-does|how-to|how-silver|about|privacy|terms/)) return;

    var lang = getLangCode();
    var isRTL = (lang === 'ar' || lang === 'ur');

    var BUYERS = [
      { icon:'🏭', label:'Online Refinery',   lo:0.90, hi:0.98, color:'#4ade80', note:'Best value — ships in 2–5 days' },
      { icon:'🪙', label:'Coin / Silver Dealer', lo:0.75, hi:0.90, color:'#a78bfa', note:'Same-day cash, good rates' },
      { icon:'💍', label:'Jewelry Store',     lo:0.65, hi:0.80, color:'#fbbf24', note:'Convenient, lower offers' },
      { icon:'🏦', label:'Pawn Shop',         lo:0.50, hi:0.70, color:'#f87171', note:'Fastest cash, lowest payout' }
    ];

    var headings = {
      en:'What dealers will actually pay', de:'Was Händler tatsächlich zahlen',
      es:'Lo que pagarán los dealers', fr:'Ce que les acheteurs paient vraiment',
      ar:'ما سيدفعه التجار فعلاً', hi:'डीलर वास्तव में क्या देंगे',
      ur:'ڈیلرز اصل میں کتنا دیں گے', it:'Quanto pagano realmente i dealer',
      pt:'O que os dealers realmente pagam', ru:'Что реально заплатят дилеры',
      tr:'Bayiler gerçekte ne kadar öder', zh:'经销商实际支付多少'
    };
    var sellLabel = {
      en:'How to get the best price →', de:'Besten Preis erzielen →',
      es:'Cómo obtener el mejor precio →', fr:'Comment obtenir le meilleur prix →',
      ar:'كيف تحصل على أفضل سعر →', hi:'सबसे अच्छी कीमत कैसे पाएं →',
      ur:'بہترین قیمت کیسے پائیں ←', it:'Come ottenere il miglior prezzo →',
      pt:'Como obter o melhor preço →', ru:'Как получить лучшую цену →',
      tr:'En iyi fiyatı nasıl alırsınız →', zh:'如何获得最佳价格 →'
    };
    var heading = headings[lang] || headings.en;
    var sellText = sellLabel[lang] || sellLabel.en;
    var sellHref = lang === 'en' ? '/how-to-sell-silver/' : '/' + lang + '/how-to-sell-silver/';

    function fmt(n) { return '$' + n.toFixed(2); }

    function buildPanel(melt) {
      if (!melt || melt <= 0) return '';
      var rows = BUYERS.map(function(b) {
        var lo = fmt(melt * b.lo);
        var hi = fmt(melt * b.hi);
        return '<div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.05);">' +
          '<span style="font-size:17px;width:24px;text-align:center;flex-shrink:0;">' + b.icon + '</span>' +
          '<span style="flex:1;min-width:0;">' +
            '<span style="display:block;font-size:13px;font-weight:600;color:#f0f4f8;">' + b.label + '</span>' +
            '<span style="display:block;font-size:11px;color:#8fa3bc;">' + b.note + '</span>' +
          '</span>' +
          '<span style="font-family:\'JetBrains Mono\',monospace;font-size:13px;font-weight:700;color:' + b.color + ';white-space:nowrap;text-align:right;">' +
            lo + ' – ' + hi +
          '</span>' +
        '</div>';
      }).join('');

      return '<div id="dealer-payout-panel" style="' +
        'margin-top:16px;padding:16px 18px;' +
        'background:rgba(15,15,26,.6);' +
        'border:1px solid rgba(255,255,255,.1);border-radius:14px;' +
        (isRTL ? 'direction:rtl;' : '') +
      '">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;gap:8px;flex-wrap:wrap;">' +
          '<span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#8fa3bc;">' + heading + '</span>' +
          '<a href="' + sellHref + '" style="font-size:11px;font-weight:700;color:#a78bfa;text-decoration:none;white-space:nowrap;">' + sellText + '</a>' +
        '</div>' +
        rows +
        '<div style="margin-top:10px;font-size:11px;color:#6b7280;' + (isRTL ? 'text-align:right;' : '') + '">' +
          '* Based on melt value of ' + fmt(melt) + '. Actual offers vary by quantity, condition and location.' +
        '</div>' +
      '</div>';
    }

    function getMeltValue() {
      // Try various result element IDs used across pages
      var selectors = ['#result-value', '#rv', '.res-val', '#total-value', '#r-melt'];
      for (var i = 0; i < selectors.length; i++) {
        var el = document.querySelector(selectors[i]);
        if (!el) continue;
        var txt = el.textContent.replace(/[^0-9.]/g, '');
        var val = parseFloat(txt);
        if (val > 0) return val;
      }
      return 0;
    }

    function refreshPanel() {
      var melt = getMeltValue();
      var existing = document.getElementById('dealer-payout-panel');
      if (melt <= 0) { if (existing) existing.remove(); return; }

      if (existing) {
        // Update in-place — rebuild inner content without removing the element
        existing.outerHTML = buildPanel(melt);
        return;
      }

      // Find anchor: inject after result-display or d-res
      var anchor = document.querySelector('.result-display, .d-res, #swc-results');
      if (!anchor) return;
      anchor.insertAdjacentHTML('afterend', buildPanel(melt));
    }

    // Observe main for any DOM/text changes (calc updates)
    var observer = new MutationObserver(function() { refreshPanel(); });
    var main = document.querySelector('main') || document.body;
    observer.observe(main, { subtree: true, characterData: true, childList: true });

    // Also run on first paint (auto-calc pages already have a value)
    setTimeout(refreshPanel, 600);
  }

  /* ---- Post-Calculation Next Step CTA ---- */
  function renderPostCalcCTA() {
    // Don't run on homepage or guide pages (no calculator)
    var path = window.location.pathname;
    if (path === '/' || path.match(/\/(ar|de|es|fr|hi|it|pt|ru|tr|ur|zh)\/?$/)) return;

    // Map URL patterns → contextual next steps
    var STEPS = {
      jewelry:    [
        { icon:'🍴', label:'Silverware Calculator',   href:'/silverware-value-calculator/',   desc:'Calculate your full set at once' },
        { icon:'💰', label:'Best Way to Sell',         href:'/how-to-sell-silver/',             desc:'Get the best dealer payout' },
        { icon:'📊', label:'Sell or Hold Analysis',    href:'/silver-sell-or-hold/',            desc:'Is now a good time?' }
      ],
      purity:     [
        { icon:'📊', label:'Purity Chart',             href:'/silver-purity-chart/',            desc:'Compare all purities side by side' },
        { icon:'♻️', label:'Scrap Calculator',          href:'/silver-scrap-calculator/',        desc:'Calculate any weight & purity' },
        { icon:'💰', label:'Best Way to Sell',         href:'/how-to-sell-silver/',             desc:'Maximize your payout' }
      ],
      weight:     [
        { icon:'📈', label:'Profit Calculator',        href:'/silver-profit-calculator/',       desc:'Track your buy vs sell price' },
        { icon:'📊', label:'Sell or Hold Analysis',    href:'/silver-sell-or-hold/',            desc:'Is this a good time to sell?' },
        { icon:'🧱', label:'Silver Bar Calculator',    href:'/silver-bar-value-calculator/',    desc:'Value any size bar' }
      ],
      coins:      [
        { icon:'🪙', label:'Junk Silver Calculator',   href:'/junk-silver-calculator/',         desc:'Value your full coin collection' },
        { icon:'💰', label:'Face Value Calculator',    href:'/face-value-silver-calculator/',   desc:'Compare face vs silver value' },
        { icon:'📊', label:'Sell or Hold Analysis',    href:'/silver-sell-or-hold/',            desc:'Is now a good time to sell?' }
      ],
      default:    [
        { icon:'📊', label:'Sell or Hold Analysis',    href:'/silver-sell-or-hold/',            desc:'Is this the right time to sell?' },
        { icon:'💰', label:'How to Sell Silver',       href:'/how-to-sell-silver/',             desc:'Get the best price from dealers' },
        { icon:'💲', label:'Price Per Gram Today',     href:'/silver-price-per-gram/',          desc:'Live silver price in your unit' }
      ]
    };

    function getSteps() {
      if (path.match(/ring|chain|necklace|bracelet|spoon|fork|knife|tray|cup|plate|jewelry|silverware/)) return STEPS.jewelry;
      if (path.match(/999|958|925|900|835|800.*calculator|purity/))  return STEPS.purity;
      if (path.match(/1oz|2oz|5oz|10oz|100oz|1kg|silver-value/))     return STEPS.weight;
      if (path.match(/dime|quarter|dollar|coin|junk|canadian/))      return STEPS.coins;
      return STEPS.default;
    }

    var steps = getSteps();
    var lang  = getLangCode();
    var isRTL = (lang === 'ar' || lang === 'ur');

    // Localize label strings lightly
    var headings = {
      en:'What would you like to do next?', es:'¿Qué deseas hacer a continuación?',
      de:'Was möchten Sie als nächstes tun?', fr:'Que souhaitez-vous faire ensuite?',
      ar:'ماذا تريد أن تفعل بعد ذلك؟', hi:'आगे क्या करना चाहेंगे?',
      ur:'آگے کیا کرنا چاہتے ہیں؟', it:'Cosa vuoi fare dopo?',
      pt:'O que você quer fazer a seguir?', ru:'Что вы хотите сделать дальше?',
      tr:'Sırada ne yapmak istersiniz?', zh:'您接下来想做什么？'
    };
    var heading = headings[lang] || headings.en;

    // Resolve hrefs for non-English pages (prefix with lang code)
    function resolveHref(href) {
      if (lang === 'en') return href;
      return '/' + lang + href;
    }

    var ctaHTML =
      '<div id="post-calc-cta" style="' +
        'margin-top:20px;padding:20px;' +
        'background:linear-gradient(135deg,rgba(124,58,237,.08),rgba(124,58,237,.04));' +
        'border:1px solid rgba(124,58,237,.2);border-radius:16px;' +
        'animation:pcta-in .35s ease both;' +
        (isRTL ? 'direction:rtl;text-align:right;' : '') +
      '">' +
        '<p style="margin:0 0 14px;font-size:12px;font-weight:700;text-transform:uppercase;' +
          'letter-spacing:.08em;color:#a78bfa;">' + heading + '</p>' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;">' +
          steps.map(function(step) {
            return '<a href="' + resolveHref(step.href) + '" style="' +
              'display:flex;align-items:flex-start;gap:10px;padding:13px 14px;' +
              'background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);' +
              'border-radius:10px;text-decoration:none;' +
              'transition:border-color .18s,background .18s;' +
              '" onmouseover="this.style.borderColor=\'rgba(124,58,237,.5)\';this.style.background=\'rgba(124,58,237,.1)\'" ' +
              'onmouseout="this.style.borderColor=\'rgba(255,255,255,.08)\';this.style.background=\'rgba(255,255,255,.04)\'">' +
                '<span style="font-size:20px;flex-shrink:0;line-height:1.2;">' + step.icon + '</span>' +
                '<span>' +
                  '<span style="display:block;font-size:13px;font-weight:700;color:#f0f4f8;margin-bottom:2px;">' + step.label + '</span>' +
                  '<span style="display:block;font-size:11px;color:#8fa3bc;">' + step.desc + '</span>' +
                '</span>' +
            '</a>';
          }).join('') +
        '</div>' +
      '</div>';

    // Inject keyframe once
    if (!document.getElementById('__pcta_style')) {
      var ks = document.createElement('style');
      ks.id = '__pcta_style';
      ks.textContent = '@keyframes pcta-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}';
      document.head.appendChild(ks);
    }

    // Watch for a real result value appearing in result-display or .d-res
    var injected = false;
    function tryInject() {
      if (injected) return;
      // Find the result display element
      var resultDisplay = document.querySelector('.result-display, .d-res, #swc-results');
      if (!resultDisplay) return;
      // Check if there's a meaningful value shown
      var valEl = resultDisplay.querySelector('.result-value, #result-value, #rv, .res-val, #r-melt');
      if (!valEl) return;
      var txt = (valEl.textContent || '').replace(/[^0-9.]/g, '');
      if (!txt || parseFloat(txt) <= 0) return;
      // Don't inject if already exists
      if (document.getElementById('post-calc-cta')) return;
      injected = true;
      resultDisplay.insertAdjacentHTML('afterend', ctaHTML);
    }

    // Observe the main element for any text changes
    var observer = new MutationObserver(function() { tryInject(); });
    var main = document.querySelector('main') || document.body;
    observer.observe(main, { subtree: true, characterData: true, childList: true });

    // Also try immediately (for pages that auto-calculate on load)
    setTimeout(tryInject, 800);
  }

  function init() {
    renderHeader();
    renderFooter();
    renderLocalizedSections();
    injectPageSchema();
    updateSpotPriceDisplay();
    renderChatWidget();
    renderDealerPayout();
    renderPostCalcCTA();
    // Show lead capture popup 5 seconds after page load
    setTimeout(renderLeadCapture, 5000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { try { init(); } catch(e) { console.error('[SiteComponents] init error:', e); } });
  } else {
    requestAnimationFrame(function() { try { init(); } catch(e) { console.error('[SiteComponents] init error:', e); } });
  }

  return { renderHeader, renderFooter, renderPriceTicker, renderBreadcrumb, copyCalculation, toast, injectFAQSchema, injectPageSchema, init, getLangCode, updateSpotPriceDisplay, renderDealerPayout, renderPostCalcCTA };
})();
