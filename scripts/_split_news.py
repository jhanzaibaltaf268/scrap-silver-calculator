"""
Splits silver-news-today.html into individual article pages in silver-news/
and converts the main page to a news index.
"""
import os, re, sys
sys.stdout.reconfigure(encoding='utf-8')
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

NEWS_DIR = 'silver-news'
os.makedirs(NEWS_DIR, exist_ok=True)

# ── Article definitions ──────────────────────────────────────────────────────
ARTICLES = [
    {
        'slug': 'silver-plummet-six-month-lows-june-2026',
        'date_iso': '2026-06-10T07:00:00+00:00',
        'date_display': 'June 10, 2026',
        'read_time': '7 min read',
        'title': 'Silver Prices Plummet to Six-Month Lows Ahead of Key US Inflation Data',
        'description': 'Silver tumbles toward $66/oz — December 2025 lows — as 70% Fed rate hike odds, a broken 200-day EMA, and the collapse of the Israel-Iran geopolitical risk premium combine to hammer precious metals ahead of Wednesday\'s CPI report.',
        'tags': ['Markets Analysis', 'Fed Policy', 'CPI'],
        'body': '''<p>Silver faces intense selling pressure today, tumbling toward <strong>$66 per troy ounce</strong> — a level not seen since December 2025 — as strong US payroll data ignites fresh Federal Reserve rate-hike fears and a geopolitical truce between Israel and Iran strips away the metal's safe-haven premium.</p>

<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:20px 0">
  <div style="background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.22);border-radius:10px;padding:14px;text-align:center">
    <div style="font-family:var(--f-mono);font-size:1.4rem;font-weight:800;color:#f87171">~$66</div>
    <div style="font-size:.65rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;margin-top:4px">Silver spot (6-mo low)</div>
  </div>
  <div style="background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.22);border-radius:10px;padding:14px;text-align:center">
    <div style="font-family:var(--f-mono);font-size:1.4rem;font-weight:800;color:#f87171">70%</div>
    <div style="font-size:.65rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;margin-top:4px">Dec rate hike odds</div>
  </div>
  <div style="background:rgba(251,191,36,.08);border:1px solid rgba(251,191,36,.22);border-radius:10px;padding:14px;text-align:center">
    <div style="font-family:var(--f-mono);font-size:1.4rem;font-weight:800;color:#fbbf24">4.2%</div>
    <div style="font-size:.65rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;margin-top:4px">CPI expected Wed</div>
  </div>
  <div style="background:rgba(148,163,184,.08);border:1px solid rgba(148,163,184,.22);border-radius:10px;padding:14px;text-align:center">
    <div style="font-family:var(--f-mono);font-size:1.4rem;font-weight:800;color:#94a3b8">$61–67</div>
    <div style="font-size:.65rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;margin-top:4px">Key support zone</div>
  </div>
</div>

<p>The sharp correction wipes out near-term technical support and returns silver to price levels last seen in December 2025. The primary catalyst is last week's unexpectedly strong Non-Farm Payrolls report — <strong>172,000 jobs added in May</strong>, far exceeding forecasts — which has forced markets to price in a <strong>70% probability of a Fed rate hike by December</strong>. Surging Treasury yields and a strengthening US Dollar Index (DXY) have made zero-yield silver significantly less attractive to institutional portfolios.</p>

<p>From a technical standpoint, silver has broken below its <strong>200-day Exponential Moving Average (EMA)</strong> — a closely watched trend indicator. This EMA breach shifts the prevailing sentiment from cautiously bullish to overtly bearish for near-term traders. The next critical support zone lies at the $61–$67 consolidation band established in Q4 2025.</p>

<p>Adding to the macro pressure, markets are holding their breath ahead of Wednesday's Consumer Price Index (CPI) report. Wall Street consensus projects headline inflation at 4.2% year-over-year for May. A higher-than-expected print would further entrench hawkish Fed pricing and could accelerate silver's decline. A lower reading, however, could provide a significant relief rally for precious metals.</p>

<p>The geopolitical dimension has also shifted. A brief window of stability emerged after a mutual halt to direct military strikes between Israel and Iran, but the de-escalation ultimately stripped silver of its safe-haven demand. With Middle East tensions stabilising, institutional money has rotated away from defensive assets and back toward macroeconomic positioning. Historically, geopolitical risk premiums can disappear as quickly as they build — and silver's 8–10% premium from the February–April escalation period has now fully unwound.</p>

<h3>What to Watch Next</h3>
<ul>
  <li><strong>Wednesday CPI (June 11)</strong>: The single biggest near-term catalyst. Consensus at 4.2%; above 4.4% would be deeply bearish for silver.</li>
  <li><strong>FOMC Minutes (June 18)</strong>: Will reveal how hawkish internal discussion has become following the May payrolls data.</li>
  <li><strong>$61 support level</strong>: A clean break below this level would target the June 2025 lows near $58. Holding $61 keeps a recovery scenario intact.</li>
  <li><strong>Dollar Index (DXY)</strong>: Silver's inverse correlation with the dollar remains tight. Watch DXY 104–105 as a key resistance zone for the dollar — and support for silver.</li>
</ul>''',
    },
    {
        'slug': 'silver-6-billion-wipeout-jobs-report-june-2026',
        'date_iso': '2026-06-06T08:30:00+00:00',
        'date_display': 'June 6, 2026',
        'read_time': '8 min read',
        'title': "Silver's $6 Billion Wipeout: One Jobs Report Changed Everything",
        'description': "A stronger-than-expected May payrolls print sent silver tumbling more than 6% in hours, erasing roughly $6 billion in market value — yet structural demand from solar and EVs remains intact.",
        'tags': ['Markets Analysis', 'Jobs Report', 'Fed Policy'],
        'body': '''<p>At 8:31 a.m. Eastern Time on Friday, June 6, the U.S. Bureau of Labor Statistics published a single line of data that unwound weeks of silver's momentum: <strong>172,000 nonfarm payrolls added in May</strong>, against a consensus estimate of 148,000.</p>

<div style="background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.22);border-radius:12px;padding:20px;margin:20px 0">
  <div style="font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);margin-bottom:8px">May 2026 NFP Surprise</div>
  <div style="display:flex;align-items:baseline;gap:12px">
    <span style="font-family:var(--f-mono);font-size:2rem;font-weight:800;color:#f87171">172K</span>
    <span style="color:var(--text-secondary)">actual jobs added vs. <strong>148K</strong> forecast — a 16% beat</span>
  </div>
</div>

<p>Within 45 minutes of the report's release, silver had dropped from <strong>$70.28 to $66.50 per troy ounce</strong> — a 5.4% decline in under an hour. By the time US markets closed, silver had shed more than 6% on the session. The total market capitalisation erasure across silver futures and ETFs exceeded <strong>$6 billion</strong>.</p>

<p>The mechanism was straightforward: strong employment data removes the economic justification for Federal Reserve rate cuts and amplifies the case for further tightening. Precious metals, which generate no yield, suffer disproportionately in high-rate environments because the opportunity cost of holding them rises with every Treasury yield increase. The 10-year US Treasury yield jumped 14 basis points on the day to 4.87%, its highest since November 2025.</p>

<h3>The Structural Bull Case Survives</h3>
<p>Despite the violent macro repricing, analysts at several investment banks were quick to note that the jobs report changes the monetary policy outlook but does nothing to alter silver's structural demand narrative.</p>
<ul>
  <li><strong>Solar demand</strong> remains on track for a record 240 million troy ounces consumed in 2026, driven by continued photovoltaic capacity additions in China, the US, and India.</li>
  <li><strong>EV battery technology</strong> is incorporating more silver per vehicle as solid-state battery development progresses.</li>
  <li><strong>COMEX warehouse inventories</strong> have declined 12% over the prior 30 days, pointing to ongoing industrial drawdowns.</li>
</ul>

<p>The key question for investors: does the June 6 selloff represent a buying opportunity in a longer-term bull market temporarily disrupted by macro headwinds, or the beginning of a sustained bear leg? Historical precedent — most notably the September 2022 and March 2023 rate-hike-driven corrections — suggests silver tends to recover sharply once the Fed's terminal rate becomes clear.</p>''',
    },
    {
        'slug': 'geopolitical-safe-haven-iran-silver-may-2026',
        'date_iso': '2026-05-18T10:15:00+00:00',
        'date_display': 'May 18, 2026',
        'read_time': '10 min read',
        'title': 'The Seesaw Safe-Haven: How Geopolitical Volatility and Iran Deal Rumors Formed a Double-Edged Sword for Precious Metals',
        'description': 'Silver swung violently through May as Iran-Israel escalation drove safe-haven buying, then Iran nuclear deal rumors crushed the geopolitical premium — illustrating why silver\'s safe-haven demand is the most volatile driver of its price.',
        'tags': ['Geopolitical Analysis', 'Safe-Haven', 'Iran'],
        'body': '''<p>The global commodity markets experienced a geopolitical whipsaw in May 2026 that illustrated the inherent volatility of silver's safe-haven premium. Over the course of just three weeks, silver was simultaneously a beneficiary of escalating Middle East tensions and a victim of diplomatic progress — moving more than 12% in a compressed window as geopolitical headlines oscillated between crisis and resolution.</p>

<h3>The Escalation Phase (May 1–12)</h3>
<p>Silver initially surged as military exchanges between Iran-backed Houthi forces and Israeli naval assets in the Red Sea intensified. Investors seeking protection from systemic risk bid up both gold and silver. Silver climbed from $64 to nearly $75 per troy ounce during this period — a 17% gain in 12 days that far outpaced gold's 6% move, reflecting silver's higher beta in risk-off environments.</p>

<h3>The Resolution Shock (May 13–18)</h3>
<p>On May 13, Reuters reported that back-channel negotiations between Iranian and US diplomats in Oman had produced a preliminary framework for a partial nuclear enrichment freeze in exchange for limited sanctions relief. The mere rumour of diplomatic progress — even before any official confirmation — was sufficient to trigger a sharp reversal in precious metals.</p>
<p>Silver fell from $73.40 to $66.80 in the three sessions following the Reuters report, giving back most of its geopolitical gains. The speed and magnitude of the reversal underscored a critical reality: <strong>geopolitical risk premiums in silver are highly fragile</strong>. Unlike structural demand drivers (industrial consumption, ETF holdings), geopolitical premiums can evaporate in hours when the perceived risk recedes.</p>

<h3>What This Means for Silver Investors</h3>
<p>The May 2026 episode offers a useful framework for thinking about geopolitical silver plays:</p>
<ul>
  <li><strong>Entry discipline matters</strong>: Buying silver after a large geopolitical spike means purchasing a significant risk premium that can be taken away quickly.</li>
  <li><strong>Duration is key</strong>: Short-term geopolitical safe-haven demand is distinct from the structural industrial demand story. The two should not be conflated in investment theses.</li>
  <li><strong>Gold-silver ratio as a guide</strong>: When geopolitical risk drives silver disproportionately above its ratio to gold, mean reversion risk is elevated.</li>
</ul>''',
    },
    {
        'slug': 'silver-inflation-shock-monetary-policy-may-2026',
        'date_iso': '2026-05-18T05:03:00+00:00',
        'date_display': 'May 18, 2026',
        'read_time': '6 min read',
        'title': 'Silver Tumbles as Inflation Shock Triggers Sharp Repricing of Monetary Policy Expectations',
        'description': "Silver fell to $27.42 — its lowest level in months — after April CPI came in at 3.8%, well above consensus, forcing markets to abandon Fed rate cut expectations and push rate hike odds significantly higher.",
        'tags': ['Market Analysis', 'Inflation', 'CPI'],
        'body': '''<p>Silver fell to <strong>$27.42 per troy ounce</strong> on Monday — its lowest level in months — after April CPI data came in at <strong>3.8% year-over-year</strong>, well above the Wall Street consensus of 3.3%. The upside inflation surprise triggered an immediate repricing of Federal Reserve monetary policy expectations, with rate cut odds collapsing and rate hike probabilities surging across the futures curve.</p>

<h3>The Inflation-Silver Paradox</h3>
<p>Conventional wisdom holds that silver benefits from high inflation as an inflation hedge. The May 2026 CPI reaction challenges this simplistic view. The key distinction is between <em>anticipated</em> and <em>surprise</em> inflation:</p>
<ul>
  <li><strong>Anticipated inflation</strong>: Silver often rises in anticipation of elevated inflation because investors accumulate it as a hedge. This is the classic "silver as money" dynamic.</li>
  <li><strong>Surprise inflation</strong>: When inflation surprises to the upside, it changes the monetary policy outlook more dramatically than the inflation level itself. Markets price in tighter policy, higher real yields, and a stronger dollar — all of which are headwinds for silver.</li>
</ul>

<p>In May 2026, the upside CPI surprise triggered exactly this mechanism. The implied probability of a December Fed rate hike jumped from 35% to 62% in a single session, driving 10-year real yields 18 basis points higher. Silver's price decline of over 3% on the day reflected these monetary tightening expectations more than any direct inflation hedge demand.</p>

<h3>Historical Context</h3>
<p>The reaction echoes similar episodes in 2022, when silver repeatedly sold off on above-consensus CPI prints despite headline inflation running above 8%. The common thread was Fed policy repricing — not the inflation level itself. For silver to benefit from inflation data, the data needs to be high enough to reinforce existing hedging demand without triggering additional monetary tightening fears. In 2026, that threshold remains elusive.</p>''',
    },
    {
        'slug': 'silver-worst-weekly-loss-trump-xi-summit-may-2026',
        'date_iso': '2026-05-17T06:00:00+00:00',
        'date_display': 'May 17, 2026',
        'read_time': '5 min read',
        'title': 'Silver Posts Worst Weekly Loss in 3 Months — Trump–Xi Summit, Dollar Surge, and Risk Rally Combine to Hit Precious Metals',
        'description': 'Silver fell 3.4% in the week of May 12–17, 2026, its sharpest weekly decline in three months, as the US-China summit in Geneva eased trade war fears, the dollar strengthened, and global equities rallied — draining safe-haven and inflation-hedge demand simultaneously.',
        'tags': ['Market Update', 'Trade War', 'Dollar'],
        'body': '''<p>Silver fell <strong>3.4%</strong> over the week of May 12–17, 2026 — its sharpest weekly decline in three months — as a confluence of macroeconomic factors simultaneously removed the key demand pillars that had supported prices in prior weeks.</p>

<h3>The Geneva Summit Effect</h3>
<p>The US-China trade summit held in Geneva on May 13–14 produced a landmark joint statement acknowledging "mutual interests in stable bilateral trade relations" and a 90-day tariff truce on categories affecting over $240 billion in annual trade. Markets interpreted the Geneva communiqué as a meaningful reduction in global trade war risk — removing a significant tail risk that had been supporting precious metals as safe-haven assets.</p>

<h3>Dollar Surge</h3>
<p>Risk sentiment improved markedly in the wake of Geneva, with global equity markets posting their best two-day run in three months. The US Dollar Index surged 1.2% on the week as capital flowed back into risk assets and away from traditional safe havens. Silver's inverse correlation with the dollar — historically running at -0.65 to -0.75 over rolling 30-day periods — amplified the price decline.</p>

<h3>Technical Breakdown</h3>
<p>The weekly close below $68 constituted a technical breakdown through the 50-day moving average, triggering additional systematic selling from trend-following funds (CTAs). Weekly RSI dropped from 58 to 41 — firmly in neutral territory with downward momentum. Traders flagged the $64–$65 zone as the next key technical support.</p>

<h3>Industrial Demand Unchanged</h3>
<p>Critically, none of these macro headwinds affect silver's physical industrial demand. Solar installations, EV production, and electronics manufacturing continue to draw on silver supplies at a record pace. The disconnect between financial market silver (futures, ETFs) and physical industrial demand creates the potential for sharp reversals once macro headwinds abate.</p>''',
    },
    {
        'slug': 'why-did-silver-drop-five-factors-may-2026',
        'date_iso': '2026-05-17T08:00:00+00:00',
        'date_display': 'May 17, 2026',
        'read_time': '7 min read',
        'title': 'Why Did Silver Drop This Week? A Full Breakdown of All Five Factors',
        'description': 'Five simultaneous bearish catalysts hit silver in the week of May 12–17, 2026: the US-China trade truce, dollar strength, equity risk-on, technical EMA breakdown, and profit-taking after March highs.',
        'tags': ['Market Analysis', 'Technical Analysis', 'Fed Policy'],
        'body': '''<p>Five distinct forces converged on silver markets in the week of May 12–17, 2026. Understanding each factor — and its relative weight — helps separate temporary headwinds from structural shifts in the silver market.</p>

<h3>Factor 1 — The Trump–Xi Geneva Summit (Primary Catalyst)</h3>
<p>The US–China summit held in Geneva on May 13–14 produced a landmark joint communiqué and a 90-day tariff truce on goods worth over $240 billion annually. For silver, the key effect was the removal of geopolitical/trade war risk premiums that had accumulated since early 2026. Precious metals tend to carry a "fear premium" during periods of elevated geopolitical tension; when that tension eases, the premium is quickly removed.</p>

<h3>Factor 2 — US Dollar Surge</h3>
<p>The Dollar Index (DXY) surged 1.2% on the week, its best performance since January. Silver and the dollar have a strong inverse relationship: a stronger dollar makes dollar-denominated commodities more expensive for foreign buyers, suppressing demand. DXY moved from 101.2 to 102.4 — a meaningful shift that mechanically lowered silver's appeal across international markets.</p>

<h3>Factor 3 — Equity Risk-On Environment</h3>
<p>Global equity markets posted their best two-day run since February, with the S&P 500 up 2.1% and emerging market stocks up 2.8% on the week. Risk-on environments reduce demand for defensive assets like silver. Portfolio managers who had been overweight precious metals took profits to redeploy into equities, creating selling pressure in futures and ETF markets.</p>

<h3>Factor 4 — Technical EMA Breakdown</h3>
<p>Silver broke below its 50-day exponential moving average on Wednesday with above-average volume. Systematic trend-following funds (commodity trading advisors, or CTAs) are programmed to sell when these technical levels break. The EMA breakdown triggered an estimated $800M–$1.2B in systematic liquidation across futures and options markets, amplifying the price decline beyond what fundamentals alone would justify.</p>

<h3>Factor 5 — Profit-Taking After March–April Highs</h3>
<p>Silver had rallied approximately 22% from February lows to its April peak near $79. Many investors who bought in February were sitting on substantial gains. The combination of the four factors above provided a catalyst to take profits, further accelerating the move lower. Profit-taking of this nature is typically a one-time supply pressure that exhausts itself over 1–2 weeks.</p>

<h3>Conclusion</h3>
<p>Of the five factors, three are transitory (the trade truce, equity risk-on, and profit-taking) and two are more persistent (dollar strength and technical damage). The structural bull case for silver — driven by solar and EV industrial demand — remains fully intact. The question is timing: a dollar reversal or the next catalyst for risk-off sentiment could restore silver's momentum relatively quickly.</p>''',
    },
    {
        'slug': 'solar-silver-consumption-record-240m-oz-2026',
        'date_iso': '2026-05-17T09:00:00+00:00',
        'date_display': 'May 17, 2026',
        'read_time': '6 min read',
        'title': 'Solar Sector to Consume Record 240 Million Ounces of Silver in 2026',
        'description': "Photovoltaic demand for silver is on track to reach 240 million troy ounces in 2026 — nearly 26% of total annual supply — according to the Silver Institute's latest industrial demand report.",
        'tags': ['Industrial Demand', 'Solar', 'Photovoltaics'],
        'body': '''<p>The photovoltaic (solar panel) industry is on pace to consume a record <strong>240 million troy ounces of silver</strong> in 2026, according to the Silver Institute's latest industrial demand update — a figure that represents nearly <strong>26% of projected total annual silver supply</strong>.</p>

<p>Silver's role in solar energy is irreplaceable with current technology. Silver paste is applied to photovoltaic cells to collect and conduct the electrical current generated when sunlight strikes the silicon. Every gigawatt of solar capacity installed requires approximately 15–20 metric tonnes of silver, and global solar installations are expected to exceed 600 GW in 2026.</p>

<h3>The Efficiency Paradox</h3>
<p>An important development is worth noting: solar panel manufacturers have been working intensively to reduce the silver content per cell through "thrifting" — applying thinner silver paste lines with more precise equipment. Silver loading per cell has declined approximately 65% over the past decade. However, the sheer scale of global solar deployment has more than offset these efficiency gains: total photovoltaic silver demand has grown from 50 million ounces in 2016 to 240 million ounces in 2026, a nearly 5× increase.</p>

<div style="background:rgba(52,211,153,.08);border:1px solid rgba(52,211,153,.22);border-radius:12px;padding:16px;margin:20px 0">
  <div style="font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);margin-bottom:8px">Solar Silver Demand Growth</div>
  <div style="display:flex;justify-content:space-between;align-items:center">
    <div style="text-align:center"><div style="font-family:var(--f-mono);font-size:1.3rem;font-weight:700;color:#34d399">50M oz</div><div style="font-size:.65rem;color:var(--text-muted)">2016</div></div>
    <div style="font-size:1.5rem;color:var(--text-muted)">→</div>
    <div style="text-align:center"><div style="font-family:var(--f-mono);font-size:1.3rem;font-weight:700;color:#34d399">240M oz</div><div style="font-size:.65rem;color:var(--text-muted)">2026 (est.)</div></div>
  </div>
</div>

<h3>Geographic Distribution</h3>
<p>China accounts for approximately 65% of global solar installations by capacity. India, the US, and EU member states account for most of the remainder. Each of these regions is running ambitious renewable energy programs with multi-year government mandates, providing structural demand visibility well beyond 2030.</p>

<h3>Investment Implications</h3>
<p>With solar consuming 26% of annual silver supply and gold-silver ratios near multi-year highs, many commodity analysts argue that silver's long-term industrial demand story is underpriced by financial markets currently focused on Fed policy. A normalization of monetary conditions — even partial — could combine with structural industrial demand to produce a powerful upside move for silver.</p>''',
    },
    {
        'slug': 'gold-silver-ratio-multi-year-high-contrarian-may-2026',
        'date_iso': '2026-05-17T09:30:00+00:00',
        'date_display': 'May 17, 2026',
        'read_time': '5 min read',
        'title': "Gold/Silver Ratio at Multi-Year High: A Contrarian Opportunity Emerging?",
        'description': 'The gold-to-silver ratio sits near 88 — its highest level since 2021 — historically a level from which silver has outperformed gold significantly over subsequent 12 months.',
        'tags': ['Investment Analysis', 'Gold-Silver Ratio', 'Contrarian'],
        'body': '''<p>The gold-to-silver ratio — the number of ounces of silver required to purchase one ounce of gold — is currently sitting near <strong>88:1</strong>, its highest level since late 2021. Historically, when this ratio reaches extreme levels, it has foreshadowed a period of silver outperformance relative to gold.</p>

<h3>Historical Context</h3>
<p>The gold-silver ratio has averaged approximately 68:1 over the past 50 years. Spikes above 80 have historically been followed by significant silver outperformance:</p>
<ul>
  <li><strong>2020 peak at 125:1</strong>: Followed by silver surging from $11.77 to $29.24 in 5 months (+148%)</li>
  <li><strong>2008 spike to 80:1</strong>: Followed by silver's multi-year bull market to $49.51 in 2011</li>
  <li><strong>1991 spike to 100:1</strong>: Followed by a 12-month silver rerating</li>
</ul>
<p>None of these comparisons guarantee future performance — markets are never obligated to repeat historical patterns. But the ratio's current position in the upper third of its historical range is a factor that serious silver investors monitor closely.</p>

<h3>Why Ratios Revert</h3>
<p>The reversion mechanism is partly technical (contrarian positioning when the ratio is extreme) and partly fundamental. Silver's higher industrial demand component makes it more sensitive to global growth cycles. When economic uncertainty (which drives the ratio up) gives way to recovery and expansion, silver tends to rally harder than gold because both the "fear" premium and the "growth" premium can accrue to silver simultaneously.</p>

<h3>The Contrarian Trade</h3>
<p>Investors who believe in the ratio reversion thesis can express it through a long silver / short gold pairs trade, or simply by overweighting silver relative to gold in a precious metals allocation. The trade carries a clear risk: the ratio can remain elevated or move higher if macro conditions deteriorate further. But for long-term holders, buying silver when the ratio is above 85 has historically been a favorable entry point.</p>''',
    },
    {
        'slug': 'comex-silver-inventories-fall-12-percent-may-2026',
        'date_iso': '2026-05-17T10:00:00+00:00',
        'date_display': 'May 17, 2026',
        'read_time': '5 min read',
        'title': 'COMEX Silver Inventories Fall 12% in 30 Days Amid Industrial Buying',
        'description': 'Registered silver inventories at COMEX-approved warehouses have fallen 12% over the past 30 days — a signal of strong physical off-take from industrial buyers at current price levels.',
        'tags': ['Physical Demand', 'COMEX', 'Industrial Buying'],
        'body': '''<p>Registered silver inventories held at COMEX-approved warehouses have declined by approximately <strong>12% over the past 30 days</strong>, dropping from roughly 125 million troy ounces to approximately 110 million troy ounces. This represents the fastest pace of inventory drawdown since November 2024 and is being interpreted by analysts as evidence of significant physical off-take by industrial buyers.</p>

<h3>Understanding COMEX Inventory Categories</h3>
<p>COMEX tracks two categories of silver:</p>
<ul>
  <li><strong>Registered</strong>: Silver that is in COMEX-approved warehouses, assayed, and immediately deliverable against futures contracts. This is the figure that matters for supply/demand analysis.</li>
  <li><strong>Eligible</strong>: Silver in approved warehouses that meets purity standards but is not yet designated for delivery. This can be converted to Registered status.</li>
</ul>
<p>The 12% decline in Registered inventories signals that buyers are taking physical delivery rather than rolling contracts — a bullish indicator for physical demand.</p>

<h3>Who Is Taking Delivery?</h3>
<p>Industrial end-users — primarily electronics manufacturers, solar panel producers, and EV battery companies — are the primary drivers of physical COMEX off-take during periods of significant drawdown. The current inventory decline is consistent with the pattern seen in prior years when silver prices temporarily declined from higher levels, providing procurement teams with an opportunity to accumulate at better prices.</p>

<h3>Market Implications</h3>
<p>COMEX inventory declines of 10%+ within 30 days have historically preceded price rebounds within 45–90 days, as available physical supply tightens. While this pattern is not deterministic, the combination of declining inventories and macro-driven price weakness historically creates a coiled-spring setup for silver when sentiment eventually turns.</p>''',
    },
    {
        'slug': 'silver-etf-inflows-inflation-hedge-may-2026',
        'date_iso': '2026-05-17T10:30:00+00:00',
        'date_display': 'May 17, 2026',
        'read_time': '5 min read',
        'title': 'Silver ETF Inflows Surge as Inflation Hedge Demand Returns',
        'description': 'Global silver-backed ETFs recorded net inflows for a third consecutive week, adding over 8 million troy ounces as investors return to silver as an inflation hedge despite hawkish monetary policy.',
        'tags': ['ETF Flows', 'Investment Demand', 'Inflation Hedge'],
        'body': '''<p>Global silver-backed exchange-traded funds (ETFs) have recorded <strong>net inflows for a third consecutive week</strong>, adding over <strong>8 million troy ounces</strong> of silver holdings during the period. The sustained inflow trend represents a meaningful shift in investor positioning, with large asset managers returning to silver as an inflation hedge after several quarters of net outflows.</p>

<h3>The Major Players</h3>
<p>The iShares Silver Trust (SLV) — the world's largest silver ETF — reported a net increase of 4.2 million troy ounces during the period, bringing total holdings to approximately 285 million troy ounces. The Aberdeen Standard Physical Silver Shares ETF (SIVR) and the Sprott Physical Silver Trust both also recorded meaningful inflows.</p>

<h3>The Inflation Hedge Paradox, Revisited</h3>
<p>The return of ETF inflows during a period when inflation data is also causing monetary policy concerns presents an apparent contradiction. The explanation lies in the type of investor driving the flows. Large institutional allocators — pension funds, endowments, family offices — tend to build silver positions on a multi-year horizon. For these buyers, current silver prices (down from the April highs) represent a tactical entry point within a longer-term inflation protection thesis, even if near-term monetary tightening creates volatility.</p>

<h3>ETF Inventory as a Leading Indicator</h3>
<p>Silver ETF inventory changes have historically had predictive value for price direction. Three consecutive weeks of net inflows — against a backdrop of lower prices — suggests that significant buying interest is absorbing the selling from macro-driven traders. If this absorption continues, it removes overhang from the market and sets up a potential supply-demand tightening at the physical level.</p>''',
    },
    {
        'slug': 'us-dollar-weakness-silver-tailwind-may-2026',
        'date_iso': '2026-05-17T11:00:00+00:00',
        'date_display': 'May 17, 2026',
        'read_time': '5 min read',
        'title': 'US Dollar Weakness Provides Short-Term Tailwind for Silver',
        'description': 'The Dollar Index fell to a three-month low this week on softer US retail sales data, providing a mechanical tailwind for silver prices and highlighting the key role of currency dynamics in precious metals valuation.',
        'tags': ['Currency', 'Dollar Index', 'Technical Analysis'],
        'body': '''<p>The US Dollar Index (DXY) fell to a <strong>three-month low</strong> this week, pressured by softer-than-expected US retail sales data for April. The April retail sales figure came in at -0.2% month-over-month against a +0.1% consensus estimate, raising questions about the resilience of the US consumer and tempering near-term Fed rate hike expectations modestly.</p>

<h3>The Dollar-Silver Relationship</h3>
<p>Silver is priced globally in US dollars. When the dollar weakens, silver becomes cheaper for buyers using other currencies — stimulating demand from international markets. Simultaneously, dollar weakness often signals reduced confidence in US economic strength, which can support safe-haven and inflation-hedge demand for silver. The dual mechanism makes dollar weakness one of the most reliable near-term tailwinds for silver.</p>

<p>The rolling 30-day correlation between DXY and silver has averaged <strong>-0.71</strong> in 2026 — meaning for approximately every 1% move in the DXY, silver has moved roughly 0.71% in the opposite direction. With DXY down approximately 1.5% on the week, this correlation relationship mechanically contributed about 1% of silver's weekly price move.</p>

<h3>Caution: A Tailwind, Not a Driver</h3>
<p>Currency effects are catalysts and amplifiers rather than independent demand drivers. Dollar weakness does not create new fundamental demand for silver — it makes existing demand slightly more cost-effective for non-USD buyers. Sustainable silver price appreciation requires either genuine industrial demand growth, constrained supply, or genuine monetary uncertainty — not simply a weaker dollar. Investors who anchor their silver thesis primarily on DXY movements tend to be disappointed when that relationship temporarily breaks down.</p>

<h3>Near-Term Outlook for DXY</h3>
<p>Key resistance for the dollar sits at DXY 104–105. If the US economic data normalizes from the weak April retail print, the dollar recovery could cap silver's gains from the currency channel. The next significant dollar catalyst is the June CPI report, which arrives before the mid-June FOMC meeting.</p>''',
    },
    {
        'slug': 'ev-sector-silver-demand-battery-may-2026',
        'date_iso': '2026-05-17T11:30:00+00:00',
        'date_display': 'May 17, 2026',
        'read_time': '6 min read',
        'title': 'EV Sector Adds to Silver Demand Story as Battery Tech Evolves',
        'description': "Electric vehicles use 25–50 grams of silver each for contacts, switches, and thermal management — and next-generation solid-state batteries may increase that figure significantly, making EVs silver's second major structural demand growth driver after solar.",
        'tags': ['Industrial Demand', 'Electric Vehicles', 'Battery Technology'],
        'body': '''<p>Beyond solar, the electric vehicle industry is consolidating its position as the <strong>second major structural pillar of silver's industrial demand story</strong>. Each battery-electric vehicle currently contains between <strong>25 and 50 grams of silver</strong>, used in electrical contacts, switches, membrane switches, power electronics cooling systems, and increasingly in battery management systems.</p>

<h3>Current EV Silver Demand</h3>
<p>With global EV sales approaching 20 million units annually in 2026, the EV sector consumes approximately 50–60 million troy ounces of silver per year — roughly 5–6% of total annual supply. While this is smaller than solar's 26% share, the growth trajectory is steep: EV sales are forecast to reach 40–50 million units annually by 2030.</p>

<h3>The Solid-State Battery Opportunity</h3>
<p>The most significant near-term development is the progress of solid-state battery technology. Traditional lithium-ion batteries use graphite anodes; solid-state batteries use silver-carbon composite anodes that dramatically improve energy density and charging speeds. Toyota, Panasonic, Samsung SDI, and QuantumScape are in advanced development stages. Commercial deployment of solid-state EVs at scale — expected to begin around 2027–2028 — could increase silver demand per vehicle by 2–3×.</p>

<div style="background:rgba(96,165,250,.08);border:1px solid rgba(96,165,250,.22);border-radius:12px;padding:16px;margin:20px 0">
  <div style="font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);margin-bottom:8px">Silver per Vehicle: Current vs. Solid-State</div>
  <div style="display:flex;justify-content:space-around;align-items:center;text-align:center">
    <div><div style="font-family:var(--f-mono);font-size:1.3rem;font-weight:700;color:#60a5fa">25–50g</div><div style="font-size:.65rem;color:var(--text-muted)">Current Li-ion EV</div></div>
    <div style="font-size:1.2rem;color:var(--text-muted)">→</div>
    <div><div style="font-family:var(--f-mono);font-size:1.3rem;font-weight:700;color:#a78bfa">80–150g</div><div style="font-size:.65rem;color:var(--text-muted)">Next-gen solid-state</div></div>
  </div>
</div>

<h3>Hybrid and PHEV Vehicles</h3>
<p>Plug-in hybrid and mild hybrid vehicles also use silver — typically 15–25 grams per vehicle for the additional electrical systems. As hybrids transition to full EVs over the next decade, the average silver content per vehicle sold is expected to increase significantly.</p>

<h3>Market Implications</h3>
<p>The convergence of solar (240M oz/year and growing) and EV demand (50–60M oz/year and accelerating) creates a structural floor for silver demand that most macro-focused analysis underestimates. Even in scenarios where financial investment demand (ETFs, futures) remains subdued due to monetary policy headwinds, physical industrial demand increasingly limits the downside for silver prices.</p>''',
    },
]

