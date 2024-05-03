const mongoose = require("mongoose");

const CartModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"]
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        cartQuantity: {
          type: Number,
          default: 1
        }
      }
    ]
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartModel);

module.exports = Cart;
