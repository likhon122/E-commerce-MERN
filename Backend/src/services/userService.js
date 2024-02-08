const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const { findWithId } = require("./findWithId");
const { deleteImage } = require("../helper/deleteImage");
const { createJsonWebToken } = require("../helper/jsonwebtoken");
const {
  emailVerifyWithNodemaler
} = require("../helper/verifyEmailWithNodemaler");
const { jwtSecretKey, websiteURL } = require("../secret");

const getAllUsersService = async (limit, page, search) => {
  try {
    const searchRegEx = new RegExp(".*" + search + ".*", "i");
    const option = { password: 0 };
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegEx } },
        { email: { $regex: searchRegEx } },
        { phone: { $regex: searchRegEx } }
      ]
    };
    const users = await User.find(filter, option)
      .limit(limit)
      .skip((page - 1) * limit);

    if (!users) {
      throw (createError(404, "Users not Found"));
    }
    const countUser = await User.find(filter, option).countDocuments();
    return { users, countUser };
  } catch (error) {
    throw error;
  }
};

const deleteUserService = async (id, option) => {
  try {
    const user = await findWithId(id, User, option);
    const userImagePath = user.image;

    await deleteImage(userImagePath);
    await User.findByIdAndDelete({
      _id: user._id,
      isAdmin: false
    });
  } catch (error) {
    throw error;
  }
};

const processRegisterUserService = async (
  name,
  email,
  password,
  phone,
  address,
  bufferImageString,
  next
) => {
  try {
    const userExistByEmail = await User.exists({ email });
    const userExistByPhone = await User.exists({ phone });
    if (userExistByEmail || userExistByPhone) {
      return next(createError(409, "User is already exist please sign in"));
    }

    // create jwt token
    const token = createJsonWebToken(
      { name, email, password, phone, address, image: bufferImageString },
      jwtSecretKey,
      "10m"
    );

    // Sending email process
    const emailData = {
      email,
      subject: "Account activation email",
      html: `
        <h1>Welcome ${name} !</h1>
        <p>Please verify your account. Click this <a href="${websiteURL}/api/users/verify">activate your account</a> link and confirm your gmail.</p>
      `
    };

    // send email with nodemailer
    try {
      await emailVerifyWithNodemaler(emailData);
    } catch (error) {
      throw error;
    }
    return token;
  } catch (error) {
    throw error;
  }
};

const verifyUserService = async (token, next) => {
  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    if (!decoded) {
      next(createError(401, "User is not able to registered"));
      return;
    }
    const userExistByEmail = await User.exists({ email: decoded.email });
    const userExistByPhone = await User.exists({ email: decoded.phone });
    if (userExistByEmail || userExistByPhone) {
      next(createError(400, "User is already exist Please sign in"));
      return;
    }
    await User.create(decoded);
    return true;
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(createError(401, "User is not able to registered"));
    } else if (error.name === "TokenExpiredError") {
      return next(createError(401, "Token has expired"));
    } else {
      throw error;
    }
  }
};

const updateUserService = async (userId, req, next) => {
  try {
    const updateOptions = {
      new: true,
      runValidators: true,
      context: "query"
    };
    const options = { password: 0 };
    await findWithId(userId, User, options);

    let updates = {};

    for (let key in req.body) {
      if (["name", "phone", "password", "address"].includes(key)) {
        updates[key] = req.body[key];
      }
    }

    const image = req.file;
    if (image) {
      if (image.size > 1024 * 1024 * 2) {
        next(
          createError(
            "400",
            "Image size too large. Please select less then 2mb image."
          )
        );
        return;
      }
      updates.image = image.buffer;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      updateOptions
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const bannedUserService = async (userId, action) => {
  try {
    const updateOptions = {
      new: true,
      runValidators: true,
      context: "query"
    };
    await findWithId(userId, User);

    let update;
    let successMessage;
    if (action === "banned") {
      update = { isBanned: true };
      successMessage = "User is Banned Successfully";
    } else if (action === "unbanned") {
      update = { isBanned: false };
      successMessage = "User was Unbanned successfully";
    } else {
      throw createError(
        400,
        "User manage failed. Please select 'banned' or 'unbanned' "
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      update,
      updateOptions
    );
    return { successMessage, updatedUser };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  bannedUserService,
  getAllUsersService,
  deleteUserService,
  processRegisterUserService,
  verifyUserService,
  updateUserService
};
