#!/bin/bash

# Read template to get exact en-dash
TEMPLATE=$(cat index.html)

# Extract the exact title string (with the special dash)
ORIGINAL_TITLE=$(grep '<title>' index.html | sed 's/.*<title>//;s/<\/title>.*//')

echo "Original title: '$ORIGINAL_TITLE'"

# Create updater for each language
declare -A TITLES=(
  [de]="Schrottsilber-Rechner – Schmelzwert & Live-Preise"
  [es]="Calculadora de Plata Reciclada – Valor de Fusión & Precios en Vivo"
  [fr]="Calculatrice d'Argent Recyclé – Valeur de Fusion & Prix en Temps Réel"
  [it]="Calcolatrice Argento Rottame – Valore di Fusione & Prezzi Live"
  [pt]="Calculadora de Prata Reciclada – Valor de Fusão & Preços em Tempo Real"
  [ru]="Калькулятор серебра – Стоимость плавки и живые цены"
  [tr]="Hurda Gümüş Hesaplayıcı – Erime Değeri ve Canlı Fiyatlar"
  [ur]="سکریپ سلور کیلکولیٹر – پگھلنے کی قیمت اور لائیو قیمتیں"
  [zh]="废料白银计算器 – 熔化价值和实时价格"
)

for CODE in "${!TITLES[@]}"; do
  FILE="$CODE/index.html"
  NEW_TITLE="${TITLES[$CODE]}"
  
  # Replace using the exact string
  sed -i "s|<title>$ORIGINAL_TITLE</title>|<title>$NEW_TITLE</title>|" "$FILE"
  
  echo "✓ Updated title for $CODE"
done

echo "Done!"
