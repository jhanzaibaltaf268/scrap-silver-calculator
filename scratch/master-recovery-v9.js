const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/SA COMPUTERS/Documents/GitHub/scrap-silver-calculator';

// --- CLEAN CONTENT BLOCKS (Safe Escaped) ---
const CLEAN_BODY = {
  hi: {
    steps: `<div class="step-card"><div class="step-number">1</div><h4>अपनी चांदी तौलें</h4><p>एक तराजू का उपयोग करके अपनी चांदी को तौलें।</p></div>
          <div class="step-card"><div class="step-number">2</div><h4>शुद्धता चुनें</h4><p>शुद्धता चुनें: .999, .925, .900 या कस्टम।</p></div>
          <div class="step-card"><div class="step-number">3</div><h4>सटीक मूल्य प्राप्त करें</h4><p>लाइव स्पॉट मूल्य का उपयोग करके मूल्य की गणना होती है।</p></div>`,
    contentScroll: `<h3>पिघल मूल्य की गणना कैसे की जाती है?</h3>
            <p>किसी भी चांदी के आइटम का मूल्य तीन कारकों पर निर्भर करता है: <strong>वजन</strong>, <strong>शुद्धता</strong> और <strong>स्पॉट मूल्य</strong>। सूत्र है: मूल्य = वजन (ट्रॉय औंस में) × शुद्धता × स्पॉट मूल्य।</p>
            <ul>
              <li><strong>वजन</strong> — ग्राम, ट्रॉय औंस या किलोग्राम में</li>
              <li><strong>शुद्धता</strong> — चांदी का प्रतिशत: 999 (99.9%), 925 स्टर्लिंग (92.5%), 900 (90%)</li>
              <li><strong>स्पॉट मूल्य</strong> — वैश्विक बाजारों से लाइव मूल्य</li>
            </ul>
            <h3>स्क्रैप चांदी क्या है?</h3>
            <p>टूटे हुए आभूषण, पुराने बर्तन, चांदी के सिक्के — कोई भी चीज जो अपनी धातु सामग्री के लिए बेची जाती है।</p>`
  },
  ur: {
    steps: `<div class="step-card"><div class="step-number">1</div><h4>اپنی چاندی تولیں</h4><p>ترازو سے اپنی چاندی تولیں۔</p></div>
          <div class="step-card"><div class="step-number">2</div><h4>خالصیت منتخب کریں</h4><p>خالصیت منتخب کریں: .999، .925، .900 یا کسٹم۔</p></div>
          <div class="step-card"><div class="step-number">3</div><h4>فوری قیمت حاصل کریں</h4><p>لائیو سپاٹ قیمت سے حساب ہوتا ہے۔</p></div>`,
    contentScroll: `<h3>چاندی کی قیمت کیسے معلوم کریں؟</h3>
            <p>کسی بھی چاندی کی چیز کی قیمت تین عوامل پر منحصر ہے: <strong>وزن</strong>، <strong>خالصیت</strong>، اور <strong>سپاٹ قیمت</strong>۔ فارمولا: قیمت = وزن (ٹرائے اونس) × خالصیت × سپاٹ قیمت۔</p>
            <ul>
              <li><strong>وزن</strong> — گرام، ٹرائے اونس یا کلوگرام میں</li>
              <li><strong>خالصیت</strong> — چاندی کا فیصد: 999 (99.9%)، 925 سٹرلنگ (92.5%)، 900 (90%)</li>
              <li><strong>سپاٹ قیمت</strong> — عالمی منڈیوں سے لائیو قیمت</li>
            </ul>
            <h3>چاندی کا سکریپ کیا ہے؟</h3>
            <p>ٹوٹے ہوئے زیورات، پرانے برتن، چاندی کے سکے — کوئی بھی چیز جو اپنی دھاتی قیمت کے لیے بیچی جائے۔</p>`
  },
  ar: {
    steps: `<div class="step-card"><div class="step-number">1</div><h4>زن فضتك</h4><p>استخدم ميزاناً لوزن قطعة الفضة.</p></div>
          <div class="step-card"><div class="step-number">2</div><h4>اختر النقاء</h4><p>اختر النقاء: .999 أو .925 أو .900 أو مخصص.</p></div>
          <div class="step-card"><div class="step-number">3</div><h4>احصل على القيمة فوراً</h4><p>يتم الحساب بالسعر الفوري المباشر.</p></div>`,
    contentScroll: `<h3>كيف يتم حساب قيمة الانصهار؟</h3>
            <p>تعتمد قيمة أي قطعة فضية على ثلاثة عوامل: <strong>الوزن</strong>، <strong>النقاء</strong>، و<strong>السعر الفوري</strong>. المعادلة: القيمة = الوزن (أوقية تروي) × النقاء × السعر الفوري.</p>
            <ul>
              <li><strong>الوزن</strong> — بالجرام أو أوقية تروي أو كيلوجرام</li>
              <li><strong>النقاء</strong> — نسبة الفضة: 999 (99.9%)، 925 إسترليني (92.5%)، 900 عملة (90%)</li>
              <li><strong>السعر الفوري</strong> — السعر الحالي من البورصات العالمية</li>
            </ul>
            <h3>ما هي خردة الفضة؟</h3>
            <p>المجوهرات المكسورة، الأواني القديمة، العملات الفضية — أي شيء يُباع لقيمته المعدنية.</p>`
  }
};

