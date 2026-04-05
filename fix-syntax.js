const fs = require('fs');
const path = require('path');
const esDir = path.join(__dirname, 'es');

const files = fs.readdirSync(esDir);
for (const file of files) {
  if (!file.endsWith('.html')) continue;
  const filePath = path.join(esDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/} }, {};/g, '} }, {});');
  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Fixed syntax errors in ' + files.length + ' files.');
