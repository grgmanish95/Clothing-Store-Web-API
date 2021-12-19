const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.route("/")
.get((req, res, next) => {
  Product.find()
    .then((product) => {
      res.json(product);
    })
    .catch(next);
})

.post((req,res,next) => {
let {category, productName, price, color, size, material, description, stock} = req.body;
Product.create({
    category,
    productName,
    price,
    color,
    size,
    material,
    description,
    stock
})
.then((product) =>{
    res.status(201).json(product);
})
.catch(next);
})

.delete((req,res,next) =>{
    Product.deleteMany()
    .then((reply) =>{
        res.json(reply);
    })
    .catch(next);
});

router.route("/:productID")

.get((req, res, next) =>{
    Product
    .findById(req.params.productID)
    .then((product) => {
        res.json(product);
    })
    .catch(next);
})

.put((req, res, next) =>{
    Product
    .findByIdAndUpdate(
        req.params.productID,
        {$set: req.body},
        {new:true}
    )
    .then((updatedProduct) =>{
        res.json(updatedProduct);
    })
    .catch(next);
})

.delete((req, res, next ) => {
    Product
    .deleteOne({_id : req.params.productID})
    .then((reply) => {
        res.json(reply);
    })
    .catch(next);
});

module.exports = router;