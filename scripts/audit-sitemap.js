const fs = require('fs');
const path = require('path');

const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const locs = sitemap.match(/<loc>(.*?)<\/loc>/g).map(l => l.replace(/<\/?loc>/g, ''));

const rootFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && !['404.html', 'deploy-test.html', 'audit-report.html'].includes(f));

const missing = [];
rootFiles.forEach(file => {
    const cleanUrl = 'https://scrapsilvercalculater.com/' + (file === 'index.html' ? '' : file.replace(/\.html$/, '') + '/');
    if (!locs.includes(cleanUrl)) {
        missing.push(file);
    }
});

console.log('--- Sitemap Audit Report ---');
console.log(`Total URLs in sitemap: ${locs.length}`);
console.log(`Total root English files found: ${rootFiles.length}`);

if (missing.length === 0) {
    console.log('SUCCESS: All root English HTML files are present in the sitemap.');
} else {
    console.log('MISSING English files:');
    missing.forEach(m => console.log(' - ' + m));
}

const localizedCount = locs.filter(l => l.match(/\/(es|fr|de|pt|hi|ur|ar|tr|it|zh|ru)\//)).length;
console.log(`Localized URLs found: ${localizedCount}`);
