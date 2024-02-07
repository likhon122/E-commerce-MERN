const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const { successResponse } = require("../helper/responseHelper");
const User = require("../models/user.model");
const { findWithId } = require("../services/findWithId");
const { deleteImage } = require("../helper/deleteImage");
const { createJsonWebToken } = require("../helper/jsonwebtoken");
const { jwtSecretKey, smtpUsername, websiteURL } = require("../secret");
const {
  emailVerifyWithNodemaler,
} = require("../helper/verifyEmailWithNodemaler");

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

    const searchRegEx = new RegExp(".*" + search + ".*", "i");
    const option = { password: 0 };
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegEx } },
        { email: { $regex: searchRegEx } },
        { phone: { $regex: searchRegEx } },
      ],
    };
    const users = await User.find(filter, option)
      .limit(limit)
      .skip((page - 1) * limit);

    if (!users) {
      next(createError(404, "Users not Found"));
      return;
    }
    const countUser = await User.find(filter, option).countDocuments();
    return successResponse(res, {
      statusCode: 200,
      message: "Users is successfuly returned",
      payload: {
        users,
        pagination: {
          totalPage: Math.ceil(countUser / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: limit * page <= countUser ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(createError(500, "Something Broke"));
    return;
  }
};

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const option = { password: 0 };

    try {
      const user = await findWithId(id, User, option);
      return successResponse(res, {
        statusCode: 200,
        message: "User is returned Successfuly",
        payload: {
          user,
        },
      });
    } catch (error) {
      next(error);
      return;
    }
  } catch (error) {
    next(createError(500, "Something Broke"));
    return;
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const option = { password: 0 };
    try {
      const user = await findWithId(id, User, option);
      const userImagePath = user.image;

      await deleteImage(userImagePath);
      await User.findByIdAndDelete({
        _id: user._id,
        isAdmin: false,
      });
    } catch (error) {
      next(error);
      return;
    }
    successResponse(res, {
      statusCode: 200,
      message: "User was deleted successfuly",
    });
  } catch (error) {
    next(createError(500, "Something Broke"));
    return;
  }
};

const processRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password || !phone || !address || !req.file) {
      return next(createError(400, "Invalid input data"));
    }

    if (!req.file) {
      return next(createError(404, "Image file is not found"));
    }
    const bufferImageString = req.file.buffer.toString("base64");

    const userExistByEmail = await User.exists({ email: email });
    const userExistByPhone = await User.exists({ phone: phone });
    if (userExistByEmail || userExistByPhone) {
      return next(createError(409, "User is already exist please sign in"));
    }

    //create jwt token

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
      `,
    };

    //send email with nodemailer
    try {
      await emailVerifyWithNodemaler(emailData);
    } catch (error) {
      return next(createError(500, "Email verification send failed"));
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Please go to your mail and verify your Email.",
      payload: { token },
    });
  } catch (error) {
    return next(createError(500, "Something Broke"));
  }
};
const verifyUser = async (req, res, next) => {
  try {
    const token = req.body.token;

    if (!token) {
      next(createError(401, "Token is missing"));
      return;
    }

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
      return successResponse(res, {
        statusCode: 201,
        message: "User is registered successfully",
      });
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        next(createError(401, "User is not able to registered"));
        return;
      } else if (error.name === "TokenExpiredError") {
        next(createError(401, "Token has expired"));
        return;
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.log(error);
    next(createError(500, "Something Broke"));
    return;
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updateOptions = { new: true, runValidators: true, context: "query" };
    const options = { password: 0 };

    try {
      await findWithId(userId, User, options);
    } catch (error) {
      next(error);
      return;
    }

    let updates = {};

    for (let key in req.body) {
      if (["name", "phone", "password", "address"].includes(key)) {
        updates[key] = req.body[key];
      }
      console.log(updates);
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

    try {
      console.log("updates");
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updates,
        updateOptions
      );
      successResponse(res, {
        statusCode: 200,
        message: "User was updated successfully",
        payload: { updatedUser },
      });
    } catch (error) {
      next(error);
      // next(createError("400", "User dose not exist with this id"));
      return;
    }

    // successResponse(res, {
    //   statusCode: 200,
    //   message: "User was updated successfully",
    //   payload: { updates },
    // });
  } catch (error) {
    console.log(error);
    next(createError(500, "Something Broke"));
    return;
  }
};
module.exports = {
  getUsers,
  getUser,
  deleteUser,
  processRegister,
  verifyUser,
  updateUser,
};
