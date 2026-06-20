// Regenerate hreflang clusters sitewide. Dry-run by default; pass --write to apply.
const fs=require("fs"),path=require("path");
const ROOT=path.join(__dirname,"..");
const BASE="https://scrapsilvercalculater.com";
const langs=["ar","de","es","fr","hi","it","pt","tr","ur"];
const dec=s=>{try{return decodeURIComponent(s)}catch(e){return s}};
const fileset={}; for(const l of langs) fileset[l]=new Set(fs.readdirSync(path.join(ROOT,l)).filter(f=>f.endsWith(".html")).map(f=>f.replace(/\.html$/,"")));
const enFiles=fs.readdirSync(ROOT).filter(f=>f.endsWith(".html")).map(f=>f.replace(/\.html$/,""));
const has=(l,s)=>s&&fileset[l].has(s);

// ---- sources ----
const s1={}; for(const l of langs){s1[l]={};for(const f of fileset[l]){const html=fs.readFileSync(path.join(ROOT,l,f+".html"),"utf8");const en=html.match(/hreflang="en"\s+href="https:\/\/scrapsilvercalculater\.com\/([^"\/]+)\/?"/);if(en){const e=dec(en[1]);if(!s1[l][e])s1[l][e]=f;}}}
const ms=require(path.join(ROOT,"master-slugs.json"));const s2={};for(const l of langs)s2[l]={};for(const e of Object.keys(ms)){const r=ms[e];if(r&&typeof r==="object")for(const l of langs)if(r[l])s2[l][e]=r[l];}
const s3={};for(const l of langs)s3[l]={};for(const fn of fs.readdirSync(ROOT)){if(!fn.endsWith(".js"))continue;let src;try{src=fs.readFileSync(path.join(ROOT,fn),"utf8")}catch(e){continue}const re=/(\w\w)Dict\s*=\s*({[\s\S]*?\n\s*});/g;let m;while((m=re.exec(src))){const l=m[1];if(!langs.includes(l))continue;try{Object.assign(s3[l],eval("("+m[2]+")"))}catch(e){}}}

// ---- verified override table (from directory listings); has() guards every entry ----
const OV={
 "100oz-silver-value":{hi:"100-औस-चद-क-मलय",it:"valore-dargento-100-once",pt:"valor-de-prata-de-100-onças"},
 "10oz-silver-value":{it:"valore-dargento-da-10-once",pt:"valor-de-prata-de-10-onças"},
 "1kg-silver-value":{hi:"1-कल-चद-क-मलय"},
 "1oz-silver-value":{hi:"1-औस-चद-क-मलय",it:"valore-dargento-di-1-oncia",pt:"valor-de-1-onça-de-prata"},
 "2oz-silver-value":{hi:"2-औस-चद-क-मलय",it:"valore-dargento-da-2-once",pt:"valor-de-prata-de-2-onças"},
 "5oz-silver-value":{hi:"5-औस-चद-क-मलय",it:"valore-dargento-di-5-once",pt:"valor-de-prata-de-5-onças"},
 "how-to-sell-silver":{ar:"كيفية-بيع-الفضة",de:"wie-man-silber-verkauft",hi:"चद-कस-बच",it:"come-vendere-argento",pt:"como-vender-prata",tr:"gümüş-nasıl-satılır",ur:"چاندی-فروخت-کرنے-کا-طریقہ"},
 "identify-silver":{de:"silber-identifizieren",hi:"चद-क-पहचन-कर",tr:"gümüşü-tanımla",ur:"چاندی-کی-شناخت"},
 "silver-bar-value-calculator":{ar:"حاسبة-قيمة-شريط-الفضة",de:"silberbarren-wert-rechner",hi:"सलवर-बर-वलय-कलकलटर",pt:"calculadora-de-valor-de-barra-de-prata",tr:"gümüş-külçe-değeri-hesaplayıcı"},
 "silver-batch-calculator":{de:"silber-stapel-rechner",hi:"चद-बच-कलकलटर",tr:"gümüş-toplu-hesap-makinesi",ur:"سلور-بیچ-کیلکولیٹر"},
 "silver-bracelet-value":{de:"silberarmband-wert",hi:"चद-क-कगन-क-मलय",it:"valore-del-braccialetto-in-argento",pt:"valor-da-pulseira-de-prata"},
 "silver-chain-value":{de:"silberkette-wert",hi:"चद-क-चन-क-मलय",it:"valore-della-catena-dargento",pt:"valor-da-corrente-de-prata"},
 "silver-cup-value":{de:"silberbecher-wert",hi:"चद-क-कप-क-मलय",it:"valore-della-coppa-dargento",pt:"valor-da-taça-de-prata"},
 "silver-fork-value":{de:"silbergabel-wert",hi:"चद-कट-मलय",it:"valore-della-forchetta-dargento",pt:"valor-do-garfo-de-prata",tr:"gümüş-çatal-değeri"},
 "silver-jewelry-value-calculator":{de:"silberschmuck-wert-rechner",hi:"चद-क-आभषण-मलय-कलकलटर",it:"calcolatore-del-valore-dei-gioielli-in-argento",pt:"calculadora-de-valor-de-joias-de-prata",tr:"gümüş-takı-değeri-hesaplama"},
 "silver-knife-value":{de:"silbermesser-wert",hi:"चद-क-चक-क-मलय",it:"valore-del-coltello-dargento",pt:"valor-da-faca-de-prata",tr:"gümüş-bıçak-değeri"},
 "silver-necklace-value":{de:"silberhalskette-wert",hi:"चद-क-हर-क-मलय",it:"valore-della-collana-in-argento",pt:"valor-do-colar-de-prata"},
 "silver-plate-value":{ar:"قيمة-لوحة-الفضة",de:"silberteller-wert",hi:"चद-क-पलट-क-मलय",it:"valore-piatto-dargento",pt:"valor-da-placa-de-prata"},
 "silver-price-all-currencies":{de:"silberpreis-alle-waehrungen",es:"precio-en-todas-las-monedas",hi:"चद-क-कमत-सभ-मदरए",it:"prezzo-dellargento-in-tutte-le-valute",pt:"preço-da-prata-todas-as-moedas",tr:"gümüş-fiyatı-tüm-para-birimleri"},
 "silver-purity-chart":{de:"silber-reinheitstabelle",hi:"चद-क-शदधत-चरट",it:"grafico-della-purezza-dellargento",tr:"gümüş-saflık-tablosu"},
 "silver-ring-value":{hi:"चद-क-अगठ-क-मलय",it:"valore-dellanello-in-argento",pt:"valor-do-anel-de-prata",tr:"gümüş-yüzük-değeri"},
 "silver-sell-or-hold":{ar:"بيع-الفضة-أو-الاحتفاظ-بها",de:"silber-verkaufen-oder-halten",hi:"चद-बच-य-रख",it:"vendere-o-trattenere-largento",pt:"prata-vender-ou-manter",ur:"چاندی-بیچیں-یا-پکڑیں"},
 "silver-spoon-value":{de:"silberloeffel-wert",hi:"चद-क-चममच-क-मलय",it:"valore-del-cucchiaio-dargento",pt:"valor-da-colher-de-prata",tr:"gümüş-kaşık-değeri"},
 "silver-tray-value":{de:"silbertablett-wert",hi:"चद-क-टर-क-मलय",it:"valore-del-vassoio-dargento"},
 "silver-weight-converter":{de:"silber-gewichtsumrechner",hi:"चद-वजन-कनवरटर",it:"convertitore-del-peso-dellargento",tr:"gümüş-ağırlık-dönüştürücü"},
 "silverware-value-calculator":{ar:"حاسبة-قيمة-الفضيات",de:"silberbesteck-wert-rechner",hi:"चद-क-बरतन-मलय-कलकलटर",it:"calcolatore-del-valore-dellargenteria",pt:"calculadora-de-valor-de-talheres",tr:"gümüş-eşya-değeri-hesaplayıcı",ur:"سلور-ویئر-ویلیو-کیلکولیٹر"},
 "what-is-sterling-silver":{ar:"ما-هي-الفضة-الاسترليني",de:"was-ist-sterlingsilber",hi:"सटरलग-सलवर-कय-ह",it:"cosè-largento-sterling",pt:"o-que-é-prata-esterlina",ur:"سٹرلنگ-چاندی-کیا-ہے"},
 "silver-price-today":{ar:"سعر-الفضة-اليوم",de:"silberpreis-heute",es:"precio-plata-hoy",fr:"prix-argent-aujourd-hui",hi:"aaj-ka-chandi-bhav",it:"prezzo-argento-oggi",pt:"preco-prata-hoje",tr:"gumus-fiyati-bugun",ur:"aaj-chandi-ki-qeemat"},
 "silver-news-today":{ar:"أخبار-الفضة-اليوم",de:"silbernachrichten-heute",es:"noticias-plata-hoy",fr:"actualites-argent-aujourd-hui",hi:"chandi-samachar-aaj",it:"notizie-argento-oggi",pt:"noticias-prata-hoje",tr:"gumus-haberleri-bugun",ur:"chandi-khabar-aaj"},
 "silver-price-forecast-today":{ar:"توقعات-سعر-الفضة",de:"silberpreis-prognose",es:"pronostico-precio-plata",fr:"prevision-prix-argent",hi:"chandi-bhav-purvanuman",it:"previsione-prezzo-argento",pt:"previsao-preco-prata",tr:"gumus-fiyat-tahmini",ur:"chandi-qeemat-peshgoi"},
 "silver-spot-price-today":{ar:"سعر-الفضة-الفوري-اليوم",it:"prezzo-spot-dellargento-oggi",pt:"preço-à-vista-da-prata-hoje",tr:"bugünkü-gümüş-spot-fiyatı",ur:"چاندی-کی-اسپاٹ-قیمت-آج"},
 "925-silver-price-today":{ar:"سعر-الفضة-925-اليوم",de:"925-sterlingsilber-preis-heute",es:"925-plata-precio-hoy",fr:"925-argent-sterling-prix-aujourd-hui",hi:"925-chandi-bhav-aaj",it:"925-argento-sterling-prezzo-oggi",pt:"925-prata-preco-hoje",tr:"925-gumus-fiyati-bugun",ur:"925-chandi-qeemat-aaj"},
 "999-silver-price-today":{ar:"سعر-الفضة-الخالصة-999-اليوم",de:"999-feinsilber-preis-heute",es:"999-plata-fina-precio-hoy",fr:"999-argent-pur-prix-aujourd-hui",hi:"999-shudh-chandi-bhav-aaj",it:"999-argento-puro-prezzo-oggi",pt:"999-prata-fina-preco-hoje",tr:"999-saf-gumus-fiyati-bugun",ur:"999-khalis-chandi-qeemat-aaj"},
 "silver-scrap-calculator":{es:"calculadora-de-plata-de-desecho"},
};
// report OV entries that FAIL verification (likely typos) — these are skipped, not written wrong
const ovFail=[]; for(const c of Object.keys(OV))for(const l of Object.keys(OV[c]))if(!has(l,OV[c][l]))ovFail.push(`${c}[${l}]=${OV[c][l]}`);

// ---- build verified groups: group[concept]={lang:slug,...}  (OV first, then sources) ----
const group={}; for(const e of enFiles){const g={};for(const l of langs){const ov=OV[e]&&OV[e][l];if(has(l,ov)){g[l]=ov;continue;}for(const src of[s1,s3,s2]){const c=src[l][e];if(has(l,c)){g[l]=c;break;}}}group[e]=g;}
// reverse: rev[lang][slug]=concept
const rev={}; for(const l of langs)rev[l]={};
for(const e of enFiles)for(const l of langs)if(group[e][l])rev[l][group[e][l]]=e;

function clusterFor(concept){
  const enUrl = concept==="index" ? BASE+"/" : BASE+"/"+concept+"/";
  const lines=[`<link rel="alternate" hreflang="x-default" href="${enUrl}">`,
               `<link rel="alternate" hreflang="en" href="${enUrl}">`];
  const g=group[concept]||{};
  for(const l of langs){ if(!g[l])continue; const url = g[l]==="index"?BASE+"/"+l+"/":BASE+"/"+l+"/"+g[l]+"/"; lines.push(`<link rel="alternate" hreflang="${l}" href="${url}">`); }
  return lines;
}

// strip ALL existing alternate/hreflang link tags, return {html, indent, hadBlock}
const TAG=/[ \t]*<link\b[^>]*hreflang="[^"]*"[^>]*>[ \t]*\n?/g;
function rewrite(html, concept){
  let indent="    ", first=null;
  const mm=html.match(/^([ \t]*)<link\b[^>]*hreflang="[^"]*"/m); if(mm)indent=mm[1];
  // find insertion point = index of first hreflang link
  const idx=html.search(/[ \t]*<link\b[^>]*hreflang="[^"]*"[^>]*>/);
  const cleaned=html.replace(TAG,"");
  const block=clusterFor(concept).map(l=>indent+l).join("\n")+"\n";
  if(idx===-1){ // no existing cluster: insert after canonical, else after <head>
    const cIdx=cleaned.search(/[ \t]*<link\b[^>]*rel="canonical"[^>]*>\s*\n/);
    if(cIdx!==-1){const end=cleaned.indexOf("\n",cIdx)+1;return cleaned.slice(0,end)+block+cleaned.slice(end);}
    return cleaned.replace(/(<head[^>]*>\s*\n)/i,`$1${block}`);
  }
  // insert at original position (recompute on cleaned by canonical anchor to stay stable)
  const cIdx=cleaned.search(/[ \t]*<link\b[^>]*rel="canonical"[^>]*>\s*\n/);
  if(cIdx!==-1){const end=cleaned.indexOf("\n",cIdx)+1;return cleaned.slice(0,end)+block+cleaned.slice(end);}
  return cleaned.replace(/(<head[^>]*>\s*\n)/i,`$1${block}`);
}

