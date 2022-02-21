var express = require("express");
const { takeScreenshot, parseUrl, uploadFile } = require("../utils.js");
const { connectToDatabase } = require("../mongodb.js");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendFile("index.html");
});

/* GET home page. */
router.get("/api/:url(*)", async function (req, res, next) {
  var url = req.params.url;
  let { db } = await connectToDatabase();

  parsedUrl = parseUrl(url);

  let existingURL = await db
    .collection("screenshots")
    .findOne({ url: parsedUrl });

  if (existingURL) {
    res.send(existingURL.screenshotUrl);
    return;
  }

  const { screenshot, fileName } = await takeScreenshot(parsedUrl);
  const screenshotURL = await uploadFile(screenshot, fileName);

  db.collection("screenshots").insertOne({
    url: parsedUrl,
    screenshotUrl: screenshotURL,
  });

  res.send(screenshotURL);
});

module.exports = router;
