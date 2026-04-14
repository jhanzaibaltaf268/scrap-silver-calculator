const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/SA COMPUTERS/Documents/GitHub/scrap-silver-calculator';
const baseUrl = 'https://scrapsilvercalculater.com';

const LANG_FOLDERS = ['es', 'fr', 'de', 'pt', 'hi', 'ur', 'ar', 'tr', 'it', 'zh', 'ru', ''];

let urls = [];

LANG_FOLDERS.forEach(lang => {
  const dirPath = lang ? path.join(rootDir, lang) : rootDir;
  if (!fs.existsSync(dirPath)) return;
  
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));
  files.forEach(file => {
    // Skip 404 and other non-indexable pages if any
    if (file === '404.html') return;
    
    let slug = file === 'index.html' ? '' : file.replace('.html', '/');
    let langPath = lang ? `${lang}/` : '';
    let loc = `${baseUrl}/${langPath}${slug}`;
    
    // Standardize: No double slashes
    loc = loc.replace(/([^:])\/\//g, '$1/');
    
    // Standardize: Force trailing slash unless it's a file with extension
    if (!loc.endsWith('/') && !loc.includes('.')) loc += '/';

    urls.push(`  <url>\n    <loc>${loc}</loc>\n    <changefreq>daily</changefreq>\n    <priority>${lang ? '0.6' : '0.8'}</priority>\n  </url>`);
  });
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemap, 'utf8');
console.log(`Generated sitemap.xml with ${urls.length} URLs.`);
