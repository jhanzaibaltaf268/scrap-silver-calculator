const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let out = '# SEO Meta Data Analysis (Google Guidelines)\n\n';
out += '> **Google Guidelines Used for this Audit:**\n';
out += '> - **Meta Title:** Ideal length is 30–60 characters. Over 60 characters risk being truncated in search results.\n';
out += '> - **Meta Description:** Ideal length is 70–155 characters. Over 155 characters risk being truncated.\n\n';

out += '| Page | Title Length | Title Status | Desc Length | Desc Status |\n';
out += '|---|---|---|---|---|\n';

let titleTooLong = 0;
let titleTooShort = 0;
let titleGood = 0;

let descTooLong = 0;
let descTooShort = 0;
let descGood = 0;

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  let title = titleMatch ? titleMatch[1].trim().replace(/\n/g, ' ') : '';
  
  const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=(["'])(.*?)\1/is);
  let desc = descMatch ? descMatch[2].trim().replace(/\n/g, ' ') : '';
  
  let titleLen = title.length;
  let descLen = desc.length;
  
  let titleStatus = '🔴 Missing';
  if (titleLen > 0) {
    if (titleLen < 30) { titleStatus = '🟡 Short'; titleTooShort++; }
    else if (titleLen <= 60) { titleStatus = '🟢 Good'; titleGood++; }
    else { titleStatus = '🟠 Too Long'; titleTooLong++; }
  }
  
  let descStatus = '🔴 Missing';
  if (descLen > 0) {
    if (descLen < 70) { descStatus = '🟡 Short'; descTooShort++; }
    else if (descLen <= 155) { descStatus = '🟢 Good'; descGood++; }
    else { descStatus = '🟠 Too Long'; descTooLong++; }
  }
  
  out += `| ${file} | ${titleLen} | ${titleStatus} | ${descLen} | ${descStatus} |\n`;
}

out += '\n## Summary\n';
out += `- **Titles:** ${titleGood} Good, ${titleTooShort} Too Short (< 30), ${titleTooLong} Too Long (> 60)\n`;
out += `- **Descriptions:** ${descGood} Good, ${descTooShort} Too Short (< 70), ${descTooLong} Too Long (> 155)\n`;

fs.writeFileSync('scratch/seo_audit_results.md', out, 'utf8');
console.log('Analysis complete.');
