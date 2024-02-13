const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const { findWithId } = require("./findWithId");
const { deleteImage } = require("../helper/deleteImage");
const { createJsonWebToken } = require("../helper/jsonwebtoken");
const {
  emailVerifyWithNodemailer
} = require("../helper/verifyEmailWithNodemaler");
const { jwtSecretKey, websiteURL, jwtForgetPasswordKey } = require("../secret");

const processRegisterUserService = async (
  name,
  email,
  password,
  phone,
  address,
  // bufferImageString,
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
      { name, email, password, phone, address },
      jwtSecretKey,
      "10m"
    );

    // Sending email process
    const emailData = {
      email,
      subject: "Account activation email",
      html: `
        <h1>Welcome ${name} !</h1>
        <p>Please verify your account. Click this <a href="${websiteURL}/api/users/verify/${token}">activate your account</a> link and confirm your gmail.</p>
      `
    };

    // send email with nodemailer
    await emailVerifyWithNodemailer(emailData);
    // return token;
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
      throw createError(404, "Users not Found");
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

    for (const key in req.body) {
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

const updateUserPasswordService = async (
  req,
  res,
  userId,
  email,
  oldPassword,
  newPassword,
  confirmedPassword
) => {
  try {
    // check user is exist
    await findWithId(userId, User);
    const user = await User.findOne({ email });

    if (!user) {
      throw createError(400, "User Email is not matched");
    }

    // check user old Password or database password is matched
    const userPassword = await bcrypt.compare(oldPassword, user.password);

    if (!userPassword) {
      throw createError("User email or old Password do not matched!");
    }

    // check user newPassword or old password are not same
    if (oldPassword === newPassword) {
      throw createError(
        400,
        "User Old Password or New Password is same please select another password and try again!"
      );
    }

    // check user newPassword or confirmed password are same
    if (newPassword !== confirmedPassword) {
      throw createError(
        400,
        "Confirmed Password or New Password are don't matched"
      );
    }

    // finally user password update to database and save this
    const filter = { email };
    const updates = { $set: { password: newPassword } };
    const updatedOptions = { new: true };

    const updatedUser = await User.findOneAndUpdate(
      filter,
      updates,
      updatedOptions
    ).select("-password");

    try {
      const { accessToken } = req.cookies;
      if (!accessToken) {
        throw createError(
          401,
          "Access token is not found. Please login first!"
        );
      }
      if (!accessToken) {
        throw createError(400, "Please Login First");
      }
      res.clearCookie("accessToken");
    } catch (error) {
      throw error;
    }
    return updatedUser;
  } catch (error) {
    throw error;
  }
};
const resetUserPasswordService = async (token, password) => {
  try {
    let decoded;
    try {
      decoded = jwt.verify(token, jwtForgetPasswordKey);
    } catch (error) {
      throw createError(
        400,
        "User forget password is failed. Please send correct information and valid token!"
      );
    }

    if (!decoded) {
      throw createError(
        400,
        "User forget password is failed. Please send correct information!"
      );
    }

    const filter = { email: decoded.email };
    const update = { password };
    const options = { new: true };

    const updatedUser = await User.findOneAndUpdate(
      filter,
      update,
      options
    ).select("-password");

    if (!updatedUser) {
      throw createError(
        400,
        "User reset password is not successful please try again!"
      );
    }
    return updatedUser;
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
  updateUserService,
  updateUserPasswordService,
  resetUserPasswordService
};