// ---- group dump ----
const grpIdx=process.argv.indexOf("--group");
if(grpIdx!==-1){ const c=process.argv[grpIdx+1]; console.log(c,"=>",JSON.stringify(group[c])); console.log("missing langs:",langs.filter(l=>!group[c][l]).join(",")||"none"); process.exit(0); }

// ---- inspect mode: print transformed head region for one file, no write ----
const insIdx=process.argv.indexOf("--inspect");
if(insIdx!==-1){
  const rel=process.argv[insIdx+1]; const fp=path.join(ROOT,rel);
  const slug=path.basename(rel).replace(/\.html$/,""); const dir=path.dirname(rel);
  let concept;
  if(dir==="."||dir==="") concept=slug; else concept=(slug==="index")?"index":rev[dir][slug];
  console.log("file:",rel," concept:",concept);
  const out=rewrite(fs.readFileSync(fp,"utf8"),concept||slug);
  const h=out.slice(out.search(/<head/i), out.search(/<\/head>/i)+7);
  console.log(h.split("\n").filter(l=>/hreflang|canonical|<head|<title/i.test(l)).join("\n"));
  process.exit(0);
}

// ---- iterate all pages ----
const WRITE=process.argv.includes("--write");
let stats={enFull:0,enSelf:0,locFull:0,locUnmapped:0,filesChanged:0};
const unmapped=[];
// english pages
for(const e of enFiles){
  const fp=path.join(ROOT,e+".html"); let html=fs.readFileSync(fp,"utf8");
  const out=rewrite(html,e);
  if(Object.keys(group[e]).length>0)stats.enFull++; else stats.enSelf++;
  if(out!==html){stats.filesChanged++; if(WRITE)fs.writeFileSync(fp,out);}
}
// localized pages
for(const l of langs){
  for(const slug of fileset[l]){
    const fp=path.join(ROOT,l,slug+".html"); let html=fs.readFileSync(fp,"utf8");
    const concept=slug==="index"?"index":rev[l][slug];
    if(!concept){ // unmapped: only strip ru/zh, leave the rest
      stats.locUnmapped++; unmapped.push(l+"/"+slug);
      const out=html.replace(/[ \t]*<link\b[^>]*hreflang="(ru|zh)"[^>]*>[ \t]*\n?/g,"");
      if(out!==html){stats.filesChanged++; if(WRITE)fs.writeFileSync(fp,out);}
      continue;
    }
    stats.locFull++;
    const out=rewrite(html,concept);
    if(out!==html){stats.filesChanged++; if(WRITE)fs.writeFileSync(fp,out);}
  }
}
console.log((WRITE?"WROTE":"DRY-RUN"),JSON.stringify(stats,null,0));
console.log("\nOV entries FAILING verification (skipped, fix typo if unexpected):",ovFail.length);
ovFail.forEach(x=>console.log("  !! "+x));
console.log("unmapped localized pages (ru/zh-stripped only):",unmapped.length);
console.log("  "+unmapped.slice(0,25).join(", "));
console.log("\n=== sample cluster: sterling-silver-calculator (EN) ===");
console.log(clusterFor("sterling-silver-calculator").join("\n"));
console.log("\n=== sample cluster: 1oz-silver-value (partial) ===");
console.log(clusterFor("1oz-silver-value").join("\n"));
// report partial concepts
const partials=enFiles.filter(e=>{const n=Object.keys(group[e]).length;return n>0&&n<langs.length;}).map(e=>e+" ("+Object.keys(group[e]).length+"/9)");
console.log("\n=== partial concepts (incomplete but correct clusters) ===",partials.length);
console.log("  "+partials.join("\n  "));
