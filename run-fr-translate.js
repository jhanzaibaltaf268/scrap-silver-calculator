const fs = require('fs');
const { execSync } = require('child_process');

// The original file is silver-scrap-calculator
fs.copyFileSync('silver-scrap-calculator', 'temp');

let code = fs.readFileSync('translate-pages.js', 'utf8');
code = code.replace(
  "fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index' && f !== 'silver-scrap-calculator' && f !== 'graber');",
  "['temp'];"
);

fs.writeFileSync('temp-translate.js', code);

try {
  execSync('node temp-translate.js', { stdio: 'inherit' });
  
  // Clean up and rename
  if (fs.existsSync('fr/temp')) {
     fs.renameSync('fr/temp', 'fr/calculateur-de-ferraille-d-argent');
     console.log('Successfully translated and restored French calculator!');
  }
} catch (e) {
  console.error(e);
} finally {
  if (fs.existsSync('temp')) fs.unlinkSync('temp');
  if (fs.existsSync('temp-translate.js')) fs.unlinkSync('temp-translate.js');
}