const LABELS = {
  ar: { Home: "الرئيسية", Calculators: "الحاسبات", Purity: "النقاء", Pricing: "الأسعار", Tools: "الأدوات", Guides: "الأدلة" },
  hi: { Home: "होम", Calculators: "कैलकुलेटर", Purity: "शुद्धता", Pricing: "मूल्य निर्धारण", Tools: "उपकरण", Guides: "गाइड" },
  ur: { Home: "ہوم", Calculators: "کیلکولیٹر", Purity: "پاکیزگی", Pricing: "قیمتیں", Tools: "اوزار", Guides: "رہنما" }
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

    // A. Fix content-scroll-block (Surgery)
    content = content.replace(/<div class="content-scroll-block">[\s\S]*?<\/div>/, `<div class="content-scroll-block">\n            ${CLEAN_BODY[lang].contentScroll}\n          </div>`);

    // B. Fix steps-grid (Surgery)
    content = content.replace(/<div class="steps-grid stagger">[\s\S]*?<\/div>/, `<div class="steps-grid stagger">\n          ${CLEAN_BODY[lang].steps}\n        </div>`);
    
    // C. Re-Inject MenuTranslations (Safety Fix)
    // First, clear any existing window.MenuTranslations scripts
    content = content.replace(/<script>\s*window\.MenuTranslations\s*=\s*\{.*?\};\s*<\/script>/gs, '');
    
    // Fetch slugs by reading hreflang link in this file
    const slugMatch = content.match(/hreflang="en" href="https:\/\/scrapsilvercalculater\.com\/([^/"]+)\/?"/);
    const slugs = {};
    if (slugMatch) slugs[slugMatch[1]] = file.replace('.html', '');
    
    const dict = Object.assign({ slugs }, LABELS[lang]);
    const safeDict = JSON.stringify(dict).replace(/[^\x00-\x7F]/g, c => "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4));
    content = content.replace('<head>', `<head>\n  <script>window.MenuTranslations = ${safeDict};</script>`);

    // D. Final Clean Label Sweep
    const codes = ["EN", "ES", "FR", "DE", "PT", "HI", "UR", "AR", "TR", "IT", "ZH", "RU"];
    codes.forEach(code => {
      const doubled = new RegExp(`>\\s*${code}\\s+${code}\\s*<`, 'gi');
      content = content.replace(doubled, `>${code}<`);
    });

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
  });
  console.log(`Deep-repaired and Synced ${lang} folder (${files.length} files)`);
});
