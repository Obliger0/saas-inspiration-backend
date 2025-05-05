const puppeteer = require('puppeteer');

const extractInternalLinks = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const links = await page.evaluate(() => 
    Array.from(document.querySelectorAll('a'))
      .map(a => a.href)
      .filter(href => href.startsWith(window.location.origin))
  );

  await browser.close();
  return links;
};

const extractPageDetails = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });
//   await page.goto(url);

  const title = await page.title();
  let description = '';
  try {
    description = await page.$eval('meta[name="description"]', el => el.content);
  } catch (err) {
    console.log('Meta description not found, using default empty value.');
  }
  const metaTitle = title;
  const metaDescription = description;

  // You can expand more: colors, fonts, etc.
  const colorScheme = [];
  const fonts = [];
  const technologyStack = [];
  const categories = [];
  const niche = '';

  const desktopScreenshotUrl = await page.screenshot({ fullPage: true, encoding: 'base64' });
  
  await page.setViewport({ width: 375, height: 812 });
  const mobileScreenshotUrl = await page.screenshot({ fullPage: true, encoding: 'base64' });

  await browser.close();

  return {
    title,
    description,
    metaTitle,
    metaDescription,
    // desktopScreenshotUrl,
    // mobileScreenshotUrl,
    colorScheme,
    fonts,
    technologyStack,
    categories,
    niche,
  };
};

module.exports = {
  extractInternalLinks,
  extractPageDetails,
};
