const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getAllHTMLFiles() {
  const files = [];
  const walkDir = (dir) => {
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== 'css' && file !== 'js') {
        walkDir(fullPath);
      } else if (file.endsWith('.html')) {
        files.push(fullPath);
      }
    });
  };
  walkDir('.');
  return files;
}

function fixSocialMetadata(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const before = content;

  // Extract canonical URL
  const canonicalMatch = content.match(/<link rel="canonical" href="([^"]+)"/);
  if (!canonicalMatch) return false;

  const canonicalUrl = canonicalMatch[1];

  // Replace og:url
  content = content.replace(/<meta property="og:url" content="[^"]*"/g, `<meta property="og:url" content="${canonicalUrl}"`);
  
  // Replace twitter:url
  content = content.replace(/<meta name="twitter:url" content="[^"]*"/g, `<meta name="twitter:url" content="${canonicalUrl}"`);

  if (content !== before) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

console.log('Fixing social metadata in all HTML files...\n');

const files = getAllHTMLFiles();
let fixed = 0;

files.forEach((file, idx) => {
  if (fixSocialMetadata(file)) fixed++;
  if ((idx + 1) % 100 === 0) {
    console.log(`Processed ${idx + 1}/${files.length}...`);
  }
});

console.log(`\nTotal files processed: ${files.length}`);
console.log(`Files fixed: ${fixed}`);
