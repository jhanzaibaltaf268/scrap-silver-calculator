"""
Replaces the monolithic silver-news-today.html with a clean news index
that links to individual article pages in silver-news/.
"""
import os, re, sys
sys.stdout.reconfigure(encoding='utf-8')
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

html = open('silver-news-today.html', encoding='utf-8').read()

NEW_MAIN = '''  <main>
    <div class="container"><div id="breadcrumb"></div></div>

    <!-- Hero -->
    <section class="hero container">
      <div class="container">
        <div id="price-ticker"></div>
        <h1>Silver Market <span class="highlight">News &amp; Analysis</span></h1>
        <p class="subtitle">Latest silver market news, price analysis, and expert commentary</p>
      </div>
    </section>

    <!-- News index -->
    <section style="padding:32px 0">
      <div class="container">

        <h2 style="font-family:var(--f-display);font-size:1.1rem;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--text-muted);margin-bottom:20px">&#x1F525; Latest Coverage</h2>

        <!-- Featured: June 10 -->
        <div style="background:linear-gradient(160deg,rgba(22,22,36,.95),rgba(17,17,28,.95));border:1px solid var(--border-medium);border-top:4px solid #ef4444;border-radius:20px;padding:32px;margin-bottom:20px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
            <span class="news-tag tag-macro">Markets Analysis</span>
            <span style="font-size:.72rem;color:var(--text-muted)">June 10, 2026 &middot; 7 min read</span>
          </div>
          <h3 style="font-family:var(--f-display);font-size:clamp(1.3rem,3vw,1.9rem);font-weight:800;line-height:1.2;margin-bottom:14px">
            <a href="/silver-news/silver-plummet-six-month-lows-june-2026/" style="color:inherit;text-decoration:none">Silver Prices Plummet to Six-Month Lows Ahead of Key US Inflation Data</a>
          </h3>
          <p style="color:var(--text-secondary);font-size:.93rem;line-height:1.7;margin-bottom:20px">Silver tumbles toward $66/oz as 70% Fed rate hike odds surge, the 200-day EMA breaks, and the Israel-Iran truce strips the metal&#x27;s safe-haven premium ahead of Wednesday&#x27;s CPI report.</p>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:20px">
            <div style="background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.22);border-radius:10px;padding:10px;text-align:center"><div style="font-family:var(--f-mono);font-size:1.2rem;font-weight:800;color:#f87171">~$66</div><div style="font-size:.6rem;color:var(--text-muted);text-transform:uppercase;margin-top:3px">Spot (6-mo low)</div></div>
            <div style="background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.22);border-radius:10px;padding:10px;text-align:center"><div style="font-family:var(--f-mono);font-size:1.2rem;font-weight:800;color:#f87171">70%</div><div style="font-size:.6rem;color:var(--text-muted);text-transform:uppercase;margin-top:3px">Dec rate hike</div></div>
            <div style="background:rgba(251,191,36,.08);border:1px solid rgba(251,191,36,.22);border-radius:10px;padding:10px;text-align:center"><div style="font-family:var(--f-mono);font-size:1.2rem;font-weight:800;color:#fbbf24">4.2%</div><div style="font-size:.6rem;color:var(--text-muted);text-transform:uppercase;margin-top:3px">CPI expected</div></div>
            <div style="background:rgba(148,163,184,.08);border:1px solid rgba(148,163,184,.22);border-radius:10px;padding:10px;text-align:center"><div style="font-family:var(--f-mono);font-size:1.2rem;font-weight:800;color:#94a3b8">$61-67</div><div style="font-size:.6rem;color:var(--text-muted);text-transform:uppercase;margin-top:3px">Support zone</div></div>
          </div>
          <a href="/silver-news/silver-plummet-six-month-lows-june-2026/" style="display:inline-flex;align-items:center;gap:6px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.3);color:#fca5a5;padding:9px 18px;border-radius:100px;font-size:.8rem;font-weight:700;text-decoration:none">Read Full Analysis &rarr;</a>
        </div>

        <!-- Featured: June 6 -->
        <div style="background:linear-gradient(160deg,rgba(22,22,36,.95),rgba(17,17,28,.95));border:1px solid var(--border-medium);border-top:4px solid #ef4444;border-radius:20px;padding:32px;margin-bottom:32px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
            <span class="news-tag tag-macro">Markets Analysis</span>
            <span style="font-size:.72rem;color:var(--text-muted)">June 6, 2026 &middot; 8 min read</span>
          </div>
          <h3 style="font-family:var(--f-display);font-size:clamp(1.3rem,3vw,1.9rem);font-weight:800;line-height:1.2;margin-bottom:14px">
            <a href="/silver-news/silver-6-billion-wipeout-jobs-report-june-2026/" style="color:inherit;text-decoration:none">Silver&#x27;s $6 Billion Wipeout: One Jobs Report Changed Everything</a>
          </h3>
          <p style="color:var(--text-secondary);font-size:.93rem;line-height:1.7;margin-bottom:20px">A stronger-than-expected May payrolls print (172K vs 148K forecast) sent silver tumbling more than 6% in a single session, erasing roughly $6 billion in market value while structural solar and EV demand narratives remain fully intact.</p>
          <a href="/silver-news/silver-6-billion-wipeout-jobs-report-june-2026/" style="display:inline-flex;align-items:center;gap:6px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.3);color:#fca5a5;padding:9px 18px;border-radius:100px;font-size:.8rem;font-weight:700;text-decoration:none">Read Full Analysis &rarr;</a>
        </div>

        <!-- Article Grid: Market Analysis -->
        <h2 style="font-family:var(--f-display);font-size:1.1rem;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--text-muted);margin-bottom:20px">&#x1F4CA; Market Analysis</h2>
        <div class="news-grid">

          <div class="news-card">
            <div style="font-size:.68rem;color:var(--text-muted);margin-bottom:10px">May 18, 2026 &middot; 10 min read</div>
            <h3><a href="/silver-news/geopolitical-safe-haven-iran-silver-may-2026/" style="color:inherit;text-decoration:none">The Seesaw Safe-Haven: Iran Deal Rumors &amp; Geopolitical Volatility</a></h3>
            <p class="nc-snippet">Silver surged 17% on Middle East escalation then gave it all back as Iran-US diplomatic progress stripped the safe-haven premium &mdash; a masterclass in geopolitical risk dynamics.</p>
            <div class="nc-meta"><span>Geopolitical Analysis</span><a href="/silver-news/geopolitical-safe-haven-iran-silver-may-2026/" class="nc-read-btn">Read &rarr;</a></div>
          </div>

          <div class="news-card">
            <div style="font-size:.68rem;color:var(--text-muted);margin-bottom:10px">May 18, 2026 &middot; 6 min read</div>
            <h3><a href="/silver-news/silver-inflation-shock-monetary-policy-may-2026/" style="color:inherit;text-decoration:none">Silver Tumbles on Inflation Shock: The CPI Paradox Explained</a></h3>
            <p class="nc-snippet">April CPI at 3.8% vs 3.3% consensus forced a sharp repricing of Fed rate expectations &mdash; and silver sold off despite the very inflation it&#x27;s supposed to hedge against.</p>
            <div class="nc-meta"><span>Market Analysis</span><a href="/silver-news/silver-inflation-shock-monetary-policy-may-2026/" class="nc-read-btn">Read &rarr;</a></div>
          </div>

          <div class="news-card">
            <div style="font-size:.68rem;color:var(--text-muted);margin-bottom:10px">May 17, 2026 &middot; 5 min read</div>
            <h3><a href="/silver-news/silver-worst-weekly-loss-trump-xi-summit-may-2026/" style="color:inherit;text-decoration:none">Silver&#x27;s Worst Weekly Loss in 3 Months: Trump&ndash;Xi, Dollar, Risk Rally</a></h3>
            <p class="nc-snippet">US-China trade truce, DXY surge, and equity risk-on combined to push silver to its worst weekly performance since February 2026.</p>
            <div class="nc-meta"><span>Market Update</span><a href="/silver-news/silver-worst-weekly-loss-trump-xi-summit-may-2026/" class="nc-read-btn">Read &rarr;</a></div>
          </div>

          <div class="news-card">
            <div style="font-size:.68rem;color:var(--text-muted);margin-bottom:10px">May 17, 2026 &middot; 7 min read</div>
            <h3><a href="/silver-news/why-did-silver-drop-five-factors-may-2026/" style="color:inherit;text-decoration:none">Why Did Silver Drop This Week? All Five Factors Explained</a></h3>
            <p class="nc-snippet">A complete breakdown: trade truce, dollar surge, equity risk-on, technical EMA breakdown, and post-peak profit-taking &mdash; which factors are temporary and which could persist.</p>
            <div class="nc-meta"><span>Analysis</span><a href="/silver-news/why-did-silver-drop-five-factors-may-2026/" class="nc-read-btn">Read &rarr;</a></div>
          </div>

          <div class="news-card">
            <div style="font-size:.68rem;color:var(--text-muted);margin-bottom:10px">May 17, 2026 &middot; 5 min read</div>
            <h3><a href="/silver-news/us-dollar-weakness-silver-tailwind-may-2026/" style="color:inherit;text-decoration:none">US Dollar Weakness Provides Short-Term Tailwind for Silver</a></h3>
            <p class="nc-snippet">DXY at a 3-month low on softer retail sales data. With a -0.71 rolling correlation, every 1% dollar move translates to ~0.71% for silver prices &mdash; and the mechanism explained.</p>
            <div class="nc-meta"><span>Currency Analysis</span><a href="/silver-news/us-dollar-weakness-silver-tailwind-may-2026/" class="nc-read-btn">Read &rarr;</a></div>
          </div>

          <div class="news-card">
            <div style="font-size:.68rem;color:var(--text-muted);margin-bottom:10px">May 17, 2026 &middot; 5 min read</div>
            <h3><a href="/silver-news/gold-silver-ratio-multi-year-high-contrarian-may-2026/" style="color:inherit;text-decoration:none">Gold/Silver Ratio at Multi-Year High: Contrarian Opportunity?</a></h3>
            <p class="nc-snippet">At 88:1, the ratio is in its upper historical range. Every prior spike above 80 has been followed by significant silver outperformance over the following 12 months.</p>
            <div class="nc-meta"><span>Investment Analysis</span><a href="/silver-news/gold-silver-ratio-multi-year-high-contrarian-may-2026/" class="nc-read-btn">Read &rarr;</a></div>
          </div>

        </div>

        <!-- Article Grid: Industrial & Investment -->
        <h2 style="font-family:var(--f-display);font-size:1.1rem;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--text-muted);margin:32px 0 20px">&#x26A1; Industrial Demand &amp; Investment</h2>
        <div class="news-grid">

          <div class="news-card">
            <div style="font-size:.68rem;color:var(--text-muted);margin-bottom:10px">May 17, 2026 &middot; 6 min read</div>
            <h3><a href="/silver-news/solar-silver-consumption-record-240m-oz-2026/" style="color:inherit;text-decoration:none">Solar Sector to Consume Record 240 Million oz of Silver in 2026</a></h3>
            <p class="nc-snippet">PV demand now accounts for 26% of total annual silver supply. Despite 65% per-cell efficiency gains over a decade, absolute demand has grown 5&times; since 2016.</p>
            <div class="nc-meta"><span>Industrial Demand</span><a href="/silver-news/solar-silver-consumption-record-240m-oz-2026/" class="nc-read-btn">Read &rarr;</a></div>
          </div>

          <div class="news-card">
            <div style="font-size:.68rem;color:var(--text-muted);margin-bottom:10px">May 17, 2026 &middot; 6 min read</div>
            <h3><a href="/silver-news/ev-sector-silver-demand-battery-may-2026/" style="color:inherit;text-decoration:none">EV Sector Adds to Silver Demand as Battery Tech Evolves</a></h3>
            <p class="nc-snippet">Current EVs use 25&ndash;50g of silver each. Next-gen solid-state batteries could triple that figure &mdash; making EVs the second major structural demand pillar after solar.</p>
            <div class="nc-meta"><span>Industrial Demand</span><a href="/silver-news/ev-sector-silver-demand-battery-may-2026/" class="nc-read-btn">Read &rarr;</a></div>
          </div>

          <div class="news-card">
            <div style="font-size:.68rem;color:var(--text-muted);margin-bottom:10px">May 17, 2026 &middot; 5 min read</div>
            <h3><a href="/silver-news/comex-silver-inventories-fall-12-percent-may-2026/" style="color:inherit;text-decoration:none">COMEX Silver Inventories Fall 12% in 30 Days Amid Industrial Buying</a></h3>
            <p class="nc-snippet">Registered silver stockpiles at COMEX warehouses falling at their fastest pace since November 2024 &mdash; pointing to genuine industrial off-take at current price levels.</p>
            <div class="nc-meta"><span>Physical Market</span><a href="/silver-news/comex-silver-inventories-fall-12-percent-may-2026/" class="nc-read-btn">Read &rarr;</a></div>
          </div>

          <div class="news-card">
            <div style="font-size:.68rem;color:var(--text-muted);margin-bottom:10px">May 17, 2026 &middot; 5 min read</div>
            <h3><a href="/silver-news/silver-etf-inflows-inflation-hedge-may-2026/" style="color:inherit;text-decoration:none">Silver ETF Inflows Surge for Third Consecutive Week</a></h3>
            <p class="nc-snippet">Over 8 million troy ounces added to global ETF holdings in three weeks as institutional buyers treat the macro-driven price dip as a long-term accumulation entry.</p>
            <div class="nc-meta"><span>Investment Demand</span><a href="/silver-news/silver-etf-inflows-inflation-hedge-may-2026/" class="nc-read-btn">Read &rarr;</a></div>
          </div>

        </div>

        <!-- Calculator CTA -->
        <div style="background:rgba(124,58,237,.08);border:1px solid rgba(124,58,237,.25);border-radius:16px;padding:28px;margin-top:32px;text-align:center">
          <p style="font-size:1rem;color:var(--text-secondary);margin-bottom:16px">How much is your silver worth at today&#x27;s live spot price?</p>
          <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap">
            <a href="/silver-scrap-calculator/" style="display:inline-flex;align-items:center;gap:6px;background:rgba(124,58,237,.2);border:1px solid rgba(124,58,237,.4);color:#c4b5fd;padding:10px 20px;border-radius:100px;font-size:.85rem;font-weight:700;text-decoration:none">&#x2672; Scrap Calculator</a>
            <a href="/silver-price-today/" style="display:inline-flex;align-items:center;gap:6px;background:rgba(52,211,153,.08);border:1px solid rgba(52,211,153,.25);color:#6ee7b7;padding:10px 20px;border-radius:100px;font-size:.85rem;font-weight:700;text-decoration:none">&#x1F4C8; Live Silver Price</a>
            <a href="/silver-purity-chart/" style="display:inline-flex;align-items:center;gap:6px;background:rgba(251,191,36,.06);border:1px solid rgba(251,191,36,.2);color:#fde68a;padding:10px 20px;border-radius:100px;font-size:.85rem;font-weight:700;text-decoration:none">&#x1F4CA; Purity Chart</a>
          </div>
        </div>

      </div>
    </section>
  </main>'''

