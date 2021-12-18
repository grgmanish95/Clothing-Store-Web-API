const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
          max: 5,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    shippingDetails: {
      state: {
        type: String,
        required: true,
      },
      Municipality: {
        type: String,
        required: true,
      },
    },
    wardNo: {
      type: Number,
      required: true,
    },
    postalCode: {
      type: String,
      required: false,
    },
    contact: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.mosel("Order", orderSchema);