# ── Head template (shared CSS/JS loading from news page) ─────────────────────
HEAD_CSS = """  <style>*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}:root{--bg:#09090f;--surface:rgba(22,22,36,.9);--accent:#7c3aed;--accent2:#b39dfa;--text:#f0f4f8;--dim:#c2cfe0;--muted:#8fa3bc;--border:rgba(255,255,255,.10);--border2:rgba(255,255,255,.18);--r-sm:10px;--r-md:16px;--r-lg:24px;--space-xs:.25rem;--space-sm:.5rem;--space-md:1rem;--space-lg:1.5rem;--space-xl:2.5rem;--space-2xl:4rem;--f-display:'Outfit',sans-serif;--f-body:'Inter',sans-serif;--f-mono:'JetBrains Mono',monospace;--text-primary:#f0f4f8;--text-secondary:#c2cfe0;--text-muted:#8fa3bc;--border-subtle:rgba(255,255,255,.10);--border-medium:rgba(255,255,255,.18);--accent-primary:#7c3aed;--accent-green:#34d399;--accent-gold:#FBBF24;--bg-surface:rgba(22,22,36,.9);--bg-secondary:rgba(15,15,25,.8)}html{scroll-behavior:smooth;scroll-padding-top:80px}body{background:#09090f;color:#f0f4f8;font-family:'Inter',sans-serif;font-size:16px;overflow-x:hidden;-webkit-font-smoothing:antialiased;line-height:1.7}.container{width:100%;max-width:900px;margin:0 auto;padding:0 20px}
  .article-wrap{padding:40px 0 80px}.article-header{margin-bottom:32px}.article-header h1{font-size:clamp(1.5rem,4vw,2.2rem);line-height:1.25;font-weight:800;margin-bottom:16px}.article-meta{display:flex;flex-wrap:wrap;gap:10px;align-items:center;font-size:.8rem;color:var(--text-muted);margin-bottom:20px}.article-tag{display:inline-block;background:rgba(124,58,237,.18);color:#b39dfa;border:1px solid rgba(124,58,237,.3);border-radius:6px;padding:3px 10px;font-size:.72rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em}.article-body{font-size:1rem;line-height:1.8;color:var(--text-secondary)}.article-body h3{font-size:1.15rem;font-weight:700;color:#f0f4f8;margin:28px 0 12px}.article-body p{margin-bottom:16px}.article-body ul{margin:0 0 16px 20px}.article-body ul li{margin-bottom:8px}.article-body strong{color:#f0f4f8}.article-nav{display:flex;gap:12px;flex-wrap:wrap;margin-top:48px;padding-top:24px;border-top:1px solid var(--border-subtle)}.article-nav a{display:inline-flex;align-items:center;gap:6px;padding:10px 18px;border:1px solid var(--border-medium);border-radius:10px;color:var(--text-secondary);text-decoration:none;font-size:.85rem;transition:.2s}.article-nav a:hover{border-color:var(--accent-primary);color:#f0f4f8}
  </style>"""

