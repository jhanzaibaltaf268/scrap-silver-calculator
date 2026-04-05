const fs = require('fs');
const path = require('path');

const deDir = path.join(__dirname, 'de');

const deSlugs = {
  "silver-scrap-calculator.html": "silberschrott-rechner.html",
  "gold-and-silver-calculator.html": "gold-und-silber-rechner.html",
  "silver-melt-value-calculator.html": "silber-schmelzwert-rechner.html",
  "sterling-silver-calculator.html": "sterlingsilber-rechner.html",
  "junk-silver-calculator.html": "billon-silber-rechner.html",
  "silver-coin-value-calculator.html": "silbermuenzen-wert-rechner.html",
  "silver-bar-value-calculator.html": "silberbarren-wert-rechner.html",
  "silver-jewelry-value-calculator.html": "silberschmuck-wert-rechner.html",
  "silverware-value-calculator.html": "silberbesteck-wert-rechner.html",
  "999-silver-calculator.html": "999-feinsilber-rechner.html",
  "958-silver-calculator.html": "958-britanniasilber-rechner.html",
  "925-silver-calculator.html": "925-sterlingsilber-rechner.html",
  "900-silver-calculator.html": "900-muenzsilber-rechner.html",
  "835-silver-calculator.html": "835-silber-rechner.html",
  "800-silver-calculator.html": "800-silber-rechner.html",
  "silver-purity-chart.html": "silber-reinheitstabelle.html",
  "silver-price-per-gram.html": "silberpreis-pro-gramm.html",
  "silver-price-per-ounce.html": "silberpreis-pro-unze.html",
  "silver-price-all-currencies.html": "silberpreis-alle-waehrungen.html",
  "1-10oz-silver-value.html": "1-10oz-silberwert.html",
  "1oz-silver-value.html": "1oz-silberwert.html",
  "2oz-silver-value.html": "2oz-silberwert.html",
  "5oz-silver-value.html": "5oz-silberwert.html",
  "10oz-silver-value.html": "10oz-silberwert.html",
  "100oz-silver-value.html": "100oz-silberwert.html",
  "1kg-silver-value.html": "1kg-silberwert.html",
  "silver-profit-calculator.html": "silber-gewinn-rechner.html",
  "silver-batch-calculator.html": "silber-stapel-rechner.html",
  "sona-chandi-calculator.html": "sona-chandi-rechner.html",
  "face-value-silver-calculator.html": "nennwert-silber-rechner.html",
  "silver-weight-converter.html": "silber-gewichtsumrechner.html",
  "pennyweight-calculator.html": "pennyweight-dwt-rechner.html",
  "tola-calculator.html": "tola-rechner.html",
  "silver-sell-or-hold.html": "silber-verkaufen-oder-halten.html",
  "identify-silver.html": "silber-identifizieren.html",
  "how-to-use-silver-calculators.html": "wie-man-silberrechner-verwendet.html",
  "what-is-silver-scrap.html": "was-ist-silberschrott.html",
  "what-is-silver-melt-value.html": "was-ist-silberschmelzwert.html",
  "what-is-junk-silver.html": "was-ist-billon-silber.html",
  "what-is-troy-ounce.html": "was-ist-eine-feinunze.html",
  "what-is-silver-bullion.html": "was-sind-silberbarren.html",
  "how-silver-prices-work.html": "wie-silberpreise-funktionieren.html",
  "silver-hallmarks-guide.html": "silberstempel-ratgeber.html",
  "what-does-925-mean.html": "was-bedeutet-925.html",
  "what-is-sterling-silver.html": "was-ist-sterlingsilber.html",
  "how-to-sell-silver.html": "wie-man-silber-verkauft.html",
  "silver-bracelet-value.html": "silberarmband-wert.html",
  "silver-chain-value.html": "silberkette-wert.html",
  "silver-cup-value.html": "silberbecher-wert.html",
  "silver-dime-calculator.html": "silber-dime-rechner.html",
  "silver-dollar-calculator.html": "silber-dollar-rechner.html",
  "silver-fork-value.html": "silbergabel-wert.html",
  "silver-knife-value.html": "silbermesser-wert.html",
  "silver-necklace-value.html": "silberhalskette-wert.html",
  "silver-plate-value.html": "silberteller-wert.html",
  "silver-quarter-calculator.html": "silber-quarter-rechner.html",
  "silver-ring-value.html": "silberring-wert.html",
  "silver-spoon-value.html": "silberloeffel-wert.html",
  "silver-tray-value.html": "silbertablett-wert.html",
  "canadian-silver-coin-calculator.html": "kanadische-silbermuenzen-rechner.html"
};

