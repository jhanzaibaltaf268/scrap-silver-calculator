const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'scripts' && file !== 'scratch') {
        arrayOfFiles = getAllHtmlFiles(dirPath + "/" + file, arrayOfFiles);
      }
    } else {
      if (file.endsWith(".html")) {
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
  let originalContent = content;

  // 1. Simplify Hero: Remove <p> tags and any extra text in .hero
  // Pattern: <section class="hero ..."> ... <h1>...</h1> (REMOVE THIS) </section>
  // We want to keep the <h1> and the price-ticker/pill if present, but remove the <p>
  
  content = content.replace(/(<section class="hero[^>]*>[\s\S]*?)<p[^>]*>[\s\S]*?<\/p>([\s\S]*?<\/section>)/g, '$1$2');

  // 2. Ensure .content-body is AFTER the calculator widget if it's currently a sibling
  // In many files it might be in a grid. The CSS fix to flex-column already handles the visual part.
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Simplified Hero in: ${path.relative(rootDir, filePath)}`);
  }
});

console.log('Finished simplifying all pages.');