def build_article_page(a):
    slug = a['slug']
    url = f"https://scrapsilvercalculater.com/silver-news/{slug}/"
    tags_html = ' '.join(f'<span class="article-tag">{t}</span>' for t in a['tags'])
    schema = f'''{{
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": {json_str(a['title'])},
    "description": {json_str(a['description'])},
    "datePublished": "{a['date_iso']}",
    "dateModified": "{a['date_iso']}",
    "url": "{url}",
    "inLanguage": "en",
    "isAccessibleForFree": true,
    "image": {{"@type":"ImageObject","url":"https://scrapsilvercalculater.com/images/social-share.png","width":1200,"height":630}},
    "author": {{"@type":"Organization","name":"Scrap Silver Calculator Editorial Team","url":"https://scrapsilvercalculater.com/"}},
    "publisher": {{"@type":"Organization","name":"Scrap Silver Calculator","url":"https://scrapsilvercalculater.com/","logo":{{"@type":"ImageObject","url":"https://scrapsilvercalculater.com/favicon.png"}}}}
  }}'''

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-YMX334ZW6Q"></script>
  <script type="text/javascript" async>(function(c,l,a,r,i,t,y){{c[a]=c[a]||function(){{(c[a].q=c[a].q||[]).push(arguments)}};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)}})(window,document,"clarity","script","wby5gobage");</script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag('js',new Date());gtag('config','G-YMX334ZW6Q');</script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{a['title']} | Scrap Silver Calculator</title>
  <meta name="description" content="{a['description']}">
  <link rel="canonical" href="{url}">
  <link rel="alternate" hreflang="x-default" href="{url}">
  <link rel="alternate" hreflang="en" href="{url}">
  <meta name="google-site-verification" content="3zJ4ttr1AnZWh4z6tMWiVpqPUwg7VEia6_65eJV8Lro">
  <meta name="article.published_time" content="{a['date_iso']}">
  <meta name="article.author" content="Scrap Silver Calculator Editorial Team">
  <meta name="article.section" content="Business">
  <meta property="og:type" content="article">
  <meta property="og:url" content="{url}">
  <meta property="og:title" content="{a['title']}">
  <meta property="og:description" content="{a['description']}">
  <meta property="og:image" content="https://scrapsilvercalculater.com/images/social-share.png">
  <meta property="article:published_time" content="{a['date_iso']}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{a['title']}">
  <meta name="twitter:description" content="{a['description']}">
  <meta name="twitter:image" content="https://scrapsilvercalculater.com/images/social-share.png">
  <script type="application/ld+json">
  {schema}
  </script>
{HEAD_CSS}
  <link rel="preload" href="/css/style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/css/style.css"></noscript>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;700;800&family=JetBrains+Mono:wght@500;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;700;800&family=JetBrains+Mono:wght@500;700&display=swap"></noscript>
  <link rel="icon" type="image/png" href="/favicon.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
