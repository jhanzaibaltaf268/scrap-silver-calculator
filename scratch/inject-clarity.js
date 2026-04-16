const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/SA COMPUTERS/Documents/GitHub/scrap-silver-calculator';
const CLARITY_ID = 'wby5gobage';
const CLARITY_CODE = `
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${CLARITY_ID}");
</script>`;

function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'scratch') {
                processDirectory(filePath);
            }
        } else if (file.endsWith('.html')) {
            injectClarity(filePath);
        }
    });
}

function injectClarity(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if already injected
    if (content.includes(CLARITY_ID)) {
        console.log(`Skipping (already exists): ${filePath}`);
        return;
    }

    // Try to find a good spot in the head
    // We'll look for </head> and insert before it, 
    // or look for existing GA tag and insert after it.
    
    if (content.includes('</head>')) {
        // Find existing analytics to group them
        const gaMatch = content.match(/<!-- Google tag \(gtag\.js\) -->[\s\S]*?<\/script>/);
        
        if (gaMatch) {
            const endOfGa = gaMatch.index + gaMatch[0].length;
            content = content.slice(0, endOfGa) + '\n    <!-- Microsoft Clarity -->' + CLARITY_CODE + content.slice(endOfGa);
        } else {
            // Just insert before </head>
            content = content.replace('</head>', `    <!-- Microsoft Clarity -->${CLARITY_CODE}\n</head>`);
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Injected: ${filePath}`);
    } else {
        console.warn(`No <head> tag found in: ${filePath}`);
    }
}

console.log('Starting Microsoft Clarity injection...');
processDirectory(rootDir);
console.log('Finished.');
