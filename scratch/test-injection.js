const fs = require('fs');
const path = require('path');

const filePath = 'es/index.html';
let content = fs.readFileSync(filePath, 'utf8');

console.log('Original length:', content.length);
console.log('Includes <head>:', content.includes('<head>'));

const injection = '<script>window.MenuTranslations = { slugs: {} };</script>';
if (!content.includes('window.MenuTranslations')) {
    content = content.replace('<head>', '<head>\n' + injection);
    console.log('Replaced <head>');
}

console.log('New length:', content.length);
console.log('Includes injection:', content.includes('window.MenuTranslations'));
