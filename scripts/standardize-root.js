const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/SA COMPUTERS/Documents/GitHub/scrap-silver-calculator';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

files.forEach(filePath => {
    const fullPath = path.join(rootDir, filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Convert to root-relative
    content = content.replace(/(href|src)="(\.\.\/)*css\//g, '$1="/css/');
    content = content.replace(/(href|src)="(\.\.\/)*js\//g, '$1="/js/');
    content = content.replace(/(href|src)="(\.\.\/)*images\//g, '$1="/images/');
    content = content.replace(/(href|src)="(\.\.\/)*favicon\//g, '$1="/favicon/');
    content = content.replace(/url\((\.\.\/)*images\//g, 'url(/images/');

    fs.writeFileSync(fullPath, content);
    console.log(`Processed root: ${filePath}`);
});
