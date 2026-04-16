const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const baseUrl = 'https://scrapsilvercalculater.com/';

let out = '# Meta Titles and Descriptions for English Pages\n\n| Page | URL | Meta Title | Meta Description |\n|---|---|---|---|\n';

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  let title = titleMatch ? titleMatch[1].trim().replace(/\n/g, ' ') : 'Missing';
  
  const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  let desc = descMatch ? descMatch[1].trim().replace(/\n/g, ' ') : 'Missing';
  
  let slug = file === 'index.html' ? '' : file.replace('.html', '/');
  // or just file, if the links don't drop .html on server, although usually clean urls do. I will just output the clean URL.
  // Wait, let's keep the original file path if that's what's hosted, but usually, it's a clean URL.
  // Let me just link the literal .html file as a safe fallback, or just the URL. I'll provide both or just `https://scrapsilvercalculater.com/${file}`
  // Looking at the sitemap, the URLs are like `https://scrapsilvercalculater.com/fr/1-10oz-silver-value/`. So `.html` is removed and a trailing slash is added.
  
  const cleanSlug = file === 'index.html' ? '' : file.replace('.html', '/');
  const url = baseUrl + cleanSlug;
  
  out += `| ${file} | [View](${url}) | ${title} | ${desc} |\n`;
}

fs.writeFileSync('scratch/english_pages_audit_with_links.md', out, 'utf8');
console.log('Done');
