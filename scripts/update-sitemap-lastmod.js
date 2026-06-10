/**
 * update-sitemap-lastmod.js
 * Updates <lastmod> dates in sitemap.xml based on each file's actual last-modified time.
 * Run before deployment: node scripts/update-sitemap-lastmod.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITEMAP = path.join(ROOT, 'sitemap.xml');
const TODAY = new Date().toISOString().slice(0, 10);

let xml = fs.readFileSync(SITEMAP, 'utf8');
let updated = 0;
let unchanged = 0;

// Match each <url> block and update its <lastmod>
xml = xml.replace(/<url>([\s\S]*?)<\/url>/g, (urlBlock) => {
  const locMatch = urlBlock.match(/<loc>https?:\/\/[^/]+\/(.*?)<\/loc>/);
  if (!locMatch) return urlBlock;

  const urlPath = locMatch[1].replace(/\/$/, ''); // strip trailing slash
  const htmlFile = path.join(ROOT, urlPath + '.html') ;

  // Try the HTML file, then index.html for root paths
  let mtime = null;
  if (fs.existsSync(htmlFile)) {
    mtime = fs.statSync(htmlFile).mtime;
  } else if (urlPath === '' || urlPath === '/') {
    const indexFile = path.join(ROOT, 'index.html');
    if (fs.existsSync(indexFile)) mtime = fs.statSync(indexFile).mtime;
  } else {
    // Try as a directory with index.html (e.g. /ar/some-page/)
    const dirIndex = path.join(ROOT, urlPath, 'index.html');
    if (fs.existsSync(dirIndex)) mtime = fs.statSync(dirIndex).mtime;
  }

  if (!mtime) return urlBlock; // can't determine — leave as-is

  const fileDate = mtime.toISOString().slice(0, 10);
  const lastmodMatch = urlBlock.match(/<lastmod>([^<]+)<\/lastmod>/);

  if (lastmodMatch) {
    const existingDate = lastmodMatch[1].trim();
    if (existingDate === fileDate) {
      unchanged++;
      return urlBlock;
    }
    updated++;
    return urlBlock.replace(/<lastmod>[^<]+<\/lastmod>/, `<lastmod>${fileDate}</lastmod>`);
  }

  return urlBlock; // no <lastmod> tag — leave as-is
});

fs.writeFileSync(SITEMAP, xml, 'utf8');
console.log(`Sitemap updated: ${updated} lastmod dates changed, ${unchanged} already current.`);
console.log(`Today: ${TODAY}`);
