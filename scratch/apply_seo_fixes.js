const fs = require('fs');
const path = require('path');

const titleUpdates = {
  'audit-report.html': 'Technical Site Audit | Uncover Hidden Insights',
  'how-silver-prices-work.html': 'How Silver Prices Work | What Drives the Market?',
  'how-to-sell-silver.html': 'How to Sell Silver | Maximize Your Payout Today',
  'identify-silver.html': 'How to Identify Silver | 5 Quick Tests for Real Stuff',
  'index.html': 'Scrap Silver Calculator | Find Your True Melt Value',
  'silver-batch-calculator.html': 'Silver Batch Calculator | Value Your Entire Collection',
  'silver-coin-value-calculator.html': "Silver Coin Calculator | What's Your Coin Worth?",
  'silver-hallmarks-guide.html': 'Silver Hallmarks Guide | Decode Every Stamp & Mark',
  'silver-purity-chart.html': 'Silver Purity Chart | The Ultimate Fineness Guide',
  'silver-sell-or-hold.html': 'Sell or Hold Silver? | Make the Right Call Today',
  'sona-chandi-calculator.html': 'Sona Chandi Calculator | Live Gold & Silver Rates',
  'tola-calculator.html': 'Silver Tola Calculator | Convert to Grams Instantly'
};

const descUpdates = {
  '404.html': 'Oops! The page you are looking for at Scrap Silver Calculator could not be found. Please return to the homepage to access our calculators.',
  'audit-report.html': 'Detailed site technical audit report for Scrap Silver Calculator covering performance and global configuration details.',
  'canadian-silver-coin-calculator.html': 'Calculate the exact live melt value of Canadian 80% and 50% silver coins easily.',
  'contact.html': 'Get in touch with the team at Scrap Silver Calculator. We are here to help answer your questions about calculations.',
  'deploy-test.html': 'Internal deployment test page. Not intended for public access. Please return to the Scrap Silver Calculator homepage.',
  'gold-and-silver-calculator.html': 'Free gold and silver live spot price calculator. Calculate scrap value, check the gold to silver ratio, and combine mixed metal weights.',
  'how-silver-prices-work.html': 'Understand how silver spot prices are determined, what factors affect prices, trading hours, and how to use spot prices when making trades.',
  'how-to-use-silver-calculators.html': "Step-by-step beginner's guide on how to use our scrap silver calculators accurately to determine the true melt value of your silver items.",
  'silver-batch-calculator.html': 'Calculate the total value of multiple silver items at once. Get a combined melt value for rings, chains, coins, and silverware collections.'
};

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  let changed = false;

  if (titleUpdates[file]) {
    content = content.replace(/<title>[\s\S]*?<\/title>/i, `<title>${titleUpdates[file]}</title>`);
    changed = true;
  }

  if (descUpdates[file]) {
    if (/<meta[^>]*name=["']description["'][^>]*>/i.test(content)) {
      content = content.replace(/(<meta[^>]*name=["']description["'][^>]*content=["'])(.*?)(["'][^>]*>)/is, function(match, p1, p2, p3) {
        return p1 + descUpdates[file] + p3;
      });
    } else {
      content = content.replace(/(<title>[\s\S]*?<\/title>)/i, `$1\n    <meta name="description" content="${descUpdates[file].replace(/"/g, '&quot;')}">`);
    }
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log(`Updated ${file}`);
  }
}

console.log('SEO updates applied.');
