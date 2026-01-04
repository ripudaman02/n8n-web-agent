const { chromium } = require('playwright');

(async () => {
  const URL = process.env.URL || "https://books.toscrape.com";
  const GOAL = process.env.GOAL || "Find the highest priced book";

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });

  // Get all books on page
  const books = await page.$$eval(".product_pod", cards => {
    return cards.map(card => {
      const title = card.querySelector("h3 a")?.getAttribute("title");
      const priceText = card.querySelector(".price_color")?.innerText || "£0";
      const price = parseFloat(priceText.replace("£", ""));
      return { title, price };
    });
  });

  let highestBook = null;

  for (const book of books) {
    if (!highestBook || book.price > highestBook.price) {
      highestBook = book;
    }
  }

  const result = {
    status: "SUCCESS",
    goal: GOAL,
    highestPricedBook: highestBook?.title || null,
    price: highestBook?.price || 0,
    totalBooksChecked: books.length,
    urlVisited: URL
  };

  console.log(JSON.stringify(result));

  await browser.close();
})();
