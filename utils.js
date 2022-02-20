// const { ID, SECRET, BUCKET_NAME } = require("./constants.js");
const puppeteer = require("puppeteer");
const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const fs = require("fs");
const dotenv = require("dotenv").config();

const ID = process.env.ID;
const SECRET = process.env.SECRET;
const BUCKET_NAME = process.env.BUCKET_NAME;

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

const uploadFile = async (fileName) => {
  // Read content from the file
  const customFilePath = `./public/images/${fileName}`;
  const fileContent = fs.readFileSync(customFilePath);
  console.log("trying to read file contents");
  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName, // File name you want to save as in S3
    Body: fileContent,
  };

  // Uploading files to the bucket
  const data = await s3
    .upload(params, function (err, data) {
      if (err) {
        throw err;
      }
    })
    .promise();
  console.log("uploaded to s3");
  return data.Location;
};

exports.takeScreenshot = async (url) => {
  let browser = await puppeteer.launch({
    // This is needed for heroku puppeteer buildback
    args: ["--no-sandbox"],
    headless: true,
    defaultViewport: { width: 1280, height: 720 },
  });
  let page = await browser.newPage();
  console.log("Created browser page");
  await page.goto(url);
  var fileName = uuidv4() + ".jpg";
  const customFilePath = `./public/images/${fileName}`;
  await page.screenshot({ path: customFilePath, type: "jpeg" });
  console.log("screenshot taken with puppeteer");
  await page.close();
  await browser.close();
  // Will look at deleting file later
  // try {
  //   fs.unlinkSync(customFilePath);
  //   //file removed
  // } catch (err) {
  //   console.error(err);
  // }
  const awsURL = await uploadFile(fileName);
  return awsURL;
};
