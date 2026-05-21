#!/bin/bash

# Create a temp file with all translations
TEMPLATE="index.html"

# Define translation arrays
declare -A TRANSLATIONS=(
  [de_title]="Schrottsilber-Rechner – Schmelzwert &amp; Live-Preise"
  [de_desc]="Berechnen Sie den Schmelzwert von Schrottsilber sofort mit Live-Silberpreisen. Sterling (925), fein (999), Münze (900), europäisch (800). Kostenloser Schmelzwertrechner, stündlich aktualisiert."
  [de_live_data]="Live-Marktdaten"
  [de_spot]="Silber-Spotpreis"
  [de_today]="Heutige Preise"
  [de_qa]="Wie viel ist Schrottsilber heute wert?"
  [de_sticky]="📊 Silberwert berechnen"
  
  [es_title]="Calculadora de Plata Reciclada – Valor de Fusión &amp; Precios en Vivo"
  [es_desc]="Calcule el valor de la plata reciclada al instante usando precios de plata en vivo. Sterling (925), fino (999), moneda (900), europeo (800). Calculadora de valor de fusión gratuita actualizada cada hora."
  [es_live_data]="Datos de Mercado en Vivo"
  [es_spot]="Precio de Plata al Contado"
  [es_today]="Precios de Hoy"
  [es_qa]="¿Cuánto vale la plata reciclada hoy?"
  [es_sticky]="📊 Calcular Valor de Plata"
  
  [fr_title]="Calculatrice d'Argent Recyclé – Valeur de Fusion &amp; Prix en Temps Réel"
  [fr_desc]="Calculez la valeur de l'argent reciclé instantanément en utilisant les prix de l'argent en direct. Sterling (925), fin (999), pièces (900), européen (800). Calculatrice de valeur de fusion gratuite mise à jour toutes les heures."
  [fr_live_data]="Données de Marché en Direct"
  [fr_spot]="Prix de Spot de l'Argent"
  [fr_today]="Prix d'Aujourd'hui"
  [fr_qa]="Combien vaut l'argent reciclé aujourd'hui?"
  [fr_sticky]="📊 Calculer la Valeur de l'Argent"
  
  [it_title]="Calcolatrice Argento Rottame – Valore di Fusione &amp; Prezzi Live"
  [it_desc]="Calcola il valore del rottame d'argento istantaneamente utilizzando i prezzi dell'argento in tempo reale. Sterling (925), fino (999), moneta (900), europeo (800). Calcolatrice del valore di fusione gratuita aggiornata ogni ora."
  [it_live_data]="Dati di Mercato in Diretta"
  [it_spot]="Prezzo Spot dell'Argento"
  [it_today]="Prezzi Odierni"
  [it_qa]="Quanto vale il rottame d'argento oggi?"
  [it_sticky]="📊 Calcola Valore Argento"
  
  [pt_title]="Calculadora de Prata Reciclada – Valor de Fusão &amp; Preços em Tempo Real"
  [pt_desc]="Calcule o valor da prata reciclada instantaneamente usando os preços de prata ao vivo. Sterling (925), fino (999), moeda (900), europeu (800). Calculadora de valor de fusão gratuita atualizada a cada hora."
  [pt_live_data]="Dados de Mercado ao Vivo"
  [pt_spot]="Preço de Prata Spot"
  [pt_today]="Preços de Hoje"
  [pt_qa]="Quanto vale a prata reciclada hoje?"
  [pt_sticky]="📊 Calcular Valor da Prata"
  
  [ru_title]="Калькулятор серебра – Стоимость плавки и живые цены"
  [ru_desc]="Рассчитайте стоимость лома серебра мгновенно, используя живые цены серебра. Sterling (925), чистое (999), монета (900), европейское (800). Бесплатный калькулятор стоимости плавки, обновляемый каждый час."
  [ru_live_data]="Данные Рынка в Реальном Времени"
  [ru_spot]="Цена Спота Серебра"
  [ru_today]="Цены Сегодня"
  [ru_qa]="Сколько сегодня стоит лом серебра?"
  [ru_sticky]="📊 Рассчитать Стоимость Серебра"
  
  [tr_title]="Hurda Gümüş Hesaplayıcı – Erime Değeri ve Canlı Fiyatlar"
  [tr_desc]="Canlı gümüş fiyatlarını kullanarak hurda gümüş değerini anında hesaplayın. Sterling (925), saf (999), madeni para (900), Avrupa (800). Saatte bir güncellenen ücretsiz erime değeri hesaplayıcı."
  [tr_live_data]="Canlı Pazar Verileri"
  [tr_spot]="Gümüş Spot Fiyatı"
  [tr_today]="Bugünün Fiyatları"
  [tr_qa]="Hurda gümüş bugün ne kadar değerli?"
  [tr_sticky]="📊 Gümüş Değerini Hesapla"
  
  [ur_title]="سکریپ سلور کیلکولیٹر – پگھلنے کی قیمت اور لائیو قیمتیں"
  [ur_desc]="لائیو سلور کی قیمتوں کا استعمال کرتے ہوئے سکریپ سلور کی قیمت فوری طور پر کا لکولیٹ کریں۔ سٹرلنگ (925)، فائن (999)، کوائن (900)، یورپی (800)۔ ہر گھنٹے اپ ڈیٹ ہونے والا مفت پگھلنے کی قیمت کیلکولیٹر۔"
  [ur_live_data]="لائیو مارکٹ ڈیٹا"
  [ur_spot]="سلور اسپاٹ قیمت"
  [ur_today]="آج کی قیمتیں"
  [ur_qa]="آج سکریپ سلور کی قیمت کتنی ہے؟"
  [ur_sticky]="📊 سلور کی قیمت کیلکولیٹ کریں"
  
  [zh_title]="废料白银计算器 – 熔化价值和实时价格"
  [zh_desc]="使用实时白银价格即时计算废料白银的价值。斯特林(925)、纯(999)、硬币(900)、欧洲(800)。免费熔化价值计算器，每小时更新一次。"
  [zh_live_data]="实时市场数据"
  [zh_spot]="白银现货价格"
  [zh_today]="今日价格"
  [zh_qa]="今天废料白银值多少钱?"
  [zh_sticky]="📊 计算白银价值"
)

