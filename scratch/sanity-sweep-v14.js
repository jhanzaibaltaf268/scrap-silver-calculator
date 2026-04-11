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
            <p>किसी भी चांदी के आइटम का मूल्य तीन कारकों पर निर्भर करता है: <strong>वजन</strong>, <strong>शुद्धता</strong> और <strong>स्पॉट मूल्य</strong>। सूत्र है: मूल्य = वजन (ट्रॉय औंस में) × शुद्धता × स्पॉट मूल्य।</p>
            <ul>
              <li><strong>वजन</strong> — ग्राम, ट्रॉय औंस या किलोग्राम में</li>
              <li><strong>शुद्धता</strong> — चांदी का प्रतिशत: 999 (99.9%), 925 स्टर्लिंग (92.5%), 900 (90%)</li>
              <li><strong>स्पॉट मूल्य</strong> — वैश्विक बाजारों से लाइव मूल्य</li>
            </ul>
            <h3>स्क्रैप चांदी क्या है?</h3>
            <p>टूटे हुए आभूषण, पुराने बर्तन, चांदी के सिक्के — कोई भी चीज जो अपनी धातु सामग्री के लिए बेची जाती है।</p>
          </div>`,
    faq: `<h2 class="section-title">चांदी के मूल्य के बारे में अक्सर पूछे जाने वाले प्रश्न</h2>
        <div class="faq-list">
          <div class="faq-item"><h3>यह कैलकुलेटर कितना सटीक है?</h3><p>हम लाइव स्पॉट कीमतों का उपयोग करते हैं। हालांकि, खरीदार आमतौर पर रिफाइनिंग लागत के लिए 10-20% शुल्क लेते हैं।</p></div>
          <div class="faq-item"><h3>शुद्धता कैसे जांचें?</h3><p>925, 800, या STERLING जैसे हॉलमार्क खोजें। असली चांदी चुंबकीय नहीं होती है।</p></div>
          <div class="faq-item"><h3>स्क्रैप चांदी कहां बेचें?</h3><p>सर्वोत्तम दरों के लिए स्थानीय जौहरी या ऑनलाइन चांदी खरीदारों के पास जाएं।</p></div>
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
          <div class="content-scroll-block">
            <h3>چاندی کی قیمت کیسے معلوم کریں؟</h3>
            <p>کسی بھی چاندی کی چیز کی قیمت تین عوامل پر منحصر ہے: <strong>وزن</strong>، <strong>خالصیت</strong>، اور <strong>سپاٹ قیمت</strong>۔ فارمولا: قیمت = وزن × خالصیت × سپاٹ قیمت۔</p>
            <ul>
              <li><strong>وزن</strong> — گرام، ٹرائے اونس یا کلوگرام میں</li>
              <li><strong>خالصیت</strong> — چاندی کا فیصد: 999 (99.9%)، 925 سٹرلنگ (92.5%)، 900 (90%)</li>
              <li><strong>سپاٹ قیمت</strong> — عالمی منڈیوں سے لائیو قیمت</li>
            </ul>
          </div>`,
    faq: `<h2 class="section-title">اکثر پوچھے گئے سوالات</h2>
        <div class="faq-list">
          <div class="faq-item"><h3>یہ کتنا درست ہے؟</h3><p>ہم لائیو ریٹ استعمال کرتے ہیں۔ تاہم خریدار چارجز کٹوتی کرتے ہیں۔</p></div>
          <div class="faq-item"><h3>خالصیت کیسے چیک کریں؟</h3><p>ہال مارک تلاش کریں: 925 یا 800۔</p></div>
        </div>`
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
          <div class="content-scroll-block">
            <h3>كيف يتم حساب قيمة الانصهار؟</h3>
            <p>تعتمد قيمة أي قطعة فضية على ثلاثة عوامل: <strong>الوزن</strong>، <strong>النقاء</strong>، و<strong>السعر الفوري</strong>। المعادلة: القيمة = الوزن × النقاء × السعر الفوري.</p>
          </div>`,
    faq: `<h2 class="section-title">الأسئلة الشائعة</h2>
        <div class="faq-list">
          <div class="faq-item"><h3>ما مدى دقة هذه الحاسبة؟</h3><p>نحن نستخدم الأسعار الفورية الحية. قد يخصم المشترون 10-20%.</p></div>
          <div class="faq-item"><h3>كيف أعرف نقاء الفضة؟</h3><p>ابحث عن أختام: 925 أو 800. الفضة الحقيقية ليست مغناطيسية.</p></div>
        </div>`
  }
};

const ALL_LANGS = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'ur', 'zh'];

ALL_LANGS.forEach(lang => {
  const dirPath = path.join(rootDir, lang);
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // 1. REPAIR ALL CONTENT SECTIONS (For non-Western)
    if (CLEAN_BLOCKS[lang]) {
      const b = CLEAN_BLOCKS[lang];
      // WIPE & RESTORE STEPS
      content = content.replace(/<section[^>]*style="background: var\(--bg-secondary\);"[^>]*>[\s\S]*?<\/section>/, `<section class="section-compact" style="background: var(--bg-secondary);"><div class="container text-center"><span class="section-badge">📋</span>${b.steps}</div></section>`);
      // WIPE & RESTORE UNDERSTAND
      content = content.replace(/<section[^>]*>\s*<div class="container">\s*<div class="content-body">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, `<section class="section-compact"><div class="container"><div class="content-body">${b.understand}</div></div></section>`);
      // WIPE & RESTORE FAQ
      content = content.replace(/<section[^>]*id="faq"[^>]*>[\s\S]*?<\/section>/, `<section class="section-compact" id="faq"><div class="container">${b.faq}</div></section>`);
    }

    // 2. FOOTER SANITIZATION (Universal)
    content = content.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, `<footer id="site-footer"></footer>`);

    // 3. DICTIONARY UPDATE (Universal - Clean Labels)
    content = content.replace(/<script>\s*window\.MenuTranslations\s*=\s*\{.*?\};\s*<\/script>/gs, '');
    const slugMatch = content.match(/hreflang="en" href="https:\/\/scrapsilvercalculater\.com\/([^/"]+)\/?"/);
    const slugs = {};
    if (slugMatch) slugs[slugMatch[1]] = file.replace('.html', '');
    const LABELS = {
      ar: { Home: "الرئيسية", Calculators: "الحاسبات", Purity: "النقاء", Pricing: "الأسعار", Tools: "الأدوات", Guides: "الأدلة" },
      hi: { Home: "होम", Calculators: "कैलकुलेटर", Purity: "शुद्धता", Pricing: "मूल्य निर्धारण", Tools: "उपकरण", Guides: "गाइड" },
      ur: { Home: "ہوم", Calculators: "کیلکولیٹر", Purity: "پاکیزگی", Pricing: "قیمتیں", Tools: "اوزار", Guides: "رہنما" }
    };
    const dict = Object.assign({ slugs }, LABELS[lang] || {});
    const safeDict = JSON.stringify(dict).replace(/[^\x00-\x7F]/g, c => "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4));
    content = content.replace('<head>', `<head>\n  <script>window.MenuTranslations = ${safeDict};</script>`);

    // 4. CLEAN DOUBLE LABELS
    const codes = ["EN", "ES", "FR", "DE", "PT", "HI", "UR", "AR", "TR", "IT", "ZH", "RU"];
    codes.forEach(code => {
      const doubled = new RegExp(`>\\s*${code}\\s+${code}\\s*<`, 'gi');
      content = content.replace(doubled, `>${code}<`);
    });

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
  });
  console.log(`Deep recovery successful for ${lang} folder (${files.length} files)`);
});
