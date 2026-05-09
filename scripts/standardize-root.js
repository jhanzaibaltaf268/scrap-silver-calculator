const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/SA COMPUTERS/Documents/GitHub/scrap-silver-calculator';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

files.forEach(filePath => {
    const fullPath = path.join(rootDir, filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Standardize Asset Paths to RELATIVE for root files
    content = content.replace(/href="\/css\//g, 'href="css/');
    content = content.replace(/src="\/js\//g, 'src="js/');
    content = content.replace(/href="\/favicon\.png"/g, 'href="favicon.png"');
    content = content.replace(/href="\/apple-touch-icon\.png"/g, 'href="apple-touch-icon.png"');
    content = content.replace(/src="\/images\//g, 'src="images/');

    fs.writeFileSync(fullPath, content);
    console.log(`Processed root: ${filePath}`);
});
