const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    cartItems: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        
        },
        quantity: {
          type: Number,
          max: 5,
        },
        price: {
          type: Number,
          
        },
      },
    ],

    totalAmount: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Cart", cartSchema);
