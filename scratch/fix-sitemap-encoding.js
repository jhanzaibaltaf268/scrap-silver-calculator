const fs = require('fs');
const path = require('path');

const sitemapPath = path.resolve(__dirname, '..', 'sitemap.xml');
let content = fs.readFileSync(sitemapPath, 'utf8');

console.log('📖 Reading sitemap.xml...');

// Regex to find content inside <loc> tags
const locRegex = /<loc>(.*?)<\/loc>/g;

let count = 0;
const newContent = content.replace(locRegex, (match, url) => {
  // Only encode if it contains non-ASCII characters
  if (/[^\x00-\x7F]/.test(url)) {
    try {
      // We need to be careful: the domain part shouldn't be encoded, 
      // but standard encodeURI handles that (it ignores http:// etc.)
      const encoded = encodeURI(url);
      count++;
      return `<loc>${encoded}</loc>`;
    } catch (e) {
      console.error(`❌ Error encoding URL: ${url}`);
      return match;
    }
  }
  return match;
});

if (count > 0) {
  fs.writeFileSync(sitemapPath, newContent, 'utf8');
  console.log(`✅ Success! Encoded ${count} URLs in sitemap.xml.`);
} else {
  console.log('ℹ️ No URLs required encoding.');
}
