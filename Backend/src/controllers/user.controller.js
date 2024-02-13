const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const { successResponse } = require("../helper/responseHelper");
const User = require("../models/user.model");
const { findWithId } = require("../services/findWithId");
const {
  bannedUserService,
  getAllUsersService,
  deleteUserService,
  processRegisterUserService,
  verifyUserService,
  updateUserService,
  updateUserPasswordService,
  resetUserPasswordService
} = require("../services/userService");
const { createJsonWebToken } = require("../helper/jsonwebtoken");
const { jwtForgetPasswordKey, websiteURL } = require("../secret");
const {
  emailVerifyWithNodemaler
} = require("../helper/verifyEmailWithNodemaler");

const processRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password || !phone || !address) {
      return next(createError(400, "Invalid input data"));
    }

    // if (!req.file) {
    //   return next(createError(404, "Image file is not found"));
    // }
    // const bufferImageString = req.file.buffer.toString("base64");

    // services folder userService file -> processRegisterUserService function
     await processRegisterUserService(
      name,
      email,
      password,
      phone,
      address,
      // bufferImageString,
      next
    );

    return successResponse(res, {
      statusCode: 200,
      message: "Please go to your mail and verify your Email."
      // payload: { token }
    });
  } catch (error) {
    return next(error);
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      next(createError(401, "Token is missing"));
      return;
    }
    // services folder userService file -> verifyUserService function
    await verifyUserService(token, next);
    successResponse(res, {
      statusCode: 201,
      message: "User is registered successfully"
    });
  } catch (error) {
    // console.log(error);
    return next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

    // services folder userService file -> getAllUserService function
    const { users, countUser } = await getAllUsersService(limit, page, search);

    successResponse(res, {
      statusCode: 200,
      message: "Users is successfully returned",
      payload: {
        users,
        pagination: {
          totalPage: Math.ceil(countUser / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: limit * page <= countUser ? page + 1 : null
        }
      }
    });
  } catch (error) {
    next(createError(500, "Something Broke"));
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const option = { password: 0 };

    // services folder findWithId file -> findWithId function
    const user = await findWithId(id, User, option);

    const userWithoutPassword = user.toObject();

    delete userWithoutPassword.password;
    successResponse(res, {
      statusCode: 200,
      message: "User is returned Successfully",
      payload: {
        userWithoutPassword
      }
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const option = { password: 0 };
    // services folder userService file -> deleteUserService function
    await deleteUserService(id, option);

    successResponse(res, {
      statusCode: 200,
      message: "User was deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // services folder userService file -> updateUserService function
    const updatedUser = await updateUserService(userId, req, next);

    successResponse(res, {
      statusCode: 200,
      message: "User was updated successfully",
      payload: { updatedUser }
    });
  } catch (error) {
    return next(error);
  }
};

const manageUser = async (req, res, next) => {
  try {
    const { action } = req.body;
    const userId = req.params.id;

    const { successMessage, updatedUser } = await bannedUserService(
      userId,
      action
    );
    successResponse(res, {
      statusCode: 200,
      message: successMessage,
      payload: { updatedUser }
    });
  } catch (error) {
    next(error);
  }
};
const updateUserPassword = async (req, res, next) => {
  try {
    const { email, oldPassword, newPassword, confirmedPassword } = req.body;
    const userId = req.params.id;

    const updatedUser = await updateUserPasswordService(
      req,
      res,
      userId,
      email,
      oldPassword,
      newPassword,
      confirmedPassword
    );

    successResponse(res, {
      statusCode: 200,
      message: "User Password is updated successfully",
      payload: { updatedUser }
    });
  } catch (error) {
    next(error);
  }
};

const forgetUserPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw createError(400, "User email is required");
    }
    const userData = await User.findOne({ email });
    if (!userData) {
      throw createError(
        404,
        "User is not found for this email. Please register first!"
      );
    }
    // create jwt token

    const token = createJsonWebToken({ email }, jwtForgetPasswordKey, "5m");

    // prepare email

    const emailData = {
      email,
      subject: "Forget Password email",
      html: `
        <h1>Welcome ${userData.name}!</h1>
        <p>Please verify your account. Click this <a href="${websiteURL}/api/users/reset-password/${token}">Forget your password </a> Link and Forget your password.</p>
      `
    };
    try {
      await emailVerifyWithNodemaler(emailData);
    } catch (error) {
      throw error;
    }
    successResponse(res, {
      statusCode: 200,
      message: "User password Forget successfully",
      payload: { token }
    });
  } catch (error) {
    next(error);
  }
};
const resetUserPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    if (!password || !token) {
      throw createError(400, "User email is required");
    }

    const updatedUser = await resetUserPasswordService(token, password);
    successResponse(res, {
      statusCode: 200,
      message: "User password Forget successfully",
      payload: { updatedUser }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  processRegister,
  verifyUser,
  updateUser,
  manageUser,
  updateUserPassword,
  forgetUserPassword,
  resetUserPassword
};
