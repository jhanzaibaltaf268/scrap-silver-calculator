const fs = require('fs');
const path = require('path');

function getAllFiles(dir, exts, fileList) {
  if (!fileList) fileList = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      getAllFiles(fullPath, exts, fileList);
    } else {
      for (let i = 0; i < exts.length; i++) {
        if (entry.name.endsWith(exts[i])) {
          fileList.push(fullPath);
          break;
        }
      }
    }
  }
  return fileList;
}

const baseDir = process.cwd();
const htmlFiles = getAllFiles(baseDir, ['.html', '.xml']);
const found = [];

htmlFiles.forEach(function(f) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach(function(line, i) {
    if (/href="[^"]*\.html"/.test(line)) {
      found.push(path.relative(baseDir, f) + ' L' + (i + 1) + ': ' + line.trim().substring(0, 100));
    }
  });
});

if (found.length === 0) {
  console.log('ALL CLEAR: No .html extensions remain in any href attributes!');
} else {
  console.log('Remaining .html hrefs found: ' + found.length);
  found.forEach(function(r) { console.log(r); });
}
