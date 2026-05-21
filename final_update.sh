#!/bin/bash

# For each language, use specific sed replacements
LANGS=(
  "de:Schrottsilber-Rechner – Schmelzwert & Live-Preise:Live-Marktdaten:Silber-Spotpreis:Heutige Preise:Wie viel ist Schrottsilber heute wert?:false"
  "es:Calculadora de Plata Reciclada – Valor de Fusión & Precios en Vivo:Datos de Mercado en Vivo:Precio de Plata al Contado:Precios de Hoy:¿Cuánto vale la plata reciclada hoy?:false"
  "fr:Calculatrice d'Argent Recyclé – Valeur de Fusion & Prix en Temps Réel:Données de Marché en Direct:Prix de Spot de l'Argent:Prix d'Aujourd'hui:Combien vaut l'argent reciclé aujourd'hui?:false"
  "it:Calcolatrice Argento Rottame – Valore di Fusione & Prezzi Live:Dati di Mercato in Diretta:Prezzo Spot dell'Argento:Prezzi Odierni:Quanto vale il rottame d'argento oggi?:false"
  "pt:Calculadora de Prata Reciclada – Valor de Fusão & Preços em Tempo Real:Dados de Mercado ao Vivo:Preço de Prata Spot:Preços de Hoje:Quanto vale a prata reciclada hoje?:false"
  "ru:Калькулятор серебра – Стоимость плавки и живые цены:Данные Рынка в Реальном Времени:Цена Спота Серебра:Цены Сегодня:Сколько сегодня стоит лом серебра?:false"
  "tr:Hurda Gümüş Hesaplayıcı – Erime Değeri ve Canlı Fiyatlar:Canlı Pazar Verileri:Gümüş Spot Fiyatı:Bugünün Fiyatları:Hurda gümüş bugün ne kadar değerli?:false"
  "ur:سکریپ سلور کیلکولیٹر – پگھلنے کی قیمت اور لائیو قیمتیں:لائیو مارکٹ ڈیٹا:سلور اسپاٹ قیمت:آج کی قیمتیں:آج سکریپ سلور کی قیمت کتنی ہے?:true"
  "zh:废料白银计算器 – 熔化价值和实时价格:实时市场数据:白银现货价格:今日价格:今天废料白银值多少钱?:false"
)

for LANG_DATA in "${LANGS[@]}"; do
  IFS=':' read -r CODE TITLE LIVEDATA SPOT TODAY QA RTL <<< "$LANG_DATA"
  
  FILE="$CODE/index.html"
  echo "Updating $CODE..."
  
  # Change lang attribute
  sed -i 's/lang="en"/lang="'"$CODE"'"/g' "$FILE"
  
  # Add RTL if needed
  if [ "$RTL" = "true" ]; then
    sed -i 's/<html lang="'"$CODE"'"/<html lang="'"$CODE"'" dir="rtl"/g' "$FILE"
  fi
  
  # Update canonical (exact match approach)
  sed -i 's~<link rel="canonical" href="https://scrapsilvercalculater.com/">~<link rel="canonical" href="https://scrapsilvercalculater.com/'"$CODE"'/">~g' "$FILE"
  
  # Update hreflang for current language only (use word boundary)
  sed -i 's~<link rel="alternate" hreflang="'"$CODE"'" href="https://scrapsilvercalculater.com/">~<link rel="alternate" hreflang="'"$CODE"'" href="https://scrapsilvercalculater.com/'"$CODE"'/">~g' "$FILE"
  
  # Update text (use double quotes to allow variable expansion)
  sed -i "s~Live Market Data~$LIVEDATA~g" "$FILE"
  sed -i "s~Silver Spot Price~$SPOT~g" "$FILE"
  sed -i "s~Today's Prices~$TODAY~g" "$FILE"
  sed -i "s~How much is scrap silver worth today?~$QA~g" "$FILE"
  
  echo "✓ $CODE updated"
done

echo ""
echo "All languages updated successfully!"