const deTranslations = {
  "slugs": deSlugs,
  "Home": "Startseite",
  "Calculators": "Rechner",
  "Silver Scrap Calculator": "Silberschrott-Rechner",
  "Gold & Silver Calculator": "Gold- & Silber-Rechner",
  "Silver Melt Value": "Silberschmelzwert",
  "Sterling Silver Calculator": "Sterlingsilber-Rechner",
  "Junk Silver Calculator": "Billon-Silber-Rechner",
  "Silver Coin Value": "Silbermünzen-Wert",
  "Silver Bar Value": "Silberbarren-Wert",
  "Silver Jewelry Value": "Silberschmuck-Wert",
  "Silverware Value": "Silberbesteck-Wert",
  "Purity": "Reinheit",
  "999 Fine Silver": "999 Feinsilber",
  "958 Britannia Silver": "958 Britannia-Silber",
  "925 Sterling Silver": "925 Sterlingsilber",
  "900 Coin Silver": "900 Münzsilber",
  "835 Silver": "835 Silber",
  "800 Silver": "800 Silber",
  "Silver Purity Chart": "Silber-Reinheitstabelle",
  "Pricing": "Preise",
  "Silver Price Per Gram": "Silberpreis pro Gramm",
  "Silver Price Per Ounce": "Silberpreis pro Unze",
  "Price in All Currencies": "Preis in allen Währungen",
  "1/10oz Silver Value": "1/10oz Silberwert",
  "1oz Silver Value": "1oz Silberwert",
  "2oz Silver Value": "2oz Silberwert",
  "5oz Silver Value": "5oz Silberwert",
  "10oz Silver Value": "10oz Silberwert",
  "100oz Silver Value": "100oz Silberwert",
  "1kg Silver Value": "1kg Silberwert",
  "Tools": "Werkzeuge",
  "Silver Profit Calculator": "Silber-Gewinn-Rechner",
  "Batch Calculator": "Stapel-Rechner",
  "Sona Chandi Calculator": "Sona Chandi Rechner",
  "Face Value Calculator": "Nennwert-Rechner",
  "Weight Converter": "Gewichtsumrechner",
  "Pennyweight (DWT) Calc": "Pennyweight (DWT) Rechner",
  "Tola Calculator": "Tola-Rechner",
  "Sell or Hold Analysis": "Verkaufen oder Halten Analyse",
  "Silver Identifier": "Silber-Identifikator",
  "Guides": "Ratgeber",
  "How to Use Our Calculators": "Wie man unsere Rechner nutzt",
  "What Is Silver Scrap?": "Was ist Silberschrott?",
  "What Is Melt Value?": "Was ist Schmelzwert?",
  "What Is Junk Silver?": "Was ist Billonsilber?",
  "What Is a Troy Ounce?": "Was ist eine Feinunze?",
  "What Is Silver Bullion?": "Was sind Silberbarren?",
  "How Silver Prices Work": "Wie Silberpreise funktionieren",
  "Silver Hallmarks Guide": "Silberstempel Ratgeber",
  "What Does 925 Mean?": "Was bedeutet 925?",
  "What Is Sterling Silver?": "Was ist Sterlingsilber?",
  "How to Sell Silver": "Wie man Silber verkauft",
  "Scrap Silver": "Silberschrott",
  "Gold & Silver": "Gold & Silber",
  "Silver Profit": "Silber-Gewinn",
  "Melt Value": "Schmelzwert",
  "Junk Silver": "Billonsilber",
  "Silver Coins": "Silbermünzen",
  "Silver Dollar": "Silberdollar",
  "Silver Quarter": "Silber-Quarter",
  "Silver Dime": "Silber-Dime",
  "Jewelry Value": "Schmuckwert",
  "925 Sterling": "925 Sterling",
  "Purity Chart": "Reinheitstabelle",
  "How to Use Calculators": "Rechner verwenden",
  "Sona Chandi Calc": "Sona Chandi Rechner",
  "Face Value Calc": "Nennwert-Rechner",
  "Sell or Hold": "Verkaufen oder Halten",
  "About": "Über uns",
  "Privacy": "Datenschutz",
  "Terms": "Bedingungen",
  "All rights reserved.": "Alle Rechte vorbehalten.",
  "Prices are for informational purposes only.": "Preise dienen nur zu Informationszwecken.",
  "Free, accurate silver calculators using live spot prices. Calculate the melt value of your silver scrap, coins, jewelry, and bars instantly.": "Kostenlose, präzise Silberrechner mit Live-Spotpreisen. Berechnen Sie blitzschnell den Schmelzwert Ihres Silberschrotts, Ihrer Münzen, Ihres Schmucks und Ihrer Barren."
};

const jsInjection = "window.MenuTranslations = " + JSON.stringify(deTranslations) + ";";

function fixDeSlugsAndDictionary() {
  if (!fs.existsSync(deDir)) return;
  const files = fs.readdirSync(deDir);
  let processCount = 0;

  for (const file of files) {
    if (!file.endsWith('.html')) continue;

    let originalPath = path.join(deDir, file);
    let targetFile = file;

    // 1. Rename logic
    if (deSlugs[file]) {
      targetFile = deSlugs[file];
      const targetPath = path.join(deDir, targetFile);

      if (originalPath !== targetPath) {
        if (fs.existsSync(targetPath)) {
          console.log("Target " + targetFile + " already exists. Deleting English version " + file);
          fs.unlinkSync(originalPath);
          originalPath = targetPath; // switch to updating the already existing target file
        } else {
          fs.renameSync(originalPath, targetPath);
          console.log("Renamed " + file + " to " + targetFile);
          originalPath = targetPath;
        }
      }
    }

    // 2. Read file content
    let content = fs.readFileSync(originalPath, 'utf8');

    // 3. Update href links inside the file
    for (const [engSlug, deSlug] of Object.entries(deSlugs)) {
      // Replaces href="english-slug.html" with href="german-slug.html"
      const regex = new RegExp('href=["\'](\\\\./)?' + engSlug + '["\']', 'g');
      content = content.replace(regex, 'href="' + deSlug + '"');
    }

    // 4. Inject MenuTranslations with slugs
    if (content.includes('window.MenuTranslations')) {
      content = content.replace(/window\\.MenuTranslations\\s*=\\s*\\{.*?\\};/s, jsInjection);
    } else {
      content = content.replace('</body>', "<script>\\n    " + jsInjection + "\\n  </script>\\n</body>");
    }

    // 5. Save file changes
    fs.writeFileSync(originalPath, content, 'utf8');
    processCount++;
  }

  console.log("Finished updating files, links, and injected MenuTranslations slugs in /de/ (" + processCount + " files).");
}

fixDeSlugsAndDictionary();
