const fs = require('fs');

const updatedFiles = [
  '404.html',
  'audit-report.html',
  'canadian-silver-coin-calculator.html',
  'contact.html',
  'deploy-test.html',
  'gold-and-silver-calculator.html',
  'how-silver-prices-work.html',
  'how-to-sell-silver.html',
  'how-to-use-silver-calculators.html',
  'identify-silver.html',
  'index.html',
  'pennyweight-calculator.html',
  'silver-batch-calculator.html',
  'silver-coin-value-calculator.html',
  'silver-hallmarks-guide.html',
  'silver-purity-chart.html',
  'silver-sell-or-hold.html',
  'sona-chandi-calculator.html',
  'tola-calculator.html'
];

let out = '# Detailed Review of Updated SEO Content\n\n';
out += 'Below are the **exact** Titles and Descriptions currently active in the files we targeted for lengths optimization today:\n\n';
out += '| File | Exact New Title | Exact New Description |\n';
out += '|---|---|---|\n';

for (const file of updatedFiles) {
  let content = '';
  try {
    content = fs.readFileSync(file, 'utf8');
  } catch (e) {
    continue;
  }
  
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  let title = titleMatch ? titleMatch[1].trim().replace(/\n/g, ' ') : '*Missing*';
  
  const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=(["'])(.*?)\1/is);
  let desc = descMatch ? descMatch[2].trim().replace(/\n/g, ' ') : '*Missing*';
  
  out += `| \`${file}\` | ${title} | ${desc} |\n`;
}

fs.writeFileSync('scratch/updated_text_review.md', out, 'utf8');
console.log('Review table generated.');
