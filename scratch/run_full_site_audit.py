import os
import urllib.request
import urllib.parse
from bs4 import BeautifulSoup
import re
import json
import ssl
import time
from fpdf import FPDF

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

SEMANTIC_ENTITIES = [
    "silver", "gold", "platinum", "palladium",
    "fine silver", "sterling silver", "coin silver", "pure silver", 
    "999", "925", "900", "800", "purity", "hallmark",
    "gram", "troy ounce", "ounce", "pennyweight", "dwt", "grain", "kilogram", "kilo", "pound",
    "spot price", "melt value", "market price", "dealer payout", "bid price", "ask price", 
    "refining", "commission", "overhead", "payout percentage", "margin", "spread",
    "jewelry", "coin", "silverware", "bullion", "bar", "spoon", "fork", "knife", "tray", "cup", "ring", "bracelet", "necklace", "chain", "plate"
]

def get_all_english_slugs():
    slugs = []
    for filename in sorted(os.listdir('.')):
        if filename.endswith('.html'):
            slug = filename.replace('.html', '')
            # Skip templates, utility pages, reports, and 404
            if slug not in ['404', 'about', 'contact', 'disclaimer', 'privacy-policy', 'terms-of-service', 'audit-report', 'website-launch-guide']:
                slugs.append(slug)
    return slugs

def slug_to_keyword(slug):
    # Convert slug to readable search query
    keyword = slug.replace('-', ' ')
    # Clean up patterns
    keyword = re.sub(r'\b(calc|val)\b', lambda m: 'calculator' if m.group(1) == 'calc' else 'value', keyword)
    return keyword

