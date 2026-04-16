const fs = require('fs');
const path = require('path');

const HOST = 'https://scrapsilvercalculater.com';
const projectDir = '.';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            if (file !== 'node_modules' && file !== 'scratch' && !file.startsWith('.') && file !== 'scripts' && file !== 'css' && file !== 'js') {
                results = results.concat(walk(filePath));
            }
        } else {
            if (file.endsWith('.html') && file !== '404.html' && file !== 'deploy-test.html' && file !== 'audit-report.html') {
                results.push(filePath);
            }
        }
    });
    return results;
}

const htmlFiles = walk(projectDir);
console.log(`Debug: Found ${htmlFiles.length} files total.`);
if (htmlFiles.some(f => f.includes('sterling'))) {
    console.log('Debug: Sterling file found in walk.');
} else {
    console.log('Debug: Sterling file NOT found in walk.');
}

// Build sitemap entries
const sitemapEntries = htmlFiles.map(file => {
    let relativePath = path.relative(projectDir, file).replace(/\\/g, '/');
    
    let cleanUrl = '';
    if (relativePath === 'index.html') {
        cleanUrl = `${HOST}/`;
    } else if (relativePath.endsWith('/index.html')) {
        cleanUrl = `${HOST}/${relativePath.substring(0, relativePath.length - 10)}/`;
    } else {
        cleanUrl = `${HOST}/${relativePath.replace(/\.html$/, '')}/`;
    }

    // Set priority (root pages higher)
    let priority = '0.6';
    if (cleanUrl === `${HOST}/` || cleanUrl.split('/').length <= 4) {
        priority = '1.0';
    }

    return `  <url>
    <loc>${cleanUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>${priority}</priority>
  </url>`;
});

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemapXml, 'utf8');
console.log(`Generated sitemap.xml with ${sitemapEntries.length} URLs.`);
