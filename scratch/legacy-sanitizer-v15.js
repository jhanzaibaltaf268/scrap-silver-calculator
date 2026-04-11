const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/SA COMPUTERS/Documents/GitHub/scrap-silver-calculator';

const CLEAN_BLOCKS = {
  hi: {
    steps: `<h2 class="section-title">यह कैसे काम करता है — 3 सरल चरण</h2>
        <p class="section-subtitle">सेकंड में सटीक मूल्यांकन प्राप्त करें।</p>
        <div class="steps-grid stagger">
          <div class="step-card"><div class="step-number">1</div><h4>अपनी चांदी तौलें</h4><p>एक तराजू का उपयोग करके अपनी चांदी को तौलें।</p></div>
          <div class="step-card"><div class="step-number">2</div><h4>शुद्धता चुनें</h4><p>शुद्धता चुनें: .999, .925, .900 या कस्टम।</p></div>
          <div class="step-card"><div class="step-number">3</div><h4>सटीक मूल्य प्राप्त करें</h4><p>लाइव स्पॉट मूल्य का उपयोग करके मूल्य की गणना होती है।</p></div>
        </div>`,
    understand: `<h2>चांदी का मूल्य समझना</h2>
          <div class="content-scroll-block">
            <h3>पिघल मूल्य की गणना कैसे की जाती है?</h3>
            <p>किसी भी चांदी के आइटम का मूल्य तीन कारकों पर निर्भर करता है: <strong>वजन</strong>, <strong>शुद्धता</strong> और <strong>स्पॉट मूल्य</strong>। सूत्र है: मूल्य = वजन × शुद्धता × स्पॉट मूल्य।</p>
          </div>`,
    faq: `<h2 class="section-title">चांदी के मूल्य के बारे में अक्सर पूछे जाने वाले प्रश्न</h2>
        <div class="faq-list">
          <div class="faq-item"><h3>यह कैलकुलेटर कितना सटीक है?</h3><p>हम लाइव स्पॉट कीमतों का उपयोग करते हैं।</p></div>
        </div>`
  },
  ur: {
    steps: `<h2 class="section-title">یہ کیسے کام کرتا ہے — 3 آسان مراحل</h2>
        <p class="section-subtitle">سیکنڈوں میں درست قیمت حاصل کریں</p>
        <div class="steps-grid stagger">
          <div class="step-card"><div class="step-number">1</div><h4>اپنی چاندی تولیں</h4><p>ترازو سے اپنی چاندی تولیں۔</p></div>
          <div class="step-card"><div class="step-number">2</div><h4>خالصیت منتخب کریں</h4><p>خالصیت منتخب کریں: .999، .925، .900 یا کسٹم۔</p></div>
          <div class="step-card"><div class="step-number">3</div><h4>فوری قیمت حاصل کریں</h4><p>لائیو سپاٹ قیمت سے حساب ہوتا ہے۔</p></div>
        </div>`,
    understand: `<h2>چاندی کی قیمت سمجھنا</h2>
          <div class="content-scroll-block"><h3>چاندی کی قیمت کیسے معلوم کریں؟</h3><p>وزن، خالصیت، اور سپاٹ قیمت پر منحصر ہے۔</p></div>`,
    faq: `<h2 class="section-title">اکثر پوچھے گئے سوالات</h2><div class="faq-list"><div class="faq-item"><h3>یہ کتنا درست ہے؟</h3><p>ہم لائیو ریٹ استعمال کرتے ہیں۔</p></div></div>`
  },
  ar: {
    steps: `<h2 class="section-title">كيف يعمل — 3 خطوات بسيطة</h2>
        <p class="section-subtitle">احصل على تقييم دقيق في ثوانٍ.</p>
        <div class="steps-grid stagger">
          <div class="step-card"><div class="step-number">1</div><h4>زن فضتك</h4><p>استخدم ميزاناً لوزن قطعة الفضة.</p></div>
          <div class="step-card"><div class="step-number">2</div><h4>اختر النقاء</h4><p>اختر النقاء: .999 أو .925 أو .900 أو مخصص.</p></div>
          <div class="step-card"><div class="step-number">3</div><h4>احصل على القيمة فوراً</h4><p>يتم الحساب بالسعر الفوري المباشر.</p></div>
        </div>`,
    understand: `<h2>فهم قيمة الفضة</h2>
          <div class="content-scroll-block"><h3>كيف يتم حساب قيمة الانصهار؟</h3><p>تعتمد قيمتها على الوزن والنقاء والسعر الفوري.</p></div>`,
    faq: `<h2 class="section-title">الأسئلة الشائعة</h2><div class="faq-list"><div class="faq-item"><h3>ما مدى دقة هذه الحاسبة؟</h3><p>نحن نستخدم الأسعار الفورية الحية.</p></div></div>`
  }
};

