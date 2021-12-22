const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require('./router/userRouter');
const uploadImage= require('./router/uploadImage');
const productRouter = require('./router/productRouter');
const path = require('path');
const auth = require('./Authorization/authorization');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/clothingstore/user',  userRouter);
app.use('/clothingstore/product', productRouter);
app.use('/clothingstore/upload/image',auth.verifyUser,uploadImage);
app.use(express.static(path.join(__dirname,'pictures')));
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
