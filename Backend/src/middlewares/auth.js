const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { jwtAccessKey } = require("../secret");

const isLoggedIn = (req, res, next) => {
  try {
    // Check token existence
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      throw createError(401, "Access token is not found. Please login first!");
    }

    try {
      // Verify token validity
      const decoded = jwt.verify(accessToken, jwtAccessKey);

      if (!decoded) {
        throw createError(
          403,
          "Access token is not valid. Please login again!"
        );
      }
      // Set decoded value in req
      req.user = decoded.user;
    } catch (error) {
      throw error;
    }
    // Move to next middleware function
    next();
  } catch (error) {
    // Pass the error to the next middleware
    return next(error);
  }
};
const isLoggedOut = (req, res, next) => {
  try {
    // Check token existence
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
      const decoded = jwt.verify(accessToken, jwtAccessKey);
      if (decoded) {
        throw createError(
          403,
          "You are already Logged in! Please logout first!"
        );
      }
      throw createError(403, "Your access token is not valid");
    }
    next();
  } catch (error) {
    // Pass the error to the next middleware
    return next(error);
  }
};
const isAdmin = (req, res, next) => {
  try {
    // find user from re.user

    const user = req.user;
    if (!user) {
      throw createError(403, "User is not found");
    }

    console.log(user);
    //match user is admin or not
    //if user is admin to go next function or throw error
    if (user.isAdmin) {
      next();
    } else {
      throw createError(403, "You are not Admin. Please go back!");
    }
  } catch (error) {
    // Pass the error to the next middleware
    return next(error);
  }
};

module.exports = { isLoggedIn, isLoggedOut, isAdmin };
