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
        { label: 'nav_price_today',          href: '/silver-price-today/' },
        { label: 'nav_price_per_gram_hoje',  href: '/silver-price-per-gram-today/', showForLangs: ['pt'] },
        { label: 'nav_925_price_today',      href: '/925-silver-price-today/' },
        { label: 'nav_999_price_today',      href: '/999-silver-price-today/' },
        { label: 'nav_silver_news_today',    href: '/silver-news-today/' },
        { label: 'nav_price_forecast_today', href: '/silver-price-forecast-today/' },
      ]
    },
    {
      label: 'nav_calculators', dropdown: [
        { label: 'nav_gold_silver', href: '/gold-and-silver-calculator/' },
        { label: 'nav_melt_value', href: '/silver-melt-value-calculator/', hideForLangs: ['pt'] },
        { label: 'nav_sterling', href: '/sterling-silver-calculator/' },
        { label: 'nav_junk', href: '/junk-silver-calculator/' },
        { label: 'nav_coins', href: '/silver-coin-value-calculator/' },
        { label: 'nav_bar', href: '/silver-bar-value-calculator/', hideForLangs: ['pt'] },
        { label: 'nav_jewelry', href: '/silver-jewelry-value-calculator/' },
        { label: 'nav_silverware', href: '/silverware-value-calculator/' },
      ]
    },
    {
      label: 'nav_purity', dropdown: [
        { label: 'nav_999',        href: '/999-silver-calculator/' },
        { label: 'nav_prata_950',  href: '/950-silver-calculator/', showForLangs: ['pt'] },
        { label: 'nav_958',        href: '/958-silver-calculator/', hideForLangs: ['pt'] },
        { label: 'nav_925',        href: '/925-silver-calculator/' },
        { label: 'nav_900',        href: '/900-silver-calculator/' },
        { label: 'nav_835',        href: '/835-silver-calculator/' },
        { label: 'nav_800',        href: '/800-silver-calculator/' },
        { label: 'nav_tipos_prata',href: '/silver-types-guide/',   showForLangs: ['pt'] },
        { label: 'nav_purity_chart', href: '/silver-purity-chart/' },
      ]
    },
    {
      label: 'nav_tools', dropdown: [
        { label: 'nav_profit',      href: '/silver-profit-calculator/', hideForLangs: ['pt'] },
        { label: 'nav_batch',       href: '/silver-batch-calculator/',  hideForLangs: ['pt'] },
        { label: 'nav_sona_chandi', href: '/sona-chandi-calculator/',   hideForLangs: ['pt'] },
        { label: 'nav_face_value',  href: '/face-value-silver-calculator/' },
        { label: 'nav_weight',      href: '/silver-weight-converter/' },
        { label: 'nav_pennyweight', href: '/pennyweight-calculator/',   hideForLangs: ['pt'] },
        { label: 'nav_tola',        href: '/tola-calculator/',          hideForLangs: ['pt'] },
        { label: 'nav_sell_hold',   href: '/silver-sell-or-hold/',      hideForLangs: ['pt'] },
        { label: 'nav_identifier',  href: '/identify-silver/' },
      ]
    },
    {
      label: 'nav_gold_metals', hideForLangs: ['pt'], dropdown: [
        { label: 'nav_gold_calc',        href: '/gold-melt-value-calculator/' },
        { label: 'nav_14k',              href: '/14k-gold-calculator/' },
        { label: 'nav_18k',              href: '/18k-gold-calculator/' },
        { label: 'nav_22k',              href: '/22k-gold-calculator/' },
        { label: 'nav_24k',              href: '/24k-gold-calculator/' },
        { label: 'nav_gold_price',       href: '/gold-price-today/' },
        { label: 'nav_platinum_calc',    href: '/platinum-calculator/' },
        { label: 'nav_palladium_calc',   href: '/palladium-calculator/' },
        { label: 'nav_metals_prices',    href: '/precious-metals-prices/' },
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
    nav_gold_metals:  { en:'Gold & Metals', es:'Oro y Metales', fr:'Or & Métaux', de:'Gold & Metalle', it:'Oro e Metalli', pt:'Ouro e Metais', ru:'Золото и Металлы', ar:'الذهب والمعادن', hi:'सोना और धातु', ur:'سونا اور دھاتیں', tr:'Altın ve Metaller', zh:'黄金和金属' },
    nav_gold_calc:    { en:'Gold Melt Value', es:'Valor Fundición Oro', fr:'Valeur Fonte Or', de:'Goldschmelzwert', it:'Valore Fusione Oro', pt:'Valor Fusão Ouro', ru:'Стоимость плавки золота', ar:'قيمة صهر الذهب', hi:'गोल्ड मेल्ट वैल्यू', ur:'گولڈ میلٹ ویلیو', tr:'Altın Erime Değeri', zh:'黄金熔化价值' },
    nav_14k:          { en:'14K Gold', es:'Oro 14K', fr:'Or 14K', de:'14K Gold', it:'Oro 14K', pt:'Ouro 14K', ru:'Золото 14K', ar:'ذهب 14K', hi:'14K सोना', ur:'14K سونا', tr:'14 Ayar Altın', zh:'14K黄金' },
    nav_18k:          { en:'18K Gold', es:'Oro 18K', fr:'Or 18K', de:'18K Gold', it:'Oro 18K', pt:'Ouro 18K', ru:'Золото 18K', ar:'ذهب 18K', hi:'18K सोना', ur:'18K سونا', tr:'18 Ayar Altın', zh:'18K黄金' },
    nav_22k:          { en:'22K Gold', es:'Oro 22K', fr:'Or 22K', de:'22K Gold', it:'Oro 22K', pt:'Ouro 22K', ru:'Золото 22K', ar:'ذهب 22K', hi:'22K सोना', ur:'22K سونا', tr:'22 Ayar Altın', zh:'22K黄金' },
    nav_24k:          { en:'24K Gold', es:'Oro 24K', fr:'Or 24K', de:'24K Gold', it:'Oro 24K', pt:'Ouro 24K', ru:'Золото 24K', ar:'ذهب 24K', hi:'24K सोना', ur:'24K سونا', tr:'24 Ayar Altın', zh:'24K黄金' },
    nav_gold_price:   { en:'Gold Price Today', es:'Precio del Oro Hoy', fr:'Prix de l\'Or Aujourd\'hui', de:'Goldpreis Heute', it:'Prezzo dell\'Oro Oggi', pt:'Preço do Ouro Hoje', ru:'Цена золота сегодня', ar:'سعر الذهب اليوم', hi:'आज सोने का भाव', ur:'آج سونے کی قیمت', tr:'Bugün Altın Fiyatı', zh:'今日黄金价格' },
    nav_platinum_calc:{ en:'Platinum Calculator', es:'Calculadora Platino', fr:'Calculateur Platine', de:'Platin Rechner', it:'Calcolatore Platino', pt:'Calculadora Platina', ru:'Калькулятор платины', ar:'حاسبة البلاتين', hi:'प्लेटिनम कैलकुलेटर', ur:'پلاٹینم کیلکولیٹر', tr:'Platin Hesaplayıcı', zh:'铂金计算器' },
    nav_palladium_calc:{ en:'Palladium Calculator', es:'Calculadora Paladio', fr:'Calculateur Palladium', de:'Palladium Rechner', it:'Calcolatore Palladio', pt:'Calculadora Paládio', ru:'Калькулятор палладия', ar:'حاسبة البلاديوم', hi:'पैलेडियम कैलकुलेटर', ur:'پیلیڈیم کیلکولیٹر', tr:'Paladyum Hesaplayıcı', zh:'钯计算器' },
    nav_metals_prices:{ en:'All Metals Prices', es:'Precios de Metales', fr:'Prix des Métaux', de:'Metallpreise', it:'Prezzi dei Metalli', pt:'Preços dos Metais', ru:'Цены на металлы', ar:'أسعار المعادن', hi:'धातुओं की कीमतें', ur:'دھاتوں کی قیمتیں', tr:'Metal Fiyatları', zh:'金属价格' },
    nav_price_per_gram_hoje: { en:'Silver Price Per Gram', pt:'Preço por Grama Hoje' },
    nav_prata_950:           { en:'950 Silver',            pt:'Prata 950' },
    nav_tipos_prata:         { en:'Silver Types',          pt:'Tipos de Prata' },
  };

  const FOOTER_COLS = [
    {
      title: 'nav_calculators',
      links: [
        { label: 'nav_melt_value', href: '/silver-melt-value-calculator/', hideForLangs: ['pt'] },
        { label: 'nav_sterling',   href: '/sterling-silver-calculator/' },
        { label: 'nav_junk',       href: '/junk-silver-calculator/' },
        { label: 'nav_coins',      href: '/silver-coin-value-calculator/' },
        { label: 'nav_bar',        href: '/silver-bar-value-calculator/', hideForLangs: ['pt'] },
        { label: 'nav_jewelry',    href: '/silver-jewelry-value-calculator/' },
        { label: 'nav_silverware', href: '/silverware-value-calculator/' },
      ]
    },
    {
      title: 'nav_silver_price',
      links: [
        { label: 'nav_price_today',       href: '/silver-price-today/' },
        { label: 'nav_925_price_today',   href: '/925-silver-price-today/' },
        { label: 'nav_999_price_today',   href: '/999-silver-price-today/' },
        { label: 'nav_silver_news_today', href: '/silver-news-today/' },
      ]
    },
    {
      title: 'nav_gold_metals',
      links: [
        { label: 'nav_gold_calc',      href: '/gold-melt-value-calculator/',  hideForLangs: ['pt'] },
        { label: 'nav_14k',            href: '/14k-gold-calculator/',          hideForLangs: ['pt'] },
        { label: 'nav_18k',            href: '/18k-gold-calculator/',          hideForLangs: ['pt'] },
        { label: 'nav_platinum_calc',  href: '/platinum-calculator/',          hideForLangs: ['pt'] },
        { label: 'nav_palladium_calc', href: '/palladium-calculator/',         hideForLangs: ['pt'] },
      ]
    },
    {
      title: 'nav_guide',
      links: [
        { label: 'Scrap Silver Melt Value Guide', href: '/scrap-silver-melt-value-guide/' },
        { label: 'nav_guide', href: '/how-to-use-silver-calculators/' },
        { label: 'nav_purity_chart', href: '/silver-purity-chart/' },
        { label: 'nav_identifier', href: '/identify-silver/' },
        { label: 'How to Sell Silver', href: '/how-to-sell-silver/' },
        { label: 'About', href: '/about/' },
      ]
    }
  ];

  // Fallback slug mappings used when translations.js is not loaded (e.g. standalone German pages)
  if (!window.MenuTranslations) window.MenuTranslations = {};
  if (!window.MenuTranslations.slugs) {
    window.MenuTranslations.slugs = {
      // Silver price pages
      'silver-price-today':          { de:'silberpreis-heute', es:'precio-plata-hoy', fr:'prix-argent-aujourd-hui', it:'prezzo-argento-oggi', pt:'preco-prata-hoje', tr:'gumus-fiyati-bugun', ru:'цена-серебра-сегодня', zh:'今日银价', ar:'سعر-الفضة-اليوم', hi:'aaj-ka-chandi-bhav', ur:'aaj-chandi-ki-qeemat' },
      'silver-price-per-ounce':      { de:'silberpreis-pro-unze', es:'precio-plata-por-onza', fr:'prix-argent-par-once', it:'prezzo-argento-per-oncia', pt:'preco-prata-por-onca', tr:'ons-basi-gumus-fiyati', ru:'цена-серебра-за-унцию', zh:'每盎司银价', ar:'سعر-الفضة-للأوقية', hi:'chandi-bhav-per-ounce', ur:'chandi-qeemat-fi-ounce' },
      'silver-price-per-gram':       { de:'silberpreis-pro-gramm' },
      'silver-news-today':           { de:'silbernachrichten-heute', es:'noticias-plata-hoy', fr:'actualites-argent-aujourd-hui', it:'notizie-argento-oggi', pt:'noticias-prata-hoje', tr:'gumus-haberleri-bugun', ru:'новости-серебра-сегодня', zh:'今日白银新闻', ar:'أخبار-الفضة-اليوم', hi:'chandi-samachar-aaj', ur:'chandi-khabar-aaj' },
      'silver-price-forecast-today': { de:'silberpreis-prognose', es:'pronostico-precio-plata', fr:'prevision-prix-argent', it:'previsione-prezzo-argento', pt:'previsao-preco-prata', tr:'gumus-fiyat-tahmini', ru:'прогноз-цены-серебра', zh:'白银价格预测', ar:'توقعات-سعر-الفضة', hi:'chandi-bhav-purvanuman', ur:'chandi-qeemat-peshgoi' },
      // Purity price pages
      '999-silver-price-today': { de:'999-feinsilber-preis-heute', es:'999-plata-fina-precio-hoy', fr:'999-argent-pur-prix-aujourd-hui', it:'999-argento-puro-prezzo-oggi', pt:'999-prata-fina-preco-hoje', tr:'999-saf-gumus-fiyati-bugun', ru:'999-чистое-серебро-цена-сегодня', zh:'999纯银今日价格', ar:'سعر-الفضة-الخالصة-999-اليوم', hi:'999-shudh-chandi-bhav-aaj', ur:'999-khalis-chandi-qeemat-aaj' },
      '925-silver-price-today': { de:'925-sterlingsilber-preis-heute', es:'925-plata-precio-hoy', fr:'925-argent-sterling-prix-aujourd-hui', it:'925-argento-sterling-prezzo-oggi', pt:'925-prata-preco-hoje', tr:'925-gumus-fiyati-bugun', ru:'925-серебро-цена-сегодня', zh:'925银今日价格', ar:'سعر-الفضة-925-اليوم', hi:'925-chandi-bhav-aaj', ur:'925-chandi-qeemat-aaj' },
      '900-silver-price-today': { de:'900-muenzsilber-preis-heute', es:'900-plata-moneda-precio-hoy', fr:'900-argent-monnaie-prix-aujourd-hui', it:'900-argento-moneta-prezzo-oggi', pt:'900-prata-moeda-preco-hoje', tr:'900-sikke-gumus-fiyati-bugun', ru:'900-монетное-серебро-цена-сегодня', zh:'900银币今日价格', ar:'سعر-فضة-العملة-900-اليوم', hi:'900-sikka-chandi-bhav-aaj', ur:'900-sikka-chandi-qeemat-aaj' },
      '800-silver-price-today': { de:'800-silber-preis-heute', es:'800-plata-precio-hoy', fr:'800-argent-prix-aujourd-hui', it:'800-argento-prezzo-oggi', pt:'800-prata-preco-hoje', tr:'800-gumus-fiyati-bugun', ru:'800-серебро-цена-сегодня', zh:'800银今日价格', ar:'سعر-الفضة-800-اليوم', hi:'800-chandi-bhav-aaj', ur:'800-chandi-qeemat-aaj' },
      // Calculators
      'silver-melt-value-calculator':   { de: 'silber-schmelzwert-rechner' },
      'sterling-silver-calculator':     { de: 'sterlingsilber-rechner' },
      'junk-silver-calculator':         { de: 'billon-silber-rechner' },
      'silver-coin-value-calculator':   { de: 'silbermuenzen-wert-rechner' },
      'silver-bar-value-calculator':    { de: 'silberbarren-wert-rechner' },
      'silver-jewelry-value-calculator':{ de: 'silberschmuck-wert-rechner' },
      'silverware-value-calculator':    { de: 'silberbesteck-wert-rechner' },
      'gold-and-silver-calculator':     { de: 'gold-und-silber-rechner' },
      // Purity calculators
      '999-silver-calculator': { de: '999-feinsilber-rechner' },
      '925-silver-calculator': { de: '925-sterlingsilber-rechner' },
      '900-silver-calculator': { de: '900-muenzsilber-rechner' },
      '800-silver-calculator': { de: '800-silber-rechner' },
      '835-silver-calculator': { de: '835-silber-rechner' },
      // Tools
      'silver-profit-calculator':  { de: 'silber-gewinn-rechner' },
      'silver-weight-converter':   { de: 'silber-gewichtsumrechner' },
      'silver-purity-chart':       { de: 'silber-reinheitstabelle' },
      'identify-silver':           { de: 'silber-identifizieren' },
      'how-to-sell-silver':        { de: 'wie-man-silber-verkauft' },
      'how-to-use-silver-calculators': { de: 'wie-man-silberrechner-verwendet' }
    };
  }

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
        let hasLocalizedVersion = false;
        if (targetLang !== 'en' && window.MenuTranslations && window.MenuTranslations.slugs) {
            const mapping = window.MenuTranslations.slugs[englishBaseSlug];
            if (mapping && mapping[targetLang]) {
                slug = mapping[targetLang];
                hasLocalizedVersion = true;
            }
        }

        if (isLocal()) {
            const prefix = getRelativePrefix();
            if (targetLang === 'en') return prefix + (slug === 'index' ? 'index' : slug) + '.html';
            if (!hasLocalizedVersion && targetLang !== 'en') return prefix + targetLang + '/index.html';
            return prefix + targetLang + '/' + (slug === 'index' ? 'index' : slug) + '.html';
        }

        if (targetLang === 'en') return (slug === 'index') ? '/' : `/${slug}/`;
        // If no localized version exists, go to language home to avoid 404
        if (!hasLocalizedVersion && slug !== 'index') return `/${targetLang}/`;
        return (slug === 'index') ? `/${targetLang}/` : `/${targetLang}/${slug}/`;
    };

    const langMenuHTML = languages.map(l => {
        return `<a href="${generateLangHref(l.code)}" class="${currentLang===l.code?'active':''}" title="${l.label}">${l.label}</a>`;
    }).join('');

    const navItemsHTML = NAV_ITEMS.map(item => {
        if (item.hideForLangs && item.hideForLangs.includes(currentLang)) return '';
        if (item.showForLangs && !item.showForLangs.includes(currentLang)) return '';
        if (item.dropdown) {
            const visibleItems = item.dropdown.filter(d => {
                if (d.hideForLangs && d.hideForLangs.includes(currentLang)) return false;
                if (d.showForLangs && !d.showForLangs.includes(currentLang)) return false;
                return true;
            });
            if (visibleItems.length === 0) return '';
            return `
                <div class="nav-dropdown">
                    <div class="nav-link nav-dropdown-trigger">${tl(item.label)} <span style="font-size:8px;opacity:0.6;margin-left:4px;">▼</span></div>
                    <div class="nav-dropdown-menu">
                        ${visibleItems.map(d => `<a href="${s(d.href)}">${tl(d.label)}</a>`).join('')}
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
                    if (item.hideForLangs && item.hideForLangs.includes(currentLang)) return '';
                    if (item.showForLangs && !item.showForLangs.includes(currentLang)) return '';
                    if (item.dropdown) {
                        const visibleItems = item.dropdown.filter(d => {
                            if (d.hideForLangs && d.hideForLangs.includes(currentLang)) return false;
                            if (d.showForLangs && !d.showForLangs.includes(currentLang)) return false;
                            return true;
                        });
                        if (visibleItems.length === 0) return '';
                        return `
                            <div style="margin-bottom:12px;">
                                <div style="font-size:11px;font-weight:800;color:var(--muted);text-transform:uppercase;margin-bottom:8px;padding-left:12px;">${tl(item.label)}</div>
                                ${visibleItems.map(d => `<a href="${s(d.href)}" class="nav-link" style="padding-left:24px;">${tl(d.label)}</a>`).join('')}
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

    const footerLang = getLangCode();
    const colsHTML = FOOTER_COLS.map(col => {
      const visLinks = col.links.filter(l => !l.hideForLangs || !l.hideForLangs.includes(footerLang));
      if (visLinks.length === 0) return '';
      return `
      <div class="footer-col">
        <h4>${tl(col.title)}</h4>
        ${visLinks.map(l => `<a href="${s(l.href)}">${tl(l.label)}</a>`).join('')}
      </div>`;
    }).join('');

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

  /* ---- Auto FAQ database keyed by URL pattern ---- */
  function autoFAQs(path) {
    var db = [
      // Jewelry
      [/silver-ring/,         [{q:'How much is a silver ring worth?',a:'A typical sterling silver (925) ring weighs 3–12 grams. Enter the weight above for an instant live melt value at today\'s spot price.'},{q:'What hallmark means sterling silver on a ring?',a:'Look for 925, STERLING, or STER stamped inside the band. These all mean 92.5% pure silver.'},{q:'What will a dealer pay for a silver ring?',a:'Dealers pay 65–95% of melt value depending on buyer type. Online refineries offer the most. Calculate melt value above first.'}]],
      [/silver-chain/,        [{q:'How much is a silver chain worth?',a:'Chains weigh 5–60 grams depending on length and style. Enter the weight above for a live melt value based on today\'s spot price.'},{q:'Is a 925 chain real silver?',a:'Yes — 925 means sterling silver (92.5% pure). It is genuine silver, not plated.'},{q:'How do I weigh my silver chain?',a:'Use a digital scale accurate to 0.1g. Remove non-silver clasps if possible and enter the weight in the calculator above.'}]],
      [/silver-necklace/,     [{q:'How much is a silver necklace worth?',a:'Most silver necklaces are 925 sterling. Enter the weight in the calculator above for an instant live melt value.'},{q:'Does 925 on a necklace mean real silver?',a:'Yes. 925 is the hallmark for sterling silver — 92.5% pure silver, not plated.'},{q:'What will a pawn shop pay for a silver necklace?',a:'Pawn shops pay 50–70% of melt value. Use the calculator above to find melt, then expect 50–70% of that figure.'}]],
      [/silver-bracelet/,     [{q:'How much is a silver bracelet worth?',a:'Silver bracelets weigh 8–50 grams. Enter weight and purity above for the exact live melt value.'},{q:'How do I know if my bracelet is real silver?',a:'Look for 925, 800, or STERLING stamped on the clasp. Real silver is also non-magnetic.'},{q:'What do jewelers pay for silver bracelets?',a:'Jewelers typically offer 65–80% of melt value. Calculate melt above before accepting any offer.'}]],
      // Silverware
      [/silver-spoon/,        [{q:'How much is a silver spoon worth?',a:'A teaspoon weighs 20–30g; a tablespoon 40–60g. Enter the exact weight above for a live melt value.'},{q:'How do I tell real silver from silver-plated spoons?',a:'Check the back of the handle. 925 or STERLING = solid silver. EPNS, EP, or A1 = plated (minimal value).'},{q:'Where should I sell silver spoons?',a:'Online refineries pay 90–98% of melt. Antique dealers may pay more for complete sets or branded pieces.'}]],
      [/silver-fork/,         [{q:'How much is a silver fork worth?',a:'Silver forks typically weigh 25–50 grams. Enter the weight above for a live melt value.'},{q:'Is my silver fork real silver?',a:'Check the back of the handle. 925 or STERLING = solid silver. EPNS, EP = plated (nearly worthless as scrap).'},{q:'Where can I sell silver forks?',a:'Online refineries offer the best rates (90–98% of melt). Coin dealers also buy silver flatware.'}]],
      [/silver-knife/,        [{q:'Are silver knives real silver?',a:'Most silver knives have solid sterling handles but stainless steel blades. Only calculate the handle weight for scrap value.'},{q:'How much is a silver knife worth?',a:'Sterling knife handles weigh 30–50 grams of silver. Enter the handle weight above for a live melt value.'},{q:'Where is the hallmark on a silver knife?',a:'Check the bottom of the handle or the bolster. Look for 925, STERLING, 800, or STER.'}]],
      [/silver-tray/,         [{q:'How much is a silver tray worth?',a:'Silver trays are the heaviest household silver — typically 200–2000 grams. Enter the exact weight above for a live melt value.'},{q:'How do I check if a serving tray is solid silver?',a:'Check the underside for hallmarks: 925 or STERLING = solid silver. EPNS or Sheffield Plate = plated (very low value).'},{q:'Should I sell a silver tray as scrap or antique?',a:'If it carries a maker\'s mark (Gorham, Tiffany, Reed & Barton), get an antique appraisal first — it may be worth far more than melt.'}]],
      [/silver-cup/,          [{q:'How much is a silver cup worth?',a:'Silver cups weigh 50–300 grams. Enter weight and purity above for an exact live melt value.'},{q:'Are silver trophies real silver?',a:'Antique trophies often are. Look for 925 or STERLING hallmarks. Modern trophies are usually silver-plated.'},{q:'What will a dealer pay for a silver cup?',a:'Dealers pay 65–95% of melt value. Calculate melt above first, then compare quotes.'}]],
      [/silver-plate-value/,  [{q:'Is silver plate worth anything as scrap?',a:'Solid silver plates (925 or STERLING) are valuable. Silver-plated plates (EPNS, EP) have virtually no scrap value.'},{q:'How much does a solid silver dinner plate weigh?',a:'Solid sterling dinner plates typically weigh 200–400 grams — approximately $180–$370 in melt value at current prices.'},{q:'How do I tell solid silver from silver-plated?',a:'Check the underside for hallmarks. 925, STERLING, or 800 = solid silver. EP, EPNS, or Silver Plate = plated.'}]],
      // Coins
      [/silver-dime/,         [{q:'What years of dimes are silver?',a:'US dimes minted 1964 and earlier are 90% silver. Dimes from 1965 onward are copper-nickel clad with no silver.'},{q:'How much silver is in a silver dime?',a:'A pre-1965 US dime contains 2.25 grams of pure silver (0.07234 troy oz) in a 2.5 gram coin.'},{q:'What is a 1964 dime worth in silver?',a:'At current spot prices, multiply 0.07234 oz by today\'s spot price. Use the calculator above for an exact live value.'}]],
      [/silver-quarter/,      [{q:'What years of quarters are silver?',a:'US quarters minted 1964 and earlier are 90% silver. Quarters from 1965 onward contain no silver.'},{q:'How much silver is in a silver quarter?',a:'A pre-1965 Washington quarter contains 0.18084 troy oz of pure silver (5.625g) in a 6.25g coin.'},{q:'What is a silver quarter worth today?',a:'Melt value = 0.18084 × current spot price per oz. Use the calculator above for today\'s live value.'}]],
      [/silver-dollar/,       [{q:'How much silver is in a Morgan or Peace dollar?',a:'Both contain 0.7734 troy oz of pure silver (26.73g at 90% purity). Use the calculator above for live melt value.'},{q:'Are all silver dollars worth the same in melt?',a:'All Morgan and Peace dollars have identical silver content (0.7734 oz), but rare dates command large numismatic premiums above melt.'},{q:'What is the melt value of a silver dollar?',a:'Melt value = 0.7734 × current spot price. Enter quantity above for the total live value.'}]],
      [/junk-silver/,         [{q:'What is junk silver?',a:'Junk silver refers to pre-1965 US coins (dimes, quarters, halves) sold purely for silver content. $1 face value ≈ 0.715 troy oz of pure silver.'},{q:'Is junk silver a good investment?',a:'Yes. Junk silver is divisible, recognizable, and carries low premiums over spot — ideal for inflation hedging.'},{q:'How do I calculate junk silver value?',a:'Multiply face value by 0.715 to get troy ounces, then multiply by spot price. The calculator above does this automatically.'}]],
      [/canadian/,            [{q:'What Canadian coins are silver?',a:'Coins from 1920–1966 are 80% silver. Pre-1920 coins are 92.5% sterling. Some 1967–1968 coins are 50% silver (non-magnetic ones).'},{q:'How do I tell if a 1968 Canadian coin is silver?',a:'Magnet test: if it sticks, it is 100% nickel. If it does not stick, it is 50% silver.'},{q:'How much is a Canadian silver dollar worth?',a:'A 80% silver Canadian dollar weighs 23.33g and contains ~0.6 troy oz of pure silver. Use the calculator for live melt value.'}]],
      [/face-value/,          [{q:'What is the face value method for silver coins?',a:'$1 face value of pre-1965 US 90% silver coins = 0.715 troy oz of pure silver — the industry standard accounting for circulation wear.'},{q:'Why is the multiplier 0.715 not 0.723?',a:'0.723 oz is theoretical for unworn coins. The 0.715 standard accounts for metal lost through decades of circulation.'},{q:'Does face value work for silver dollars?',a:'No — Morgan and Peace dollars use 0.7734 oz per dollar. Calculate them separately with our silver dollar calculator.'}]],
      // Purity calculators
      [/999-silver/,          [{q:'What is 999 fine silver?',a:'999 fine silver is 99.9% pure silver — the purest commercially available form, used in bullion bars, coins, and rounds.'},{q:'Is 999 silver more valuable than 925?',a:'Yes — 999 silver has 7.97% more pure silver per gram than 925 sterling at the same spot price.'},{q:'What is 999 silver worth per gram?',a:'999 silver per gram = spot price ÷ 31.1035. Use the calculator above for today\'s live price.'}]],
      [/925-silver-calculator|sterling-silver-calc/, [{q:'What is 925 sterling silver?',a:'925 sterling silver is 92.5% pure silver alloyed with 7.5% copper. It is the world\'s most common silver standard for jewelry and flatware.'},{q:'How much is 925 silver worth per gram?',a:'925 silver per gram = (spot price ÷ 31.1035) × 0.925. Use the calculator above for today\'s live value.'},{q:'What does the 925 hallmark mean?',a:'The 925 stamp confirms the item is sterling silver — 92.5% pure. It is genuine silver, not plated.'}]],
      [/800-silver/,          [{q:'What is 800 silver?',a:'800 silver contains 80% pure silver and 20% other metals. It is the most common European silverware standard found on German, Italian, and Austrian pieces.'},{q:'Is 800 silver worth buying?',a:'Yes — 800 silver has 80% pure silver content and significant scrap value.'},{q:'How do I identify 800 silver?',a:'Look for the number 800 stamped on the item, usually on the underside or handle.'}]],
      [/900-silver/,          [{q:'What is 900 coin silver?',a:'900 silver contains 90% pure silver. It is the standard for pre-1965 US coins and some historical American silverware marked COIN.'},{q:'What items are made of 900 silver?',a:'Pre-1965 US dimes, quarters, half-dollars, and Morgan/Peace dollars, plus historical American flatware marked COIN.'},{q:'What is 900 silver worth per gram?',a:'900 silver per gram = (spot price ÷ 31.1035) × 0.900. Use the calculator above for today\'s live value.'}]],
      [/835-silver/,          [{q:'What is 835 silver?',a:'835 silver contains 83.5% pure silver. It is a common European standard found on Dutch, German, and Scandinavian silverware.'},{q:'Is 835 silver valuable?',a:'Yes — 835 silver has real silver content worth calculating. Use the calculator above for a live melt value.'},{q:'Where is 835 silver found?',a:'835 silver is most common on antique European flatware and serving pieces from Germany, Netherlands, and Scandinavia.'}]],
      [/958-silver/,          [{q:'What is 958 Britannia silver?',a:'958 Britannia silver is 95.8% pure silver — introduced in Britain in 1697. It is higher purity than sterling (925) and still used in fine British silverware.'},{q:'Is Britannia silver worth more than sterling?',a:'Per gram, yes — 958 contains 95.8% silver vs 92.5% for sterling, so it is worth about 3.6% more per gram.'},{q:'How do I identify Britannia silver?',a:'Look for the Britannia figure hallmark alongside the 958 number, or the word BRITANNIA on British pieces.'}]],
      // Weight pages
      [/1oz-silver/,          [{q:'How much is 1 troy ounce of silver worth?',a:'One troy oz of 999 fine silver equals the current spot price. Use the calculator above for today\'s live value.'},{q:'What is a troy ounce?',a:'A troy ounce is 31.1035 grams — slightly heavier than a standard ounce (28.35g). All silver prices are quoted in troy ounces.'},{q:'What does 1oz silver weigh in grams?',a:'1 troy ounce of silver = 31.1035 grams.'}]],
      [/10oz-silver/,         [{q:'How much is 10 oz of silver worth?',a:'10 troy oz of 999 fine silver = 10 × current spot price. Use the calculator above for today\'s live value.'},{q:'Are 10oz silver bars a good investment?',a:'Yes — 10oz bars are the most popular retail silver investment, offering low premiums and high liquidity.'},{q:'How heavy is a 10oz silver bar in grams?',a:'A 10oz silver bar weighs exactly 311.035 grams.'}]],
      [/1kg-silver/,          [{q:'How much is 1 kilogram of silver worth?',a:'1kg of 999 fine silver = 32.1507 troy oz × spot price. Use the calculator above for today\'s exact live value.'},{q:'Is a 1kg silver bar a good investment?',a:'Kilo bars are very efficient — they carry some of the lowest premiums over spot of any retail silver product.'},{q:'How many troy ounces is 1 kilogram?',a:'1 kilogram = 32.1507 troy ounces.'}]],
      [/100oz-silver/,        [{q:'How much is 100 oz of silver worth?',a:'100 troy oz of silver = 100 × current spot price. At $33/oz that is approximately $3,300. Use the calculator above for live value.'},{q:'Are 100oz silver bars good for investors?',a:'100oz bars carry the lowest premiums over spot of any standard retail silver bar, making them highly efficient for larger purchases.'},{q:'How heavy is a 100oz silver bar?',a:'A 100oz silver bar weighs 3,110.35 grams (3.11 kilograms).'}]],
      [/2oz-silver/,          [{q:'How much is 2 oz of silver worth?',a:'2 troy oz of 999 fine silver = 2 × current spot price. Use the calculator above for today\'s live value.'},{q:'What 2oz silver products are available?',a:'2oz silver rounds and high-relief collector coins are the most common 2oz silver products. They carry higher premiums than 10oz bars.'},{q:'How heavy is a 2oz silver coin in grams?',a:'A 2oz silver coin or round weighs exactly 62.207 grams.'}]],
      [/5oz-silver/,          [{q:'How much is 5 oz of silver worth?',a:'5 troy oz of 999 fine silver = 5 × current spot price. Use the calculator above for today\'s live value.'},{q:'Are 5oz silver bars worth buying?',a:'5oz bars offer lower premiums than 1oz coins while remaining affordable. They are a good mid-size investment.'},{q:'How heavy is a 5oz silver bar?',a:'A 5oz silver bar weighs 155.517 grams.'}]],
      // Guide pages
      [/what-does-925/,       [{q:'What does 925 mean on silver?',a:'925 means sterling silver — 92.5% pure silver and 7.5% other metals. It is the international standard for quality silver jewelry.'},{q:'Is 925 real silver?',a:'Yes. 925 is genuine sterling silver — not silver-plated. Items marked 925 have real, calculable scrap value.'},{q:'Is 925 silver worth buying?',a:'Yes. Sterling silver has significant intrinsic silver value. Use our calculator to find the exact current worth of any 925 item.'}]],
      [/what-is-sterling/,    [{q:'What is sterling silver?',a:'Sterling silver is 92.5% pure silver alloyed with 7.5% copper. It is the most widely used silver standard in jewelry and silverware worldwide.'},{q:'How do I identify sterling silver?',a:'Look for hallmarks: 925, STERLING, STER, or a lion passant (British). Sterling silver tarnishes and is non-magnetic.'},{q:'Is sterling silver more valuable than silver-plated?',a:'Yes, significantly. Sterling contains real silver throughout (92.5%), while plated items only have a thin surface coating worth almost nothing as scrap.'}]],
      [/identify-silver/,     [{q:'How can I tell if something is real silver?',a:'Check for hallmarks (925, 800, STERLING). Test with a magnet — real silver is not magnetic. The ice test also works: silver melts ice unusually fast.'},{q:'What does EPNS mean on silver?',a:'EPNS = Electroplated Nickel Silver. The item has only a thin silver coating over base metal and has minimal scrap value.'},{q:'What are the best home tests for silver?',a:'1) Hallmark check (925/STERLING = real), 2) Magnet test (real silver is not magnetic), 3) Ice test (silver conducts heat faster than other metals).'}]],
      [/how-to-sell/,         [{q:'Where is the best place to sell silver?',a:'Online refineries offer 90–98% of melt value. Coin dealers offer 75–90% with immediate payment. Pawn shops offer only 50–70% — avoid for silver.'},{q:'How do I get the best price for scrap silver?',a:'Know your melt value first (use our free calculator). Get 3+ quotes. Online refineries consistently offer the best prices.'},{q:'How long does it take to sell silver online?',a:'Most online refineries process and pay within 5–10 business days. Local dealers offer same-day payment at lower rates.'}]],
      [/sell-or-hold/,        [{q:'Should I sell silver now or wait?',a:'Use the scenario analysis above to model performance at different price points. Key factors: current trends, your purchase price, and your timeline.'},{q:'How do I know when silver prices will rise?',a:'Silver prices are driven by industrial demand, currency strength, and investor sentiment. Check the chart tools above for trend analysis.'},{q:'What return should I target before selling silver?',a:'Most investors target 15–30% ROI. Use the tool above to set your target price and see exactly when it becomes worth selling.'}]],
      [/purity-chart/,        [{q:'What are the silver purity grades?',a:'999 (99.9% fine), 958 (Britannia), 925 (sterling), 900 (coin), 835 (European), 800 (European). The number = parts per 1000 of pure silver.'},{q:'What is the most common silver purity?',a:'925 sterling silver is the most common worldwide — used in most jewelry, flatware, and decorative pieces.'},{q:'Which silver purity is worth the most per gram?',a:'999 fine silver has the highest silver content and is worth the most per gram, followed by 958, then 925.'}]],
      [/hallmarks/,           [{q:'What hallmarks mean real silver?',a:'Real silver hallmarks: 999, 958, 925, 900, 835, 800, STERLING, STER, COIN. Items with these marks contain genuine silver.'},{q:'What hallmarks mean silver-plated?',a:'Plated items are marked: EPNS, EP, A1, Silver Plate, IS, or WM Rogers. These have minimal scrap value.'},{q:'Where do I find hallmarks on silver items?',a:'Inside ring bands, on necklace clasps, on the back of spoon/fork handles, on the underside of trays, and inside watch case backs.'}]],
      [/silver-profit/,       [{q:'How do I calculate profit on silver?',a:'Profit = current melt value minus your purchase price. The tool above calculates this automatically with live spot prices.'},{q:'What ROI can I expect from silver?',a:'Silver returns vary widely but historically average 5–10% annually with periods of significant outperformance.'},{q:'When should I sell silver for maximum profit?',a:'When prices are trending up and you have hit your target ROI. Use the sell-or-hold analysis to model different exit scenarios.'}]],
      [/silver-batch/,        [{q:'What is a batch silver calculator?',a:'A batch calculator values multiple silver items at once — different weights, purities, and quantities in a single total.'},{q:'Can I calculate multiple silver items simultaneously?',a:'Yes. Add a row for each item with its own weight, unit, and purity. The calculator totals everything automatically.'},{q:'How do I value a mixed silver collection?',a:'Use the batch calculator to add each item separately (rings, coins, flatware) with individual weights and purities.'}]],
      [/weight-converter/,    [{q:'How do I convert grams to troy ounces for silver?',a:'Divide grams by 31.1035 to get troy ounces. Example: 100g ÷ 31.1035 = 3.215 troy oz.'},{q:'What is a pennyweight in silver?',a:'One pennyweight (dwt) = 1.5552 grams = 0.05 troy oz. Used widely by US jewelers.'},{q:'How many grams is a tola of silver?',a:'1 tola = 11.6638 grams = 0.375 troy oz. The standard precious metals unit in India and Pakistan.'}]],
      [/pennyweight/,         [{q:'What is pennyweight in silver?',a:'1 pennyweight (dwt) = 1.5552 grams = 0.05 troy oz. 20 pennyweights = 1 troy ounce. Standard unit in the US jewelry trade.'},{q:'How do I convert pennyweight to grams?',a:'Multiply pennyweight by 1.5552 to get grams. Example: 10 dwt × 1.5552 = 15.552 grams.'},{q:'Why do jewelers use pennyweight?',a:'Pennyweight is the traditional precious metals unit in the US jewelry industry. Many appraisers and scrap buyers still quote prices in dwt.'}]],
      [/tola/,                [{q:'What is a tola of silver?',a:'A tola is a South Asian unit of mass: 1 tola = 11.6638 grams = 0.375 troy ounces. Standard for precious metals in India and Pakistan.'},{q:'How many tolas in 1 troy ounce?',a:'1 troy ounce = 2.6667 tolas. Conversely, 1 tola = 0.375 troy ounces.'},{q:'What is the silver price per tola today?',a:'Silver per tola = spot price × 0.375. Use the calculator above for today\'s live tola price.'}]],
      [/sona-chandi/,         [{q:'What is Sona Chandi calculator?',a:'The Sona Chandi calculator (सोना चाँदी / سونا چاندی) converts gold and silver weights between tola, grams, and troy ounces at live spot prices.'},{q:'What is the silver price in tola today?',a:'1 tola = 0.375 troy oz. Multiply the spot price by 0.375 for today\'s tola price. The calculator above shows this automatically.'},{q:'How do I calculate chandi price per tola?',a:'Chandi per tola = spot price × 0.375. For 925 sterling: multiply by 0.375 × 0.925. Use the calculator above for an instant result.'}]],
      [/silver-price-per-gram/, [{q:'What is the silver price per gram today?',a:'Silver per gram = spot price ÷ 31.1035. See the live price in the calculator above, updated every hour.'},{q:'How do I calculate silver value in grams?',a:'(grams × purity ÷ 31.1035) × spot price. Example for 925: (weight × 0.925 ÷ 31.1035) × spot.'},{q:'What is 925 silver worth per gram?',a:'925 silver per gram = (spot ÷ 31.1035) × 0.925. At $33/oz spot ≈ $0.98/gram.'}]],
      [/silver-price-per-ounce/, [{q:'What is the silver price per ounce today?',a:'Silver spot price per troy ounce is the global benchmark, updated live above every hour from COMEX.'},{q:'Is silver priced in troy or regular ounces?',a:'Always in troy ounces (31.1035g), not avoirdupois ounces (28.35g). This is the global precious metals standard.'},{q:'What affects the silver price per ounce?',a:'Industrial demand (solar panels, electronics), investor flows, US dollar strength, and mine supply are the main drivers.'}]],
      [/925-sterling-silver-price-per-gram/, [{q:'What is 925 sterling silver price per gram today?',a:'925 price per gram = (spot ÷ 31.1035) × 0.925. See the live stat cards above, updated automatically.'},{q:'Why is 925 silver cheaper per gram than 999?',a:'Because 925 is only 92.5% pure. You pay for the pure silver content, so 925 is worth 92.5% of 999 fine silver per gram.'},{q:'How often does the 925 silver price change?',a:'The 925 price updates hourly, directly tracking the global silver spot price from COMEX and major exchanges.'}]],
      [/gold-and-silver/,     [{q:'Can I calculate gold and silver value together?',a:'Yes. Enter separate weights and purities for gold and silver above and get a combined live value in one calculation.'},{q:'How do gold and silver prices compare?',a:'Gold typically trades 60–80× higher than silver per troy ounce. The ratio fluctuates with market conditions.'},{q:'Is it better to invest in gold or silver?',a:'Silver has higher industrial demand and more price volatility. Gold is more stable. Many investors hold both for diversification.'}]],
      [/silver-bar/,          [{q:'How much is a silver bar worth?',a:'Bar value = (weight in troy oz) × spot price × purity. A 10oz 999 fine bar = 10 × spot. Use the calculator above for any size.'},{q:'What silver bar sizes are available?',a:'Common retail sizes: 1oz, 5oz, 10oz, 100oz, and 1kg. The 10oz bar is the most popular retail investment size.'},{q:'Are silver bars better than coins for investment?',a:'Bars carry lower premiums over spot than coins, making them more efficient for large purchases. Coins are more recognizable and divisible.'}]],
      [/silverware-value/,    [{q:'How much is silverware worth?',a:'Silverware value depends on weight, purity, and whether it is solid silver or plated. Sterling (925) silverware is valuable; EPNS-plated pieces have minimal scrap value.'},{q:'How do I know if my silverware is solid silver?',a:'Check the back of the handle: 925 or STERLING = solid silver. EPNS, EP, or A1 = silver-plated (little scrap value).'},{q:'Where can I sell silverware for the best price?',a:'Online refineries offer 90–98% of melt. Antique dealers may pay more for complete sets or hallmarked pieces.'}]],
      [/silver-jewelry/,      [{q:'How do I calculate silver jewelry value?',a:'Weigh the piece, identify the purity (usually 925), and use the calculator above for an instant live melt value.'},{q:'Is silver jewelry worth scrapping?',a:'Sterling (925) jewelry has solid scrap value. Only scrap items with no designer or collector value — Tiffany/Cartier pieces may be worth more intact.'},{q:'What is the best way to sell silver jewelry?',a:'Online refineries pay 90–98% of melt. Local jewelers offer 65–80%. Designer pieces may fetch more on eBay or to specialist buyers.'}]],
      [/silver-melt/,         [{q:'What is silver melt value?',a:'Silver melt value is the intrinsic value of an item\'s pure silver content at the current spot price — the minimum baseline value of any silver piece.'},{q:'How do I calculate silver melt value?',a:'Melt value = (weight in grams × purity ÷ 31.1035) × spot price per troy oz. The calculator above does this automatically.'},{q:'What is the difference between melt value and spot price?',a:'Spot price is the market price for pure (999) silver per troy oz. Melt value is what your specific item is worth based on its actual weight and purity.'}]],
      [/silver-scrap/,        [{q:'What is scrap silver?',a:'Scrap silver is any silver item sold for its metal content rather than as a collectible or functional piece — broken jewelry, flatware, coins.'},{q:'What counts as scrap silver?',a:'Sterling jewelry, flatware, coin silver items, and any silver alloy objects. Silver-plated items (EPNS) have minimal scrap value.'},{q:'Where can I sell scrap silver for the best price?',a:'Online refineries offer the best rates (90–98% of melt). Local coin dealers offer 75–90%. Calculate melt above before calling any buyer.'}]],
      [/how-silver-prices/,   [{q:'How are silver prices determined?',a:'Silver prices are set by global supply and demand on exchanges like COMEX. Key drivers: industrial demand, investor flows, dollar strength, and mine supply.'},{q:'What moves silver prices up and down?',a:'Up: inflation, weak dollar, strong industrial demand, supply shortages. Down: strong dollar, rising interest rates, reduced demand.'},{q:'What is the gold-silver ratio?',a:'The gold-silver ratio shows how many oz of silver equal one oz of gold. Historically it averages 60–80:1. A high ratio may signal silver is undervalued.'}]],
      [/coin-value/,          [{q:'How do I calculate silver coin value?',a:'Select your coin type and quantity above for an instant live melt value based on today\'s spot price.'},{q:'Are pre-1965 US coins worth more than face value?',a:'Yes — their silver melt value is typically 10–20× face value depending on current spot prices.'},{q:'What US coins are made of silver?',a:'Dimes, quarters, half-dollars minted 1964 and earlier (90% silver), Morgan and Peace dollars (90% silver), and War Nickels 1942–1945 (35% silver).'}]],
      [/price-all-currencies/, [{q:'What is the silver price in different currencies?',a:'Silver is priced globally in USD per troy oz, then converted to local currencies. Our tool shows 30+ currencies simultaneously at live rates.'},{q:'Why does silver price vary by currency?',a:'The USD spot price is fixed globally, but local prices shift with exchange rate movements against the US dollar.'},{q:'Which currencies are shown?',a:'USD, EUR, GBP, JPY, CAD, AUD, CHF, INR, PKR, CNY, AED, SAR and 20+ more, all updated live.'}]],
      [/what-is-junk/,        [{q:'What is junk silver?',a:'Junk silver refers to pre-1965 US coins sold purely for silver content at no collector premium. $1 face value ≈ 0.715 troy oz of pure silver.'},{q:'Is junk silver a good investment?',a:'Yes — it is divisible, recognizable, widely accepted, and carries low premiums over spot price.'},{q:'How do I store junk silver?',a:'Store in coin tubes or bags by denomination. Keep in a cool, dry place. A fireproof safe is recommended for larger quantities.'}]],
      [/what-is-silver-bullion/, [{q:'What is silver bullion?',a:'Silver bullion refers to silver in pure or near-pure form (bars, rounds, government coins) bought and sold primarily for its silver content.'},{q:'What is the best type of silver bullion to buy?',a:'For investment: 10oz or 100oz bars offer the lowest premiums. For divisibility: 1oz coins or rounds. For recognition: government-minted coins like Silver Eagles.'},{q:'Where can I buy silver bullion?',a:'Reputable dealers include APMEX, JM Bullion, SD Bullion, and local coin shops. Always compare premiums over spot price before purchasing.'}]],
      [/what-is-silver-melt/, [{q:'What is silver melt value?',a:'Silver melt value is the raw intrinsic value of the pure silver content in any object — what the metal would be worth if refined to pure silver.'},{q:'How do you calculate melt value?',a:'Melt value = (weight in grams × purity decimal ÷ 31.1035) × spot price per troy oz.'},{q:'Is melt value the same as what a dealer will pay?',a:'No. Dealers pay 65–98% of melt value depending on buyer type. Refineries pay the most; pawn shops the least.'}]],
      [/what-is-silver-scrap/, [{q:'What is silver scrap?',a:'Silver scrap is any silver-containing item sold for its metal content — broken jewelry, damaged flatware, old coins, industrial silver waste.'},{q:'How do I know if my silver is worth scrapping?',a:'If it has hallmarks (925, 800, STERLING) confirming solid silver, it has scrap value. Calculate the melt value above before deciding.'},{q:'What is the minimum amount of silver worth scrapping?',a:'Even small amounts have value. A single sterling spoon (40g) is worth approximately $35–$45 at current prices.'}]],
      [/what-is-troy-ounce/,  [{q:'What is a troy ounce?',a:'A troy ounce (oz t) is 31.1035 grams — the standard unit for precious metals worldwide. It is about 10% heavier than a regular (avoirdupois) ounce of 28.35 grams.'},{q:'Why is silver measured in troy ounces?',a:'Troy weight has been the precious metals standard since medieval times. All silver and gold prices globally are quoted in troy ounces.'},{q:'How many grams is a troy ounce of silver?',a:'Exactly 31.1035 grams. A 1oz silver coin or bar will weigh 31.1 grams on a digital scale.'}]],
    ];

    // Match path against database
    for (var i = 0; i < db.length; i++) {
      if (db[i][0].test(path)) return db[i][1];
    }

    // Generic fallback for any unmatched page
    return [
      {q:'How do I calculate scrap silver value?', a:'Multiply weight (grams) by purity decimal, divide by 31.1035, then multiply by the current spot price. Our free calculators do this automatically with live prices.'},
      {q:'How often are silver prices updated?', a:'Our calculators update silver spot prices every hour using live market data from COMEX and major precious metals exchanges.'},
      {q:'What does 925 mean on silver?', a:'925 means sterling silver — 92.5% pure silver alloyed with 7.5% copper. It is the most common hallmark on silver jewelry, flatware, and decorative items.'}
    ];
  }

  function injectPageSchema() {
    var path   = window.location.pathname;
    var lang   = getLangCode();
    var title  = document.title || '';
    var desc   = (document.querySelector('meta[name="description"]') || {}).content || '';
    var canonical = document.querySelector('link[rel="canonical"]');
    var url    = canonical ? canonical.href : location.href;
    var base   = 'https://scrapsilvercalculater.com';
    if (!title) return;

    var existing     = document.querySelector('script[type="application/ld+json"]');
    var existingText = existing ? existing.textContent : '';
    var pageName     = title.replace(/\s*[—–|].*$/, '').trim();
    var langCode     = lang === 'en' ? 'en-US' : lang;

    function inject(obj) {
      var s = document.createElement('script');
      s.type = 'application/ld+json';
      s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
    }

    /* ── BreadcrumbList — always add if missing ── */
    if (existingText.indexOf('BreadcrumbList') === -1 && path !== '/') {
      var crumbItems = [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': base + '/' },
        { '@type': 'ListItem', 'position': 2, 'name': pageName, 'item': url }
      ];
      // Try to read rendered breadcrumb for deeper paths
      var breadEl = document.getElementById('breadcrumb');
      if (breadEl) {
        var links = breadEl.querySelectorAll('a');
        if (links.length > 1) {
          crumbItems = [{ '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': base + '/' }];
          links.forEach(function (a, idx) {
            if (a.textContent.trim().toLowerCase() !== 'home') {
              crumbItems.push({ '@type': 'ListItem', 'position': idx + 1, 'name': a.textContent.trim(), 'item': a.href });
            }
          });
          crumbItems.push({ '@type': 'ListItem', 'position': crumbItems.length + 1, 'name': pageName, 'item': url });
        }
      }
      inject({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': crumbItems });
    }

    /* ── WebApplication — calculator pages ── */
    var isCalc = /calculator|converter|calc|value|pennyweight|tola|sona-chandi|face-value|silver-profit|silver-batch|silver-scrap|silver-melt|sterling-silver|junk-silver|silver-bar|silverware|silver-jewelry|silver-price-per|silver-sell-or-hold|silver-price-all/.test(path);
    if (isCalc && existingText.indexOf('WebApplication') === -1) {
      inject({
        '@context': 'https://schema.org', '@type': 'WebApplication',
        'name': pageName, 'url': url, 'description': desc || title,
        'applicationCategory': 'FinanceApplication', 'operatingSystem': 'Any',
        'inLanguage': langCode,
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
        'isPartOf': { '@type': 'WebSite', 'name': 'Scrap Silver Calculator', 'url': base + '/' }
      });
    }

    /* ── Article — guide / informational pages ── */
    var isArticle = /what-is|what-does|how-to|how-silver|identify|hallmarks|purity-chart|silver-bullion|sterling-silver$|troy-ounce|silver-news|silver-price-forecast|silver-market/.test(path);
    if (isArticle && existingText.indexOf('Article') === -1 && existingText.indexOf('NewsArticle') === -1) {
      inject({
        '@context': 'https://schema.org', '@type': 'Article',
        'headline': pageName, 'description': desc || title, 'url': url,
        'inLanguage': langCode,
        'publisher': { '@type': 'Organization', 'name': 'Scrap Silver Calculator', 'url': base }
      });
    }

    /* ── Basic WebPage fallback ── */
    if (!isCalc && !isArticle && existingText.indexOf('@type') === -1) {
      inject({
        '@context': 'https://schema.org', '@type': 'WebPage',
        'name': title, 'description': desc || title, 'url': url,
        'inLanguage': langCode,
        'isPartOf': { '@type': 'WebSite', 'name': 'Scrap Silver Calculator', 'url': base + '/' }
      });
    }

    /* ── FAQPage — inject if not already present ── */
    if (existingText.indexOf('FAQPage') === -1) {
      var faqs = autoFAQs(path);
      if (faqs && faqs.length > 0) {
        inject({
          '@context': 'https://schema.org', '@type': 'FAQPage',
          'mainEntity': faqs.map(function (f) {
            return { '@type': 'Question', 'name': f.q, 'acceptedAnswer': { '@type': 'Answer', 'text': f.a } };
          })
        });
      }
    }
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

    var payoutObserver = null;
    var payoutMain = null;
    var lastRenderedMelt = null;

    // Re-observe helper — keep observer off during our own DOM writes so the
    // panel rebuild does not retrigger the observer (that caused an infinite
    // mutation loop and froze the page — "Page Unresponsive").
    function startObserving() {
      if (!payoutObserver || !payoutMain) return;
      payoutObserver.observe(payoutMain, { subtree: true, characterData: true, childList: true });
    }

    function refreshPanel() {
      var melt = getMeltValue();
      var existing = document.getElementById('dealer-payout-panel');

      if (melt <= 0) {
        if (existing) existing.remove();
        lastRenderedMelt = null;
        return;
      }

      // Nothing changed since the last render — skip the DOM write entirely.
      // This is what breaks the self-triggering mutation loop.
      if (existing && melt === lastRenderedMelt) return;

      if (payoutObserver) payoutObserver.disconnect();
      lastRenderedMelt = melt;

      if (existing) {
        // Update in-place — rebuild inner content without removing the element
        existing.outerHTML = buildPanel(melt);
      } else {
        // Find anchor: inject after result-display or d-res
        var anchor = document.querySelector('.result-display, .d-res, #swc-results');
        if (anchor) anchor.insertAdjacentHTML('afterend', buildPanel(melt));
      }

      startObserving();
    }

    // Observe main for any DOM/text changes (calc updates)
    payoutMain = document.querySelector('main') || document.body;
    payoutObserver = new MutationObserver(function() { refreshPanel(); });
    startObserving();

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
    var ctaObserver = null;
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
      // Stop observing once injected — the CTA is one-shot, so there is no need
      // to keep reacting to every future DOM mutation.
      if (ctaObserver) ctaObserver.disconnect();
      resultDisplay.insertAdjacentHTML('afterend', ctaHTML);
    }

    // Observe the main element for any text changes
    ctaObserver = new MutationObserver(function() { tryInject(); });
    var main = document.querySelector('main') || document.body;
    ctaObserver.observe(main, { subtree: true, characterData: true, childList: true });

    // Also try immediately (for pages that auto-calculate on load)
    setTimeout(tryInject, 800);
  }

  /* ── #2: Price Alert Email Capture (Sell-or-Hold + Profit pages only) ── */
  function renderPriceAlertCapture() {
    var path = window.location.pathname;
    if (!path.match(/sell-or-hold|silver-profit/)) return;
    if (document.getElementById('price-alert-box')) return;

    var FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdWn4DPNyUkxV3VDQ5bqaZ1wWIgATDcP5bFInLG2DYadBIP5A/formResponse';
    var html =
      '<div id="price-alert-box" style="' +
        'margin-top:20px;padding:20px 22px;' +
        'background:linear-gradient(135deg,rgba(251,191,36,.07),rgba(124,58,237,.07));' +
        'border:1px solid rgba(251,191,36,.25);border-radius:14px;">' +
        '<div style="font-size:13px;font-weight:700;color:#FBBF24;margin-bottom:4px;">🔔 Get a Price Alert</div>' +
        '<div style="font-size:12px;color:#8fa3bc;margin-bottom:14px;">Enter your email and target silver price — we\'ll notify you when it\'s time to sell.</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:8px;">' +
          '<input id="pa-email" type="email" placeholder="your@email.com" style="flex:2;min-width:140px;background:#1a1a2e;border:1px solid rgba(255,255,255,.15);border-radius:8px;padding:10px 12px;color:#f0f4f8;font-size:14px;outline:none;">' +
          '<input id="pa-price" type="number" placeholder="Target $/oz" step="0.50" min="1" style="flex:1;min-width:90px;background:#1a1a2e;border:1px solid rgba(255,255,255,.15);border-radius:8px;padding:10px 12px;color:#f0f4f8;font-size:14px;outline:none;">' +
          '<button id="pa-btn" type="button" style="background:#7c3aed;color:#fff;border:none;border-radius:8px;padding:10px 18px;font-weight:700;font-size:13px;cursor:pointer;white-space:nowrap;">Notify Me</button>' +
        '</div>' +
        '<div id="pa-msg" style="font-size:12px;color:#4ade80;margin-top:8px;display:none;">✅ You\'re on the list! We\'ll email you when silver hits your target.</div>' +
      '</div>';

    var anchor = document.querySelector('.result-display, #sell-now')
      ? document.querySelector('.result-display') : null;
    if (anchor) anchor.insertAdjacentHTML('afterend', html);
    else {
      var widget = document.querySelector('.calc-widget');
      if (widget) widget.insertAdjacentHTML('beforeend', html);
    }

    document.getElementById('pa-btn').addEventListener('click', function() {
      var email = (document.getElementById('pa-email').value || '').trim();
      var price = (document.getElementById('pa-price').value || '').trim();
      if (!email || !price) { alert('Please enter both email and target price.'); return; }
      var body = new URLSearchParams();
      body.append('entry.1756944575', email);
      body.append('entry.2058238637', 'Price Alert: $' + price + '/oz');
      fetch(FORM_URL, { method:'POST', mode:'no-cors', body: body });
      document.getElementById('pa-msg').style.display = 'block';
      document.getElementById('pa-btn').disabled = true;
    });
  }

  /* ── #3: Typical Item Weight Preset Buttons ── */
  function renderWeightPresets() {
    var path = window.location.pathname;
    var presets = null;

    if (path.match(/sterling-silver-calculator/)) {
      presets = [
        {l:'💍 Ring',g:6},{l:'📿 Chain',g:25},{l:'📿 Necklace',g:30},
        {l:'⌚ Bracelet',g:20},{l:'🥄 Spoon',g:40},{l:'🍴 Fork',g:40}
      ];
    } else if (path.match(/silver-jewelry/)) {
      presets = [
        {l:'💍 Ring',g:6},{l:'📿 Chain',g:25},{l:'📿 Necklace',g:30},{l:'⌚ Bracelet',g:20}
      ];
    } else if (path.match(/silverware-value/)) {
      presets = [
        {l:'🥄 Spoon',g:40},{l:'🍴 Fork',g:40},{l:'🔪 Knife',g:55},
        {l:'🍽️ Tray',g:500},{l:'🏆 Cup',g:150},{l:'🫙 Plate',g:250}
      ];
    }
    if (!presets) return;

    var wInput = document.getElementById('weight');
    if (!wInput || document.getElementById('weight-presets')) return;

    var btnStyle = 'background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);' +
      'border-radius:8px;padding:5px 10px;font-size:11px;color:#c2cfe0;cursor:pointer;' +
      'transition:background .15s,border-color .15s;white-space:nowrap;';

    var html = '<div id="weight-presets" style="margin-bottom:10px;">' +
      '<span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#8fa3bc;display:block;margin-bottom:6px;">Quick fill:</span>' +
      '<div style="display:flex;flex-wrap:wrap;gap:6px;">' +
      presets.map(function(p) {
        return '<button type="button" style="' + btnStyle + '" ' +
          'onmouseover="this.style.background=\'rgba(124,58,237,.2)\';this.style.borderColor=\'rgba(124,58,237,.5)\'" ' +
          'onmouseout="this.style.background=\'rgba(255,255,255,.05)\';this.style.borderColor=\'rgba(255,255,255,.1)\'" ' +
          'onclick="(function(){' +
            'var el=document.getElementById(\'weight\');' +
            'if(el){el.value=' + p.g + ';el.dispatchEvent(new Event(\'input\',{bubbles:true}));el.dispatchEvent(new Event(\'change\',{bubbles:true}));}' +
          '})()">' + p.l + ' <strong>' + p.g + 'g</strong></button>';
      }).join('') +
      '</div></div>';

    wInput.closest('.form-group').insertAdjacentHTML('beforebegin', html);
  }

  /* ── #4: Visible FAQ Accordion ── */
  function renderFAQAccordion() {
    var path = window.location.pathname;
    if (path === '/' || path.match(/\/(ar|de|es|fr|hi|it|pt|ru|tr|ur|zh)\/?$/) ||
        path.match(/privacy|terms|about|contact|404|debug|audit/)) return;
    if (document.getElementById('faq-accordion-section')) return;

    var faqs = autoFAQs(path);
    if (!faqs || faqs.length === 0) return;

    var lang = getLangCode();
    var heading = {en:'Frequently Asked Questions',de:'Häufig gestellte Fragen',es:'Preguntas Frecuentes',fr:'Questions Fréquentes',ar:'الأسئلة الشائعة',hi:'अक्सर पूछे जाने वाले प्रश्न',ur:'اکثر پوچھے جانے والے سوالات',it:'Domande Frequenti',pt:'Perguntas Frequentes',ru:'Часто задаваемые вопросы',tr:'Sık Sorulan Sorular',zh:'常见问题'}[lang] || 'Frequently Asked Questions';
    var isRTL = lang === 'ar' || lang === 'ur';

    var items = faqs.map(function(f, i) {
      return '<div class="faq-item" style="border-bottom:1px solid rgba(255,255,255,.07);">' +
        '<button type="button" onclick="(function(btn){' +
          'var ans=btn.nextElementSibling;' +
          'var open=ans.style.display===\'block\';' +
          'ans.style.display=open?\'none\':\'block\';' +
          'btn.querySelector(\'.faq-chevron\').style.transform=open?\'rotate(0deg)\':\'rotate(180deg)\';' +
        '})(this)" style="width:100%;display:flex;align-items:center;justify-content:space-between;gap:12px;' +
          'padding:14px 0;background:none;border:none;cursor:pointer;text-align:' + (isRTL?'right':'left') + ';">' +
          '<span style="font-size:14px;font-weight:600;color:#f0f4f8;line-height:1.4;">' + f.q + '</span>' +
          '<span class="faq-chevron" style="flex-shrink:0;font-size:12px;color:#8fa3bc;transition:transform .2s;">▼</span>' +
        '</button>' +
        '<div style="display:none;padding:0 0 14px;font-size:13px;color:#c2cfe0;line-height:1.7;">' + f.a + '</div>' +
      '</div>';
    }).join('');

    var html =
      '<div id="faq-accordion-section" style="margin-top:32px;padding:22px 24px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:14px;' + (isRTL?'direction:rtl;':'')+'">' +
        '<h3 style="font-size:15px;font-weight:700;color:#f0f4f8;margin:0 0 4px;">' + heading + '</h3>' +
        '<div style="width:32px;height:2px;background:#7c3aed;border-radius:2px;margin-bottom:14px;"></div>' +
        items +
      '</div>';

    // Insert before related grid or at end of content-body
    var anchor = document.querySelector('.related-grid');
    if (anchor) anchor.closest('div').insertAdjacentHTML('beforebegin', html);
    else {
      var cb = document.querySelector('.content-body');
      if (cb) cb.insertAdjacentHTML('beforeend', html);
    }
  }

  /* ── #5: Social Proof Counter (homepage only) ── */
  function renderSocialProof() {
    if (window.location.pathname !== '/') return;
    var el = document.querySelector('.hv2-pills, .trust-inline');
    if (!el || document.getElementById('social-proof-counter')) return;

    // Simulated counter: base 12,000 + time-based increment (grows ~50/day since Jan 2025)
    var base = 12000;
    var daysSinceBase = Math.floor((Date.now() - new Date('2025-01-01').getTime()) / 86400000);
    var total = base + (daysSinceBase * 50);
    var display = total >= 1000 ? (total / 1000).toFixed(0) + 'k+' : total + '+';

    var badge = document.createElement('span');
    badge.id = 'social-proof-counter';
    badge.style.cssText = 'font-size:12px;font-weight:700;color:#4ade80;background:rgba(74,222,128,.1);border:1px solid rgba(74,222,128,.2);padding:4px 10px;border-radius:100px;white-space:nowrap;';
    badge.textContent = '👥 ' + display + ' calculations this month';
    el.insertAdjacentElement('afterend', badge);
  }

  /* ── #7: "Worth More Than Melt?" Warning on Jewelry/Silverware Pages ── */
  function renderWorthMoreWarning() {
    var path = window.location.pathname;
    if (!path.match(/ring|chain|necklace|bracelet|spoon|fork|tray|cup|plate|jewelry|silverware/)) return;
    if (document.getElementById('worth-more-warning')) return;

    var lang = getLangCode();
    var msg = {
      en: { title: '💡 Could be worth more than melt', body: 'Designer brands (Tiffany, Georg Jensen, Gorham) and antique hallmarked pieces often sell for <strong>2–10× melt value</strong> to collectors. Check for maker\'s marks before scrapping.', link: 'How to identify valuable silverware →', href: '/silver-hallmarks-guide/' },
      de: { title: '💡 Möglicherweise mehr wert als Schmelzwert', body: 'Designerstücke und antike Silberwaren erzielen oft <strong>2–10× Schmelzwert</strong> bei Sammlern.', link: 'Hallmarks Guide →', href: '/de/silberstempel-ratgeber/' },
      es: { title: '💡 Podría valer más que el valor de fusión', body: 'Marcas de diseñador y piezas antiguas a menudo se venden por <strong>2–10× el valor de fusión</strong>.', link: 'Guía de sellos →', href: '/es/guia-de-sellos-de-plata/' },
      fr: { title: '💡 Peut valoir plus que la valeur de fonte', body: 'Les marques de créateurs et les pièces antiques se vendent souvent <strong>2–10× la valeur de fonte</strong>.', link: 'Guide des poinçons →', href: '/fr/guide-des-poincons-d-argent/' },
    };
    var m = msg[lang] || msg.en;

    var html = '<div id="worth-more-warning" style="' +
      'margin-bottom:16px;padding:14px 16px;' +
      'background:rgba(251,191,36,.07);border:1px solid rgba(251,191,36,.2);border-radius:12px;">' +
      '<strong style="font-size:13px;color:#FBBF24;display:block;margin-bottom:4px;">' + m.title + '</strong>' +
      '<span style="font-size:12px;color:#c2cfe0;line-height:1.6;">' + m.body + ' <a href="' + m.href + '" style="color:#a78bfa;font-weight:700;">' + m.link + '</a></span>' +
    '</div>';

    // Insert above result display
    var anchor = document.querySelector('.result-display');
    if (anchor) anchor.insertAdjacentHTML('beforebegin', html);
  }

  /* ── #9: "Melt value" Tooltip ── */
  function renderMeltValueTooltips() {
    if (document.getElementById('__mv-tooltip-style')) return;
    var style = document.createElement('style');
    style.id = '__mv-tooltip-style';
    style.textContent =
      '[data-tooltip]{position:relative;cursor:help;border-bottom:1px dashed rgba(124,58,237,.5);}' +
      '[data-tooltip]::after{content:attr(data-tooltip);position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);' +
        'background:#1a1a2e;color:#f0f4f8;font-size:11px;font-weight:400;line-height:1.5;padding:6px 10px;border-radius:8px;' +
        'border:1px solid rgba(124,58,237,.3);white-space:normal;max-width:220px;min-width:160px;text-align:center;' +
        'z-index:9999;pointer-events:none;opacity:0;transition:opacity .15s;}' +
      '[data-tooltip]:hover::after{opacity:1;}';
    document.head.appendChild(style);

    var tip = 'The raw silver metal value if melted — before dealer fees';
    document.querySelectorAll('.result-label, .calc-widget-title, h1').forEach(function(el) {
      if (/melt value/i.test(el.textContent) && !el.querySelector('[data-tooltip]')) {
        el.innerHTML = el.innerHTML.replace(
          /melt value/gi,
          '<span data-tooltip="' + tip + '">melt value</span>'
        );
      }
    });
  }

  /* ── #10: Junk Silver — default Face Value tab ── */
  function fixJunkSilverTab() {
    if (!window.location.pathname.match(/junk-silver-calculator/)) return;
    // Switch default tab to "By Face Value" on load
    setTimeout(function() {
      var tabs = document.querySelectorAll('.dtab, [onclick*="face"], [onclick*="Face"]');
      tabs.forEach(function(tab) {
        if (/face/i.test(tab.textContent) || /face/i.test((tab.getAttribute('onclick') || ''))) {
          if (tab.click) tab.click();
        }
      });
    }, 100);
  }

  function init() {
    renderHeader();
    renderFooter();
    setTimeout(function() {
      try {
        renderLocalizedSections();
        injectPageSchema();
        updateSpotPriceDisplay();
        renderChatWidget();
        renderDealerPayout();
        renderPostCalcCTA();
        renderPriceAlertCapture();
        setRegionalCurrency();
        renderWeightPresets();
        renderFAQAccordion();
        renderSocialProof();
        renderWorthMoreWarning();
        renderMeltValueTooltips();
        localizeCalculatorUI();
      } catch(e) { console.error('[SiteComponents] deferred init error:', e); }
    }, 0);
  }

  /* ── Auto-set EUR currency for European language pages ── */
  function setRegionalCurrency() {
    var lang = getLangCode();
    var eurLangs  = ['de','fr','it','es','pt','nl'];
    var gbpLangs  = [];
    var inrLangs  = ['hi'];
    var pkrLangs  = ['ur'];
    if (typeof SilverPrice === 'undefined' || !SilverPrice.setCurrency) return;
    if (eurLangs.indexOf(lang)  !== -1) SilverPrice.setCurrency('EUR');
    else if (gbpLangs.indexOf(lang) !== -1) SilverPrice.setCurrency('GBP');
    else if (inrLangs.indexOf(lang) !== -1) SilverPrice.setCurrency('INR');
    else if (pkrLangs.indexOf(lang) !== -1) SilverPrice.setCurrency('PKR');
  }

  /* ── Translate calculator UI labels for DE / HI / UR pages ── */
  function localizeCalculatorUI() {
    var lang = getLangCode();
    if (lang !== 'de' && lang !== 'hi' && lang !== 'ur') return;
    var T = window.MenuTranslations && window.MenuTranslations[lang];
    if (!T) return;

    function rep(selector, key) {
      if (!T[key]) return;
      document.querySelectorAll(selector).forEach(function(el) {
        if (el.tagName === 'INPUT' || el.tagName === 'SELECT') {
          if (el.placeholder) el.placeholder = T[key];
        } else {
          el.textContent = T[key];
        }
      });
    }

    // Labels
    rep('.fl',          'Silver Purity');   // catches first .fl — Weight label
    document.querySelectorAll('.fl').forEach(function(el, i) {
      if (i === 0 && T['Weight'])       el.textContent = T['Weight'];
      if (i === 1 && T['Silver Purity']) el.textContent = T['Silver Purity'];
    });

    // Result labels
    rep('#calc-btn',    'Calculate Melt Value');
    document.querySelectorAll('.result-label, .res-label').forEach(function(el) {
      if (/melt/i.test(el.textContent) && T['Estimated Melt Value'])
        el.textContent = T['Estimated Melt Value'];
    });

    // Purity select options
    var purityNames = {
      'Fine Silver': T['Fine Silver (99.9%)'] || T['Fine Silver'],
      'Britannia Silver': T['Britannia Silver (95.8%)'],
      'Sterling Silver': T['Sterling Silver (92.5%)'],
      'Coin Silver': T['Coin Silver (90%)'],
      'European Silver 835': T['European Silver (83.5%)'],
      'European Silver 800': T['European Silver (80%)']
    };
    document.querySelectorAll('select option').forEach(function(opt) {
      var text = opt.textContent.trim();
      Object.keys(purityNames).forEach(function(en) {
        if (purityNames[en] && text.indexOf(en) !== -1) {
          opt.textContent = purityNames[en];
        }
      });
    });

    // Unit chips
    var unitMap = {
      'GRAMS': T['Grams'], 'TROY OZ': T['Troy Ounces'],
      'DWT': T['Pennyweight'], 'KG': T['Kilograms']
    };
    document.querySelectorAll('.uchip').forEach(function(chip) {
      var txt = chip.textContent.trim();
      if (unitMap[txt]) chip.textContent = unitMap[txt];
    });

    // Spot price label
    document.querySelectorAll('.hv2-spot-label, .pt-label').forEach(function(el) {
      if (/silver spot/i.test(el.textContent) && T['Silver Spot Price'])
        el.textContent = T['Silver Spot Price'];
      if (/today/i.test(el.textContent) && T["Today's Prices"])
        el.textContent = T["Today's Prices"];
    });

    // Tab labels (SCRAP / COINS / BULLION)
    var tabMap = {
      'SCRAP':   T['SCRAP'],
      'COINS':   T['COINS'],
      'BULLION': T['BULLION']
    };
    document.querySelectorAll('.dtab').forEach(function(tab) {
      var firstSpan = tab.querySelector('span');
      if (firstSpan) {
        var txt = firstSpan.textContent.trim();
        if (tabMap[txt]) firstSpan.textContent = tabMap[txt];
      }
    });

    // Purity button labels (Fine / Sterling / Coin etc.)
    var purityLabelMap = {
      'Fine':      T['Fine'],
      'Sterling':  T['Sterling'],
      'Coin':      T['Coin'],
      'Britannia': T['Britannia']
    };
    document.querySelectorAll('.porb .pl').forEach(function(el) {
      var txt = el.textContent.trim();
      if (purityLabelMap[txt]) el.textContent = purityLabelMap[txt];
    });

    // Form labels using .fl class
    document.querySelectorAll('.ctrl-group .fl, .form-label').forEach(function(el) {
      var txt = el.textContent.trim();
      if (/^weight$/i.test(txt) && T['Weight'])         el.textContent = T['Weight'];
      if (/^silver purity$/i.test(txt) && T['Silver Purity']) el.textContent = T['Silver Purity'];
      if (/^estimated melt/i.test(txt) && T['Estimated Melt Value']) el.textContent = T['Estimated Melt Value'];
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { try { init(); } catch(e) { console.error('[SiteComponents] init error:', e); } });
  } else {
    requestAnimationFrame(function() { try { init(); } catch(e) { console.error('[SiteComponents] init error:', e); } });
  }

  return { renderHeader, renderFooter, renderPriceTicker, renderBreadcrumb, copyCalculation, toast, injectFAQSchema, injectPageSchema, init, getLangCode, updateSpotPriceDisplay, renderDealerPayout, renderPostCalcCTA };
})();
