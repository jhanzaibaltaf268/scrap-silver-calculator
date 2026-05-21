#!/bin/bash

# Copy template to all language directories
for LANG in de es fr it pt ru tr ur zh; do
  cp index.html "$LANG/index.html"
done

# Create a simple Python script to do the replacements safely
python3 -c "
import os
import re

template = open('index.html', 'r', encoding='utf-8').read()

languages = {
    'de': {
        'title': 'Schrottsilber-Rechner – Schmelzwert & Live-Preise',
        'desc': 'Berechnen Sie den Schmelzwert von Schrottsilber sofort mit Live-Silberpreisen. Sterling (925), fein (999), Münze (900), europäisch (800). Kostenloser Schmelzwertrechner, stündlich aktualisiert.',
        'live_data': 'Live-Marktdaten',
        'spot': 'Silber-Spotpreis',
        'today': 'Heutige Preise',
        'qa': 'Wie viel ist Schrottsilber heute wert?',
        'rtl': False,
    },
    'es': {
        'title': 'Calculadora de Plata Reciclada – Valor de Fusión & Precios en Vivo',
        'desc': 'Calcule el valor de la plata reciclada al instante usando precios de plata en vivo. Sterling (925), fino (999), moneda (900), europeo (800). Calculadora de valor de fusión gratuita actualizada cada hora.',
        'live_data': 'Datos de Mercado en Vivo',
        'spot': 'Precio de Plata al Contado',
        'today': 'Precios de Hoy',
        'qa': '¿Cuánto vale la plata reciclada hoy?',
        'rtl': False,
    },
    'fr': {
        'title': \"Calculatrice d'Argent Recyclé – Valeur de Fusion & Prix en Temps Réel\",
        'desc': \"Calculez la valeur de l'argent reciclé instantanément en utilisant les prix de l'argent en direct. Sterling (925), fin (999), pièces (900), européen (800). Calculatrice de valeur de fusion gratuite mise à jour toutes les heures.\",
        'live_data': 'Données de Marché en Direct',
        'spot': \"Prix de Spot de l'Argent\",
        'today': \"Prix d'Aujourd'hui\",
        'qa': \"Combien vaut l'argent reciclé aujourd'hui?\",
        'rtl': False,
    },
    'it': {
        'title': 'Calcolatrice Argento Rottame – Valore di Fusione & Prezzi Live',
        'desc': \"Calcola il valore del rottame d'argento istantaneamente utilizzando i prezzi dell'argento in tempo reale. Sterling (925), fino (999), moneta (900), europeo (800). Calcolatrice del valore di fusione gratuita aggiornata ogni ora.\",
        'live_data': 'Dati di Mercato in Diretta',
        'spot': \"Prezzo Spot dell'Argento\",
        'today': 'Prezzi Odierni',
        'qa': \"Quanto vale il rottame d'argento oggi?\",
        'rtl': False,
    },
    'pt': {
        'title': 'Calculadora de Prata Reciclada – Valor de Fusão & Preços em Tempo Real',
        'desc': 'Calcule o valor da prata reciclada instantaneamente usando os preços de prata ao vivo. Sterling (925), fino (999), moeda (900), europeu (800). Calculadora de valor de fusão gratuita atualizada a cada hora.',
        'live_data': 'Dados de Mercado ao Vivo',
        'spot': 'Preço de Prata Spot',
        'today': 'Preços de Hoje',
        'qa': 'Quanto vale a prata reciclada hoje?',
        'rtl': False,
    },
    'ru': {
        'title': 'Калькулятор серебра – Стоимость плавки и живые цены',
        'desc': 'Рассчитайте стоимость лома серебра мгновенно, используя живые цены серебра. Sterling (925), чистое (999), монета (900), европейское (800). Бесплатный калькулятор стоимости плавки, обновляемый каждый час.',
        'live_data': 'Данные Рынка в Реальном Времени',
        'spot': 'Цена Спота Серебра',
        'today': 'Цены Сегодня',
        'qa': 'Сколько сегодня стоит лом серебра?',
        'rtl': False,
    },
    'tr': {
        'title': 'Hurda Gümüş Hesaplayıcı – Erime Değeri ve Canlı Fiyatlar',
        'desc': 'Canlı gümüş fiyatlarını kullanarak hurda gümüş değerini anında hesaplayın. Sterling (925), saf (999), madeni para (900), Avrupa (800). Saatte bir güncellenen ücretsiz erime değeri hesaplayıcı.',
        'live_data': 'Canlı Pazar Verileri',
        'spot': 'Gümüş Spot Fiyatı',
        'today': 'Bugünün Fiyatları',
        'qa': 'Hurda gümüş bugün ne kadar değerli?',
        'rtl': False,
    },
    'ur': {
        'title': 'سکریپ سلور کیلکولیٹر – پگھلنے کی قیمت اور لائیو قیمتیں',
        'desc': 'لائیو سلور کی قیمتوں کا استعمال کرتے ہوئے سکریپ سلور کی قیمت فوری طور پر کا لکولیٹ کریں۔ سٹرلنگ (925)، فائن (999)، کوائن (900)، یورپی (800)۔ ہر گھنٹے اپ ڈیٹ ہونے والا مفت پگھلنے کی قیمت کیلکولیٹر۔',
        'live_data': 'لائیو مارکٹ ڈیٹا',
        'spot': 'سلور اسپاٹ قیمت',
        'today': 'آج کی قیمتیں',
        'qa': 'آج سکریپ سلور کی قیمت کتنی ہے?',
        'rtl': True,
    },
    'zh': {
        'title': '废料白银计算器 – 熔化价值和实时价格',
        'desc': '使用实时白银价格即时计算废料白银的价值。斯特林(925)、纯(999)、硬币(900)、欧洲(800)。免费熔化价值计算器，每小时更新一次。',
        'live_data': '实时市场数据',
        'spot': '白银现货价格',
        'today': '今日价格',
        'qa': '今天废料白银值多少钱?',
        'rtl': False,
    },
}

for code, trans in languages.items():
    content = template
    
    # Replace lang attribute
    content = content.replace('lang=\"en\"', 'lang=\"' + code + '\"')
    
    # Add RTL if needed
    if trans['rtl']:
        content = content.replace('<html lang=\"' + code + '\">', '<html lang=\"' + code + '\" dir=\"rtl\">')
    
    # Replace title
    old_title = '<title>Scrap Silver Calculator – Instant Silver Melt Value & Live Prices</title>'
    new_title = '<title>' + trans['title'] + '</title>'
    content = content.replace(old_title, new_title)
    
    # Replace canonical
    content = re.sub(r'<link rel=\"canonical\" href=\"https://scrapsilvercalculater.com/\">', f'<link rel=\"canonical\" href=\"https://scrapsilvercalculater.com/{code}/\">', content)
    
    # Replace hreflang for this language (first occurrence)
    hreflang_pattern = f'<link rel=\"alternate\" hreflang=\"{code}\" href=\"https://scrapsilvercalculater.com/\">'
    hreflang_replace = f'<link rel=\"alternate\" hreflang=\"{code}\" href=\"https://scrapsilvercalculater.com/{code}/\">'
    content = content.replace(hreflang_pattern, hreflang_replace, 1)
    
    # Replace text strings
    content = content.replace('Live Market Data', trans['live_data'])
    content = content.replace('Silver Spot Price', trans['spot'])
    content = content.replace(\"Today's Prices\", trans['today'])
    content = content.replace('How much is scrap silver worth today?', trans['qa'])
    
    # Write file
    with open(f'{code}/index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'✓ {code}')
" || echo "Python3 not available, trying alternative..."

echo "Done!"
