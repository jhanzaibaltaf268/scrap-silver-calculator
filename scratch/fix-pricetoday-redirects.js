// Repoint pre-existing /<lang>/{800,900}-silver-price-today/ redirects to the localized calculator.
const fs=require("fs"),path=require("path");
const ROOT=path.join(__dirname,"..");
const langs=["ar","de","es","fr","hi","it","pt","tr","ur"];
const calc={
 "800":{ar:"آلة-حاسبة-فضية-800",de:"800-silber-rechner",es:"plata-800",fr:"argent-800",hi:"800-चद-कलकलटर",it:"calcolatrice-in-argento-800",pt:"calculadora-de-prata-800",tr:"800-gümüş-hesap-makinesi",ur:"800-چاندی-کا-کیلکولیٹر"},
 "900":{ar:"آلة-حاسبة-فضة-900",de:"900-muenzsilber-rechner",es:"plata-de-moneda-900",fr:"argent-de-piece-900",hi:"900-चद-कलकलटर",it:"calcolatrice-in-argento-900",pt:"calculadora-de-prata-900",tr:"900-gümüş-hesap-makinesi",ur:"900-چاندی-کا-کیلکولیٹر"},
};
const fp=path.join(ROOT,"vercel.json");
let text=fs.readFileSync(fp,"utf8");
const eol=text.includes("\r\n")?"\r\n":"\n";
let changed=0, skipped=[];
for(const p of ["800","900"]) for(const l of langs){
  const slug=calc[p][l];
  if(!fs.existsSync(path.join(ROOT,l,slug+".html"))){skipped.push(`${l}/${slug} (no file)`);continue;}
  const find=`"source": "/${l}/${p}-silver-price-today/",${eol}      "destination": "/${p}-silver-price-today/"`;
  const repl=`"source": "/${l}/${p}-silver-price-today/",${eol}      "destination": "/${l}/${slug}/"`;
  if(text.includes(find)){text=text.split(find).join(repl);changed++;}
}
if(process.argv.includes("--write")){
  fs.writeFileSync(fp,text);
  JSON.parse(fs.readFileSync(fp,"utf8")); // validate
  console.log("WROTE: repointed",changed,"redirects; JSON valid.");
} else {
  console.log("DRY-RUN: would repoint",changed,"redirects.");
}
if(skipped.length)console.log("skipped:",skipped.join(", "));
