const { nanoid } = require("nanoid");
const puppeteer = require("puppeteer");

exports.takeScreenshot = async (url) => {
  let browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1280, height: 720 },
  });
  let page = await browser.newPage();
  await page.goto(url);
  const id = nanoid();
  const customFilePath = `./public/images/${id}.jpg`;
  await page.screenshot({ path: customFilePath, type: "jpeg" });
  await page.close();
  await browser.close();
  return customFilePath;
};