# Replace the entire <main>...</main> block
html_new = re.sub(r'<main>.*?</main>', NEW_MAIN, html, flags=re.DOTALL, count=1)

# Remove the article modal and its JS (no longer needed)
html_new = re.sub(r'\n\n  <!-- Article Modal -->.*?(?=\n  <div id="site-footer">)', '', html_new, flags=re.DOTALL)

# Strip the modal JS block at the bottom
html_new = re.sub(
    r'\n  <script>\s*document\.addEventListener\(\'DOMContentLoaded\',\s*function\(\).*?</script>\s*\n</body>',
    '\n</body>',
    html_new,
    flags=re.DOTALL
)

# Update ItemList schema to point to new individual article URLs
old_list_marker = '"itemListElement": [\n      {"@type": "ListItem", "position": 1, "name": "The Seesaw Safe-Haven'
new_list_items = '''"itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Silver Prices Plummet to Six-Month Lows Ahead of Key US Inflation Data", "url": "https://scrapsilvercalculater.com/silver-news/silver-plummet-six-month-lows-june-2026/"},
      {"@type": "ListItem", "position": 2, "name": "Silver's $6 Billion Wipeout: One Jobs Report Changed Everything", "url": "https://scrapsilvercalculater.com/silver-news/silver-6-billion-wipeout-jobs-report-june-2026/"},
      {"@type": "ListItem", "position": 3, "name": "The Seesaw Safe-Haven: Iran Deal Rumors and Geopolitical Volatility", "url": "https://scrapsilvercalculater.com/silver-news/geopolitical-safe-haven-iran-silver-may-2026/"},
      {"@type": "ListItem", "position": 4, "name": "Silver Tumbles as Inflation Shock Triggers Monetary Policy Repricing", "url": "https://scrapsilvercalculater.com/silver-news/silver-inflation-shock-monetary-policy-may-2026/"},
      {"@type": "ListItem", "position": 5, "name": "Silver Posts Worst Weekly Loss in 3 Months", "url": "https://scrapsilvercalculater.com/silver-news/silver-worst-weekly-loss-trump-xi-summit-may-2026/"},
      {"@type": "ListItem", "position": 6, "name": "Why Did Silver Drop This Week? All Five Factors", "url": "https://scrapsilvercalculater.com/silver-news/why-did-silver-drop-five-factors-may-2026/"},
      {"@type": "ListItem", "position": 7, "name": "Solar Sector to Consume Record 240 Million Ounces of Silver in 2026", "url": "https://scrapsilvercalculater.com/silver-news/solar-silver-consumption-record-240m-oz-2026/"},
      {"@type": "ListItem", "position": 8, "name": "EV Sector Adds to Silver Demand Story as Battery Tech Evolves", "url": "https://scrapsilvercalculater.com/silver-news/ev-sector-silver-demand-battery-may-2026/"},
      {"@type": "ListItem", "position": 9, "name": "COMEX Silver Inventories Fall 12% in 30 Days", "url": "https://scrapsilvercalculater.com/silver-news/comex-silver-inventories-fall-12-percent-may-2026/"},
      {"@type": "ListItem", "position": 10, "name": "Silver ETF Inflows Surge as Inflation Hedge Demand Returns", "url": "https://scrapsilvercalculater.com/silver-news/silver-etf-inflows-inflation-hedge-may-2026/"},
      {"@type": "ListItem", "position": 11, "name": "Gold/Silver Ratio at Multi-Year High: Contrarian Opportunity?", "url": "https://scrapsilvercalculater.com/silver-news/gold-silver-ratio-multi-year-high-contrarian-may-2026/"},
      {"@type": "ListItem", "position": 12, "name": "US Dollar Weakness Provides Short-Term Tailwind for Silver", "url": "https://scrapsilvercalculater.com/silver-news/us-dollar-weakness-silver-tailwind-may-2026/"}
    ]'''

if old_list_marker in html_new:
    # Find the full old list and replace
    old_start = html_new.find('"itemListElement": [')
    old_end = html_new.find(']', old_start) + 1
    html_new = html_new[:old_start] + new_list_items + html_new[old_end:]
    print('ItemList schema updated')
else:
    print('Warning: ItemList not found, schema not updated')

with open('silver-news-today.html', 'w', encoding='utf-8') as f:
    f.write(html_new)

print(f'Written: {len(html_new)} chars')

# Word count check
body_m = re.search(r'<body[^>]*>(.*?)</body>', html_new, re.DOTALL)
if body_m:
    b = re.sub(r'<script[^>]*>.*?</script>', ' ', body_m.group(1), flags=re.DOTALL)
    b = re.sub(r'<style[^>]*>.*?</style>', ' ', b, flags=re.DOTALL)
    t = re.sub(r'<[^>]+>', ' ', b)
    wc = len([w for w in t.split() if w.strip()])
    print(f'Static word count: {wc}')
