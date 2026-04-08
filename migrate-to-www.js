const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname);
const searchString = 'https://scrapsilvercalculater.com';
const replacementString = 'https://www.scrapsilvercalculater.com';

let totalFilesProcessed = 0;
let totalFilesChanged = 0;

function getAllFiles(dir, exts, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      getAllFiles(fullPath, exts, fileList);
    } else if (exts.some(ext => entry.name.endsWith(ext))) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Replace all instances of the domain
  // Using a regex to match the domain and ensure we aren't already matching www
  // or other subdomains if any (rare here)
  const regex = new RegExp('https://(?!www\\.)scrapsilvercalculater\\.com', 'g');
  content = content.replace(regex, replacementString);

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalFilesChanged++;
    console.log(`  ✓ Updated: ${path.relative(baseDir, filePath)}`);
  }
  totalFilesProcessed++;
}

console.log('🔍 Scanning for files to update domain to WWW...\n');

const files = getAllFiles(baseDir, ['.html', '.xml', '.js', '.json', '.txt']);
console.log(`Found ${files.length} candidate files. Processing...\n`);

files.forEach(f => {
    // skip the script itself
    if (f === __filename) return;
    processFile(f);
});

console.log(`\n✅ Done!`);
console.log(`   Files scanned:  ${totalFilesProcessed}`);
console.log(`   Files modified: ${totalFilesChanged}`);
