const fs = require('fs');
const path = require('path');

// Performance optimizations to apply to every HTML file:
// 1. Add font-display=swap to Google Fonts URL
// 2. Replace Clarity sync load with async/deferred version
// 3. Move Google Analytics to be fully async (already async, but add loading strategy)
// 4. Add resource hints

let fixedCount = 0;

function fixPageSpeed(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Add display=swap to Google Fonts if not already present
  if (content.includes('fonts.googleapis.com/css2') && !content.includes('display=swap')) {
    content = content.replace(
      /fonts\.googleapis\.com\/css2\?([^"'&]+)(?:&display=swap)?/g,
      'fonts.googleapis.com/css2?$1&display=swap'
    );
    changed = true;
  }

  // 2. Fix Clarity: remove window.addEventListener('load', ...) wrapper
  // Clarity should load directly, but the load listener adds unnecessary delay
  const clarityLoadWrapper = /window\.addEventListener\('load',\s*function\(\)\s*\{([\s\S]*?clarity[\s\S]*?)\}\);/;
  if (clarityLoadWrapper.test(content)) {
    content = content.replace(clarityLoadWrapper, (match, inner) => {
      // Remove the load wrapper, keep the inner code
      return inner.trim();
    });
    changed = true;
  }

  // 3. Remove duplicate Google tag comments/scripts
  // Some pages have <!-- Google tag (gtag.js) --> appearing twice
  const gtagCommentRegex = /<!-- Google tag \(gtag\.js\) -->\s*\n\s*\n\s*\n\s*\n/g;
  if ((content.match(gtagCommentRegex) || []).length > 0) {
    content = content.replace(gtagCommentRegex, '');
    changed = true;
  }

  // 4. Make Clarity script async if it isn't already
  content = content.replace(
    /<script type="text\/javascript">\s*\(function\(c,l,a,r,i,t,y\)/,
    '<script type="text/javascript" async>(function(c,l,a,r,i,t,y)'
  );

  // 5. Add fetchpriority=high to CSS preload link
  content = content.replace(
    /rel="preload" as="style" href="(https:\/\/fonts\.googleapis\.com[^"]+)"/,
    'rel="preload" as="style" href="$1" fetchpriority="low"'
  );

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixedCount++;
  }
}

// Process all HTML files
const dirs = ['.', 'ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir)
    .filter(f => f.endsWith('.html'))
    .forEach(file => fixPageSpeed(path.join(dir, file)));
});

console.log(`Page speed fixes applied to ${fixedCount} files`);
