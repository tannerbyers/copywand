var express = require("express");
const { takeScreenshot } = require("../utils.js");
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

  let existingURL = await db.collection("screenshots").findOne({ url: url });

  if (existingURL) {
    res.send(existingURL.screenshotUrl);
    return;
  }

  const screenshot = await takeScreenshot(url);

  db.collection("screenshots").insertOne({
    url: url,
    screenshotUrl: screenshot,
  });

  res.send(screenshot);
});

module.exports = router;
