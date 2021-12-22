const express = require("express");
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../Authorization/authorization');

router.route('/')
.get(auth.verifyAdmin, (req,res,next) => {
    Cart.find()
    .then((cart) =>{
        res.json(cart);
    }).catch(next);
})

.post(auth.verifyCustomer, (req, res, next) => {
    let { user, cartItems, totalAmount } = req.body;
    Order.create({
      user: req.user.id,
      cartItems,
      totalAmount,
    })
      .then((cart) => {
        res.status(201).json(cart);
      })
      .catch(next);
  });

  router.route("/personalCart")
  .get(auth.verifyCustomer, (req, res, next) => {
    Cart.findOne({ user: req.user.id })
      .then((cart) => {
        if (!cart) {
          let err = new Error("Cart not found!");
          err.status = 404;
          next(err);
        } else {
          res.json(cart);
        }
      })
      .catch(next);
  });
  
  router
    .route("/personalCart/:cartID")
  
    .get(auth.verifyCustomer, (req, res, next) => {
      Cart.findById({ _id: req.params.cartID })
        .then((cart) => {
          if (!cart) {
            let err = new Error("Cart not found!");
            err.status = 404;
            next(err);
          } else {
            res.json(cart);
          }
        })
        .catch(next);
    })
  
    .put(auth.verifyCustomer, (req, res, next) => {
      Cart.findByIdAndUpdate(
        { _id: req.user.id },
        { $Set: req.body },
        { new: true }
      )
        .then((updatedCart) => {
          res.json(updatedCart);
        })
        .catch(next);
    })
  
    .delete(auth.verifyCustomer, (req, res, next) => {
      Order.deleteOne({ _id: req.params.cartID })
        .then((reply) => {
          res.json(reply);
        })
        .catch(next);
    });
  module.exports = router;