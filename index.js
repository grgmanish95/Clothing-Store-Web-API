const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();

mongoose
  .connect(process.env.DbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database server");
  });

app.get("/", (req, res) => {
  res.send("<h1>Welcome To Clothing Store</h1>");
});

app.listen(process.env.Port, () => {
  console.log(`Server is running at localhost:${process.env.Port}`);
});
