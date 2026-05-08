const fs = require('fs');
const path = require('path');

let s = fs.readFileSync('sitemap.xml', 'utf8');

const langs = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];

langs.forEach(lang => {
    const broken = `https://scrapsilvercalculater.com/${lang.charAt(0)}/`;
    const fixed = `https://scrapsilvercalculater.com/${lang}/`;
    // Be careful not to replace valid single letter paths if any exist (none should)
    s = s.split(broken).join(fixed);
});

// Also fix any remaining double slashes properly
s = s.replace(/([^:])\/\//g, '$1/');

fs.writeFileSync('sitemap.xml', s);
console.log('Sitemap fixed and cleaned.');
