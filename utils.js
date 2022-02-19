const { nanoid } = require("nanoid");
const puppeteer = require("puppeteer");

exports.takeScreenshot = async (url) => {
  let browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1280, height: 720 },
  });
  let page = await browser.newPage();
  await page.goto(url);
  var filename = url.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  const customFilePath = `./public/images/${filename}.jpg`;
  await page.screenshot({ path: customFilePath, type: "jpeg" });
  await page.close();
  await browser.close();
  return customFilePath;
};
