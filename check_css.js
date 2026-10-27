const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 10000 });

    // Get all stylesheets and search for lg:grid-cols-12 in media queries
    const mediaQueryCheck = await page.evaluate(() => {
      const stylesheets = Array.from(document.styleSheets);
      const results = [];

      for (const sheet of stylesheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (rule.type === CSSRule.MEDIA_RULE) {
              const mediaRule = rule;
              const mediaText = mediaRule.conditionText || mediaRule.media.mediaText;

              // Check if this is the lg breakpoint
              if (mediaText.includes('1024px')) {
                const innerRules = Array.from(mediaRule.cssRules || []);
                for (const innerRule of innerRules) {
                  if (innerRule.selectorText && innerRule.selectorText.includes('grid-cols-12')) {
                    results.push({
                      media: mediaText,
                      selector: innerRule.selectorText,
                      cssText: innerRule.cssText
                    });
                  }
                }
              }
            }
          }
        } catch (e) {
          // CORS error, skip
        }
      }

      return results;
    });

    console.log('Media Query Results:', JSON.stringify(mediaQueryCheck, null, 2));

    if (mediaQueryCheck.length === 0) {
      console.log('\n❌ NO lg:grid-cols-12 FOUND IN MEDIA QUERIES!');
    } else {
      console.log('\n✅ Found lg:grid-cols-12 classes');
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
