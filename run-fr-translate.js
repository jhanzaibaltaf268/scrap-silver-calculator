const fs = require('fs');
const { execSync } = require('child_process');

// The original file is silver-scrap-calculator.html
fs.copyFileSync('silver-scrap-calculator.html', 'temp.html');

let code = fs.readFileSync('translate-pages.js', 'utf8');
code = code.replace(
  "fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'silver-scrap-calculator.html' && f !== 'graber.html');",
  "['temp.html'];"
);

fs.writeFileSync('temp-translate.js', code);

try {
  execSync('node temp-translate.js', { stdio: 'inherit' });
  
  // Clean up and rename
  if (fs.existsSync('fr/temp.html')) {
     fs.renameSync('fr/temp.html', 'fr/calculateur-de-ferraille-d-argent.html');
     console.log('Successfully translated and restored French calculator!');
  }
} catch (e) {
  console.error(e);
} finally {
  if (fs.existsSync('temp.html')) fs.unlinkSync('temp.html');
  if (fs.existsSync('temp-translate.js')) fs.unlinkSync('temp-translate.js');
}
