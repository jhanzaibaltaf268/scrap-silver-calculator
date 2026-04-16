const fs = require('fs');
const path = require('path');

const API_KEY = '30f3be080bc11bf5bf047c2d984254be';
const HOST = 'scrapsilvercalculater.com';
const INDEXNOW_URL = 'https://api.indexnow.org/indexnow';

const projectDir = '.';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            if (file !== 'node_modules' && file !== 'scratch' && !file.startsWith('.') && file !== 'scripts') {
                results = results.concat(walk(filePath));
            }
        } else {
            if (file.endsWith('.html') && file !== '404.html' && file !== 'deploy-test.html') {
                results.push(filePath);
            }
        }
    });
    return results;
}

const htmlFiles = walk(projectDir);

const urlList = htmlFiles.map(file => {
    // Normalize path for URL
    let relativePath = path.relative(projectDir, file).replace(/\\/g, '/');
    
    // Handle clean URLs (remove .html and handle index.html)
    if (relativePath === 'index.html') {
        return `https://${HOST}/`;
    }
    
    if (relativePath.endsWith('/index.html')) {
        return `https://${HOST}/${relativePath.substring(0, relativePath.length - 10)}/`;
    }
    
    // Remove .html extension and ensure trailing slash for clean URLs
    let cleanPath = relativePath.replace(/\.html$/, '');
    if (!cleanPath.endsWith('/')) {
        cleanPath += '/';
    }
    return `https://${HOST}/${cleanPath}`;
});

console.log(`Found ${urlList.length} URLs to ping.`);

// Break into chunks of 10,000 (IndexNow limit)
const data = {
    host: HOST,
    key: API_KEY,
    keyLocation: `https://${HOST}/${API_KEY}.txt`,
    urlList: urlList
};

async function ping() {
    console.log(`Sending ping to IndexNow for ${urlList.length} URLs...`);
    try {
        const response = await fetch(INDEXNOW_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            console.log('IndexNow ping successful! Status:', response.status);
        } else {
            const errorText = await response.text();
            console.error('IndexNow ping failed. Status:', response.status, errorText);
        }
    } catch (error) {
        console.error('Error sending IndexNow ping:', error.message);
    }
}

ping();
