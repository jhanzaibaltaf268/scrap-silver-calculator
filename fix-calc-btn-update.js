const fs = require('fs');
const path = require('path');

// Updated listener that also checks for 'update' function name
const oldListener = `    // Add listener to Calculate button
    const cb = document.getElementById('calc-btn');
    if (cb) {
      const fn = typeof calculate === 'function' ? calculate : (typeof calc === 'function' ? calc : null);
      if (fn) cb.addEventListener('click', fn);
    }`;

const newListener = `    // Add listener to Calculate button
    const cb = document.getElementById('calc-btn');
    if (cb) {
      const fn = typeof calculate === 'function' ? calculate :
                 (typeof calc === 'function' ? calc :
                 (typeof update === 'function' ? update : null));
      if (fn) cb.addEventListener('click', fn);
    }`;

let fixed = 0;

const dirs = ['.', 'ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];

dirs.forEach(dir => {
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.html')) : [];
  files.forEach(file => {
    const fp = path.join(dir, file);
    let content = fs.readFileSync(fp, 'utf8');
    if (content.includes(oldListener)) {
      content = content.replace(oldListener, newListener);
      fs.writeFileSync(fp, content, 'utf8');
      fixed++;
    }
  });
});

console.log(`Fixed calc-btn listener in ${fixed} files`);
