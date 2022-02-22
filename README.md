# [Copy Wand](https://copywand.herokuapp.com/)

## Purpose

I wanted an api that I could pass a URL, and it would generate a screenshot thumbnail and return it. I wanted it for a game website I thought of making.
This UI is just for testing purposes.

## Config

the below values needs to be set as enviroment variables. Look through code to see how they're used
ID=
SECRET=
BUCKET_NAME=
MONGODB_URI=
DB_NAME=

## Start

```
npm install
npm run develop
```

## To Do

- Remake UI with bootstrap to make it responsive and nice. It currently is just thrown together.
- Add more pages (email newsletter sign up)
- Make the backend return a custom redirect for the s3 img url. I shouldn't be returning the s3 url directly.
