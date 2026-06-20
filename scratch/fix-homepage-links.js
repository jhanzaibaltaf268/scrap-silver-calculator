// Dry-run resolver for localized homepage links. Run: node scratch/fix-homepage-links.js
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const langs = ["fr","es","it","de","pt","tr","ar","ur","hi"];
const dec = s => { try { return decodeURIComponent(s); } catch(e){ return s; } };
const files = {};
for (const l of langs) files[l] = fs.readdirSync(path.join(ROOT,l)).filter(f=>f.endsWith(".html")).map(f=>f.replace(/\.html$/,""));
const has = (l,s) => s && files[l].includes(s);
const find = (l, re) => files[l].filter(f => re.test(f));

// ---- source 1: per-page hreflang="en" backlink ----
const s1 = {};
for (const l of langs) {
  const m = {};
  for (const f of files[l]) {
    const html = fs.readFileSync(path.join(ROOT,l,f+".html"),"utf8");
    const en = html.match(/hreflang="en"\s+href="https:\/\/scrapsilvercalculater\.com\/([^"\/]+)\/?"/);
    if (en) { const eng = dec(en[1]); if (!m[eng]) m[eng] = f; }
  }
  s1[l] = m;
}
// ---- source 2: master-slugs.json ----
const ms = require(path.join(ROOT,"master-slugs.json")); const s2 = {};
for (const l of langs) s2[l] = {};
for (const eng of Object.keys(ms)) { const row = ms[eng]; if (row && typeof row==="object") for (const l of langs) if (row[l]) s2[l][eng] = row[l]; }

// ---- gap fill: regex matchers per (target, lang) against real filenames ----
const GAP = {
  "how-to-sell-silver": { fr:/^comment-vendre-de-l-argent/, es:/^como-vender-plata/, it:/^come-vendere/, de:/^wie-man-silber-verkauf/, pt:/^como-vender-prata/, tr:/nasıl-satıl/, ar:/^كيفية-بيع/, ur:/فروخت-کرنے-کا-طریقہ/, hi:/कस-बच/ },
  "identify-silver": { fr:/^identificateur-d-argent/, es:/^identificador-de-plata/, de:/^silber-identifizieren/, tr:/^gümüşü-tanımla/, ur:/^چاندی-کی-شناخت/, hi:/पहचन/ },
  "silver-bar-value-calculator": { de:/^silberbarren-wert-rechner/, pt:/barra-de-prata/, tr:/külçe-değeri-hesaplayıcı/, ar:/شريط-الفضة/, hi:/बर-वलय-कलकलटर/ },
  "silver-batch-calculator": { de:/^silber-stapel-rechner/, tr:/^gümüş-toplu-hesap/, ur:/^سلور-بیچ-کیلکولیٹر/, hi:/^चद-बच-कलकलटर/ },
  "silver-jewelry-value-calculator": { it:/gioielli-in-argento/, de:/^silberschmuck-wert-rechner/, pt:/joias-de-prata/, tr:/takı-değeri-hesaplama/, hi:/आभषण-मलय/ },
  "silver-price-today": { fr:/^prix-argent-aujourd-hui/, es:/^precio-plata-hoy/, it:/^prezzo-argento-oggi/, de:/^silberpreis-heute/, pt:/^preco-prata-hoje/, tr:/^gumus-fiyati-bugun/, ar:/^سعر-الفضة-اليوم/, ur:/^aaj-chandi-ki-qeemat/, hi:/^aaj-ka-chandi-bhav/ },
  "silver-purity-chart": { it:/purezza-dellargento/, de:/^silber-reinheitstabelle/, tr:/saflık-tablosu/, hi:/शदधत-चरट/ },
  // spot -> today fallback (mirrors site's own /silver-spot-price-today/ -> /silver-price-today/ redirect)
  "silver-spot-price-today": { fr:/^prix-argent-aujourd-hui/, es:/^precio-plata-hoy/, de:/^silberpreis-heute/ },
  "silver-weight-converter": { it:/^convertitore-del-peso/, de:/^silber-gewichtsumrechner/, tr:/ağırlık-dönüştürücü/, hi:/वजन-कनवरटर/ },
  "silverware-value-calculator": { it:/valore-dellargenteria/, de:/^silberbesteck-wert-rechner/, pt:/^calculadora-de-valor-de-talheres/, tr:/eşya-değeri-hesaplayıcı/, ur:/^سلور-ویئر-ویلیو/, hi:/बरतन-मलय/ },
};

