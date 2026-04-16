const fs = require('fs');
const path = require('path');
const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

console.log('| Page | Title | Meta Description |');
console.log('|---|---|---|');

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  let title = titleMatch ? titleMatch[1].trim().replace(/\n/g, ' ') : 'Missing';
  
  const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  let desc = descMatch ? descMatch[1].trim().replace(/\n/g, ' ') : 'Missing';
  
  console.log(`| ${file} | ${title} | ${desc} |`);
}
