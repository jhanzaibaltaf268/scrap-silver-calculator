const fs = require('fs');
const path = require('path');

let fixed = 0;

// Fix JS syntax errors: "; / word" → "; // word" inside <script> tags
function fixJsSyntaxErrors(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const before = content;
  // Replace "; / " (single slash comment) with "; // " (double slash comment)
  content = content.replace(/; \/ ([A-Za-z])/g, '; // $1');
  if (content !== before) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixed++;
    console.log('Fixed JS syntax:', filePath);
  }
}

const dirs = ['.', 'ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir)
    .filter(f => f.endsWith('.html'))
    .forEach(file => fixJsSyntaxErrors(path.join(dir, file)));
});

console.log(`\nJS syntax errors fixed in ${fixed} files`);