function resolve(l, t) {
  for (const src of [s1, s2]) if (has(l, src[l][t])) return src[l][t];
  const re = GAP[t] && GAP[t][l];
  if (re) { const c = find(l, re); if (c.length === 1) return c[0]; if (c.length > 1) return {ambig:c}; }
  return null;
}

// collect targets from homepages
const targets = new Set();
for (const l of langs) {
  const html = fs.readFileSync(path.join(ROOT,l,"index.html"),"utf8"); let x; const re=/href="([^"]+)"/g;
  while ((x = re.exec(html))) { let h=x[1]; if(/^(https?:|mailto:|tel:|#)/.test(h))continue; if(/\.(css|js|png|ico|svg|xml|json|webp|jpg)$/.test(h))continue;
    h=h.replace(/^\.?\//,"").replace(/^[a-z]{2}\//,"").replace(/\/$/,"").replace(/\.html$/,""); if(h)targets.add(h); }
}
const T=[...targets].sort();
const final={}; const skips=[];
for (const t of T) { final[t]={}; for (const l of langs) { const r=resolve(l,t);
  if (typeof r==="string") final[t][l]=r;
  else if (r && r.ambig) skips.push(`${t} [${l}] AMBIGUOUS: ${r.ambig.join(", ")}`);
  else skips.push(`${t} [${l}] UNRESOLVED`); } }

let full=0; for(const t of T) if(Object.keys(final[t]).length===langs.length) full++;
console.log(`Targets: ${T.length} | fully resolved across 9 langs: ${full}`);
console.log("\n=== SKIPS (will keep existing link, reported) ===");
console.log(skips.length?skips.map(s=>"  "+s).join("\n"):"  none");
console.log("\n=== SAMPLE resolved (sterling, sell, today) ===");
for (const t of ["sterling-silver-calculator","how-to-sell-silver","silver-price-today"])
  console.log(t+":\n"+langs.map(l=>`  ${l} -> ${final[t][l]||"(skip)"}`).join("\n"));
fs.writeFileSync(path.join(__dirname,"resolved-map.json"), JSON.stringify(final,null,1));
console.log("\nWrote scratch/resolved-map.json");

// ---- WRITE MODE ----
if (process.argv.includes("--write")) {
  console.log("\n=== WRITING ===");
  const norm = h => h.replace(/^\.?\//,"").replace(/^[a-z]{2}\//,"").replace(/\/$/,"").replace(/\.html$/,"");
  for (const l of langs) {
    const fp = path.join(ROOT,l,"index.html");
    let html = fs.readFileSync(fp,"utf8");
    let changed=0, kept=0;
    html = html.replace(/href="([^"]+)"/g, (m,h) => {
      if (/^(https?:|mailto:|tel:|#)/.test(h)) return m;
      if (/\.(css|js|png|ico|svg|xml|json|webp|jpg)$/.test(h)) return m;
      const key = norm(h);
      if (!key) return m; // homepage/root link
      const slug = final[key] && final[key][l];
      if (!slug) { kept++; return m; } // unresolved -> leave as-is
      const newHref = `/${l}/${slug}/`;
      if (`href="${newHref}"` === m) return m;
      changed++; return `href="${newHref}"`;
    });
    fs.writeFileSync(fp, html);
    console.log(`  ${l}/index.html: rewrote ${changed}, kept ${kept}`);
  }
}
