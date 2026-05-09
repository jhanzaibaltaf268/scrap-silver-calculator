const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                arrayOfFiles = getAllHtmlFiles(dirPath + "/" + file, arrayOfFiles);
            }
        } else {
            if (file.endsWith('.html')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

const rootDir = process.cwd();
const htmlFiles = getAllHtmlFiles(rootDir);

console.log(`Found ${htmlFiles.length} HTML files.`);

htmlFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Determine relative path to root
    const relative = path.relative(path.dirname(filePath), rootDir);
    const prefix = relative ? relative.replace(/\\/g, '/') + '/' : '';
    
    const favLink = `<link rel="icon" type="image/png" href="${prefix}favicon.png" title="Scrap Silver Calculator">`;
    const appleLink = `<link rel="apple-touch-icon" href="${prefix}apple-touch-icon.png" title="Scrap Silver Calculator">`;
    
    // Remove existing favicon links
    content = content.replace(/<link rel="icon" [^>]*>/gi, '');
    content = content.replace(/<link rel="apple-touch-icon" [^>]*>/gi, '');
    content = content.replace(/<link rel="shortcut icon" [^>]*>/gi, '');
    
    // Add new links before </head> or after charset
    if (content.includes('</head>')) {
        content = content.replace('</head>', `  ${favLink}\n  ${appleLink}\n</head>`);
    } else {
        console.log(`Warning: No <head> tag in ${filePath}`);
    }
    
    fs.writeFileSync(filePath, content);
});

console.log('Successfully updated favicons in all HTML files.');
