const createError = require("http-errors");
const User = require("../models/user.model");
const { Product } = require("../models/product.model");
const Cart = require("../models/cart.model");
const { successResponse } = require("../helper/responseHelper");
const {
  handleDeleteCartItemService,
  handleGetCartItemService
} = require("../services/cartService");

const getCartItems = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw createError(
        400,
        "UserId is not valid! and user Id is required for req params!"
      );
    }

    const cartExist = await handleGetCartItemService(userId);

    return successResponse(res, {
      statusCode: 200,
      message: "Cart Item is successfully returned",
      payload: { cartExist }
    });
  } catch (error) {
    next(error);
  }
};

const addToCartController = async (req, res, next) => {
  try {
    const { userId, productId } = req.body;

    const cartQuantity = Number(req.body.cartQuantity) || 1;

    if (cartQuantity > 5) {
      throw createError(
        400,
        "Cart Quantity is highest 5 items at a time allowed !"
      );
    }

    if (!userId || !productId || !cartQuantity) {
      throw createError(
        400,
        "UserId,productId and ProductQuantity is required!"
      );
    }

    const userInfo = await User.findById(userId);
    if (!userInfo) {
      throw createError(404, "User Not found For this userId");
    }

    const productInfo = await Product.findById(productId);
    if (!productInfo) {
      throw createError(404, "Product is Not found For this productId");
    }

    const cartExist = await Cart.findOne({ userId });

    if (!cartExist) {
      const cartItem = {
        productId: productInfo._id,
        cartQuantity: cartQuantity || 1
      };
      const newCart = await Cart.create({
        userId: userInfo._id,
        items: [cartItem]
      });

      await newCart.populate("items.productId");

      return successResponse(res, {
        statusCode: 200,
        message: "Product is added to cart",
        payload: { newCart }
      });
    }

    const itemIndex = cartExist.items.findIndex(
      (item) => item.productId == productId
    );

    if (itemIndex === -1) {
      const newItem = {
        productId: productInfo._id,
        cartQuantity: cartQuantity || 1
      };
      cartExist.items.push(newItem);
      const updatedCart = await cartExist.save();
      await updatedCart.populate("items.productId");
      return successResponse(res, {
        statusCode: 200,
        message: "Product is added to cart",
        payload: { updatedCart }
      });
    }

    if (cartQuantity === -1) {
      let cartQuantityValue = (cartExist.items[itemIndex].cartQuantity -= 1);
      // console.log(cartQuantityValue);

      if (cartQuantityValue <= 0) {
        throw createError(
          400,
          "Cart Quantity is highest 5 items at a time allowed !"
        );
      }
      cartExist.items[itemIndex].cartQuantity = cartQuantityValue;
    } else {
      const cartQuantityValue =
        (cartExist.items[itemIndex].cartQuantity =
        cartExist.items[itemIndex].cartQuantity +=
          cartQuantity);

      if (cartQuantityValue > 5) {
        throw createError(
          400,
          "Cart Quantity is highest 5 items at a time allowed !"
        );
      } else {
        cartExist.items[itemIndex].cartQuantity = cartQuantityValue;
      }
    }

    const updatedCart = await cartExist.save();
    await updatedCart.populate("items.productId");

    return successResponse(res, {
      statusCode: 200,
      message: "Product is added to cart",
      payload: { updatedCart }
    });
  } catch (error) {
    next(error);
  }
};

const deleteCartItem = async (req, res, next) => {
  try {
    const { cartId, itemId } = req.params;

    if (!cartId || !itemId) {
      throw createError(
        400,
        "CartId and itemId is required! please enter the cartId and itemId in req params."
      );
    }

    const cartItemIsExist = await handleDeleteCartItemService(cartId, itemId);

    successResponse(res, {
      statusCode: 200,
      message: "Cart item is deleted successfully",
      payload: { cartItemIsExist }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addToCartController, getCartItems, deleteCartItem };
