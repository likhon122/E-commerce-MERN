const createError = require("http-errors");
const User = require("../models/user.model");
const Cart = require("../models/cart.model");

const handleGetCartItemService = async (userId) => {
  try {
    const userIsExist = await User.findById(userId);
    if (!userIsExist) {
      throw createError(404, "User Not found For this userId");
    }

    const cartExist = await Cart.findOne({ userId });
    if (!cartExist || cartExist.items.length < 1) {
      throw createError(404, "Cart is Empty! Please add to cart any product.");
    }
    await cartExist.populate("items.productId");
    return cartExist;
  } catch (error) {
    throw error;
  }
};

// const handleAddToCartService = async () => {
//   try {
//   } catch (error) {
//     throw error;
//   }
// };

const handleDeleteCartItemService = async (cartId, itemId) => {
  try {
    const cartItemIsExist = await Cart.findById(cartId);

    if (!cartItemIsExist) {
      throw createError(400, "CartId is not valid!");
    }

    const itemIndex = cartItemIsExist.items.findIndex(
      (item) => String(item._id) === itemId
    );

    if (itemIndex === -1) {
      throw createError(
        400,
        "Cart Item is not found with this id! Invalid cart item."
      );
    }

    cartItemIsExist.items.splice(itemIndex, 1);
    await cartItemIsExist.save();

    await cartItemIsExist.populate("items.productId");
    return cartItemIsExist;
  } catch (error) {
    throw error;
  }
};

module.exports = { handleGetCartItemService, handleDeleteCartItemService };
