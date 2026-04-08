const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname);
// We are reverting: moving FROM www TO non-www
const searchString = 'https://www.scrapsilvercalculater.com';
const replacementString = 'https://scrapsilvercalculater.com';

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

  // Replace www. domain with non-www domain
  content = content.split(searchString).join(replacementString);

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalFilesChanged++;
    console.log(`  ✓ Reverted: ${path.relative(baseDir, filePath)}`);
  }
  totalFilesProcessed++;
}

console.log('🔍 Reverting domain references to non-WWW...\n');

const files = getAllFiles(baseDir, ['.html', '.xml', '.js', '.json', '.txt']);
console.log(`Found ${files.length} candidate files. Processing...\n`);

files.forEach(f => {
    if (f === __filename || f.includes('migrate-to-www.js')) return;
    processFile(f);
});

console.log(`\n✅ Done!`);
console.log(`   Files scanned:  ${totalFilesProcessed}`);
console.log(`   Files modified: ${totalFilesChanged}`);