</head>
<body>
  <div id="site-header"></div>
  <main>
    <div class="container">
      <div id="breadcrumb"></div>
      <div class="article-wrap">
        <header class="article-header">
          <div class="article-meta">
            {tags_html}
            <span>·</span>
            <time datetime="{a['date_iso']}">{a['date_display']}</time>
            <span>·</span>
            <span>{a['read_time']}</span>
          </div>
          <h1>{a['title']}</h1>
          <p style="color:var(--text-muted);font-size:.95rem;border-left:3px solid var(--accent-primary);padding-left:14px">{a['description']}</p>
        </header>
        <div class="article-body">
          {a['body']}
        </div>
        <nav class="article-nav">
          <a href="/silver-news-today/">← All Silver News</a>
          <a href="/silver-price-today/">Live Silver Price</a>
          <a href="/silver-scrap-calculator/">Scrap Calculator</a>
        </nav>
      </div>
    </div>
  </main>
  <div id="site-footer"></div>
  <script src="/js/silver-price.js" defer></script>
  <script src="/js/components.js" defer></script>
  <script>
    SiteComponents.renderHeader('site-header');
    SiteComponents.renderFooter('site-footer');
    SiteComponents.renderBreadcrumb('breadcrumb',[
      {{label:'Home',href:'/'}},
      {{label:'Silver News',href:'/silver-news-today/'}},
      {{label:'{a['title'][:50]}...'}}
    ]);
  </script>
</body>
</html>'''

def json_str(s):
    import json
    return json.dumps(s)

# ── Write individual article pages ───────────────────────────────────────────
created = []
for a in ARTICLES:
    fpath = os.path.join(NEWS_DIR, a['slug'] + '.html')
    content = build_article_page(a)
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
    created.append(fpath)

print(f'Created {len(created)} article pages:')
for p in created:
    print(f'  {p}')
