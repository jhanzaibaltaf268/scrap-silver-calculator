import urllib.request
import urllib.parse
from bs4 import BeautifulSoup
import re
import json
import ssl
import time
import os

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# List of keywords to audit (slug mapping to search query)
AUDIT_KEYWORDS = {
    "silver-price-today": "silver price today",
    "silver-price-per-gram": "silver price per gram",
    "silver-price-per-ounce": "silver price per ounce",
    "current-silver-price": "current silver price",
    "925-silver-calculator": "925 silver calculator",
    "999-silver-calculator": "999 silver calculator",
    "sterling-silver-calculator": "sterling silver calculator",
    "silver-melt-value-calculator": "silver melt value calculator"
}

SEMANTIC_ENTITIES = [
    "silver", "gold", "platinum", "palladium",
    "fine silver", "sterling silver", "coin silver", "pure silver", 
    "999", "925", "900", "800", "purity", "hallmark",
    "gram", "troy ounce", "ounce", "pennyweight", "dwt", "grain", "kilogram", "kilo", "pound",
    "spot price", "melt value", "market price", "dealer payout", "bid price", "ask price", 
    "refining", "commission", "overhead", "payout percentage", "margin", "spread",
    "jewelry", "coin", "silverware", "bullion", "bar", "spoon", "fork", "knife", "tray", "cup", "ring", "bracelet", "necklace", "chain", "plate"
]

def search_competitors(query):
    print(f"Searching DuckDuckGo Lite for: '{query}'...")
    data = urllib.parse.urlencode({'q': query}).encode('utf-8')
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    req = urllib.request.Request('https://lite.duckduckgo.com/lite/', data=data, headers=headers)
    
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=10) as response:
            soup = BeautifulSoup(response.read(), 'html.parser')
            
        links = []
        for a in soup.find_all('a'):
            href = a.get('href')
            text = a.get_text().strip()
            if href and not href.startswith('/') and not href.startswith('mailto:'):
                # Filter out our own domains and search engine domains
                if not any(domain in href.lower() for domain in ['scrapsilvercalculater.com', 'scrapsilvercalculator.com', 'duckduckgo.com', 'google.com', 'bing.com']):
                    links.append((text, href))
        return links[:5] # Return top 5 competitors
    except Exception as e:
        print(f"Error searching for '{query}': {e}")
        return []

def fetch_and_analyze_url(url, name):
    print(f"Analyzing competitor URL: {url}...")
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive'
    }
    
    html = None
    for attempt in range(2):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, context=ctx, timeout=8) as response:
                html = response.read()
                break
        except Exception as e:
            print(f"Attempt {attempt+1} failed for {url}: {e}")
            time.sleep(1.5)
            
    if not html:
        return {
            "url": url,
            "name": name,
            "status": "Failed to fetch page content (Timeout / 403 Forbidden / 404 Not Found)"
        }
        
    try:
        soup = BeautifulSoup(html, 'html.parser')
        
        # Meta Title
        title = soup.title.string.strip() if soup.title else ""
        
        # Meta Description
        desc_tag = soup.find('meta', attrs={'name': 'description'}) or soup.find('meta', attrs={'property': 'og:description'})
        description = desc_tag['content'].strip() if desc_tag and 'content' in desc_tag.attrs else "No description found"
        
        # Headings
        h1s = [h.get_text().strip() for h in soup.find_all('h1')]
        h2s = [h.get_text().strip() for h in soup.find_all('h2') if h.get_text().strip()]
        h3s = [h.get_text().strip() for h in soup.find_all('h3') if h.get_text().strip()]
        
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
        sorted_entities = sorted(found_entities.items(), key=lambda x: x[1], reverse=True)[:10]
        
        return {
            "url": url,
            "name": name,
            "status": "Success",
            "title": title,
            "description": description,
            "h1": h1s,
            "h2": h2s[:12],  # Limit to top 12 headings
            "h3": h3s[:15],  # Limit to top 15 subheadings
            "word_count": word_count,
            "entities": sorted_entities
        }
    except Exception as e:
        print(f"Error parsing {url}: {e}")
        return {
            "url": url,
            "name": name,
            "status": f"Error parsing content: {e}"
        }

def run_audit():
    audit_results = {}
    
    for slug, keyword in AUDIT_KEYWORDS.items():
        print(f"\n=== AUDITING KEYWORD: '{keyword}' (Slug: {slug}) ===")
        competitors = search_competitors(keyword)
        
        if not competitors:
            print(f"No competitors found for '{keyword}'")
            continue
            
        keyword_results = []
        for name, url in competitors:
            # Add a small delay between requests
            time.sleep(2)
            analysis = fetch_and_analyze_url(url, name)
            keyword_results.append(analysis)
            
        audit_results[keyword] = {
            "slug": slug,
            "competitors": keyword_results
        }
        
        # Save temporary progress in JSON
        with open("scratch/audit_progress.json", "w", encoding="utf-8") as f:
            json.dump(audit_results, f, indent=4)
            
    # Generate Markdown Report
    generate_markdown_report(audit_results)

def generate_markdown_report(data):
    md = "# Comprehensive Multilingual & Competitor Search Audit\n"
    md += f"**Generated on:** {time.strftime('%Y-%m-%d %H:%M:%S')}\n\n"
    md += "This report analyzes competitor pages ranking for our core site keywords. It lists the meta descriptions, title tags, heading hierarchies, word counts, and semantic entities extracted from their content.\n\n"
    md += "---\n\n"
    
    for keyword, info in data.items():
        slug = info["slug"]
        md += f"## 🔑 Keyword: `{keyword}` (Slug: `{slug}`)\n\n"
        
        for idx, comp in enumerate(info["competitors"], 1):
            md += f"### {idx}. Competitor: {comp['name']}\n"
            md += f"- **URL**: {comp['url']}\n"
            
            if comp["status"] != "Success":
                md += f"- **Status**: ⚠️ {comp['status']}\n\n"
                continue
                
            md += f"- **Title**: `{comp['title']}`\n"
            md += f"- **Description**: `{comp['description']}`\n"
            md += f"- **Word Count**: {comp['word_count']} words\n"
            
            # Entities
            entities_str = ", ".join([f"`{k}` ({v}x)" for k, v in comp['entities']])
            md += f"- **Top Entities**: {entities_str}\n"
            
            # Headings
            md += "- **Heading Structure**:\n"
            if comp['h1']:
                for h1 in comp['h1']:
                    md += f"  - `H1`: {h1}\n"
            else:
                md += "  - `H1`: None found\n"
                
            if comp['h2']:
                md += "  - `H2` Sections:\n"
                for h2 in comp['h2']:
                    md += f"    - {h2}\n"
            if comp['h3']:
                md += "  - `H3` Sub-sections:\n"
                for h3 in comp['h3']:
                    md += f"    - {h3}\n"
            
            md += "\n"
        md += "---\n\n"
        
    # Write to target artifact
    artifact_path = "C:/Users/SA COMPUTERS/.gemini/antigravity/brain/cfea1cf6-18f2-4e10-95dd-5a635ec0f7a1/competitor_analysis_audit.md"
    with open(artifact_path, "w", encoding="utf-8") as f:
        f.write(md)
        
    print(f"Audit completed successfully! Report saved to {artifact_path}")

if __name__ == "__main__":
    run_audit()
