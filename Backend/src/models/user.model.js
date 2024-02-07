const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const { userImagePath } = require("../secret");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name is Reqired"],
      trim: true,
      minlength: [3, "User Name is must have at least 3 charecres"],
      maxlength: [31, "User Name is must have less than 31 charecres"],
    },
    email: {
      type: String,
      required: [true, "Email is Reqired"],
      trim: true,
      unique: true,
      lowarcase: true,
      validate: {
        validator: (v) => {
          return /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/.test(
            v
          );
        },
        message: "Email is not valid! Please enter a valid Email.",
      },
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      trim: true,
      minlength: [6, "Password must have at least 6 characters"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    address: {
      type: String,
      required: [true, "Address is Required"],
      trim: true,
      minlength: [3, "User address is must have at least 3 characters"],
    },
    phone: {
      type: String,
      required: [true, "User phone number required"],
      trim: true,
      min: [11, "User address is must be use 11 numbers"],
      max: [11, "User address is must be use 11 numbers"],
    },
    image: {
      type: Buffer,
      required: [true, "User Image is required"],
      contentType: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanded: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
