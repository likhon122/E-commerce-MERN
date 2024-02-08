const data = require("../data");
const User = require("../models/user.model");

const seedController = async (req, res, next) => {
  try {
    await User.deleteMany({});

    const users = await User.insertMany(data.users);
    return res.status(201).json({
      success: true,
      message: "Insert is successful",
      users
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { seedController };
