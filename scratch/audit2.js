const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let out = '# Meta Titles and Descriptions for English Pages\n\n| Page | Meta Title | Meta Description |\n|---|---|---|\n';

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  let title = titleMatch ? titleMatch[1].trim().replace(/\n/g, ' ') : 'Missing';
  
  const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  let desc = descMatch ? descMatch[1].trim().replace(/\n/g, ' ') : 'Missing';
  
  out += `| ${file} | ${title} | ${desc} |\n`;
}

fs.writeFileSync('scratch/english_pages_audit.md', out, 'utf8');
console.log('Successfully wrote to scratch/english_pages_audit.md');
