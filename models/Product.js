const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ["maleClothing", "femaleClothing", "babyClothing"],
    },
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    material: {
      type: String,
    },

    picture: {
      type: String,
    },
    stock: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
