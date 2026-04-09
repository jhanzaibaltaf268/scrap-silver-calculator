const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (f === 'node_modules' || f === '.git') return;
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const rootDir = process.cwd();
console.log(`Starting syntax fix in ${rootDir}...`);

let updatedCount = 0;

walkDir(rootDir, (filePath) => {
  if (path.extname(filePath) === '.html') {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Pattern: Newline, then 4 spaces, then / followed by a space and a word
    // This targets the broken comments specifically without affecting valid regexes or division
    const brokenCommentRegex = /\n(\s+)\/ ([A-Z0-9$])/g;
    
    let newContent = content.replace(brokenCommentRegex, '\n$1// $2');

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      updatedCount++;
      if (updatedCount % 50 === 0) console.log(`Fixed syntax in ${updatedCount} files...`);
    }
  }
});

console.log(`Done! Fixed JavaScript syntax in ${updatedCount} HTML files.`);
