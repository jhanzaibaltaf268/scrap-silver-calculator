#!/bin/bash
export LC_ALL=C.UTF-8

# Read template
TEMPLATE=$(cat index.html)

# Function to safely update a language
update_lang() {
  local CODE=$1
  local TITLE=$2
  local DESC=$3
  local LIVEDATA=$4
  local SPOT=$5
  local TODAY=$6
  local QA=$7
  local RTL=$8
  
  local FILE="$CODE/index.html"
  
  # Write template
  echo "$TEMPLATE" > "$FILE"
  
  # Use sed for safe replacements with UTF-8
  # Replace lang
  sed -i.bak "s/lang=\"en\"/lang=\"$CODE\"/g" "$FILE"
  
  # Add RTL if needed
  if [ "$RTL" = "1" ]; then
    sed -i "s/<html lang=\"$CODE\">/<html lang=\"$CODE\" dir=\"rtl\">/g" "$FILE"
  fi
  
  # Replace canonical
  sed -i "s|scrapsilvercalculater.com/\">|scrapsilvercalculater.com/$CODE/\">|g" "$FILE"
  
  # Fix hreflang duplication for this language
  sed -i "0,/<link rel=\"alternate\" hreflang=\"$CODE\"/s|href=\"https://scrapsilvercalculater.com/\">|href=\"https://scrapsilvercalculater.com/$CODE/\">|" "$FILE"
  
  # Replace text content using simple strings (English text)
  sed -i "s/Scrap Silver Calculator – Instant Silver Melt Value & Live Prices/$TITLE/g" "$FILE"
  sed -i "s/Live Market Data/$LIVEDATA/g" "$FILE"
  sed -i "s/Silver Spot Price/$SPOT/g" "$FILE"
  sed -i "s/Today's Prices/$TODAY/g" "$FILE"
  sed -i "s/How much is scrap silver worth today?/$QA/g" "$FILE"
  sed -i "s/📊 Calculate Silver Value/📊 $LIVEDATA/g" "$FILE"
  
  rm -f "$FILE.bak"
  echo "✓ Updated $CODE"
}

# Update all languages
update_lang "de" \
  "Schrottsilber-Rechner – Schmelzwert & Live-Preise" \
  "Berechnen Sie den Schmelzwert von Schrottsilber sofort mit Live-Silberpreisen. Sterling (925), fein (999), Münze (900), europäisch (800). Kostenloser Schmelzwertrechner, stündlich aktualisiert." \
  "Live-Marktdaten" \
  "Silber-Spotpreis" \
  "Heutige Preise" \
  "Wie viel ist Schrottsilber heute wert?" \
  "0"

update_lang "es" \
  "Calculadora de Plata Reciclada – Valor de Fusión & Precios en Vivo" \
  "Calcule el valor de la plata reciclada al instante usando precios de plata en vivo. Sterling (925), fino (999), moneda (900), europeo (800). Calculadora de valor de fusión gratuita actualizada cada hora." \
  "Datos de Mercado en Vivo" \
  "Precio de Plata al Contado" \
  "Precios de Hoy" \
  "¿Cuánto vale la plata reciclada hoy?" \
  "0"

update_lang "fr" \
  "Calculatrice d'Argent Recyclé – Valeur de Fusion & Prix en Temps Réel" \
  "Calculez la valeur de l'argent reciclé instantanément en utilisant les prix de l'argent en direct. Sterling (925), fin (999), pièces (900), européen (800). Calculatrice de valeur de fusion gratuite mise à jour toutes les heures." \
  "Données de Marché en Direct" \
  "Prix de Spot de l'Argent" \
  "Prix d'Aujourd'hui" \
  "Combien vaut l'argent reciclé aujourd'hui?" \
  "0"

update_lang "it" \
  "Calcolatrice Argento Rottame – Valore di Fusione & Prezzi Live" \
  "Calcola il valore del rottame d'argento istantaneamente utilizzando i prezzi dell'argento in tempo reale. Sterling (925), fino (999), moneta (900), europeo (800). Calcolatrice del valore di fusione gratuita aggiornata ogni ora." \
  "Dati di Mercato in Diretta" \
  "Prezzo Spot dell'Argento" \
  "Prezzi Odierni" \
  "Quanto vale il rottame d'argento oggi?" \
  "0"

update_lang "pt" \
  "Calculadora de Prata Reciclada – Valor de Fusão & Preços em Tempo Real" \
  "Calcule o valor da prata reciclada instantaneamente usando os preços de prata ao vivo. Sterling (925), fino (999), moeda (900), europeu (800). Calculadora de valor de fusão gratuita atualizada a cada hora." \
  "Dados de Mercado ao Vivo" \
  "Preço de Prata Spot" \
  "Preços de Hoje" \
  "Quanto vale a prata reciclada hoje?" \
  "0"

update_lang "ru" \
  "Калькулятор серебра – Стоимость плавки и живые цены" \
  "Рассчитайте стоимость лома серебра мгновенно, используя живые цены серебра. Sterling (925), чистое (999), монета (900), европейское (800). Бесплатный калькулятор стоимости плавки, обновляемый каждый час." \
  "Данные Рынка в Реальном Времени" \
  "Цена Спота Серебра" \
  "Цены Сегодня" \
  "Сколько сегодня стоит лом серебра?" \
  "0"

update_lang "tr" \
  "Hurda Gümüş Hesaplayıcı – Erime Değeri ve Canlı Fiyatlar" \
  "Canlı gümüş fiyatlarını kullanarak hurda gümüş değerini anında hesaplayın. Sterling (925), saf (999), madeni para (900), Avrupa (800). Saatte bir güncellenen ücretsiz erime değeri hesaplayıcı." \
  "Canlı Pazar Verileri" \
  "Gümüş Spot Fiyatı" \
  "Bugünün Fiyatları" \
  "Hurda gümüş bugün ne kadar değerli?" \
  "0"

update_lang "ur" \
  "سکریپ سلور کیلکولیٹر – پگھلنے کی قیمت اور لائیو قیمتیں" \
  "لائیو سلور کی قیمتوں کا استعمال کرتے ہوئے سکریپ سلور کی قیمت فوری طور پر کا لکولیٹ کریں۔ سٹرلنگ (925)، فائن (999)، کوائن (900)، یورپی (800)۔ ہر گھنٹے اپ ڈیٹ ہونے والا مفت پگھلنے کی قیمت کیلکولیٹر۔" \
  "لائیو مارکٹ ڈیٹا" \
  "سلور اسپاٹ قیمت" \
  "آج کی قیمتیں" \
  "آج سکریپ سلور کی قیمت کتنی ہے?" \
  "1"

update_lang "zh" \
  "废料白银计算器 – 熔化价值和实时价格" \
  "使用实时白银价格即时计算废料白银的价值。斯特林(925)、纯(999)、硬币(900)、欧洲(800)。免费熔化价值计算器，每小时更新一次。" \
  "实时市场数据" \
  "白银现货价格" \
  "今日价格" \
  "今天废料白银值多少钱?" \
  "0"

echo "All languages updated!"
