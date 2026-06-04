/**
 * Generates translated silver price pages for all languages.
 * Run: node scripts/generate-price-pages.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const LANGS = {
  es: {
    name: 'Spanish', dir: 'es', lang: 'es',
    currency: 'USD', symbol: '$', rate: 1,
    rtl: false,
    t: {
      siteTitle: 'Calculadora de Plata de Chatarra',
      home: 'Inicio',
      liveMarket: 'MERCADO EN VIVO',
      updatedAt: 'Actualizado:',
      perTroyOz: 'por onza troy',
      perGram: 'por gramo',
      perKg: 'por kilogramo',
      spotPrice: 'Precio Spot',
      purityLabel: 'Pureza',
      calculate: 'Calcular Valor',
      meltValue: 'Valor de Fusión',
      weight: 'Peso',
      unit: 'Unidad',
      grams: 'Gramos (g)', oz: 'Onzas Troy (ozt)', kg: 'Kilogramos (kg)',
      dealers: 'Compradores recomendados',
      faq: 'Preguntas Frecuentes',
      allPrices: 'Todos los Precios →',
      currentPrice: 'Precio Actual de Plata',
      silverPriceToday: 'Precio de la Plata Hoy',
      silverPricePerOz: 'Precio de la Plata por Onza',
      newsToday: 'Noticias de Plata Hoy',
      forecast: 'Pronóstico del Precio de la Plata',
    },
    pages: {
      'silver-price-today': { slug: 'precio-plata-hoy', title: 'Precio de la Plata Hoy', subtitle: 'Precio Spot en Vivo' },
      'silver-price-per-ounce': { slug: 'precio-plata-por-onza', title: 'Precio de la Plata por Onza', subtitle: 'XAG/USD en Vivo' },
      '999-silver-price-today': { slug: '999-plata-fina-precio-hoy', title: 'Precio Plata Fina 999 Hoy', subtitle: 'Inversión en Plata' },
      '925-silver-price-today': { slug: '925-plata-precio-hoy', title: 'Precio Plata 925 Hoy', subtitle: 'Joyas y Cubiertos' },
      '900-silver-price-today': { slug: '900-plata-moneda-precio-hoy', title: 'Precio Plata Moneda 900 Hoy', subtitle: 'Monedas Históricas' },
      '800-silver-price-today': { slug: '800-plata-precio-hoy', title: 'Precio Plata 800 Hoy', subtitle: 'Plata Antigua Europea' },
      'silver-news-today': { slug: 'noticias-plata-hoy', title: 'Noticias de Plata Hoy', subtitle: 'Análisis del Mercado' },
      'silver-price-forecast-today': { slug: 'pronostico-precio-plata', title: 'Pronóstico Precio Plata 2025–2026', subtitle: 'Análisis y Escenarios' },
    }
  },
  fr: {
    name: 'French', dir: 'fr', lang: 'fr',
    currency: 'EUR', symbol: '€', rate: 0.92,
    rtl: false,
    t: {
      siteTitle: 'Calculateur de Ferraille d\'Argent',
      home: 'Accueil',
      liveMarket: 'MARCHÉ EN DIRECT',
      updatedAt: 'Mis à jour:',
      perTroyOz: 'par once troy',
      perGram: 'par gramme',
      perKg: 'par kilogramme',
      spotPrice: 'Prix Spot',
      purityLabel: 'Pureté',
      calculate: 'Calculer la Valeur',
      meltValue: 'Valeur de Fonte',
      weight: 'Poids',
      unit: 'Unité',
      grams: 'Grammes (g)', oz: 'Onces Troy (ozt)', kg: 'Kilogrammes (kg)',
      dealers: 'Revendeurs recommandés',
      faq: 'Questions Fréquentes',
      allPrices: 'Tous les Prix →',
      currentPrice: 'Prix Actuel de l\'Argent',
      silverPriceToday: 'Prix de l\'Argent Aujourd\'hui',
      silverPricePerOz: 'Prix de l\'Argent par Once',
      newsToday: 'Actualités Argent Aujourd\'hui',
      forecast: 'Prévision du Prix de l\'Argent',
    },
    pages: {
      'silver-price-today': { slug: 'prix-argent-aujourd-hui', title: 'Prix de l\'Argent Aujourd\'hui', subtitle: 'Prix Spot en Direct' },
      'silver-price-per-ounce': { slug: 'prix-argent-par-once', title: 'Prix de l\'Argent par Once', subtitle: 'XAG/EUR en Direct' },
      '999-silver-price-today': { slug: '999-argent-pur-prix-aujourd-hui', title: 'Prix Argent Pur 999 Aujourd\'hui', subtitle: 'Investissement Argent' },
      '925-silver-price-today': { slug: '925-argent-sterling-prix-aujourd-hui', title: 'Prix Argent 925 Aujourd\'hui', subtitle: 'Bijoux et Argenterie' },
      '900-silver-price-today': { slug: '900-argent-monnaie-prix-aujourd-hui', title: 'Prix Argent Monnaie 900 Aujourd\'hui', subtitle: 'Pièces Historiques' },
      '800-silver-price-today': { slug: '800-argent-prix-aujourd-hui', title: 'Prix Argent 800 Aujourd\'hui', subtitle: 'Argent Antique Européen' },
      'silver-news-today': { slug: 'actualites-argent-aujourd-hui', title: 'Actualités Argent Aujourd\'hui', subtitle: 'Analyse du Marché' },
      'silver-price-forecast-today': { slug: 'prevision-prix-argent', title: 'Prévision Prix Argent 2025–2026', subtitle: 'Analyse et Scénarios' },
    }
  },
  it: {
    name: 'Italian', dir: 'it', lang: 'it',
    currency: 'EUR', symbol: '€', rate: 0.92,
    rtl: false,
    t: {
      siteTitle: 'Calcolatore Rottami Argento',
      home: 'Home',
      liveMarket: 'MERCATO LIVE',
      updatedAt: 'Aggiornato:',
      perTroyOz: 'per oncia troy',
      perGram: 'per grammo',
      perKg: 'per chilogrammo',
      spotPrice: 'Prezzo Spot',
      purityLabel: 'Purezza',
      calculate: 'Calcola Valore',
      meltValue: 'Valore di Fusione',
      weight: 'Peso',
      unit: 'Unità',
      grams: 'Grammi (g)', oz: 'Once Troy (ozt)', kg: 'Chilogrammi (kg)',
      dealers: 'Rivenditori consigliati',
      faq: 'Domande Frequenti',
      allPrices: 'Tutti i Prezzi →',
      currentPrice: 'Prezzo Attuale dell\'Argento',
      silverPriceToday: 'Prezzo dell\'Argento Oggi',
      silverPricePerOz: 'Prezzo Argento per Oncia',
      newsToday: 'Notizie Argento Oggi',
      forecast: 'Previsione Prezzo Argento',
    },
    pages: {
      'silver-price-today': { slug: 'prezzo-argento-oggi', title: 'Prezzo dell\'Argento Oggi', subtitle: 'Prezzo Spot in Diretta' },
      'silver-price-per-ounce': { slug: 'prezzo-argento-per-oncia', title: 'Prezzo Argento per Oncia', subtitle: 'XAG/EUR in Diretta' },
      '999-silver-price-today': { slug: '999-argento-puro-prezzo-oggi', title: 'Prezzo Argento Puro 999 Oggi', subtitle: 'Investimento in Argento' },
      '925-silver-price-today': { slug: '925-argento-sterling-prezzo-oggi', title: 'Prezzo Argento 925 Oggi', subtitle: 'Gioielli e Posate' },
      '900-silver-price-today': { slug: '900-argento-moneta-prezzo-oggi', title: 'Prezzo Argento Moneta 900 Oggi', subtitle: 'Monete Storiche' },
      '800-silver-price-today': { slug: '800-argento-prezzo-oggi', title: 'Prezzo Argento 800 Oggi', subtitle: 'Argento Antico Europeo' },
      'silver-news-today': { slug: 'notizie-argento-oggi', title: 'Notizie Argento Oggi', subtitle: 'Analisi del Mercato' },
      'silver-price-forecast-today': { slug: 'previsione-prezzo-argento', title: 'Previsione Prezzo Argento 2025–2026', subtitle: 'Analisi e Scenari' },
    }
  },
  pt: {
    name: 'Portuguese', dir: 'pt', lang: 'pt',
    currency: 'EUR', symbol: '€', rate: 0.92,
    rtl: false,
    t: {
      siteTitle: 'Calculadora de Sucata de Prata',
      home: 'Início',
      liveMarket: 'MERCADO AO VIVO',
      updatedAt: 'Atualizado:',
      perTroyOz: 'por onça troy',
      perGram: 'por grama',
      perKg: 'por quilograma',
      spotPrice: 'Preço Spot',
      purityLabel: 'Pureza',
      calculate: 'Calcular Valor',
      meltValue: 'Valor de Fusão',
      weight: 'Peso',
      unit: 'Unidade',
      grams: 'Gramas (g)', oz: 'Onças Troy (ozt)', kg: 'Quilogramas (kg)',
      dealers: 'Revendedores recomendados',
      faq: 'Perguntas Frequentes',
      allPrices: 'Todos os Preços →',
      currentPrice: 'Preço Atual da Prata',
      silverPriceToday: 'Preço da Prata Hoje',
      silverPricePerOz: 'Preço da Prata por Onça',
      newsToday: 'Notícias de Prata Hoje',
      forecast: 'Previsão do Preço da Prata',
    },
    pages: {
      'silver-price-today': { slug: 'preco-prata-hoje', title: 'Preço da Prata Hoje', subtitle: 'Preço Spot ao Vivo' },
      'silver-price-per-ounce': { slug: 'preco-prata-por-onca', title: 'Preço da Prata por Onça', subtitle: 'XAG/EUR ao Vivo' },
      '999-silver-price-today': { slug: '999-prata-fina-preco-hoje', title: 'Preço Prata Fina 999 Hoje', subtitle: 'Investimento em Prata' },
      '925-silver-price-today': { slug: '925-prata-preco-hoje', title: 'Preço Prata 925 Hoje', subtitle: 'Joias e Talheres' },
      '900-silver-price-today': { slug: '900-prata-moeda-preco-hoje', title: 'Preço Prata Moeda 900 Hoje', subtitle: 'Moedas Históricas' },
      '800-silver-price-today': { slug: '800-prata-preco-hoje', title: 'Preço Prata 800 Hoje', subtitle: 'Prata Antiga Europeia' },
      'silver-news-today': { slug: 'noticias-prata-hoje', title: 'Notícias de Prata Hoje', subtitle: 'Análise do Mercado' },
      'silver-price-forecast-today': { slug: 'previsao-preco-prata', title: 'Previsão Preço Prata 2025–2026', subtitle: 'Análise e Cenários' },
    }
  },
  tr: {
    name: 'Turkish', dir: 'tr', lang: 'tr',
    currency: 'USD', symbol: '$', rate: 1,
    rtl: false,
    t: {
      siteTitle: 'Hurda Gümüş Hesaplayıcı',
      home: 'Anasayfa',
      liveMarket: 'CANLI PİYASA',
      updatedAt: 'Güncellendi:',
      perTroyOz: 'troy ons başına',
      perGram: 'gram başına',
      perKg: 'kilogram başına',
      spotPrice: 'Spot Fiyat',
      purityLabel: 'Saflık',
      calculate: 'Değeri Hesapla',
      meltValue: 'Erime Değeri',
      weight: 'Ağırlık',
      unit: 'Birim',
      grams: 'Gram (g)', oz: 'Troy Ons (ozt)', kg: 'Kilogram (kg)',
      dealers: 'Önerilen bayiler',
      faq: 'Sık Sorulan Sorular',
      allPrices: 'Tüm Fiyatlar →',
      currentPrice: 'Güncel Gümüş Fiyatı',
      silverPriceToday: 'Bugünkü Gümüş Fiyatı',
      silverPricePerOz: 'Ons Başına Gümüş Fiyatı',
      newsToday: 'Gümüş Haberleri Bugün',
      forecast: 'Gümüş Fiyat Tahmini',
    },
    pages: {
      'silver-price-today': { slug: 'gumus-fiyati-bugun', title: 'Bugünkü Gümüş Fiyatı', subtitle: 'Canlı Spot Fiyat' },
      'silver-price-per-ounce': { slug: 'ons-basi-gumus-fiyati', title: 'Ons Başına Gümüş Fiyatı', subtitle: 'Canlı XAG/USD' },
      '999-silver-price-today': { slug: '999-saf-gumus-fiyati-bugun', title: '999 Saf Gümüş Fiyatı Bugün', subtitle: 'Gümüş Yatırımı' },
      '925-silver-price-today': { slug: '925-gumus-fiyati-bugun', title: '925 Gümüş Fiyatı Bugün', subtitle: 'Mücevher ve Sofra Takımı' },
      '900-silver-price-today': { slug: '900-sikke-gumus-fiyati-bugun', title: '900 Sikke Gümüş Fiyatı Bugün', subtitle: 'Tarihi Paralar' },
      '800-silver-price-today': { slug: '800-gumus-fiyati-bugun', title: '800 Gümüş Fiyatı Bugün', subtitle: 'Antika Avrupa Gümüşü' },
      'silver-news-today': { slug: 'gumus-haberleri-bugun', title: 'Gümüş Haberleri Bugün', subtitle: 'Piyasa Analizi' },
      'silver-price-forecast-today': { slug: 'gumus-fiyat-tahmini', title: 'Gümüş Fiyat Tahmini 2025–2026', subtitle: 'Analiz ve Senaryolar' },
    }
  },
  ru: {
    name: 'Russian', dir: 'ru', lang: 'ru',
    currency: 'USD', symbol: '$', rate: 1,
    rtl: false,
    t: {
      siteTitle: 'Калькулятор Серебряного Лома',
      home: 'Главная',
      liveMarket: 'ЖИВОЙ РЫНОК',
      updatedAt: 'Обновлено:',
      perTroyOz: 'за тройскую унцию',
      perGram: 'за грамм',
      perKg: 'за килограмм',
      spotPrice: 'Спотовая цена',
      purityLabel: 'Проба',
      calculate: 'Рассчитать стоимость',
      meltValue: 'Стоимость плавки',
      weight: 'Вес',
      unit: 'Единица',
      grams: 'Граммы (г)', oz: 'Тройские унции (ozt)', kg: 'Килограммы (кг)',
      dealers: 'Рекомендуемые дилеры',
      faq: 'Часто Задаваемые Вопросы',
      allPrices: 'Все цены →',
      currentPrice: 'Текущая цена серебра',
      silverPriceToday: 'Цена серебра сегодня',
      silverPricePerOz: 'Цена серебра за унцию',
      newsToday: 'Новости серебра сегодня',
      forecast: 'Прогноз цены серебра',
    },
    pages: {
      'silver-price-today': { slug: 'цена-серебра-сегодня', title: 'Цена серебра сегодня', subtitle: 'Живая спотовая цена' },
      'silver-price-per-ounce': { slug: 'цена-серебра-за-унцию', title: 'Цена серебра за унцию', subtitle: 'XAG/USD в реальном времени' },
      '999-silver-price-today': { slug: '999-чистое-серебро-цена-сегодня', title: 'Цена 999 чистого серебра сегодня', subtitle: 'Инвестиционное серебро' },
      '925-silver-price-today': { slug: '925-серебро-цена-сегодня', title: 'Цена 925 серебра сегодня', subtitle: 'Ювелирные изделия и столовое серебро' },
      '900-silver-price-today': { slug: '900-монетное-серебро-цена-сегодня', title: 'Цена 900 монетного серебра сегодня', subtitle: 'Исторические монеты' },
      '800-silver-price-today': { slug: '800-серебро-цена-сегодня', title: 'Цена 800 серебра сегодня', subtitle: 'Антикварное европейское серебро' },
      'silver-news-today': { slug: 'новости-серебра-сегодня', title: 'Новости серебра сегодня', subtitle: 'Анализ рынка' },
      'silver-price-forecast-today': { slug: 'прогноз-цены-серебра', title: 'Прогноз цены серебра 2025–2026', subtitle: 'Анализ и сценарии' },
    }
  },
  zh: {
    name: 'Chinese', dir: 'zh', lang: 'zh',
    currency: 'USD', symbol: '$', rate: 1,
    rtl: false,
    t: {
      siteTitle: '废银计算器',
      home: '首页',
      liveMarket: '实时市场',
      updatedAt: '更新时间:',
      perTroyOz: '每金衡盎司',
      perGram: '每克',
      perKg: '每千克',
      spotPrice: '现货价格',
      purityLabel: '纯度',
      calculate: '计算价值',
      meltValue: '熔化价值',
      weight: '重量',
      unit: '单位',
      grams: '克 (g)', oz: '金衡盎司 (ozt)', kg: '千克 (kg)',
      dealers: '推荐经销商',
      faq: '常见问题',
      allPrices: '所有价格 →',
      currentPrice: '当前银价',
      silverPriceToday: '今日银价',
      silverPricePerOz: '每盎司银价',
      newsToday: '今日白银新闻',
      forecast: '白银价格预测',
    },
    pages: {
      'silver-price-today': { slug: '今日银价', title: '今日银价', subtitle: '实时现货价格' },
      'silver-price-per-ounce': { slug: '每盎司银价', title: '每盎司银价', subtitle: 'XAG/USD 实时' },
      '999-silver-price-today': { slug: '999纯银今日价格', title: '999纯银今日价格', subtitle: '白银投资' },
      '925-silver-price-today': { slug: '925银今日价格', title: '925白银今日价格', subtitle: '珠宝和餐具' },
      '900-silver-price-today': { slug: '900银币今日价格', title: '900银币今日价格', subtitle: '历史硬币' },
      '800-silver-price-today': { slug: '800银今日价格', title: '800白银今日价格', subtitle: '欧洲古董银' },
      'silver-news-today': { slug: '今日白银新闻', title: '今日白银新闻', subtitle: '市场分析' },
      'silver-price-forecast-today': { slug: '白银价格预测', title: '白银价格预测2025–2026', subtitle: '分析与情景' },
    }
  },
  ar: {
    name: 'Arabic', dir: 'ar', lang: 'ar',
    currency: 'USD', symbol: '$', rate: 1,
    rtl: true,
    t: {
      siteTitle: 'حاسبة الفضة المعاد تدويرها',
      home: 'الرئيسية',
      liveMarket: 'السوق المباشر',
      updatedAt: 'تم التحديث:',
      perTroyOz: 'لكل أوقية تروي',
      perGram: 'لكل جرام',
      perKg: 'لكل كيلوجرام',
      spotPrice: 'سعر الفضة الفوري',
      purityLabel: 'النقاء',
      calculate: 'احسب القيمة',
      meltValue: 'قيمة الصهر',
      weight: 'الوزن',
      unit: 'الوحدة',
      grams: 'جرام (g)', oz: 'أوقية تروي (ozt)', kg: 'كيلوجرام (kg)',
      dealers: 'تجار موصى بهم',
      faq: 'الأسئلة الشائعة',
      allPrices: 'جميع الأسعار →',
      currentPrice: 'سعر الفضة الحالي',
      silverPriceToday: 'سعر الفضة اليوم',
      silverPricePerOz: 'سعر الفضة للأوقية',
      newsToday: 'أخبار الفضة اليوم',
      forecast: 'توقعات سعر الفضة',
    },
    pages: {
      'silver-price-today': { slug: 'سعر-الفضة-اليوم', title: 'سعر الفضة اليوم', subtitle: 'السعر الفوري المباشر' },
      'silver-price-per-ounce': { slug: 'سعر-الفضة-للأوقية', title: 'سعر الفضة للأوقية', subtitle: 'XAG/USD مباشر' },
      '999-silver-price-today': { slug: 'سعر-الفضة-الخالصة-999-اليوم', title: 'سعر الفضة الخالصة 999 اليوم', subtitle: 'الاستثمار في الفضة' },
      '925-silver-price-today': { slug: 'سعر-الفضة-925-اليوم', title: 'سعر الفضة 925 اليوم', subtitle: 'المجوهرات وأدوات المائدة' },
      '900-silver-price-today': { slug: 'سعر-فضة-العملة-900-اليوم', title: 'سعر فضة العملة 900 اليوم', subtitle: 'العملات التاريخية' },
      '800-silver-price-today': { slug: 'سعر-الفضة-800-اليوم', title: 'سعر الفضة 800 اليوم', subtitle: 'الفضة الأوروبية القديمة' },
      'silver-news-today': { slug: 'أخبار-الفضة-اليوم', title: 'أخبار الفضة اليوم', subtitle: 'تحليل السوق' },
      'silver-price-forecast-today': { slug: 'توقعات-سعر-الفضة', title: 'توقعات سعر الفضة 2025–2026', subtitle: 'تحليل وسيناريوهات' },
    }
  },
  hi: {
    name: 'Hindi', dir: 'hi', lang: 'hi',
    currency: 'INR', symbol: '₹', rate: 83.5,
    rtl: false,
    t: {
      siteTitle: 'चाँदी स्क्रैप कैलकुलेटर',
      home: 'होम',
      liveMarket: 'लाइव बाज़ार',
      updatedAt: 'अपडेट:',
      perTroyOz: 'प्रति ट्रॉय औंस',
      perGram: 'प्रति ग्राम',
      perKg: 'प्रति किलोग्राम',
      spotPrice: 'स्पॉट प्राइस',
      purityLabel: 'शुद्धता',
      calculate: 'मूल्य गणना करें',
      meltValue: 'पिघलाने का मूल्य',
      weight: 'वजन',
      unit: 'इकाई',
      grams: 'ग्राम (g)', oz: 'ट्रॉय औंस (ozt)', kg: 'किलोग्राम (kg)',
      dealers: 'अनुशंसित डीलर',
      faq: 'अक्सर पूछे जाने वाले प्रश्न',
      allPrices: 'सभी कीमतें →',
      currentPrice: 'चाँदी का मौजूदा भाव',
      silverPriceToday: 'आज का चाँदी भाव',
      silverPricePerOz: 'प्रति औंस चाँदी भाव',
      newsToday: 'आज की चाँदी खबरें',
      forecast: 'चाँदी भाव का पूर्वानुमान',
    },
    pages: {
      'silver-price-today': { slug: 'aaj-ka-chandi-bhav', title: 'आज का चाँदी भाव', subtitle: 'लाइव स्पॉट प्राइस' },
      'silver-price-per-ounce': { slug: 'chandi-bhav-per-ounce', title: 'प्रति औंस चाँदी भाव', subtitle: 'XAG/USD लाइव' },
      '999-silver-price-today': { slug: '999-shudh-chandi-bhav-aaj', title: '999 शुद्ध चाँदी भाव आज', subtitle: 'निवेश चाँदी' },
      '925-silver-price-today': { slug: '925-chandi-bhav-aaj', title: '925 चाँदी भाव आज', subtitle: 'आभूषण और बर्तन' },
      '900-silver-price-today': { slug: '900-sikka-chandi-bhav-aaj', title: '900 सिक्का चाँदी भाव आज', subtitle: 'ऐतिहासिक सिक्के' },
      '800-silver-price-today': { slug: '800-chandi-bhav-aaj', title: '800 चाँदी भाव आज', subtitle: 'प्राचीन यूरोपीय चाँदी' },
      'silver-news-today': { slug: 'chandi-samachar-aaj', title: 'आज की चाँदी खबरें', subtitle: 'बाज़ार विश्लेषण' },
      'silver-price-forecast-today': { slug: 'chandi-bhav-purvanuman', title: 'चाँदी भाव पूर्वानुमान 2025–2026', subtitle: 'विश्लेषण और परिदृश्य' },
    }
  },
  ur: {
    name: 'Urdu', dir: 'ur', lang: 'ur',
    currency: 'PKR', symbol: '₨', rate: 278.5,
    rtl: true,
    t: {
      siteTitle: 'چاندی سکریپ کیلکولیٹر',
      home: 'ہوم',
      liveMarket: 'لائیو مارکیٹ',
      updatedAt: 'اپ ڈیٹ:',
      perTroyOz: 'فی ٹرائے اونس',
      perGram: 'فی گرام',
      perKg: 'فی کلوگرام',
      spotPrice: 'اسپاٹ قیمت',
      purityLabel: 'خالصیت',
      calculate: 'قیمت حساب کریں',
      meltValue: 'پگھلنے کی قیمت',
      weight: 'وزن',
      unit: 'اکائی',
      grams: 'گرام (g)', oz: 'ٹرائے اونس (ozt)', kg: 'کلوگرام (kg)',
      dealers: 'تجویز کردہ ڈیلر',
      faq: 'اکثر پوچھے گئے سوالات',
      allPrices: 'تمام قیمتیں →',
      currentPrice: 'چاندی کی موجودہ قیمت',
      silverPriceToday: 'آج کی چاندی کی قیمت',
      silverPricePerOz: 'فی اونس چاندی کی قیمت',
      newsToday: 'آج کی چاندی کی خبریں',
      forecast: 'چاندی کی قیمت کا پیش گوئی',
    },
    pages: {
      'silver-price-today': { slug: 'aaj-chandi-ki-qeemat', title: 'آج چاندی کی قیمت', subtitle: 'لائیو اسپاٹ قیمت' },
      'silver-price-per-ounce': { slug: 'chandi-qeemat-fi-ounce', title: 'فی اونس چاندی کی قیمت', subtitle: 'XAG/USD لائیو' },
      '999-silver-price-today': { slug: '999-khalis-chandi-qeemat-aaj', title: '999 خالص چاندی قیمت آج', subtitle: 'سرمایہ کاری چاندی' },
      '925-silver-price-today': { slug: '925-chandi-qeemat-aaj', title: '925 چاندی قیمت آج', subtitle: 'زیورات اور برتن' },
      '900-silver-price-today': { slug: '900-sikka-chandi-qeemat-aaj', title: '900 سکہ چاندی قیمت آج', subtitle: 'تاریخی سکے' },
      '800-silver-price-today': { slug: '800-chandi-qeemat-aaj', title: '800 چاندی قیمت آج', subtitle: 'قدیم یورپی چاندی' },
      'silver-news-today': { slug: 'chandi-khabar-aaj', title: 'آج کی چاندی کی خبریں', subtitle: 'مارکیٹ تجزیہ' },
      'silver-price-forecast-today': { slug: 'chandi-qeemat-peshgoi', title: 'چاندی قیمت پیش گوئی 2025–2026', subtitle: 'تجزیہ اور منظرنامے' },
    }
  }
};

// Purity data per page type
const PURITY_MAP = {
  'silver-price-today': null,
  'silver-price-per-ounce': null,
  '999-silver-price-today': { purity: 0.999, accent: '#34d399', accentRgb: '52,211,153' },
  '925-silver-price-today': { purity: 0.925, accent: '#a855f7', accentRgb: '168,85,247' },
  '900-silver-price-today': { purity: 0.900, accent: '#FBBF24', accentRgb: '251,191,36' },
  '800-silver-price-today': { purity: 0.800, accent: '#f59e0b', accentRgb: '245,158,11' },
  'silver-news-today': null,
  'silver-price-forecast-today': null,
};

function buildPage(lang, langData, pageKey, pageData) {
  const t = langData.t;
  const sym = langData.symbol;
  const rate = langData.rate;
  const pur = PURITY_MAP[pageKey];
  const accent = pur ? pur.accent : '#a855f7';
  const accentRgb = pur ? pur.accentRgb : '168,85,247';
  const purity = pur ? pur.purity : 1;
  const dir = langData.rtl ? ' dir="rtl"' : '';
  const canonical = `https://scrapsilvercalculater.com/${lang}/${pageData.slug}/`;

  const isNews = pageKey === 'silver-news-today';
  const isForecast = pageKey === 'silver-price-forecast-today';
  const isPurityPage = pur !== null && !isNews && !isForecast;
  const isMainPrice = pageKey === 'silver-price-today' || pageKey === 'silver-price-per-ounce';

  // Build the JS price calculation block
  const rateJS = `const RATE = ${rate};`;
  const purityJS = `const PURITY = ${purity};`;

  return `<!DOCTYPE html><html lang="${lang}"${dir}><head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageData.title} | ${t.silverPriceToday}</title>
  <meta name="description" content="${pageData.title} – ${t.spotPrice.toLowerCase()} ${t.perGram}. ${t.meltValue} ${t.calculate.toLowerCase()}.">
  <link rel="canonical" href="${canonical}">
  <link rel="stylesheet" href="/css/style.css">
  <link rel="icon" type="image/png" href="/favicon.png">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-YMX334ZW6Q"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-YMX334ZW6Q');</script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5307005898686879" crossorigin="anonymous"></script>
  <style>
    :root{--acc:${accent};}
    body{color:#f0f4f8;line-height:1.7;}
    .price-card{background:rgba(${accentRgb},0.1);border:1px solid rgba(${accentRgb},0.3);border-radius:16px;padding:28px;}
    .price-label{font-size:13px;color:#8fa3bc;text-transform:uppercase;margin-bottom:12px;font-weight:600;}
    .price-value{font-size:44px;font-weight:800;color:var(--acc);font-family:'JetBrains Mono',monospace;margin-bottom:6px;}
    .price-sub{font-size:12px;color:#8fa3bc;}
    .st{font-size:24px;font-weight:700;margin-bottom:10px;}
    .sd{color:#c2cfe0;max-width:740px;margin-bottom:24px;font-size:15px;}
    .btn{display:inline-flex;align-items:center;gap:8px;padding:13px 22px;background:var(--acc);color:#000;text-decoration:none;border-radius:8px;font-weight:700;font-size:14px;margin-right:12px;margin-bottom:12px;border:none;cursor:pointer;}
    .btn-g{background:rgba(${accentRgb},0.12);color:var(--acc);border:1px solid rgba(${accentRgb},0.3);}
    table{width:100%;border-collapse:collapse;}
    th,td{padding:12px 16px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;}
    th{background:rgba(${accentRgb},0.1);font-size:12px;text-transform:uppercase;font-weight:600;}
    .card{background:rgba(22,22,36,0.7);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:22px;}
  </style>
</head>
<body>
  <div id="site-header"></div>
  <main>
    <div class="container" style="padding-top:16px;"><div id="breadcrumb"></div></div>

    <section class="container" style="padding:40px 20px 20px;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
        <span style="background:rgba(52,211,153,0.12);border:1px solid rgba(52,211,153,0.3);border-radius:20px;padding:5px 14px;font-size:12px;font-weight:700;color:#34d399;">● ${t.liveMarket}</span>
        <span style="font-size:12px;color:#8fa3bc;" id="upd-time">${t.updatedAt}</span>
      </div>
      <h1 style="font-family:'Outfit',sans-serif;font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;line-height:1.1;margin-bottom:14px;">
        ${pageData.title}
        <span style="display:block;color:var(--acc);">${pageData.subtitle}</span>
      </h1>
      <p style="font-size:16px;max-width:700px;color:#c2cfe0;line-height:1.85;" id="hero-desc">
        ${pageData.title} – ${t.spotPrice.toLowerCase()} ${t.perGram} ${t.perTroyOz}.
      </p>
    </section>

    <section class="container" style="padding:20px 20px 48px;">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;">
        <div class="price-card">
          <div class="price-label">${pageData.title} – ${t.perTroyOz}</div>
          <div class="price-value">${sym}<span id="p-oz">--</span></div>
          <div class="price-sub">${t.spotPrice}${purity < 1 ? ' × ' + purity : ''}</div>
        </div>
        <div class="price-card">
          <div class="price-label">${pageData.title} – ${t.perGram}</div>
          <div class="price-value">${sym}<span id="p-gm">--</span></div>
          <div class="price-sub">${t.perGram}</div>
        </div>
        <div class="price-card">
          <div class="price-label">${pageData.title} – ${t.perKg}</div>
          <div class="price-value">${sym}<span id="p-kg">--</span></div>
          <div class="price-sub">${t.perKg}</div>
        </div>
      </div>
      <div style="margin-top:24px;">
        <button class="btn" onclick="calcVal()">⬡ ${t.calculate}</button>
        <a href="/${lang}/precio-de-la-plata-por-gramo/" class="btn btn-g">${t.allPrices}</a>
      </div>
    </section>

${isPurityPage ? `
    <section class="container" style="padding:0 20px 52px;">
      <h2 class="st">${t.meltValue} ${t.calculate}</h2>
      <p class="sd">${t.weight} → ${t.meltValue}</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;">
        <div class="card">
          <div style="margin-bottom:16px;">
            <label style="display:block;font-size:12px;font-weight:600;color:#8fa3bc;margin-bottom:6px;text-transform:uppercase;">${t.weight}</label>
            <input type="number" id="c-amt" value="100" min="0" style="width:100%;padding:13px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#f0f4f8;font-size:16px;">
          </div>
          <div style="margin-bottom:18px;">
            <label style="display:block;font-size:12px;font-weight:600;color:#8fa3bc;margin-bottom:6px;text-transform:uppercase;">${t.unit}</label>
            <select id="c-unit" style="width:100%;padding:13px;background:rgba(22,22,36,0.9);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#f0f4f8;font-size:16px;">
              <option value="g">${t.grams}</option><option value="oz">${t.oz}</option><option value="kg">${t.kg}</option>
            </select>
          </div>
          <button class="btn" style="width:100%;margin-right:0;" onclick="calcVal()">${t.calculate}</button>
          <div id="c-res" style="margin-top:18px;padding:18px;background:rgba(${accentRgb},0.1);border:1px solid rgba(${accentRgb},0.3);border-radius:8px;display:none;">
            <div style="font-size:11px;color:#8fa3bc;margin-bottom:4px;text-transform:uppercase;">${t.meltValue}</div>
            <div style="font-size:32px;font-weight:800;color:var(--acc);font-family:'JetBrains Mono',monospace;">${sym}<span id="c-val">0.00</span></div>
          </div>
        </div>
        <div class="card">
          <h3 style="font-size:15px;font-weight:600;margin-bottom:14px;">${t.meltValue}</h3>
          <table><thead><tr><th>${t.weight}</th><th>${t.meltValue}</th></tr></thead><tbody id="ref-tbl"></tbody></table>
        </div>
      </div>
    </section>` : ''}

    <section class="container" style="padding:0 20px 52px;">
      <h2 class="st">${t.faq}</h2>
      <div style="display:flex;flex-direction:column;gap:12px;max-width:800px;">
        <div class="card"><h3 style="font-size:15px;font-weight:700;margin-bottom:8px;">${pageData.title}?</h3><p style="color:#c2cfe0;font-size:14px;line-height:1.8;">${t.spotPrice} ${t.perGram} ${t.perTroyOz}. ${t.meltValue}.</p></div>
        <div class="card"><h3 style="font-size:15px;font-weight:700;margin-bottom:8px;">${t.calculate}?</h3><p style="color:#c2cfe0;font-size:14px;line-height:1.8;">${t.weight} × ${t.purityLabel} × ${t.spotPrice} / 31.1035 = ${t.meltValue}.</p></div>
      </div>
    </section>

    <section class="container" style="padding:0 20px 52px;">
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="/${lang}/" class="btn">${t.home}</a>
        <a href="/${lang}/precio-de-la-plata-por-gramo/" class="btn btn-g">${t.allPrices}</a>
      </div>
    </section>
  </main>
  <div id="site-footer"></div>
  <script src="/js/silver-price.js"></script>
  <script src="/js/components.js"></script>
  <script>
    ${rateJS} ${purityJS}
    function fmt(v){return v.toLocaleString('${lang}',{minimumFractionDigits:2,maximumFractionDigits:2});}
    function upd(){
      try{
        const usd=SilverPrice.getPrice();if(!usd)return;
        const base=usd*RATE*PURITY;
        const gm=base/31.1035;
        document.getElementById('p-oz').textContent=fmt(base);
        document.getElementById('p-gm').textContent=fmt(gm);
        document.getElementById('p-kg').textContent=fmt(gm*1000);
        ${isPurityPage ? `
        const ws=[{l:'1g',g:1},{l:'5g',g:5},{l:'10g',g:10},{l:'50g',g:50},{l:'100g',g:100},{l:'500g',g:500}];
        document.getElementById('ref-tbl').innerHTML=ws.map(w=>'<tr><td>'+w.l+'</td><td style="font-weight:600;color:var(--acc);">${sym}'+fmt(w.g*gm)+'</td></tr>').join('');` : ''}
        document.getElementById('upd-time').textContent='${t.updatedAt} '+new Date().toLocaleTimeString('${lang}',{hour:'2-digit',minute:'2-digit'});
      }catch(e){}
    }
    function calcVal(){
      try{
        const a=parseFloat(document.getElementById('c-amt')?.value)||0;
        const u=document.getElementById('c-unit')?.value||'g';
        const usd=SilverPrice.getPrice();
        const base=usd*RATE*PURITY;
        const gm=base/31.1035;
        let g=a;if(u==='oz')g=a*31.1035;if(u==='kg')g=a*1000;
        const el=document.getElementById('c-res');
        const vEl=document.getElementById('c-val');
        if(el&&vEl){vEl.textContent=fmt(g*gm);el.style.display='block';}
      }catch(e){}
    }
    SiteComponents.renderBreadcrumb('breadcrumb',[{label:'${t.home}',href:'/'},{label:'${pageData.title}'}]);
    upd();SilverPrice.onPriceUpdate(()=>upd());
  </script>
</body></html>`;
}

// Generate all pages
let created = 0;
const slugUpdates = {};

for (const [lang, langData] of Object.entries(LANGS)) {
  const dir = path.join(ROOT, langData.dir);
  slugUpdates[lang] = {};

  for (const [pageKey, pageData] of Object.entries(langData.pages)) {
    const filename = pageData.slug + '.html';
    const filepath = path.join(dir, filename);

    // Skip if already exists
    if (fs.existsSync(filepath)) {
      console.log(`SKIP (exists): ${lang}/${filename}`);
      slugUpdates[lang][pageKey] = pageData.slug;
      continue;
    }

    const html = buildPage(lang, langData, pageKey, pageData);
    fs.writeFileSync(filepath, html, 'utf8');
    console.log(`CREATED: ${lang}/${filename}`);
    slugUpdates[lang][pageKey] = pageData.slug;
    created++;
  }
}

console.log(`\nDone. Created ${created} pages.`);
console.log('\nSlug updates for translations.js:');
console.log(JSON.stringify(slugUpdates, null, 2));
