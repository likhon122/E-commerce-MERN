const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const {
  createAccessToken,
  createRefreshToken
} = require("../helper/jsonwebtoken");
const { jwtRefreshKey } = require("../secret");
const { successResponse } = require("../helper/responseHelper");

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw createError("Email or password is required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(
        404,
        "User dose not exist with this email. Please register first!"
      );
    }
    if (user && user.banned) {
      throw createError("403", "User is banned. Please contact the authority!");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw createError(401, "User email or password did not matched");
    }

    // create refresh token, jwd token and set token to cookie!
    createAccessToken(res, user);
    createRefreshToken(res, user);

    // delete user.password;

    const loggedInUserInfo = user.toObject();

    delete loggedInUserInfo.password;

    successResponse(res, {
      statusCode: 200,
      message: "User is logged in successfully",
      payload: { loggedInUserInfo }
    });
  } catch (error) {
    next(error);
  }
};
const userLogout = async (req, res, next) => {
  try {
    // fnd this cookie
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken) {
      throw createError(401, "Access token is not found. Please login first!");
    }
    if (!refreshToken) {
      throw createError(401, "Access token is not found. Please login first!");
    }
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
    successResponse(res, {
      statusCode: 200,
      message: "User is logged out successfully",
      payload: {}
    });
  } catch (error) {
    next(error);
  }
};
const refreshTokenRoute = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw createError(401, "Refresh token not found. Please login first");
    }

    const decodedRefreshToken = jwt.verify(refreshToken, jwtRefreshKey);

    if (!decodedRefreshToken) {
      throw createError(
        400,
        "Refresh token is invalid. Please send a valid refresh token"
      );
    }

    createAccessToken(res, decodedRefreshToken.user);

    successResponse(res, {
      statusCode: 200,
      message: "Access Token created Successfully",
      payload: {}
    });
  } catch (error) {
    next(error);
  }
};
const protectedRoute = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw createError(
        401,
        "User verify unsuccessful.Don't access the user for all protected route. Refresh token not found. Please login first!"
      );
    }

    const decodedRefreshToken = jwt.verify(refreshToken, jwtRefreshKey);

    if (!decodedRefreshToken) {
      throw createError(
        400,
        "Refresh token is invalid. Please send a valid refresh token!"
      );
    }
    // delete user credential information

    delete decodedRefreshToken.user.password;
    delete decodedRefreshToken.user.phone;

    successResponse(res, {
      statusCode: 200,
      message:
        "User verify successful.Please access the user for all protected route.",
      payload: { ...decodedRefreshToken }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { userLogin, userLogout, refreshTokenRoute, protectedRoute };
