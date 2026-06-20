// Remove hreflang <link> tags whose target file does not exist. Dry-run unless --write.
const fs=require("fs"),path=require("path");
const ROOT=path.join(__dirname,"..");
const langs=new Set(["ar","de","es","fr","hi","it","pt","tr","ur"]);
const dirs=[".","ar","de","es","fr","hi","it","pt","tr","ur"];
const dec=s=>{try{return decodeURIComponent(s)}catch(e){return s}};
const WRITE=process.argv.includes("--write");
function resolves(p){ p=dec(p).replace(/\/$/,""); if(p==="")return true; if(langs.has(p))return fs.existsSync(path.join(ROOT,p,"index.html")); return fs.existsSync(path.join(ROOT,p+".html")); }
let filesTouched=0, tagsRemoved=0;
for(const d of dirs){
  for(const f of fs.readdirSync(path.join(ROOT,d))){
    if(!f.endsWith(".html"))continue;
    const fp=path.join(ROOT,d,f); let html=fs.readFileSync(fp,"utf8"); let removed=0;
    const out=html.replace(/[ \t]*<link\b[^>]*hreflang="[^"]*"[^>]*href="https:\/\/scrapsilvercalculater\.com\/([^"]*)"[^>]*>\s*\n?/g,(m,href)=>{
      if(resolves(href))return m; removed++; return ""; });
    if(removed){ filesTouched++; tagsRemoved+=removed; if(WRITE)fs.writeFileSync(fp,out); }
  }
}
console.log((WRITE?"WROTE":"DRY-RUN")+`: files touched ${filesTouched}, broken hreflang tags removed ${tagsRemoved}`);
