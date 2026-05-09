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

  // Calculate depth
  const relativePath = path.relative(rootDir, filePath);
  const depth = relativePath.split(path.sep).length - 1;
  const prefix = depth === 0 ? '' : '../'.repeat(depth);

  // 1. Fix CSS path to RELATIVE
  content = content.replace(/href="(?:\/|\.\.\/)*css\/style\.css[^"]*"/g, `href="${prefix}css/style.css"`);
  
  // 2. Fix JS paths to RELATIVE
  content = content.replace(/src="(?:\/|\.\.\/)*js\/silver-price\.js[^"]*"/g, `src="${prefix}js/silver-price.js"`);
  content = content.replace(/src="(?:\/|\.\.\/)*js\/calculator\.js[^"]*"/g, `src="${prefix}js/calculator.js"`);
  content = content.replace(/src="(?:\/|\.\.\/)*js\/components\.js[^"]*"/g, `src="${prefix}js/components.js"`);
  content = content.replace(/src="(?:\/|\.\.\/)*js\/translations\.js[^"]*"/g, `src="${prefix}js/translations.js"`);

  // 3. Fix images to RELATIVE
  content = content.replace(/href="(?:\/|\.\.\/)*favicon\.png"/g, `href="${prefix}favicon.png"`);
  content = content.replace(/href="(?:\/|\.\.\/)*apple-touch-icon\.png"/g, `href="${prefix}apple-touch-icon.png"`);

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${relativePath} (Depth: ${depth})`);
  }
});

console.log('Finished fixing all pages with relative paths.');
