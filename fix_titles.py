#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os

languages = {
    'de': 'Schrottsilber-Rechner – Schmelzwert & Live-Preise',
    'es': 'Calculadora de Plata Reciclada – Valor de Fusión & Precios en Vivo',
    'fr': "Calculatrice d'Argent Recyclé – Valeur de Fusion & Prix en Temps Réel",
    'it': 'Calcolatrice Argento Rottame – Valore di Fusione & Prezzi Live',
    'pt': 'Calculadora de Prata Reciclada – Valor de Fusão & Preços em Tempo Real',
    'ru': 'Калькулятор серебра – Стоимость плавки и живые цены',
    'tr': 'Hurda Gümüş Hesaplayıcı – Erime Değeri ve Canlı Fiyatlar',
    'ur': 'سکریپ سلور کیلکولیٹر – پگھلنے کی قیمت اور لائیو قیمتیں',
    'zh': '废料白银计算器 – 熔化价值和实时价格',
}

for code, title in languages.items():
    file_path = f'{code}/index.html'
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the English title with the localized one
    old_title = '<title>Scrap Silver Calculator – Instant Silver Melt Value & Live Prices</title>'
    new_title = f'<title>{title}</title>'
    
    content = content.replace(old_title, new_title)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'✓ {code}: {title}')
