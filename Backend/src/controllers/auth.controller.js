const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const { createJsonWebToken } = require("../helper/jsonwebtoken");
const { jwtAccessKey } = require("../secret");
const { successResponse } = require("../helper/responseHelper");

const userLogin = async (req, res, next) => {
  try {
    //fetch user email and password
    const { email, password } = req.body;

    //check user is exist
    const user = await User.findOne({ email: email });
    if (!user) {
      throw createError(
        404,
        "User dose not exist with this email. Please register first!"
      );
    }
    //if exist to check user is not banned
    if (user && user.banned) {
      throw createError("403", "User is banned. Please contact the authority!");
    }
    //if user is not banned to compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw createError(401, "User email or password did not matched");
    }

    //create refresh token, jwd token and set token to cookie!
    const accessToken = createJsonWebToken({ user }, jwtAccessKey, "15m");
    try {
      res.cookie("accessToken", accessToken, {
        maxAge: 15 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
    } catch (error) {
      throw createError(400, "Token don't store on cookie");
    }
    delete user.password;
    console.log(user);
    console.log(user.password);

    //finally access the user and successfully send success message
    successResponse(res, {
      statusCode: 200,
      message: "User is logged in successfully",
      payload: { user },
    });
  } catch (error) {
    //for find any error to send error messages
    next(error);
  }
};
const userLogout = async (req, res, next) => {
  try {
    //find cookie to header and delete this cookie

    //fnd this cookie
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      throw createError(401, "Access token is not found. Please login first!");
    }
    if (!accessToken) {
      throw createError(400, "Please Login First");
    }
    res.clearCookie("accessToken");
    //send success response
    successResponse(res, {
      statusCode: 200,
      message: "User is logged out successfully",
      payload: {},
    });
  } catch (error) {
    //for find any error to send error messages
    next(error);
  }
};

module.exports = { userLogin, userLogout };
