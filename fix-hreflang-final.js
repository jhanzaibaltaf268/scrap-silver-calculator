const fs = require('fs');
const path = require('path');

// Read translations.js to get slug mappings
const translationsPath = path.join(__dirname, 'js', 'translations.js');
const translationsContent = fs.readFileSync(translationsPath, 'utf8');

// Extract the slugs object from window.MenuTranslations
const slugsMatch = translationsContent.match(/"slugs":\s*(\{[\s\S]*?\n\})/);
if (!slugsMatch) {
  console.error('Could not find slugs object in translations.js');
  process.exit(1);
}

// Parse the slugs object
let slugsObject;
try {
  slugsObject = eval('(' + slugsMatch[1] + ')');
} catch (e) {
  console.error('Error parsing slugs:', e.message);
  process.exit(1);
}

// Create a reverse lookup: localizedSlug -> englishSlug for each language
const reverseLookup = {};
Object.entries(slugsObject).forEach(([englishSlug, localizedSlugs]) => {
  Object.entries(localizedSlugs).forEach(([lang, localizedSlug]) => {
    if (!reverseLookup[lang]) {
      reverseLookup[lang] = {};
    }
    reverseLookup[lang][localizedSlug] = englishSlug;
  });
});

// Get English slug from filename and language
function getEnglishSlugFromPath(filePath, lang = null) {
  const basename = path.basename(filePath, '.html');

  // Check if it's an index page
  if (basename === 'index') {
    return 'index';
  }

  // If we have a language, try reverse lookup
  if (lang && reverseLookup[lang] && reverseLookup[lang][basename]) {
    return reverseLookup[lang][basename];
  }

  // Otherwise, assume it's already an English slug
  return basename;
}

// Generate hreflang tags for a given English slug
function generateHreflangTags(englishSlug) {
  const baseUrl = 'https://scrapsilvercalculater.com';
  const languages = ['en', 'ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];

  const tags = [];

  // Add x-default first
  tags.push(`  <link rel="alternate" hreflang="x-default" href="${baseUrl}/${englishSlug}/">`);

  // Add each language
  languages.forEach(lang => {
    let href;

    if (lang === 'en') {
      href = `${baseUrl}/${englishSlug}/`;
    } else {
      // Look up the localized slug
      if (slugsObject[englishSlug] && slugsObject[englishSlug][lang]) {
        const localizedSlug = slugsObject[englishSlug][lang];
        href = `${baseUrl}/${lang}/${localizedSlug}/`;
      } else {
        // Fallback to English slug if not found
        href = `${baseUrl}/${lang}/${englishSlug}/`;
      }
    }

    tags.push(`  <link rel="alternate" hreflang="${lang}" href="${href}">`);
  });

  return tags.join('\n');
}

// Find and replace hreflang tags in an HTML file
function updateHreflangTags(filePath, lang = null) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Get the English slug from filename
  const englishSlug = getEnglishSlugFromPath(filePath, lang);

  // Check if this slug exists in our mappings
  if (!slugsObject[englishSlug]) {
    return false;
  }

  // Find the position of </head> tag
  const headEndPos = content.indexOf('</head>');
  if (headEndPos === -1) {
    return false;
  }

  // Find all hreflang tags and remove them completely
  // Find the first hreflang tag before </head>
  const headContent = content.substring(0, headEndPos);
  let firstHreflangPos = headContent.lastIndexOf('<link rel="alternate" hreflang');

  if (firstHreflangPos === -1) {
    // No hreflang tags found
    return false;
  }

  // Go backwards to find the beginning of the first hreflang tag
  let startPos = firstHreflangPos;

  // Count hreflang tags and find all of them
  let hreflangStart = -1;
  for (let i = 0; i < headContent.length; i++) {
    if (headContent.substring(i).startsWith('<link rel="alternate" hreflang')) {
      if (hreflangStart === -1) {
        hreflangStart = i;
      }
    }
  }

  // Find the end of all hreflang tags (look for the last closing >)
  let hreflangEnd = -1;
  for (let i = hreflangStart; i < headContent.length; i++) {
    if (headContent[i] === '>') {
      // Check if this is part of a hreflang tag
      let lineStart = i;
      while (lineStart > 0 && headContent[lineStart - 1] !== '\n') {
        lineStart--;
      }
      let lineContent = headContent.substring(lineStart, i + 1);
      if (lineContent.includes('hreflang')) {
        hreflangEnd = i;
      } else {
        // We've gone past the hreflang tags
        break;
      }
    }
  }

  if (hreflangEnd === -1) {
    return false;
  }

  // Now we need to include any trailing whitespace/newlines
  let actualEnd = hreflangEnd + 1;
  while (actualEnd < content.length && (content[actualEnd] === '\n' || content[actualEnd] === '\r' || content[actualEnd] === ' ')) {
    actualEnd++;
  }

  // Remove old hreflang section
  const beforeHreflang = content.substring(0, hreflangStart);
  const afterHreflang = content.substring(actualEnd);

  // Generate new hreflang tags
  const newHreflangTags = generateHreflangTags(englishSlug);

  // Reconstruct content
  const newContent = beforeHreflang + newHreflangTags + '\n  ' + afterHreflang;

  // Write the updated content back to file
  fs.writeFileSync(filePath, newContent, 'utf8');

  return true;
}

// Process all HTML files
let processedCount = 0;
let updatedCount = 0;

// Process root directory HTML files
const rootFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
rootFiles.forEach(file => {
  processedCount++;
  const filePath = path.join(__dirname, file);
  if (updateHreflangTags(filePath)) {
    updatedCount++;
  }
});

// Process language directories
const languages = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];
languages.forEach(lang => {
  const langDir = path.join(__dirname, lang);
  if (!fs.existsSync(langDir)) return;

  const files = fs.readdirSync(langDir).filter(f => f.endsWith('.html'));
  files.forEach(file => {
    processedCount++;
    const filePath = path.join(langDir, file);
    if (updateHreflangTags(filePath, lang)) {
      updatedCount++;
    }
  });
});

console.log(`\n=== Summary ===`);
console.log(`Total HTML files processed: ${processedCount}`);
console.log(`Files with hreflang tags updated: ${updatedCount}`);
