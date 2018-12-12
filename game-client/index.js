const proxy = require("http-proxy-middleware");
const Bundler = require("parcel-bundler");
const express = require("express");

const bundler = new Bundler("src/index.html", {
  cache: false
});

const app = express();

app.use(bundler.middleware());

app.listen(Number(process.env.PORT || 4000));
