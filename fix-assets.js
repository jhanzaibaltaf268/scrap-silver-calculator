const fs = require('fs');
const path = require('path');

function fixAssetsInDir(dirName) {
  const dirPath = path.join(__dirname, dirName);
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);
  let count = 0;

  for (const file of files) {
    if (!file.endsWith('.html') || file === 'index') continue;
    
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix CSS
    content = content.replace(/href="css\//g, 'href="../css/');
    
    // Fix JS
    content = content.replace(/src="js\//g, 'src="../js/');
    
    // Also fix any stray links pointing to root html files without ../
    // but the dict script already handled the slugs! However, maybe some are left over.
    
    fs.writeFileSync(filePath, content, 'utf8');
    count++;
  }
  console.log(`Fixed assets in ${dirName}: ${count} files.`);
}

fixAssetsInDir('de');
