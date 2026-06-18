import urllib.request
import re
from bs4 import BeautifulSoup
import json
import ssl
import time

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = {
    "OmniCalculator": "https://www.omnicalculator.com/finance/scrap-silver",
    "UnitedPMR": "https://www.unitedpmr.com/calculators/sterling-silver-scrap-calculator/",
    "BullionByPost": "https://www.bullionbypost.co.uk/sell-to-us/scrap-silver-calculator/",
    "MeltValue": "https://meltvalue.com/",
    "CoinApps": "https://coinapps.com/silver/scrap/calculator/"
}

SEMANTIC_ENTITIES = [
    "silver", "gold", "platinum", "palladium",
    "fine silver", "sterling silver", "coin silver", "pure silver", 
    "999", "925", "900", "800", "millesimal fineness", "purity", "hallmark",
    "gram", "troy ounce", "ounce", "pennyweight", "dwt", "grain", "kilogram", "kilo", "pound",
    "spot price", "melt value", "market price", "dealer payout", "bid price", "ask price", 
    "refining", "commission", "overhead", "payout percentage", "margin", "spread",
    "jewelry", "coin", "silverware", "bullion", "bar", "spoon", "fork", "knife", "tray", "cup", "ring", "bracelet", "necklace", "chain", "plate"
]

def analyze_url(name, url):
    print(f"Fetching {name}: {url}...")
    # Rotate User-Agent to avoid blocks
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive'
    }
    
    # Try fetching with up to 2 retries
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers=headers)
            # Use 15 seconds timeout
            with urllib.request.urlopen(req, context=ctx, timeout=15) as response:
                html = response.read()
                break
        except Exception as e:
            print(f"Attempt {attempt+1} failed for {name}: {e}")
            if attempt == 2:
                return None
            time.sleep(2)
        
    soup = BeautifulSoup(html, 'html.parser')
    
    # Meta Title
    title = soup.title.string.strip() if soup.title else ""
    
    # Meta Description
    desc_tag = soup.find('meta', attrs={'name': 'description'}) or soup.find('meta', attrs={'property': 'og:description'})
    description = desc_tag['content'].strip() if desc_tag and 'content' in desc_tag.attrs else ""
    
    # Headings
    h1s = [h.get_text().strip() for h in soup.find_all('h1')]
    h2s = [h.get_text().strip() for h in soup.find_all('h2')]
    h3s = [h.get_text().strip() for h in soup.find_all('h3')]
    
    # Get all text
    for script_or_style in soup(['script', 'style', 'header', 'footer', 'nav', 'noscript']):
        script_or_style.decompose()
    text = soup.get_text().lower()
    
    # Word count
    words = re.findall(r'\b[a-z]{2,}\b', text)
    word_count = len(words)
    
    # Entity extraction
    found_entities = {}
    for entity in SEMANTIC_ENTITIES:
        count = text.count(entity)
        if count > 0:
            found_entities[entity] = count
            
    # Sort entities by frequency
    sorted_entities = sorted(found_entities.items(), key=lambda x: x[1], reverse=True)
    
    return {
        "name": name,
        "url": url,
        "title": title,
        "description": description,
        "h1": h1s,
        "h2": h2s,
        "h3": h3s,
        "word_count": word_count,
        "entities": sorted_entities
    }

results = {}
for name, url in urls.items():
    res = analyze_url(name, url)
    if res:
        results[name] = res

# Write results to json
with open("scratch/competitor_analysis_results.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=4)

print("Done! Analysis saved to scratch/competitor_analysis_results.json")
