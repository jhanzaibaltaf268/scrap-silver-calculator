const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/SA COMPUTERS/Documents/GitHub/scrap-silver-calculator';

const CLEAN_STEPS = {
  hi: `<div class="steps-grid stagger">
          <div class="step-card"><div class="step-number">1</div><h4>अपनी चांदी तौलें</h4><p>एक तराजू का उपयोग करके अपनी चांदी को तौलें।</p></div>
          <div class="step-card"><div class="step-number">2</div><h4>शुद्धता चुनें</h4><p>शुद्धता चुनें: .999, .925, .900 या कस्टम।</p></div>
          <div class="step-card"><div class="step-number">3</div><h4>सटीक मूल्य प्राप्त करें</h4><p>लाइव स्पॉट मूल्य का उपयोग करके मूल्य की गणना होती है।</p></div>
        </div>`,
  ur: `<div class="steps-grid stagger">
          <div class="step-card"><div class="step-number">1</div><h4>اپنی چاندی تولیں</h4><p>ترازو سے اپنی چاندی تولیں۔</p></div>
          <div class="step-card"><div class="step-number">2</div><h4>خالصیت منتخب کریں</h4><p>خالصیت منتخب کریں: .999، .925، .900 یا کسٹم۔</p></div>
          <div class="step-card"><div class="step-number">3</div><h4>فوری قیمت حاصل کریں</h4><p>لائیو سپاٹ قیمت سے حساب ہوتا ہے۔</p></div>
        </div>`,
  ar: `<div class="steps-grid stagger">
          <div class="step-card"><div class="step-number">1</div><h4>زن فضتك</h4><p>استخدم ميزاناً لوزن قطعة الفضة.</p></div>
          <div class="step-card"><div class="step-number">2</div><h4>اختر النقاء</h4><p>اختر النقاء: .999 أو .925 أو .900 أو مخصص.</p></div>
          <div class="step-card"><div class="step-number">3</div><h4>احصل على القيمة فوراً</h4><p>يتم الحساب بالسعر الفوري المباشر.</p></div>
        </div>`
};

const LANGS = ['ar', 'hi', 'ur'];

LANGS.forEach(lang => {
  const dirPath = path.join(rootDir, lang);
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Use a very aggressive match to wipe out any duplicated steps-grid content
    // We match the container then the grid.
    const stepsSectionRegex = /<section[^>]*>\s*<div class="container text-center">\s*<span class="section-badge">📋<\/span>[\s\S]*?<div class="steps-grid stagger">[\s\S]*?<\/div>[\s\S]*?<\/div>\s*<\/section>/;
    
    // We recreate the whole section to be 100% sure
    const cleanSection = `<section class="section-compact" style="background: var(--bg-secondary);">
      <div class="container text-center">
        <span class="section-badge">📋</span>
        <h2 class="section-title">${lang === 'hi' ? 'कैसे काम करता है — 3 सरल चरण' : (lang === 'ur' ? 'یہ کیسے کام کرتا ہے — 3 آسان مراحل' : 'كيف يعمل — 3 خطوات بسيطة')}</h2>
        <p class="section-subtitle">${lang === 'hi' ? 'सेकंड में सटीक मूल्यांकन प्राप्त करें।' : (lang === 'ur' ? 'سیکنڈوں میں درست قیمت حاصل کریں۔' : 'احصل على تقييم دقيق في ثوانٍ.')}</p>
        ${CLEAN_STEPS[lang]}
      </div>
    </section>`;

    content = content.replace(stepsSectionRegex, cleanSection);

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
  });
  console.log(`Sanitized Steps in ${lang} folder (${files.length} files)`);
});
