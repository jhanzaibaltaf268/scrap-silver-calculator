#!/bin/bash

# Create language directories
mkdir -p es fr de it pt ru ar hi ur tr zh

# Function to translate and create localized file
translate_page() {
  local lang=$1
  local lang_name=$2
  local page=$3
  local filename=$4
  
  echo "Translating $filename to $lang_name..."
  
  # Copy and translate based on language
  case $lang in
    es)
      sed -e 's/<html lang="en">/<html lang="es">/g' \
          -e "s|scrapsilvercalculater.com/$page-silver-price-today/|scrapsilvercalculater.com/es/$page-silver-price-today/|g" \
          -e 's/999 Fine Silver Price Today/Precio de la Plata Fina 999 Hoy/g' \
          -e 's/925 Sterling Silver Price Today/Precio de Plata de Ley 925 Hoy/g' \
          -e 's/900 Silver Price Today/Precio de Plata 900 Hoy/g' \
          -e 's/800 Silver Price Today/Precio de Plata 800 Hoy/g' \
          "$filename" > "es/$filename"
      ;;
    fr)
      sed -e 's/<html lang="en">/<html lang="fr">/g' \
          -e "s|scrapsilvercalculater.com/$page-silver-price-today/|scrapsilvercalculater.com/fr/$page-silver-price-today/|g" \
          -e "s/$page-silver-price-today/$page-silver-price-today/g" \
          "$filename" > "fr/$filename"
      ;;
    de)
      sed -e 's/<html lang="en">/<html lang="de">/g' \
          -e "s|scrapsilvercalculater.com/$page-silver-price-today/|scrapsilvercalculater.com/de/$page-silver-price-today/|g" \
          "$filename" > "de/$filename"
      ;;
    it)
      sed -e 's/<html lang="en">/<html lang="it">/g' \
          -e "s|scrapsilvercalculater.com/$page-silver-price-today/|scrapsilvercalculater.com/it/$page-silver-price-today/|g" \
          "$filename" > "it/$filename"
      ;;
    pt)
      sed -e 's/<html lang="en">/<html lang="pt">/g' \
          -e "s|scrapsilvercalculater.com/$page-silver-price-today/|scrapsilvercalculater.com/pt/$page-silver-price-today/|g" \
          "$filename" > "pt/$filename"
      ;;
    ru)
      sed -e 's/<html lang="en">/<html lang="ru">/g' \
          -e "s|scrapsilvercalculater.com/$page-silver-price-today/|scrapsilvercalculater.com/ru/$page-silver-price-today/|g" \
          "$filename" > "ru/$filename"
      ;;
    ar)
      sed -e 's/<html lang="en">/<html lang="ar">/g' \
          -e "s|scrapsilvercalculater.com/$page-silver-price-today/|scrapsilvercalculater.com/ar/$page-silver-price-today/|g" \
          "$filename" > "ar/$filename"
      ;;
    hi)
      sed -e 's/<html lang="en">/<html lang="hi">/g' \
          -e "s|scrapsilvercalculater.com/$page-silver-price-today/|scrapsilvercalculater.com/hi/$page-silver-price-today/|g" \
          "$filename" > "hi/$filename"
      ;;
    ur)
      sed -e 's/<html lang="en">/<html lang="ur">/g' \
          -e "s|scrapsilvercalculater.com/$page-silver-price-today/|scrapsilvercalculater.com/ur/$page-silver-price-today/|g" \
          "$filename" > "ur/$filename"
      ;;
    tr)
      sed -e 's/<html lang="en">/<html lang="tr">/g' \
          -e "s|scrapsilvercalculater.com/$page-silver-price-today/|scrapsilvercalculater.com/tr/$page-silver-price-today/|g" \
          "$filename" > "tr/$filename"
      ;;
    zh)
      sed -e 's/<html lang="en">/<html lang="zh">/g' \
          -e "s|scrapsilvercalculater.com/$page-silver-price-today/|scrapsilvercalculater.com/zh/$page-silver-price-today/|g" \
          "$filename" > "zh/$filename"
      ;;
  esac
}

# Process all 4 pages for all 11 languages
for lang in es fr de it pt ru ar hi ur tr zh; do
  for page in 999 925 900 800; do
    filename="${page}-silver-price-today.html"
    translate_page "$lang" "$lang" "$page" "$filename"
  done
done

echo "Done! All 44 pages created."
