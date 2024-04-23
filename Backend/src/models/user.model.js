const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// const { userImagePath } = require("../secret")
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name is Required"],
      trim: true,
      minlength: [3, "User Name is must have at least 3 characters"],
      maxlength: [31, "User Name is must have less than 31 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (v) => {
          return /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/.test(
            v
          );
        },
        message: "Email is not valid! Please enter a valid Email."
      }
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      trim: true,
      minlength: [6, "Password must have at least 6 characters"],
      set: (v) => {
        return bcrypt.hashSync(v, bcrypt.genSaltSync(10));
      }
    },
    address: {
      type: String,
      required: [true, "Address is Required"],
      trim: true,
      minlength: [3, "User address is must have at least 3 characters"]
    },
    phone: {
      type: String,
      required: [true, "User phone number required"],
      trim: true,
      min: [11, "User address is must be use 11 numbers"],
      max: [11, "User address is must be use 11 numbers"]
    },
    image: {
      type: String,
      default: "/images/userImage/default.png"
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isBanned: {
      type: Boolean,

      default: false
    }
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
