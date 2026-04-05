const fs = require('fs');
let code = fs.readFileSync('mass-translate.js', 'utf8');
code = code.replace("['pt', 'hi', 'ur', 'ar', 'tr', 'it', 'zh', 'ru']", "['ru']");
code = code.replace("setTimeout(r, 800)", "setTimeout(r, 3000)");
fs.writeFileSync('mass-translate-ru.js', code);
