const cartRouter = require("express").Router();

const { isLoggedIn } = require("../middlewares/auth");
const { createCartValidation } = require("../validation/cartValidation");
const { runValidation } = require("../validation");
const {
  addToCartController,
  getCartItems,
  deleteCartItem
} = require("../controllers/cart.controller");

cartRouter.get("/:userId", isLoggedIn, getCartItems);

cartRouter.post(
  "/",
  isLoggedIn,
  createCartValidation,
  runValidation,
  addToCartController
);

cartRouter.delete("/:cartId/:itemId", isLoggedIn, deleteCartItem);

module.exports = cartRouter;
