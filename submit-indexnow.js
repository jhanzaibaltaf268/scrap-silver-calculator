const fs = require('fs');
const https = require('https');
const cheerio = require('cheerio');

// Configuration
const CONFIG = {
    host: 'scrapsilvercalculater.com',
    key: '30f3be080bc11bf5bf047c2d984254be',
    sitemapPath: './sitemap.xml',
    keyLocation: 'https://scrapsilvercalculater.com/30f3be080bc11bf5bf047c2d984254be.txt'
};

async function submitToIndexNow() {
    try {
        console.log('Reading sitemap...');
        const sitemapContent = fs.readFileSync(CONFIG.sitemapPath, 'utf8');
        const $ = cheerio.load(sitemapContent, { xmlMode: true });
        
        const urls = [];
        $('loc').each((i, el) => {
            const url = $(el).text().trim();
            // Basic validation: starts with host, no spaces, no double slashes (except protocol)
            const isValid = url.startsWith('https://' + CONFIG.host) && 
                          !url.substring(8).includes('//') && 
                          !url.includes(' ');
            
            if (isValid) {
                urls.push(url);
            } else if (url) {
                console.warn(`Skipping invalid URL: ${url}`);
            }
        });

        console.log(`Found ${urls.length} valid URLs in sitemap.`);

        if (urls.length === 0) {
            console.error('No valid URLs found in sitemap.xml');
            return;
        }

        // Helper to submit a chunk
        async function submitChunk(chunk) {
            const payload = {
                host: CONFIG.host,
                key: CONFIG.key,
                urlList: chunk
            };
            const data = JSON.stringify(payload);

            return new Promise((resolve, reject) => {
                const options = {
                    hostname: 'www.bing.com',
                    path: '/IndexNow',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Content-Length': Buffer.byteLength(data)
                    }
                };

                const req = https.request(options, (res) => {
                    let body = '';
                    res.on('data', c => body += c);
                    res.on('end', () => {
                        if (res.statusCode === 200 || res.statusCode === 202) resolve();
                        else reject(new Error(`Status ${res.statusCode}: ${body}`));
                    });
                });
                req.on('error', reject);
                req.write(data);
                req.end();
            });
        }

        // Submit in chunks of 250
        const CHUNK_SIZE = 250;
        for (let i = 0; i < urls.length; i += CHUNK_SIZE) {
            const chunk = urls.slice(i, i + CHUNK_SIZE);
            console.log(`Submitting chunk ${Math.floor(i/CHUNK_SIZE) + 1} (${chunk.length} URLs)...`);
            await submitChunk(chunk);
            console.log(`✅ Chunk ${Math.floor(i/CHUNK_SIZE) + 1} submitted successfully.`);
        }

        console.log('🚀 All URLs submitted to IndexNow!');

    } catch (error) {
        console.error('Script Error:', error.message);
    }
}

submitToIndexNow();
