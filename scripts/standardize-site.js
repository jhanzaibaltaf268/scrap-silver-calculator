const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const rootDir = 'c:/Users/SA COMPUTERS/Documents/GitHub/scrap-silver-calculator';
const GA_ID = 'G-YMX334ZW6Q';
const VERIFICATION_ID = '3zJ4ttr1AnZWh4z6tMWiVpqPUwg7VEia6_65eJV8Lro';

const LANG_FOLDERS = ['es', 'fr', 'de', 'pt', 'hi', 'ur', 'ar', 'tr', 'it', 'zh', 'ru', ''];

const GA_SNIPPET = `
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  </script>
`;

function processFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(html, { decodeEntities: false });

  // 1. Remove any old verification or analytics tags to avoid duplicates
  $('meta[name="google-site-verification"]').remove();
  $('script[src*="googletagmanager.com/gtag/js"]').remove();
  // Remove the analytic script block specifically
  $('script').each((i, el) => {
    const text = $(el).text();
    if (text.includes('gtag(') || text.includes('dataLayer.push')) {
      $(el).remove();
    }
  });

  // 2. Add Verification
  $('head').prepend(`<meta name="google-site-verification" content="${VERIFICATION_ID}" />\n`);

  // 3. Add GA4 Snippet
  $('head').prepend(GA_SNIPPET);

  // 4. Add Social Meta Tags (Open Graph / Twitter)
  const title = $('title').text() || 'Scrap Silver Calculator';
  const desc = $('meta[name="description"]').attr('content') || 'Calculate the melt value of your scrap silver instantly.';
  const url = 'https://scrapsilvercalculater.com' + (filePath.includes(rootDir) ? filePath.replace(rootDir, '').replace(/\\/g, '/').replace('/index.html', '/') : '/');
  
  // Clean up old social tags
  $('meta[property^="og:"]').remove();
  $('meta[name^="twitter:"]').remove();

  const socialTags = `
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:image" content="https://scrapsilvercalculater.com/images/social-share.png">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${url}">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="https://scrapsilvercalculater.com/images/social-share.png">
  `;
  $('head').append(socialTags);

  // 5. Add Favicons (if missing)
  if ($('link[rel="icon"]').length === 0) {
    $('head').append('\n  <link rel="icon" type="image/x-icon" href="/favicon.ico">');
  }

  // 6. Ensure Cannonical has trailing slash (Standardizing)
  const canonical = $('link[rel="canonical"]');
  if (canonical.length > 0) {
    let href = canonical.attr('href');
    if (href && !href.endsWith('/') && !href.endsWith('.html')) {
        canonical.attr('href', href + '/');
    }
  }

  fs.writeFileSync(filePath, $.html(), 'utf8');
}

LANG_FOLDERS.forEach(lang => {
  const dirPath = lang ? path.join(rootDir, lang) : rootDir;
  if (!fs.existsSync(dirPath)) return;
  
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));
  files.forEach(file => {
    processFile(path.join(dirPath, file));
  });
  console.log(`Standardized ${lang || 'root'} folder (${files.length} files)`);
});

console.log('SITE-WIDE STANDARDIZATION COMPLETE.');