def search_competitors(query):
    print(f"Searching DuckDuckGo Lite for: '{query}'...")
    data = urllib.parse.urlencode({'q': query}).encode('utf-8')
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    req = urllib.request.Request('https://lite.duckduckgo.com/lite/', data=data, headers=headers)
    
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=8) as response:
            soup = BeautifulSoup(response.read(), 'html.parser')
            
        links = []
        for a in soup.find_all('a'):
            href = a.get('href')
            text = a.get_text().strip()
            if href and not href.startswith('/') and not href.startswith('mailto:'):
                if not any(domain in href.lower() for domain in ['scrapsilvercalculater.com', 'scrapsilvercalculator.com', 'duckduckgo.com', 'google.com', 'bing.com']):
                    links.append((text, href))
        return links[:5]
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
            time.sleep(1)
            
    if not html:
        return {
            "url": url,
            "name": name,
            "status": "Failed to fetch page content"
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
                
        sorted_entities = sorted(found_entities.items(), key=lambda x: x[1], reverse=True)[:10]
        
        return {
            "url": url,
            "name": name,
            "status": "Success",
            "title": title,
            "description": description,
            "h1": h1s,
            "h2": h2s[:8],
            "h3": h3s[:10],
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

class PDFReport(FPDF):
    def header(self):
        self.set_font('Helvetica', 'B', 12)
        self.cell(0, 10, 'COMPETITOR SEO & HEADING AUDIT REPORT', border=0, ln=1, align='C')
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font('Helvetica', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

def clean_text(text):
    # Ensure text is encoded properly for FPDF default Latin-1
    if not text:
        return ""
    # Replace common unicode chars that fail in Latin-1
    replacements = {
        '\u2019': "'",
        '\u2018': "'",
        '\u201c': '"',
        '\u201d': '"',
        '\u2014': '-',
        '\u2013': '-',
        '\u2022': '*',
        '\u00a0': ' ',
        '\u20ac': 'EUR',
        '\u00a3': 'GBP'
    }
    for orig, rep in replacements.items():
        text = text.replace(orig, rep)
    return text.encode('latin-1', 'replace').decode('latin-1')

def write_safe_cell(pdf, text, font_style="", font_size=9, is_multiline=False):
    pdf.set_font('Helvetica', font_style, font_size)
    text_clean = clean_text(text)
    pdf.set_x(pdf.l_margin)
    try:
        if is_multiline:
            pdf.multi_cell(pdf.epw, 5, text_clean)
        else:
            pdf.cell(pdf.epw, 6, text_clean, new_x="LMARGIN", new_y="NEXT")
    except Exception as e:
        print(f"Skipped PDF element: {e}")
        try:
            # Fallback to a very simple representation in case of complex wrapping errors
            fallback_text = text_clean.encode('ascii', 'ignore').decode('ascii')[:100] + "..."
            if is_multiline:
                pdf.multi_cell(pdf.epw, 5, fallback_text)
            else:
                pdf.cell(pdf.epw, 6, fallback_text, new_x="LMARGIN", new_y="NEXT")
        except Exception as e_inner:
            print(f"Fatal skip: {e_inner}")

def generate_pdf_and_md(data):
    # 1. Generate Markdown File
    print("Generating Markdown file...")
    md = "# Full Website Competitor Search & SEO Audit\n"
    md += f"**Generated on:** {time.strftime('%Y-%m-%d %H:%M:%S')}\n\n"
    md += "This document contains a comprehensive SEO audit of all core site keywords. It lists competitors, meta details, word counts, semantic entities, and heading structures.\n\n"
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
            entities_str = ", ".join([f"`{k}` ({v}x)" for k, v in comp['entities']])
            md += f"- **Top Entities**: {entities_str}\n"
            md += "- **Heading Structure**:\n"
            if comp['h1']:
                for h1 in comp['h1']:
                    md += f"  - `H1`: {h1}\n"
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
        
    md_path = "scratch/full_competitor_audit.md"
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(md)
        
    # 2. Generate PDF File
    print("Generating PDF file...")
    pdf = PDFReport()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    
    # Title Page
    write_safe_cell(pdf, "COMPETITOR SEO AUDIT REPORT", font_style="B", font_size=16)
    write_safe_cell(pdf, f"Generated on: {time.strftime('%Y-%m-%d %H:%M:%S')}", font_style="", font_size=12)
    write_safe_cell(pdf, "Target Site: scrapsilvercalculater.com", font_style="", font_size=12)
    pdf.ln(10)
    
    for keyword, info in data.items():
        write_safe_cell(pdf, f"Keyword: {keyword} (Slug: {info['slug']})", font_style="B", font_size=12)
        pdf.ln(2)
        
        for idx, comp in enumerate(info["competitors"], 1):
            write_safe_cell(pdf, f"  {idx}. Competitor: {comp['name']}", font_style="B", font_size=10)
            write_safe_cell(pdf, f"    URL: {comp['url']}", font_style="", font_size=9)
            
            if comp["status"] != "Success":
                write_safe_cell(pdf, f"    Status: {comp['status']}", font_style="", font_size=9)
                pdf.ln(2)
                continue
                
            write_safe_cell(pdf, f"    Title: {comp['title']}", font_style="", font_size=9, is_multiline=True)
            write_safe_cell(pdf, f"    Description: {comp['description']}", font_style="", font_size=9, is_multiline=True)
            write_safe_cell(pdf, f"    Word Count: {comp['word_count']} words", font_style="", font_size=9)
            
            entities_str = ", ".join([f"{k} ({v}x)" for k, v in comp['entities']])
            write_safe_cell(pdf, f"    Top Entities: {entities_str}", font_style="", font_size=9, is_multiline=True)
            
            if comp['h1']:
                write_safe_cell(pdf, f"    H1: {', '.join(comp['h1'])}", font_style="", font_size=9)
            if comp['h2']:
                write_safe_cell(pdf, f"    H2s: {', '.join(comp['h2'])}", font_style="", font_size=9, is_multiline=True)
            if comp['h3']:
                write_safe_cell(pdf, f"    H3s: {', '.join(comp['h3'])}", font_style="", font_size=9, is_multiline=True)
            pdf.ln(2)
        pdf.ln(3)
        
    pdf_path = "C:/Users/SA COMPUTERS/Documents/GitHub/scrap-silver-calculator/scratch/competitor_audit_report.pdf"
    pdf.output(pdf_path)
    print(f"PDF successfully generated at {pdf_path}")


def main():
    slugs = get_all_english_slugs()
    print(f"Found {len(slugs)} slugs to analyze.")
    
    # Try loading existing progress to resume if interrupted
    progress_file = "scratch/full_audit_progress.json"
    if os.path.exists(progress_file):
        try:
            with open(progress_file, "r", encoding="utf-8") as f:
                audit_results = json.load(f)
                print(f"Resuming audit. {len(audit_results)} keywords already analyzed.")
        except:
            audit_results = {}
    else:
        audit_results = {}
        
    for i, slug in enumerate(slugs):
        keyword = slug_to_keyword(slug)
        if keyword in audit_results:
            continue
            
        print(f"\n[{i+1}/{len(slugs)}] Auditing: '{keyword}'...")
        competitors = search_competitors(keyword)
        
        keyword_results = []
        for name, url in competitors:
            time.sleep(1.0) # Sleep to avoid rate limiting
            analysis = fetch_and_analyze_url(url, name)
            keyword_results.append(analysis)
            
        audit_results[keyword] = {
            "slug": slug,
            "competitors": keyword_results
        }
        
        # Save progress after every keyword
        with open(progress_file, "w", encoding="utf-8") as f:
            json.dump(audit_results, f, indent=4)
            
        # Large sleep between search keywords to avoid search engine block
        time.sleep(1.5)
        
    # Generate final reports
    generate_pdf_and_md(audit_results)
    
if __name__ == "__main__":
    main()
