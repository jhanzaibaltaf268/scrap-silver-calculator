const fs = require('fs');
const path = require('path');

const languages = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];
const calcBtnListener = `    // Add listener to Calculate button
    const cb = document.getElementById('calc-btn');
    if (cb) {
      const fn = typeof calculate === 'function' ? calculate : (typeof calc === 'function' ? calc : null);
      if (fn) cb.addEventListener('click', fn);
    }
`;

let totalFiles = 0;
let fixedFiles = 0;

languages.forEach(lang => {
  const langDir = path.join(__dirname, lang);

  if (!fs.existsSync(langDir)) {
    console.log(`Directory ${lang}/ does not exist`);
    return;
  }

  const files = fs.readdirSync(langDir).filter(f => f.endsWith('.html'));

  files.forEach(file => {
    totalFiles++;
    const filePath = path.join(langDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if calc-btn listener is already present
    if (content.includes('calc-btn')) {
      // Check if it already has the listener attached
      if (content.includes("document.getElementById('calc-btn')")) {
        // Already has the listener
        return;
      }

      // Has the button element but missing listener - add it
      // Find the last </script> tag and insert before it
      const lastScriptClose = content.lastIndexOf('</script>');
      if (lastScriptClose !== -1) {
        const before = content.substring(0, lastScriptClose);
        const after = content.substring(lastScriptClose);
        const newContent = before + '\n' + calcBtnListener + '\n  ' + after;
        fs.writeFileSync(filePath, newContent, 'utf8');
        fixedFiles++;
        console.log(`✓ Fixed: ${lang}/${file}`);
      }
    }
  });
});

console.log(`\n=== Summary ===`);
console.log(`Total files checked: ${totalFiles}`);
console.log(`Files fixed: ${fixedFiles}`);
