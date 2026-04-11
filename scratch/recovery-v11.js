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
          </div>`
  },
  ur: {
    steps: `<h2 class="section-title">\u06cc\u06c1 \u06a9\u06cc\u0633\u06d2 \u06a9\u0627\u0645 \u06a9\u0631\u062a\u0627 \u06c1\u06d2 \u2014 3 \u0622\u0633\u0627\u0646 \u0645\u0631\u0627\u062d\u0644</h2>
        <p class="section-subtitle">\u0633\u06cc\u06a9\u0646\u0688\u0648\u06ba \u0645\u06cc\u06ba \u062f\u0631\u0633\u062a \u0642\u06cc\u0645\u062a \u062d\u0627\u0635\u0644 \u06a9\u0631\u06cc\u06ba\u06d2\u06d4</p>
        <div class="steps-grid stagger">
          <div class="step-card"><div class="step-number">1</div><h4>اپنی چاندی تولیں</h4><p>\u062a\u0631\u0627\u0632\u0648 \u0633\u06d2 \u0627\u067e\u0646\u06cc \u0686\u0627\u0646\u062f\u06cc \u062a\u0648\u0644\u06cc\u06ba\u06d2\u06d4</p></div>
          <div class="step-card"><div class="step-number">2</div><h4>خالصیت منتخب کریں</h4><p>\u002e\u0039\u0039\u0039\u002c\u0020\u002e\u0039\u0032\u0035\u002c\u0020\u002e\u0039\u0030\u0030\u0020\u06cc\u0627 \u06a9\u0633\u067e\u0645\u06d2\u06d4</p></div>
          <div class="step-card"><div class="step-number">3</div><h4>فوری قیمت حاصل کریں</h4><p>\u0644\u0627\u0626\u06cc\u0648 \u0633\u067e\u0627\u0672 \u0642\u06cc\u0645\u062a \u0633\u06d2 \u062d\u0633\u0627\u0628 \u06c1\u0648\u062a\u0627 \u06c1\u06d2\u06d4</p></div>
        </div>`,
    understand: `<h2>\u0686\u0627\u0646\u062f\u06cc \u06a9\u06cc \u0642\u06cc\u0645\u062a \u0633\u0645\u062c\u06be\u0646\u0627</h2>
          <div class="content-scroll-block">
            <h3>\u0686\u0627\u0646\u062f\u06cc \u06a9\u06cc \u0642\u06cc\u0645\u062a \u06a9\u06cc\u0633\u06d2 \u0645\u0639\u0644\u0648\u0645 \u06a9\u0631\u06cc\u06ba\u061f</h3>
            <p>\u06a9\u0633\u06cc \u0628\u06be\u06cc \u0686\u0627\u0646\u062f\u06cc \u06a9\u06cc \u0686\u06cc\u0632 \u06a9\u06cc \u0642\u06cc\u0645\u062a \u062a\u06cc\u0646 \u0639\u0648\u0627\u0645\u0644 \u067e\u0631 \u0645\u0646\u062d\u0635\u0631 \u06c1\u06d2\u062f \u0648\u0632\u0646\u060c \u062e\u0627\u0644\u0635\u06cc\u062a\u060c \u0627\u0648\u0631 \u0633\u067e\u0627\u0672 \u0642\u06cc\u0645\u062a\u06d2\u06d4 \u0641\u0627\u0631\u0645\u0648\u0644\u0627\u06d2 \u0642\u06cc\u0645\u062a \u003d \u0648\u0632\u0646 \u0028\u067e\u0631\u0627\u0626\u06d2 \u0627\u0648\u0646\u0633\u0029 \u00d7 \u062e\u0627\u0644\u0635\u06cc\u062a \u00d7 \u0633\u067e\u0627\u0672 \u0642\u06cc\u0645\u062a\u06d2\u06d4</p>
            <ul>
              <li><strong>\u0648\u0632\u0646</strong> \u2014 \u06af\u0631\u0627\u0645\u060c \u067e\u0631\u0627\u0626\u06d2 \u0627\u0648\u0646\u0633 \u06cc\u0627 \u06a9\u0644\u0648\u06af\u0631\u0627\u0645 \u0645\u06cc\u06ba</li>
              <li><strong>\u062e\u0627\u0644\u0635\u06cc\u062a</strong> \u2014 \u0686\u0627\u0646\u062f\u06cc \u06a9\u0627 \u0641\u06cc\u0635\u062f\u003a \u0039\u0039\u0039 \u0028\u0039\u0039\u002e\u0039\u0025\u0029\u002c \u0039\u0032\u0035 \u0633\u0679\u0631\u0644\u0646\u06af \u0028\u0039\u0032\u002e\u0035\u0025\u0029\u002c \u0039\u0030\u0030 \u0028\u0039\u0030\u0025\u0029</li>
              <li><strong>\u0633\u067e\u0627\u0672 \u0642\u06cc\u0645\u062a</strong> \u2014 \u0639\u0627\u0644\u0645\u06cc \u0645\u0646\u0688\u06cc\u0648\u06ba \u0633\u06d2 \u0644\u0627\u0626\u06cc\u0648 \u0642\u06cc\u0645\u062a</li>
            </ul>
            <h3>\u0686\u0627\u0646\u062f\u06cc \u06a9\u0627 \u0633\u06a9\u0631\u06cc\u067e \u06a9\u06cc\u0627 \u06c1\u06d2\u1f1f</h3>
            <p>\u067ٹ\u0648\u067ٹ\u06d2 \u06c1\u0648\u0626\u06d2 \u0632\u06cc\u0648\u0631\u0627\u062a\u060c \u067e\u0631\u0627\u0646\u06d2 \u0628\u0631\u062a\u0646\u060c \u0686\u0627\u0646\u062f\u06cc \u06a9\u06d2 \u0633\u06a9\u06d2 \u2014 \u06a9\u0648\u0626\u06cc \u0628\u06be\u06cc \u0686\u06cc\u0632 \u062c\u0648 \u0627\u067e\u0646\u06cc \u062f\u06be\u0627\u062a\u06cc \u0642\u06cc\u0645\u062a \u06a9\u06d2 \u0644\u06cc\u06d2 \u0628\u06cc\u0686\u06cc \u062c\u0627\u0626\u06d2\u06d4</p>
          </div>`
  },
  ar: {
    steps: `<h2 class="section-title">\u0643\u064a\u0641 \u064a\u0631\u0645\u0644 \u2014 3 \u062e\u0637\u0648\u0627\u062a \u0628\u0633\u064a\u0637\u0629</h2>
        <p class="section-subtitle">\u0627\u062d\u0635\u0644 \u0639\u0644\u0649 \u062a\u0642\u064a\u064a\u0645 \u062f\u0642\u064a\u0642 \u0641\u064a \u062b\u0648\u0627\u0646\u064d.</p>
        <div class="steps-grid stagger">
          <div class="step-card"><div class="step-number">1</div><h4>\u0632\u0646 \u0641\u0634\u062a\u0643</h4><p>\u0627\u0633\u062a\u062e\u062f\u0645 \u0645\u064a\u0632\u0627\u0646\u0627\u064b \u0644\u0648\u0632\u0646 \u0642\u063f\u0639\u0629 \u0627\u0644\u0641\u0636\u0629\u002e</p></div>
          <div class="step-card"><div class="step-number">2</div><h4>\u0627\u062e\u062a\u0631 \u0627\u0644\u0646\u0642\u0627\u0621</h4><p>\u0627\u062e\u062a\u0631 \u0627\u0644\u0646\u0642\u0627\u0621\u003a \u002e\u0039\u0039\u0039 \u0623\u0648 \u002e\u0039\u0032\u0035 \u0623\u0648 \u002e\u0039\u0030\u0030 \u0623\u0020\u0645\u062e\u0635\u0635\u002e</p></div>
          <div class="step-card"><div class="step-number">3</div><h4>\u0627\u062d\u0635\u0644 \u0639\u0644\u0649 \u0627\u0644\u0642\u064a\u0645\u0629 \u0641\u0648\u0631\u0627\u064b</h4><p>\u064a\u062a\u0645 \u0627\u0644\u062d\u0633\u0627\u0628 \u0628\u0627\u0644\u0633\u0631\u0639 \u0627\u0644\u0641\u0648\u0631\u064a \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u002e</p></div>
        </div>`,
    understand: `<h2>\u0641\u0647\u0645 \u0642\u064a\u0645\u0629 \u0627\u0644\u0641\u0636\u0629</h2>
          <div class="content-scroll-block">
            <h3>\u0643\u064a\u0641 \u064a\u062a\u0645 \u062d\u0633\u0627\u0628 \u0642\u064a\u0645\u0629 \u0627\u0644\u0627\u0646\u0635\u0647\u0627\u0631\u011f</h3>
            <p>\u062a\u0639\u062a\u0645\u062f \u0642\u064a\u0645\u0629 \u0623\u064a \u0642\u063f\u0639\u0629 \u0641\u0636\u064a\u0629 \u0639\u0644\u0649 \u062b\u0644\u0627\u062b\u0629 \u0639\u0648\u0627\u0645\u0644\u062d \u0627\u0644\u0648\u0632\u0646\u060c \u0627\u0644\u0646\u064é\u0627\u0621\u060c \u0648\u0627\u0644\u0633\u0631\u0639 \u0627\u0644\u0641\u0648\u0631\u064a\u002e \u0627\u0644\u0645\u0639\u0627\u062f\u0644\u0629\u062d \u0627\u0644\u0642\u064a\u0645\u0629 \u003d \u0627\u0644\u0648\u0632\u0646 \u0028\u0623\u0648\u0642\u064a\u0629 \u062a\u0631\u0648\u064a\u0029 \u00d7 \u0627\u0644\u0646\u064é\u0627\u0621 \u00d7 \u0627\u0644\u0633\u0631\u0639 \u0627\u0644\u0641\u0648\u0631\u064a\u002e</p>
            <ul>
              <li><strong>\u0627\u0644\u0648\u0632\u0646</strong> \u2014 \u0628\u0627\u0644\u062c\u0631\u0627\u0645 \u0623\u0648 \u0623\u0648\u0642\u064a\u0629 \u062a\u0631\u0648\u064a \u0623\u0648 \u0643\u064a\u0644\u0648\u062c\u0631\u0627\u0645</li>
              <li><strong>\u0627\u0644\u0646\u064é\u0627\u0621</strong> \u2014 \u0646\u0633\u0628\u0629 \u0627\u0644\u0641\u0636\u0629\u003a \u0039\u0039\u0039 \u0028\u0039\u0039\u002e\u0039\u0025\u0029\u002c \u0039\u0032\u0035 \u0625\u0633\u062a\u0631\u0644\u0646\u064a \u0028\u0039\u0032\u002e\u0035\u0025\u0029\u002c \u0039\u0030\u0030 \u0639\u0645\u0644\u0629 \u0028\u0039\u0030\u0025\u0029</li>
              <li><strong>\u0627\u0644\u0633\u0631\u0639 \u0627\u0644\u0641\u0648\u0631\u064a</strong> \u2014 \u0627\u0644\u0633\u0631\u0639 \u0627\u0644\u062d\u0627\u0644\u064a \u0645\u0646 \u0627\u0644\u0628\u0648\u0631\u0635\u0627\u062a \u0627\u0644\u0639\u0627\u0644\u0645\u064a\u0629</li>
            </ul>
            <h3>\u0645\u0627 \u0647\u064a \u062e\u0631\u062f\u0629 \u0627\u0644\u0641\u0636\u0629\u011f</h3>
            <p>\u0627\u0644\u0645\u062c\u0648\u0647\u0631\u0627\u062a \u0627\u0644\u0645\u0643\u0633\u0648\u0631\u0629\u060c \u0627\u0644\u0623\u0648\u0627\u0646\u064a \u0627\u0644\u0642\u062f\u064a\u0645\u062e\u060c \u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0641\u0636\u064a\u0629 \u2014 \u0623\u064a \u0634\u064a\u0621 \u064a\u064f\u0628\u0627\u0639 \u0644\u0642\u064a\u0645\u062a\u0647 \u0627\u0644\u0645\u0639\u062f\u0646\u064a\u0629\u002e</p>
          </div>`
  }
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

    // 1. RECOVERY: SANITIZE STEPS SECTION (Aggressive wiping to fix previous duplications)
    const stepsRegex = /<section[^>]*>\s*<div class="container text-center">\s*<span class="section-badge">📋<\/span>[\s\S]*?<\/section>/;
    const cleanStepsSection = `<section class="section-compact" style="background: var(--bg-secondary);">
      <div class="container text-center">
        <span class="section-badge">📋</span>
        ${CLEAN_BLOCKS[lang].steps}
      </div>
    </section>`;
    content = content.replace(stepsRegex, cleanStepsSection);

    // 2. RECOVERY: SANITIZE UNDERSTAND SECTION (Deep Mojibake clean)
    const understandRegex = /<section[^>]*>\s*<div class="container">\s*<div class="content-body">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;
    const cleanUnderstandSection = `<section class="section-compact">
      <div class="container">
        <div class="content-body">
          ${CLEAN_BLOCKS[lang].understand}
        </div>
      </div>
    </section>`;
    content = content.replace(understandRegex, cleanUnderstandSection);

    // 3. LOGO LOCALIZATION
    // Many logos point to href="/" - we should force them to use getBasePath
    // Actually, in components.js SiteComponents handles it if id="logo-link" exists or it's dynamic.
    // But since it's hardcoded in many, we'll replace href="/" with href="/lang/"
    content = content.replace(/<a href="\/" class="site-logo">/g, `<a href="/${lang}/" class="site-logo">`);

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
  });
  console.log(`Deep recovery successful for ${lang} folder (${files.length} files)`);
});
