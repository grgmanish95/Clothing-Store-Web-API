const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const auth = require("../Authorization/authorization");

router
  .route("/")

  .get(auth.verifyAdmin, (req, res, next) => {
    Order.find()
      .populate("products")
      .then((orders) => {
        res.json(orders);
      })
      .catch(next);
  })

  .post(auth.verifyCustomer, (req, res, next) => {
    let { user, products, shippingDetails, totalAmount } = req.body;
    Order.create({
      user: req.user.id,
      products,
      shippingDetails,
      totalAmount,
    })
      .then((order) => {
        res.status(201).json(order);
      })
      .catch(next);
  });

router.route("/personalOrder").get(auth.verifyCustomer, (req, res, next) => {
  Order.findOne({ user: req.user.id })
    .then((order) => {
      if (!order) {
        let err = new Error("Order not found!");
        err.status = 404;
        next(err);
      } else {
        res.json(order);
      }
    })
    .catch(next);
});

router
  .route("/personalOrder/:orderID")

  .get(auth.verifyCustomer, (req, res, next) => {
    Order.findById({ _id: req.params.orderID })
      .then((order) => {
        if (!order) {
          let err = new Error("Order not found!");
          err.status = 404;
          next(err);
        } else {
          res.json(order);
        }
      })
      .catch(next);
  })

  .put(auth.verifyCustomer, (req, res, next) => {
    Order.findByIdAndUpdate(
      { _id: req.user.id },
      { $Set: req.body },
      { new: true }
    )
      .then((updatedOrder) => {
        res.json(updatedOrder);
      })
      .catch(next);
  })

  .delete(auth.verifyCustomer, (req, res, next) => {
    Order.deleteOne({ _id: req.params.orderID })
      .then((reply) => {
        res.json(reply);
      })
      .catch(next);
  });
module.exports = router;