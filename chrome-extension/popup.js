'use strict';

/* ─── Config ─────────────────────────────────────── */
const GOLDAPI_KEY    = 'goldapi-1230smo2lqnxm-io';
const FALLBACK_PRICE = 87.42;
const FALLBACK_GOLD  = 3200.00;

const CURRENCIES = {
  USD: { symbol: '$',  rate: 1      },
  EUR: { symbol: '€',  rate: 0.92   },
  GBP: { symbol: '£',  rate: 0.79   },
  INR: { symbol: '₹',  rate: 83.50  },
  PKR: { symbol: '₨',  rate: 278.50 },
};

/* ─── State ──────────────────────────────────────── */
let silverSpot  = FALLBACK_PRICE;
let goldSpot    = FALLBACK_GOLD;
let priceChange = null;
let changePct   = null;
let activeCur   = 'USD';

/* ─── Helpers ────────────────────────────────────── */
const $  = id => document.getElementById(id);
const set = (id, val) => { const e = $(id); if (e) e.textContent = val; };

function fmt(n, sym) {
  if (!sym) sym = CURRENCIES[activeCur].symbol;
  return isNaN(n) ? sym + '—' : sym + Number(n).toFixed(2);
}

function toGrams(w, unit) {
  if (unit === 'oz')  return w * 31.1035;
  if (unit === 'dwt') return w * 1.55517;
  if (unit === 'kg')  return w * 1000;
  return w; // grams
}

/* ─── Price fetching ─────────────────────────────── */
async function quickFetch(url, opts) {
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(5000), ...opts });
    return r.ok ? r.json() : null;
  } catch { return null; }
}

async function fetchPrice() {
  /* 1 — Site proxy */
  const d1 = await quickFetch('https://scrapsilvercalculater.com/api/price');
  if (d1?.silver > 0) return d1;

  /* 2 — GoldAPI.io */
  try {
    const headers = { 'x-access-token': GOLDAPI_KEY };
    const [sR, gR] = await Promise.all([
      fetch('https://www.goldapi.io/api/XAG/USD', { headers, signal: AbortSignal.timeout(5000) }),
      fetch('https://www.goldapi.io/api/XAU/USD', { headers, signal: AbortSignal.timeout(5000) }),
    ]);
    if (sR.ok && gR.ok) {
      const [s, g] = await Promise.all([sR.json(), gR.json()]);
      if (s.price > 0) return { silver: s.price, gold: g.price, change: s.ch, changePercent: s.chp };
    }
  } catch { /* fall through */ }

  /* 3 — goldprice.org */
  const d3 = await quickFetch('https://data-asg.goldprice.org/dbXRates/USD');
  if (d3?.items?.[0]?.xagPrice > 0) {
    const it = d3.items[0];
    return { silver: it.xagPrice, gold: it.xauPrice };
  }

  /* 4 — metals.live */
  for (const url of ['https://metals.live/api/v1/spot', 'https://api.metals.live/v1/spot']) {
    const d4 = await quickFetch(url);
    if (d4) {
      const spot   = Array.isArray(d4) ? d4[0] : d4;
      const silver = spot?.silver ?? spot?.XAG ?? spot?.xag;
      if (silver > 0) return { silver, gold: spot?.gold ?? spot?.XAU ?? null };
    }
  }

  return null;
}

/* ─── Display ────────────────────────────────────── */
function render() {
  const cur = CURRENCIES[activeCur];
  const sp  = silverSpot * cur.rate;
  const gp  = goldSpot   * cur.rate;
  const sym = cur.symbol;

  set('spot-oz',  sp.toFixed(2));
  set('spot-gram', (sp / 31.1035).toFixed(3));
  set('p925g',  sym + (sp * 0.925 / 31.1035).toFixed(3));
  set('p999g',  sym + (sp * 0.999 / 31.1035).toFixed(3));
  set('pgold',  sym + gp.toFixed(0));
  set('pgsr',   (goldSpot / silverSpot).toFixed(1));

  const chEl = $('price-change');
  if (chEl) {
    if (priceChange !== null && changePct !== null) {
      const up  = priceChange >= 0;
      chEl.textContent = `${up ? '▲' : '▼'} ${sym}${Math.abs(priceChange * cur.rate).toFixed(2)} (${up ? '+' : ''}${changePct.toFixed(2)}%)`;
      chEl.className   = 'price-change ' + (up ? 'up' : 'down');
    } else {
      chEl.textContent = 'Live';
      chEl.className   = 'price-change flat';
    }
  }

  calc();
}

function calc() {
  const w      = parseFloat($('weight')?.value)  || 0;
  const unit   = $('unit')?.value   || 'g';
  const purity = parseFloat($('purity')?.value)  || 0.925;
  const cur    = CURRENCIES[activeCur];
  const grams  = toGrams(w, unit);
  const value  = (grams / 31.1035) * silverSpot * purity * cur.rate;
  const pureOz = (grams * purity / 31.1035).toFixed(4);

  set('result-value',  cur.symbol + value.toFixed(2));
  set('result-detail', `${pureOz} troy oz pure · spot ${cur.symbol}${(silverSpot * cur.rate).toFixed(2)}/oz`);
}

/* ─── Load price ─────────────────────────────────── */
async function loadPrice(force) {
  set('last-updated', 'Fetching…');

  /* Try cache first (unless force refresh) */
  if (!force) {
    try {
      const raw = sessionStorage.getItem('ssc_ext_cache');
      if (raw) {
        const c = JSON.parse(raw);
        if (Date.now() - c.ts < 3600000 && c.silver > 0) {
          silverSpot  = c.silver;
          goldSpot    = c.gold    || FALLBACK_GOLD;
          priceChange = c.change  ?? null;
          changePct   = c.pct    ?? null;
          render();
          set('last-updated', 'Updated ' + new Date(c.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          return;
        }
      }
    } catch { /* ignore */ }
  }

  render(); /* show fallback immediately */

  const data = await fetchPrice();
  if (data?.silver > 0) {
    silverSpot  = +data.silver.toFixed(2);
    goldSpot    = data.gold          ? +data.gold.toFixed(2)          : FALLBACK_GOLD;
    priceChange = data.change        != null ? +data.change.toFixed(2)        : null;
    changePct   = data.changePercent != null ? +data.changePercent.toFixed(2) : null;
    try {
      sessionStorage.setItem('ssc_ext_cache', JSON.stringify({
        silver: silverSpot, gold: goldSpot,
        change: priceChange, pct: changePct, ts: Date.now()
      }));
    } catch { /* ignore */ }
  }

  render();
  set('last-updated', 'Updated ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
}

/* ─── Currency buttons ───────────────────────────── */
function initCurrency() {
  document.querySelectorAll('.cur-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cur-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCur = btn.dataset.cur;
      render();
    });
  });
}

/* ─── Boot ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCurrency();

  ['weight', 'unit', 'purity'].forEach(id => {
    const el = $(id);
    if (el) el.addEventListener('input', calc);
  });

  $('refresh-btn')?.addEventListener('click', async () => {
    const btn = $('refresh-btn');
    if (btn) btn.style.pointerEvents = 'none';
    await loadPrice(true);
    setTimeout(() => { if (btn) btn.style.pointerEvents = ''; }, 2000);
  });

  loadPrice(false);
});
