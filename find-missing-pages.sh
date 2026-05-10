#!/bin/bash

echo "=== Missing Pages by Language ==="
echo

for lang in ar de es fr hi it pt ru tr ur zh; do
  missing=0
  pages=""
  
  for file in *.html; do
    [ "$file" = "404.html" ] && continue
    basename="${file%.html}"
    
    # Check if this page exists in the language directory
    if [ ! -f "$lang/${basename}.html" ] 2>/dev/null; then
      # It might have a different slug - for now just count it as potentially missing
      if [ ! -f "$lang"/*.html ] 2>/dev/null || ! grep -q "." "$lang"/*.html 2>/dev/null | grep -i "$basename" > /dev/null 2>&1; then
        missing=$((missing + 1))
        if [ $missing -le 3 ]; then
          pages="$pages $basename"
        fi
      fi
    fi
  done
  
  total=$(ls $lang/*.html 2>/dev/null | wc -l)
  ratio=$((total * 100 / 70))
  echo "$lang: $total/70 files ($ratio%) - Missing: $missing"
done