# Function to update one language
update_lang() {
  local LANG=$1
  local CODE=$2
  local IS_RTL=$3
  
  echo "Updating $LANG ($CODE)..."
  
  # Copy template
  cp index.html "$CODE/index.html"
  
  # Replace lang attribute
  sed -i "s/lang=\"en\"/lang=\"$CODE\"/g" "$CODE/index.html"
  
  # Add dir=rtl if needed
  if [ "$IS_RTL" = "rtl" ]; then
    sed -i "s/<html lang=\"$CODE\">/<html lang=\"$CODE\" dir=\"rtl\">/g" "$CODE/index.html"
  fi
  
  # Replace title
  sed -i "s|<title>Scrap Silver Calculator.*</title>|<title>${TRANSLATIONS[${CODE}_title]}</title>|" "$CODE/index.html"
  
  # Replace canonical
  sed -i "s|<link rel=\"canonical\" href=\"https://scrapsilvercalculater.com/\">|<link rel=\"canonical\" href=\"https://scrapsilvercalculater.com/$CODE/\">|" "$CODE/index.html"
  
  # Replace hreflang
  sed -i "s|<link rel=\"alternate\" hreflang=\"$CODE\" href=\"https://scrapsilvercalculater.com/\">|<link rel=\"alternate\" hreflang=\"$CODE\" href=\"https://scrapsilvercalculater.com/$CODE/\">|" "$CODE/index.html"
  
  # Replace text content
  sed -i "s/Live Market Data/${TRANSLATIONS[${CODE}_live_data]}/g" "$CODE/index.html"
  sed -i "s/Silver Spot Price/${TRANSLATIONS[${CODE}_spot]}/g" "$CODE/index.html"
  sed -i "s/Today's Prices/${TRANSLATIONS[${CODE}_today]}/g" "$CODE/index.html"
  sed -i "s/How much is scrap silver worth today?/${TRANSLATIONS[${CODE}_qa]}/g" "$CODE/index.html"
  
  echo "✓ $LANG ($CODE)"
}

# Update all languages
update_lang "German" "de" "ltr"
update_lang "Spanish" "es" "ltr"
update_lang "French" "fr" "ltr"
update_lang "Italian" "it" "ltr"
update_lang "Portuguese" "pt" "ltr"
update_lang "Russian" "ru" "ltr"
update_lang "Turkish" "tr" "ltr"
update_lang "Urdu" "ur" "rtl"
update_lang "Chinese" "zh" "ltr"

echo "All languages updated!"
