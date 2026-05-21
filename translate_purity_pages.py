#!/usr/bin/env python3
"""
Translate 999, 925, 900, 800 silver price pages to all 11 languages.
"""
import os
import re

# Language codes and language names
LANGUAGES = {
    'es': 'Español',
    'fr': 'Français',
    'de': 'Deutsch',
    'it': 'Italiano',
    'pt': 'Português',
    'ru': 'Русский',
    'ar': 'العربية',
    'hi': 'हिन्दी',
    'ur': 'اردو',
    'tr': 'Türkçe',
    'zh': '中文'
}

TRANSLATIONS = {
    'es': {
        '999 Fine Silver Price Today': 'Precio de la Plata Fina 999 Hoy',
        'Live Price Per Gram & Per Ounce': 'Precio en Vivo Por Gramo y Por Onza',
        '999 Silver Price Today': 'Precio de Plata 999 Hoy',
        '900 Silver Price Today': 'Precio de Plata 900 Hoy',
        '900 Coin Silver (Junk Silver) Melt Value': 'Valor de Fusión de Plata de Moneda 900',
        '800 Silver Price Today': 'Precio de Plata 800 Hoy',
        'European Silver — Live Melt Value Per Gram & Ounce': 'Plata Europea — Valor de Fusión en Vivo Por Gramo y Onza',
        '925 Sterling Silver Price Today': 'Precio de Plata 925 Esterlina Hoy',
        'Silver Prices': 'Precios de Plata',
        'Home': 'Inicio',
        'Calculate Your': 'Calcular Su',
        'Value Now': 'Valor Ahora',
        'View Full Price Dashboard': 'Ver Panel de Precios Completo',
        'What Is': '¿Qué es',
        'Today\'s Prices': 'Precios de Hoy',
        'Price Change': 'Cambio de Precio',
        'vs yesterday': 'vs ayer',
        'Live USD': 'USD en Vivo',
        'Per Troy Ounce': 'Por Onza Troy',
        'Per Gram': 'Por Gramo',
        'Per Pound': 'Por Libra',
        'Melt Value': 'Valor de Fusión',
        'Estimated': 'Estimado',
        'Pure Silver': 'Plata Pura',
        'FAQ': 'Preguntas Frecuentes',
        'Related': 'Relacionado',
        'Tools': 'Herramientas',
        'Calculator': 'Calculadora',
        'Identify': 'Identificar',
        'Sell': 'Vender',
        'Hallmarks': 'Marcas de Ley',
    },
    'fr': {
        '999 Fine Silver Price Today': 'Prix de l\'Argent Fin 999 Aujourd\'hui',
        'Live Price Per Gram & Per Ounce': 'Prix en Direct Par Gramme et Par Once',
        '999 Silver Price Today': 'Prix de l\'Argent 999 Aujourd\'hui',
        '900 Silver Price Today': 'Prix de l\'Argent 900 Aujourd\'hui',
        '800 Silver Price Today': 'Prix de l\'Argent 800 Aujourd\'hui',
        '925 Sterling Silver Price Today': 'Prix de l\'Argent Sterling 925 Aujourd\'hui',
        'Silver Prices': 'Prix de l\'Argent',
        'Home': 'Accueil',
        'Today\'s Prices': 'Prix d\'Aujourd\'hui',
        'vs yesterday': 'par rapport à hier',
        'Per Troy Ounce': 'Par Once Troy',
        'Per Gram': 'Par Gramme',
        'Per Pound': 'Par Livre',
    },
    'de': {
        '999 Fine Silver Price Today': 'Preis für 999er Feinsil ber Heute',
        'Live Price Per Gram & Per Ounce': 'Livepreis pro Gramm & pro Unze',
        '999 Silver Price Today': 'Silberpreis 999 Heute',
        '900 Silver Price Today': 'Silberpreis 900 Heute',
        '800 Silver Price Today': 'Silberpreis 800 Heute',
        '925 Sterling Silver Price Today': 'Sterling-Silberpreis 925 Heute',
        'Silver Prices': 'Silberpreise',
        'Home': 'Startseite',
        'Today\'s Prices': 'Heutige Preise',
        'vs yesterday': 'vs gestern',
        'Per Troy Ounce': 'Pro Feinunze',
        'Per Gram': 'Pro Gramm',
    },
    'it': {
        '999 Fine Silver Price Today': 'Prezzo dell\'Argento Fine 999 Oggi',
        'Live Price Per Gram & Per Ounce': 'Prezzo in Diretta Per Grammo e Per Oncia',
        '999 Silver Price Today': 'Prezzo dell\'Argento 999 Oggi',
        '900 Silver Price Today': 'Prezzo dell\'Argento 900 Oggi',
        '800 Silver Price Today': 'Prezzo dell\'Argento 800 Oggi',
        '925 Sterling Silver Price Today': 'Prezzo dell\'Argento Sterling 925 Oggi',
        'Silver Prices': 'Prezzi dell\'Argento',
        'Home': 'Home',
        'Today\'s Prices': 'Prezzi di Oggi',
        'vs yesterday': 'vs ieri',
    },
    'pt': {
        '999 Fine Silver Price Today': 'Preço da Prata Fina 999 Hoje',
        'Live Price Per Gram & Per Ounce': 'Preço em Direto Por Grama e Por Onça',
        '999 Silver Price Today': 'Preço da Prata 999 Hoje',
        '900 Silver Price Today': 'Preço da Prata 900 Hoje',
        '800 Silver Price Today': 'Preço da Prata 800 Hoje',
        '925 Sterling Silver Price Today': 'Preço da Prata Sterling 925 Hoje',
        'Silver Prices': 'Preços da Prata',
        'Home': 'Início',
        'Today\'s Prices': 'Preços de Hoje',
        'vs yesterday': 'vs ontem',
    },
    'ru': {
        '999 Fine Silver Price Today': 'Цена чистого серебра 999 сегодня',
        'Live Price Per Gram & Per Ounce': 'Цена в реальном времени за грамм и за унцию',
        '999 Silver Price Today': 'Цена серебра 999 сегодня',
        '900 Silver Price Today': 'Цена серебра 900 сегодня',
        '800 Silver Price Today': 'Цена серебра 800 сегодня',
        '925 Sterling Silver Price Today': 'Цена серебра 925 сегодня',
        'Silver Prices': 'Цены серебра',
        'Home': 'Главная',
        'Today\'s Prices': 'Цены на сегодня',
        'vs yesterday': 'vs вчера',
    },
    'ar': {
        '999 Fine Silver Price Today': 'سعر الفضة الخالصة 999 اليوم',
        'Live Price Per Gram & Per Ounce': 'السعر المباشر لكل جرام ولكل أونصة',
        '999 Silver Price Today': 'سعر الفضة 999 اليوم',
        '900 Silver Price Today': 'سعر الفضة 900 اليوم',
        '800 Silver Price Today': 'سعر الفضة 800 اليوم',
        '925 Sterling Silver Price Today': 'سعر الفضة الإسترلينية 925 اليوم',
        'Silver Prices': 'أسعار الفضة',
        'Home': 'الرئيسية',
        'Today\'s Prices': 'أسعار اليوم',
        'vs yesterday': 'مقابل الأمس',
    },
    'hi': {
        '999 Fine Silver Price Today': 'आज 999 शुद्ध चाँदी की कीमत',
        'Live Price Per Gram & Per Ounce': 'प्रति ग्राम और प्रति औंस लाइव मूल्य',
        '999 Silver Price Today': 'आज 999 चाँदी की कीमत',
        '900 Silver Price Today': 'आज 900 चाँदी की कीमत',
        '800 Silver Price Today': 'आज 800 चाँदी की कीमत',
        '925 Sterling Silver Price Today': 'आज 925 स्टर्लिंग चाँदी की कीमत',
        'Silver Prices': 'चाँदी की कीमतें',
        'Home': 'होम',
        'Today\'s Prices': 'आज की कीमतें',
        'vs yesterday': 'बनाम कल',
    },
    'ur': {
        '999 Fine Silver Price Today': 'آج 999 خالص چاندی کی قیمت',
        'Live Price Per Gram & Per Ounce': 'فی گرام اور فی اونس لائیو قیمت',
        '999 Silver Price Today': 'آج 999 چاندی کی قیمت',
        '900 Silver Price Today': 'آج 900 چاندی کی قیمت',
        '800 Silver Price Today': 'آج 800 چاندی کی قیمت',
        '925 Sterling Silver Price Today': 'آج 925 سٹرلنگ چاندی کی قیمت',
        'Silver Prices': 'چاندی کی قیمتیں',
        'Home': 'ہوم',
        'Today\'s Prices': 'آج کی قیمتیں',
        'vs yesterday': 'بمقابلہ کل',
    },
    'tr': {
        '999 Fine Silver Price Today': 'Bugün 999 Saf Gümüş Fiyatı',
        'Live Price Per Gram & Per Ounce': 'Canlı Fiyat Gram Başına & Ons Başına',
        '999 Silver Price Today': 'Bugün 999 Gümüş Fiyatı',
        '900 Silver Price Today': 'Bugün 900 Gümüş Fiyatı',
        '800 Silver Price Today': 'Bugün 800 Gümüş Fiyatı',
        '925 Sterling Silver Price Today': 'Bugün 925 Sterling Gümüş Fiyatı',
        'Silver Prices': 'Gümüş Fiyatları',
        'Home': 'Başlangıç',
        'Today\'s Prices': 'Bugünün Fiyatları',
        'vs yesterday': 'dün\'e karşı',
    },
    'zh': {
        '999 Fine Silver Price Today': '今日999纯银价格',
        'Live Price Per Gram & Per Ounce': '每克和每盎司的实时价格',
        '999 Silver Price Today': '今日999银价格',
        '900 Silver Price Today': '今日900银价格',
        '800 Silver Price Today': '今日800银价格',
        '925 Sterling Silver Price Today': '今日925纯银价格',
        'Silver Prices': '白银价格',
        'Home': '首页',
        'Today\'s Prices': '今日价格',
        'vs yesterday': '与昨日相比',
    },
}

