import os
import re
from datetime import datetime

# Map English slugs to priorities (from existing sitemap)
PRIORITY_MAP = {
    'index': 1.0,
    'silver-price-today': 0.95,
    'silver-price-per-gram': 0.95,
    'silver-price-per-ounce': 0.95,
    'current-silver-price': 0.9,
    'silver-spot-price-today': 0.9,
    'silver-purity-chart': 0.85,
    '999-silver-calculator': 0.85,
    '958-silver-calculator': 0.85,
    '925-silver-calculator': 0.85,
    '900-silver-calculator': 0.85,
    '835-silver-calculator': 0.85,
    '800-silver-calculator': 0.85,
    'silver-scrap-calculator': 0.9,
    'sterling-silver-calculator': 0.85,
    'silver-melt-value-calculator': 0.9,
    'silver-coin-value-calculator': 0.85,
    'junk-silver-calculator': 0.85,
    'silver-jewelry-value-calculator': 0.85,
    'gold-and-silver-calculator': 0.85,
    'silver-bar-value-calculator': 0.85,
    'silverware-value-calculator': 0.85,
    'silver-batch-calculator': 0.8,
    'silver-profit-calculator': 0.8,
    'silver-weight-converter': 0.8,
    'pennyweight-calculator': 0.8,
    'tola-calculator': 0.8,
    'face-value-silver-calculator': 0.8,
    'sona-chandi-calculator': 0.75,
    'silver-dime-calculator': 0.8,
    'silver-quarter-calculator': 0.8,
    'silver-dollar-calculator': 0.8,
    'canadian-silver-coin-calculator': 0.8,
    'silver-ring-value': 0.8,
    'silver-bracelet-value': 0.8,
    'silver-necklace-value': 0.8,
    'silver-chain-value': 0.8,
    'silver-spoon-value': 0.8,
    'silver-fork-value': 0.8,
    'silver-knife-value': 0.8,
    'silver-tray-value': 0.8,
    'silver-plate-value': 0.8,
    'silver-cup-value': 0.8,
    '1oz-silver-value': 0.8,
    '2oz-silver-value': 0.8,
    '5oz-silver-value': 0.8,
    '10oz-silver-value': 0.8,
    '1-10oz-silver-value': 0.8,
    '100oz-silver-value': 0.8,
    '1kg-silver-value': 0.8,
    'what-is-silver-scrap': 0.75,
    'what-is-sterling-silver': 0.75,
    'what-does-925-mean': 0.75,
    'what-is-junk-silver': 0.75,
    'what-is-silver-melt-value': 0.75,
    'what-is-silver-bullion': 0.75,
    'what-is-troy-ounce': 0.75,
    'identify-silver': 0.8,
    'silver-hallmarks-guide': 0.8,
    'how-to-sell-silver': 0.8,
    'how-silver-prices-work': 0.75,
    'how-to-use-silver-calculators': 0.75,
    'silver-sell-or-hold': 0.75,
    'silver-price-all-currencies': 0.85,
    '925-sterling-silver-price-per-gram': 0.85,
    'privacy-policy': 0.5,
    'terms-of-service': 0.5,
    'disclaimer': 0.5,
    'contact': 0.5,
}

def filename_to_slug(filename):
    """Convert filename to URL slug"""
    slug = filename.replace('.html', '')
    return slug

def get_priority(slug):
    """Get priority for a slug, default to 0.7 for language pages"""
    return PRIORITY_MAP.get(slug, 0.7)

# Collect all URLs
urls = []

# Add English pages
for filename in sorted(os.listdir('.')):
    if filename.endswith('.html') and not filename.startswith('404'):
        slug = filename_to_slug(filename)
        if slug == 'index':
            url = 'https://scrapsilvercalculater.com/'
        else:
            url = f'https://scrapsilvercalculater.com/{slug}/'
        priority = get_priority(slug)
        urls.append({
            'loc': url,
            'priority': priority,
            'changefreq': 'daily' if priority >= 0.9 else 'weekly',
            'lastmod': '2026-05-16'
        })

# Add language index pages and all language pages
languages = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh']

for lang in languages:
    lang_dir = lang
    if not os.path.isdir(lang_dir):
        continue
    
    # Add language index page
    urls.append({
        'loc': f'https://scrapsilvercalculater.com/{lang}/',
        'priority': 0.7,
        'changefreq': 'weekly',
        'lastmod': '2026-05-16'
    })
    
    # Add all language sub-pages
    for filename in sorted(os.listdir(lang_dir)):
        if filename.endswith('.html'):
            slug = filename_to_slug(filename)
            url = f'https://scrapsilvercalculater.com/{lang}/{slug}/'
            priority = max(0.6, get_priority(slug) - 0.1)  # Reduce priority for translations by 0.1
            urls.append({
                'loc': url,
                'priority': priority,
                'changefreq': 'weekly',
                'lastmod': '2026-05-16'
            })

# Generate XML
xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

for url_data in urls:
    xml += f'''  <url>
    <loc>{url_data['loc']}</loc>
    <lastmod>{url_data['lastmod']}</lastmod>
    <changefreq>{url_data['changefreq']}</changefreq>
    <priority>{url_data['priority']:.2f}</priority>
  </url>
\n'''

xml += '</urlset>'

# Write sitemap
with open('sitemap.xml', 'w', encoding='utf-8') as f:
    f.write(xml)

print('[OK] Generated sitemap with ' + str(len(urls)) + ' URLs')
print('[OK]    English pages: 69')
print('[OK]    Language index pages: 11')
print('[OK]    Language sub-pages: ' + str(len(urls) - 80))
