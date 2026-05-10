const fs = require('fs');
const path = require('path');

function addDirRTL(dir) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  let fixed = 0;

  files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const before = content;

    // Add dir="rtl" to html tag
    content = content.replace(/<html\s+lang="(ar|ur)">/g, '<html lang="$1" dir="rtl">');
    content = content.replace(/<html\s+lang="(ar|ur)"\s+dir="[^"]*">/g, '<html lang="$1" dir="rtl">');

    if (content !== before) {
      fs.writeFileSync(filePath, content, 'utf8');
      fixed++;
    }
  });

  return fixed;
}

console.log('Adding dir="rtl" support...\n');

const arFixed = addDirRTL('ar');
const urFixed = addDirRTL('ur');

console.log(`AR: ${arFixed} files fixed`);
console.log(`UR: ${urFixed} files fixed`);
console.log(`\nTotal: ${arFixed + urFixed} files fixed`);
