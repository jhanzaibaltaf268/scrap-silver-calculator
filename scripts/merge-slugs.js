const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const slugsPath = path.join(ROOT_DIR, 'master-slugs.json');
const slugs = JSON.parse(fs.readFileSync(slugsPath, 'utf8'));

const translationsPath = path.join(ROOT_DIR, 'js', 'translations.js');
let translationsContent = fs.readFileSync(translationsPath, 'utf8');

// Simple regex to find the end of the object
// We want to insert slugs: slugs before the last };
const lastBraceIndex = translationsContent.lastIndexOf('};');
if (lastBraceIndex !== -1) {
    const slugsString = `,\n  "slugs": ${JSON.stringify(slugs, null, 2)}`;
    const newContent = translationsContent.slice(0, lastBraceIndex) + slugsString + '\n};';
    fs.writeFileSync(translationsPath, newContent);
    console.log('Successfully merged slugs into translations.js');
} else {
    console.error('Could not find end of window.MenuTranslations object');
}