def translate_html(html_content, lang_code, page_type):
    """Translate HTML content to target language."""
    content = html_content

    # Update lang attribute
    content = re.sub(r'<html lang="en">', f'<html lang="{lang_code}">', content)

    # Update canonical link
    if page_type == '999':
        content = re.sub(
            r'<link rel="canonical" href="https://scrapsilvercalculater\.com/999-silver-price-today/">',
            f'<link rel="canonical" href="https://scrapsilvercalculater.com/{lang_code}/999-silver-price-today/">',
            content
        )
    elif page_type == '925':
        content = re.sub(
            r'<link rel="canonical" href="https://scrapsilvercalculater\.com/925-silver-price-today/">',
            f'<link rel="canonical" href="https://scrapsilvercalculater.com/{lang_code}/925-silver-price-today/">',
            content
        )
    elif page_type == '900':
        content = re.sub(
            r'<link rel="canonical" href="https://scrapsilvercalculater\.com/900-silver-price-today/">',
            f'<link rel="canonical" href="https://scrapsilvercalculater.com/{lang_code}/900-silver-price-today/">',
            content
        )
    elif page_type == '800':
        content = re.sub(
            r'<link rel="canonical" href="https://scrapsilvercalculater\.com/800-silver-price-today/">',
            f'<link rel="canonical" href="https://scrapsilvercalculater.com/{lang_code}/800-silver-price-today/">',
            content
        )

    # Add hreflang alternates for all languages
    hreflang_insert = ''
    for other_lang in LANGUAGES.keys():
        if page_type == '999':
            path = f'{other_lang}/999-silver-price-today/' if other_lang != 'en' else '999-silver-price-today/'
        elif page_type == '925':
            path = f'{other_lang}/925-silver-price-today/' if other_lang != 'en' else '925-silver-price-today/'
        elif page_type == '900':
            path = f'{other_lang}/900-silver-price-today/' if other_lang != 'en' else '900-silver-price-today/'
        else:  # 800
            path = f'{other_lang}/800-silver-price-today/' if other_lang != 'en' else '800-silver-price-today/'

        hreflang_insert += f'  <link rel="alternate" hreflang="{other_lang}" href="https://scrapsilvercalculater.com/{path}">\n'

    # Also add English and x-default
    if page_type == '999':
        hreflang_insert += f'  <link rel="alternate" hreflang="en" href="https://scrapsilvercalculater.com/999-silver-price-today/">\n'
        hreflang_insert += f'  <link rel="alternate" hreflang="x-default" href="https://scrapsilvercalculater.com/999-silver-price-today/">\n'
    elif page_type == '925':
        hreflang_insert += f'  <link rel="alternate" hreflang="en" href="https://scrapsilvercalculater.com/925-silver-price-today/">\n'
        hreflang_insert += f'  <link rel="alternate" hreflang="x-default" href="https://scrapsilvercalculater.com/925-silver-price-today/">\n'
    elif page_type == '900':
        hreflang_insert += f'  <link rel="alternate" hreflang="en" href="https://scrapsilvercalculater.com/900-silver-price-today/">\n'
        hreflang_insert += f'  <link rel="alternate" hreflang="x-default" href="https://scrapsilvercalculater.com/900-silver-price-today/">\n'
    else:  # 800
        hreflang_insert += f'  <link rel="alternate" hreflang="en" href="https://scrapsilvercalculater.com/800-silver-price-today/">\n'
        hreflang_insert += f'  <link rel="alternate" hreflang="x-default" href="https://scrapsilvercalculater.com/800-silver-price-today/">\n'

    # Replace old hreflang section with new one
    content = re.sub(
        r'<link rel="alternate" hreflang="[^"]*" href="[^"]*">\n  <link rel="alternate" hreflang="[^"]*" href="[^"]*">\n',
        hreflang_insert,
        content
    )

    # Apply text translations
    if lang_code in TRANSLATIONS:
        for en_text, trans_text in TRANSLATIONS[lang_code].items():
            content = content.replace(en_text, trans_text)

    return content

# Read English versions and translate
pages = {
    '999': '999-silver-price-today.html',
    '925': '925-silver-price-today.html',
    '900': '900-silver-price-today.html',
    '800': '800-silver-price-today.html',
}

for lang_code in LANGUAGES.keys():
    print(f"Translating to {LANGUAGES[lang_code]} ({lang_code})...")
    for page_type, filename in pages.items():
        with open(filename, 'r', encoding='utf-8') as f:
            html = f.read()

        # Translate
        translated = translate_html(html, lang_code, page_type)

        # Write to language directory
        lang_file = f'{lang_code}/{filename}'
        os.makedirs(lang_code, exist_ok=True)
        with open(lang_file, 'w', encoding='utf-8') as f:
            f.write(translated)
        print(f"  ✓ {lang_file}")

print("\nDone! All 44 pages translated.")
