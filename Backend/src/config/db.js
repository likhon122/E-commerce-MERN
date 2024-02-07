const mongoose = require("mongoose");
const { mongoUrl } = require("../secret");
const connectDatabase = async (options = {}) => {
  try {
    await mongoose.connect(mongoUrl, options);
    console.log("Database is connected Successfully");
    mongoose.connection.on("error", (error) => {
      console.error("DB connection error:", error);
    });
  } catch (error) {
    console.log(error.message);
    console.log("Database is not connected");
  }
};

module.exports = connectDatabase;
