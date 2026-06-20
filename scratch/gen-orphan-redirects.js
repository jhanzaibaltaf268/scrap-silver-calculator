// Generate per-language redirects mirroring the EN redirect graph for orphan localized pages.
// Dry-run unless --write (writes vercel.json).
const fs=require("fs"),path=require("path");
const ROOT=path.join(__dirname,"..");
const BASE="https://scrapsilvercalculater.com";
const langs=["ar","de","es","fr","hi","it","pt","tr","ur"];
const dec=s=>{try{return decodeURIComponent(s)}catch(e){return s}};
const fileset={};for(const l of langs)fileset[l]=new Set(fs.readdirSync(path.join(ROOT,l)).filter(f=>f.endsWith(".html")).map(f=>f.replace(/\.html$/,"")));
const enFiles=fs.readdirSync(ROOT).filter(f=>f.endsWith(".html")).map(f=>f.replace(/\.html$/,""));

const vj=JSON.parse(fs.readFileSync(path.join(ROOT,"vercel.json"),"utf8"));
const red={};for(const r of (vj.redirects||[])){const s=r.source.replace(/^\//,"").replace(/\/$/,"");red[s]=r.destination;}
const existingSources=new Set((vj.redirects||[]).map(r=>r.source));

// reverse maps to find each localized slug's EN concept
const ms=JSON.parse(fs.readFileSync(path.join(ROOT,"master-slugs.json"),"utf8"));
const rev={};for(const l of langs)rev[l]={};
for(const e of Object.keys(ms)){const r=ms[e];if(r&&typeof r==="object")for(const l of langs)if(r[l])rev[l][r[l]]=e;}
for(const fn of fs.readdirSync(ROOT)){if(!fn.endsWith(".js"))continue;let src;try{src=fs.readFileSync(path.join(ROOT,fn),"utf8")}catch(e){continue}const re=/(\w\w)Dict\s*=\s*({[\s\S]*?\n\s*});/g;let m;while((m=re.exec(src))){const l=m[1];if(!langs.includes(l))continue;try{const d=eval("("+m[2]+")");for(const e of Object.keys(d))rev[l][d[e]]=e;}catch(e){}}}

// localized slug of an EN concept for a lang, read from that EN page's live hreflang cluster
const locCache={};
function localizedSlug(concept,l){
  const key=concept+"|"+l; if(key in locCache)return locCache[key];
  let res=null;
  if(enFiles.includes(concept)){
    const html=fs.readFileSync(path.join(ROOT,concept+".html"),"utf8");
    const m=html.match(new RegExp(`hreflang="${l}"\\s+href="https://scrapsilvercalculater.com/${l}/([^"]*?)/?"`));
    if(m)res=dec(m[1]);
  }
  return locCache[key]=res;
}

// mapped localized slugs (already in a group) — skip these
const mapped={};for(const l of langs)mapped[l]=new Set();
for(const e of enFiles){const html=fs.readFileSync(path.join(ROOT,e+".html"),"utf8");for(const m of html.matchAll(/hreflang="[a-z]{2}"\s+href="https:\/\/scrapsilvercalculater\.com\/([a-z]{2})\/([^"]*?)\/?"/g)){if(langs.includes(m[1]))mapped[m[1]].add(dec(m[2]));}}

const out=[]; const skipped=[]; const fallbackHome=[];
for(const l of langs)for(const f of fileset[l]){
  if(f==="index"||mapped[l].has(f))continue;
  const concept=rev[l][f];
  if(!concept||red[concept]===undefined){skipped.push(l+"/"+f+(concept?" ("+concept+")":" (unknown)"));continue;}
  const dest=red[concept].replace(/^\//,"").replace(/\/$/,""); // "" => home
  let target;
  if(dest===""){ target=`/${l}/`; }
  else { const ls=localizedSlug(dest,l); target = ls?`/${l}/${ls}/`:`/${l}/`; if(!ls)fallbackHome.push(`${l}/${f} -> (no ${l} version of ${dest}) -> /${l}/`); }
  const source=`/${l}/${f}/`;
  if(existingSources.has(source))continue;
  out.push({source,destination:target,permanent:true});
}

console.log("redirects to add:",out.length);
console.log("skipped (UNKNOWN/no-EN-redirect, report only):",skipped.length);
console.log("\n-- sample redirects --");
out.slice(0,12).forEach(r=>console.log(`  ${r.source}  ->  ${r.destination}`));
console.log("\n-- fallback-to-home (no localized destination) --",fallbackHome.length);
fallbackHome.slice(0,20).forEach(x=>console.log("  "+x));
// verify all non-home destinations resolve to a real file
let bad=0; for(const r of out){let p=dec(r.destination).replace(/^\//,"").replace(/\/$/,"");if(langs.includes(p))continue;if(!fs.existsSync(path.join(ROOT,p+".html"))){bad++;if(bad<=10)console.log("  BAD DEST",r.source,"->",r.destination);}}
console.log("\nredirects with broken destination:",bad);

if(process.argv.includes("--write")){
  if(bad>0){console.error("ABORT: broken destinations present");process.exit(1);}
  const fp=path.join(ROOT,"vercel.json");
  let text=fs.readFileSync(fp,"utf8");
  const eol=text.includes("\r\n")?"\r\n":"\n";
  const marker=`${eol}  ],${eol}  "headers"`;
  if(!text.includes(marker)){console.error("ABORT: redirects-array end marker not found");process.exit(1);}
  const entries=out.map(r=>`    {${eol}      "source": "${r.source}",${eol}      "destination": "${r.destination}",${eol}      "permanent": true${eol}    }`).join(","+eol);
  // insert after last existing redirect (the char before marker is the closing } of the last entry)
  text=text.replace(marker, ","+eol+entries+marker);
  fs.writeFileSync(fp,text);
  // validate JSON still parses
  JSON.parse(fs.readFileSync(fp,"utf8"));
  console.log("\nWROTE vercel.json (+"+out.length+" redirects); JSON valid.");
}
