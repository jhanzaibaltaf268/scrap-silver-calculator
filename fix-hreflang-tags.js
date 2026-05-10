const fs = require('fs');
const path = require('path');

// Read translations.js to get slug mappings
const translationsPath = path.join(__dirname, 'js', 'translations.js');
const translationsContent = fs.readFileSync(translationsPath, 'utf8');

// Extract the slugs object from window.MenuTranslations
// Find the "slugs": { ... } section
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

  // Add x-default
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

  // Generate new hreflang tags
  const newHreflangTags = generateHreflangTags(englishSlug);

  // Find existing hreflang tags - they start with <link rel="alternate" hreflang and go until </head>
  const hreflangRegex = /(<link rel="alternate" hreflang[^>]*>\n)+/g;

  if (!hreflangRegex.test(content)) {
    return false;
  }

  // Replace the hreflang tags
  content = content.replace(/(<link rel="alternate" hreflang[^>]*>\n)+/, newHreflangTags + '\n');

  // Write the updated content back to file
  fs.writeFileSync(filePath, content, 'utf8');

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
    // console.log(`✓ Updated: ${file}`);
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
      console.log(`✓ Updated: ${lang}/${file}`);
    }
  });
});

console.log(`\n=== Summary ===`);
console.log(`Total HTML files processed: ${processedCount}`);
console.log(`Files with hreflang tags updated: ${updatedCount}`);