const LABELS = {
  ar: { Home: "الرئيسية", Calculators: "الحاسبات", Purity: "النقاء", Pricing: "الأسعار", Tools: "الأدوات", Guides: "الأدلة" },
  hi: { Home: "होम", Calculators: "कैलकुलेटर", Purity: "शुद्धता", Pricing: "मूल्य निर्धारण", Tools: "उपकरण", Guides: "गाइड" },
  ur: { Home: "ہوم", Calculators: "کیلکولیٹر", Purity: "پاکیزگی", Pricing: "قیمتیں", Tools: "اوزار", Guides: "رہنما" }
};

const ALL_FOLDERS = ['ar','de','es','fr','hi','it','pt','ru','tr','ur','zh',''];

ALL_FOLDERS.forEach(lang => {
  const dirPath = lang ? path.join(rootDir, lang) : rootDir;
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // 1. DELETE LEGACY HARDCODED NAV/SWITCHER/FOOTER (The Big Wipe)
    content = content.replace(/<div class="lang-switcher">[\s\S]*?<\/div>/g, '');
    content = content.replace(/<header[^>]*>[\s\S]*?<\/header>/g, '');
    content = content.replace(/<footer[^>]*>[\s\S]*?<\/footer>/g, '');
    
    // Ensure hooks exist in their pure form
    if (!content.includes('id="site-header"')) {
      content = content.replace('<body>', '<body>\n  <div id="site-header"></div>');
    }
    if (!content.includes('id="site-footer"')) {
      content = content.replace('</main>', '</main>\n  <div id="site-footer"></div>');
    }

    // 2. REPAIR BODY (Affected languages only)
    if (CLEAN_BLOCKS[lang]) {
      const b = CLEAN_BLOCKS[lang];
      // Regexes to wipe and replace the core sections
      content = content.replace(/<section[^>]*style="background: var\(--bg-secondary\);"[^>]*>[\s\S]*?<\/section>/g, ''); // Delete all variations
      content = content.replace(/<section[^>]*>\s*<div class="container">\s*<div class="content-body">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/g, '');
      content = content.replace(/<section[^>]*id="faq"[^>]*>[\s\S]*?<\/section>/g, '');
      
      // Prepend them to main in normalized way
      const newMainContent = `
    <section class="section-compact" style="background: var(--bg-secondary);">
      <div class="container text-center">
        <span class="section-badge">📋</span>
        ${b.steps}
      </div>
    </section>

    <section class="section-compact">
      <div class="container">
        <div class="content-body">
          ${b.understand}
        </div>
      </div>
    </section>

    <section class="section-compact" id="faq">
      <div class="container">
        ${b.faq}
      </div>
    </section>`;
      
      // Remove any existing content between <main> and the scripts to be safe
      const mainMatch = content.match(/<main>([\s\S]*?)<\/main>/);
      if (mainMatch) {
        // Keep the first section (Calculator widget) if it exists
        const heroSection = mainMatch[1].match(/<section[^>]*class="hero[\s\S]*?<\/section>/);
        if (heroSection) {
          content = content.replace(/<main>[\s\S]*?<\/main>/, `<main>\n    ${heroSection[0]}\n${newMainContent}\n  </main>`);
        }
      }
    }

    // 3. DICTIONARY UPDATE (Safe Encodings)
    content = content.replace(/<script>\s*window\.MenuTranslations\s*=\s*\{.*?\};\s*<\/script>/gs, '');
    const slugMatch = content.match(/hreflang="en" href="https:\/\/scrapsilvercalculater\.com\/([^/"]+)\/?"/);
    const slugs = {};
    if (slugMatch) slugs[slugMatch[1]] = file.replace('.html', '');
    const dict = Object.assign({ slugs }, LABELS[lang] || {});
    const safeDict = JSON.stringify(dict).replace(/[^\x00-\x7F]/g, c => "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4));
    content = content.replace('<head>', `<head>\n  <script>window.MenuTranslations = ${safeDict};</script>`);

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
  });
  console.log(`Deep Sanitized ${lang || 'root'} folder (${files.length} files)`);
});
