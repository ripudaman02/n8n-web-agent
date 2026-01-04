const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(process.env.URL);

  const observation = {
    title: await page.title(),
    links: await page.locator('a').count(),
    hasSearch: (await page.locator("input[type='search']").count()) > 0
  };

  console.log(JSON.stringify(observation));

  if (process.env.ACTION === "SEARCH") {
    await page.fill("input[type='search']", "science");
    await page.keyboard.press("Enter");
  }

  if (process.env.ACTION === "CLICK") {
    await page.locator("a").first().click();
  }

  await page.waitForTimeout(2000);
  await browser.close();
})();
