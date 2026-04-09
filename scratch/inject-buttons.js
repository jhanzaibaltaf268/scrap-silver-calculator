const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const baseDir = process.cwd();

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it looks like a calculator page (has qty or weight input)
    if (!content.includes('id="qty"') && !content.includes('id="weight"')) return;
    
    // Check if it already has the button
    if (content.includes('id="calc-btn"')) return;

    console.log(`Processing ${path.relative(baseDir, filePath)}...`);
    
    const $ = cheerio.load(content, { decodeEntities: false });
    
    // Find the result-display div
    const resultDisplay = $('.result-display');
    if (resultDisplay.length > 0) {
        // Inject the button before it
        resultDisplay.before('        <button class="btn btn-primary btn-full" id="calc-btn" style="margin-top:var(--space-md);">Calculate Melt Value</button>\n');
        
        // Write back
        fs.writeFileSync(filePath, $.html(), 'utf8');
        return true;
    }
    return false;
}

function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === 'node_modules' || entry.name === '.git') continue;
            walk(fullPath);
        } else if (entry.name.endsWith('.html')) {
            processFile(fullPath);
        }
    }
}

walk(baseDir);
console.log('Done!');
