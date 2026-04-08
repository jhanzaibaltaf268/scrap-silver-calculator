/**
 * fix-all-clean-urls.js
 * Removes ALL .html extensions from internal links, canonical/hreflang tags,
 * and script-generated URLs across the entire site.
 */
const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname);
let totalFilesProcessed = 0;
let totalFilesChanged = 0;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getAllFiles(dir, exts, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    // Skip node_modules, .git, and the fix scripts themselves
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      getAllFiles(fullPath, exts, fileList);
    } else if (exts.some(ext => entry.name.endsWith(ext))) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function processHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // 1. Fix href="something.html" → href="/something/"  (relative, no leading slash)
  //    But skip hrefs that start with http, mailto, #, or are just "index.html"
  content = content.replace(
    /href="(?!https?:\/\/)(?!mailto:)(?!#)(?!\/)([^"]*?)\.html"/g,
    (match, slug) => {
      if (slug === 'index' || slug === '../index') return 'href="/"';
      if (slug.startsWith('../')) return `href="/${slug.slice(3)}/"`;
      return `href="/${slug}/"`;
    }
  );

  // 2. Fix href="/something.html" → href="/something/"  (absolute paths)
  content = content.replace(
    /href="(\/[^"]*?)\.html"/g,
    (match, slug) => `href="${slug}/"`
  );

  // 3. Fix canonical href="https://...something.html" → "https://...something/"
  content = content.replace(
    /(rel="canonical"\s+href="https?:\/\/[^"]*?)\.html"/g,
    '$1/"'
  );
  content = content.replace(
    /(href="https?:\/\/[^"]*?)\.html"(\s+rel="canonical")/g,
    '$1/"$2'
  );

  // 4. Fix hreflang href="https://...something.html" → "https://...something/"
  content = content.replace(
    /(hreflang="[^"]*"\s+href="https?:\/\/[^"]*?)\.html"/g,
    '$1/"'
  );
  content = content.replace(
    /(href="https?:\/\/[^"]*?)\.html"(\s+hreflang="[^"]*")/g,
    '$1/"$2'
  );

  // 5. Fix JavaScript link arrays where link: 'something.html'
  //    e.g. {link:'999-silver-calculator.html'} → {link:'/999-silver-calculator/'}
  content = content.replace(
    /link:'([^']*?)\.html'/g,
    (match, slug) => `link:'/${slug}/'`
  );
  content = content.replace(
    /link:"([^"]*?)\.html"/g,
    (match, slug) => `link:"/${slug}/"`
  );

  // 6. Fix JS: file: 'something.html' in link contexts used as href targets
  //    (these appear in purity chart script data arrays - link property only)
  content = content.replace(
    /,link:'([^']*?)\.html'/g,
    (match, slug) => `,link:'/${slug}/'`
  );

  // 7. Fix <a href="..."> in JavaScript template literals
  content = content.replace(
    /href=\\"([^\\]*?)\.html\\"/g,
    (match, slug) => `href=\\"/${slug}/\\"`
  );

  // 8. Fix sitemap <loc> entries (XML)
  content = content.replace(
    /<loc>(https?:\/\/[^<]*?)\.html<\/loc>/g,
    '<loc>$1/</loc>'
  );

  // 9. Fix script src and stylesheet href (should NOT be touched - skip)
  // Already safe because we only match .html not .js/.css

  // 10. Fix double trailing slashes that might result from already-clean paths
  content = content.replace(/([^:])\/\//g, '$1/');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalFilesChanged++;
    console.log(`  ✓ Fixed: ${path.relative(baseDir, filePath)}`);
  }
  totalFilesProcessed++;
}

function processSitemap(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Fix <loc> URLs in sitemap
  content = content.replace(
    /<loc>(https?:\/\/[^<]*?)\.html<\/loc>/g,
    '<loc>$1/</loc>'
  );
  // Ensure trailing slash on all loc entries that don't have one
  // and aren't just the root domain
  content = content.replace(
    /<loc>(https?:\/\/[^<]*[^/])<\/loc>/g,
    (match, url) => {
      if (url.endsWith('.xml') || url.endsWith('.txt')) return match;
      return `<loc>${url}/</loc>`;
    }
  );
  // Fix duplicate trailing slashes
  content = content.replace(/<loc>(https?:\/\/[^<]*?)\/\/<\/loc>/g, '<loc>$1/</loc>');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✓ Fixed sitemap: ${path.relative(baseDir, filePath)}`);
    totalFilesChanged++;
  }
  totalFilesProcessed++;
}

// ─── Main Execution ───────────────────────────────────────────────────────────

console.log('🔍 Scanning for files...\n');

// 1. Fix all HTML files
const htmlFiles = getAllFiles(baseDir, ['.html']);
console.log(`Found ${htmlFiles.length} HTML files. Processing...\n`);
htmlFiles.forEach(f => processHtmlFile(f));

// 2. Fix sitemap.xml
const sitemapPath = path.join(baseDir, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  console.log('\n📄 Processing sitemap.xml...');
  processSitemap(sitemapPath);
}

// 3. Fix any other XML sitemaps
const xmlFiles = getAllFiles(baseDir, ['.xml']).filter(f => !f.endsWith('sitemap.xml') || f === sitemapPath);
xmlFiles.forEach(f => {
  if (f !== sitemapPath) {
    processSitemap(f);
  }
});

console.log(`\n✅ Done!`);
console.log(`   Files scanned:  ${totalFilesProcessed}`);
console.log(`   Files modified: ${totalFilesChanged}`);
