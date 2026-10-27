const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    // Force reload to get latest styles
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 10000 });
    await page.reload({ waitUntil: 'networkidle0' });

    // Scroll to showcase section
    await page.evaluate(() => {
      const showcase = document.querySelector('#showcase');
      if (showcase) {
        window.scrollTo({
          top: showcase.offsetTop + window.innerHeight * 0.3,
          behavior: 'instant'
        });
      }
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if lg:grid-cols-12 CSS exists
    const hasLgGridCols12 = await page.evaluate(() => {
      // Check if the CSS rule exists
      const stylesheets = Array.from(document.styleSheets);
      let found = false;
      for (const sheet of stylesheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (rule.cssText && rule.cssText.includes('lg\\:grid-cols-12')) {
              found = true;
              return rule.cssText;
            }
          }
        } catch (e) {
          // CORS error, skip
        }
      }
      return found;
    });

    console.log('CSS Rule for lg:grid-cols-12:', hasLgGridCols12);

    // Get the height info to debug the issue
    const heightInfo = await page.evaluate(() => {
      const stickyContainer = document.querySelector('.sticky.top-0.h-screen');
      const absoluteParent = stickyContainer?.querySelector('.absolute.inset-0');
      const gridContainer = absoluteParent?.querySelector('.grid');
      const leftPanel = document.querySelector('.lg\\:col-span-5');

      // Check what grid template rows is actually computed
      const gridComputedRows = gridContainer ? window.getComputedStyle(gridContainer).gridTemplateRows : null;
      const contentGroup = leftPanel?.querySelector('div:first-child');
      const bottomGroup = leftPanel?.querySelector('div.pt-6');

      return {
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        stickyHeight: stickyContainer?.offsetHeight,
        absoluteParentHeight: absoluteParent?.offsetHeight,
        gridContainerHeight: gridContainer?.offsetHeight,
        gridContainerClasses: gridContainer?.className,
        leftPanelHeight: leftPanel?.offsetHeight,
        contentGroupHeight: contentGroup?.offsetHeight,
        bottomGroupHeight: bottomGroup?.offsetHeight,
        leftPanelClasses: leftPanel?.className,
        leftPanelComputedStyle: leftPanel ? {
          height: window.getComputedStyle(leftPanel).height,
          minHeight: window.getComputedStyle(leftPanel).minHeight,
          maxHeight: window.getComputedStyle(leftPanel).maxHeight,
          display: window.getComputedStyle(leftPanel).display,
          flexDirection: window.getComputedStyle(leftPanel).flexDirection,
          justifyContent: window.getComputedStyle(leftPanel).justifyContent,
          alignSelf: window.getComputedStyle(leftPanel).alignSelf
        } : null,
        gridContainerComputedStyle: gridContainer ? {
          height: window.getComputedStyle(gridContainer).height,
          gridTemplateRows: gridComputedRows,
          gridTemplateColumns: window.getComputedStyle(gridContainer).gridTemplateColumns
        } : null
      };
    });

    console.log('Height Debug Info:', JSON.stringify(heightInfo, null, 2));

    // Take full viewport screenshot
    const timestamp = Date.now();
    await page.screenshot({ path: `/home/kvn/workspace/jobapp/portfolio_viewport_${timestamp}.png` });
    console.log(`Screenshot saved to portfolio_viewport_${timestamp}.png`);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
