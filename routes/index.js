var express = require("express");
const { takeScreenshot } = require("../utils.js");

var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendFile("index.html")
});

/* GET home page. */
router.get("/api/:url(*)", async function (req, res, next) {
  var url = req.params.url;
  const screenshot = await takeScreenshot(url);
  const imgurl = (req.protocol + "://" + req.get("host") + screenshot).replace(
    "./public",
    ""
  );
  res.send(imgurl);
});

module.exports = router;
