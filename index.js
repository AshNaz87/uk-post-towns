const puppeteer = require("puppeteer-core");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto("https://postcodebyaddress.co.uk/post-towns");

  const postTowns = await page.evaluate(() => {
    return [...document.querySelectorAll(".info-body > .badge.badge-primary")]
      .map(element => element.textContent)
      .map(postTown => ({
        postTown: postTown.replace(/\s+?\(.*?\)/, "")
      }))
  });  

  fs.writeFile("./postTowns.js", JSON.stringify(postTowns), err =>
    err ? console.log(err) : null
  );

  await browser.close();
})();
