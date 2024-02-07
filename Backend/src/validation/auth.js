const { body } = require("express-validator");

//Registration user validation

const userRegistrationValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required. Enter your Full name.")
    .isLength({ min: 3, max: 31 })
    .withMessage(
      "Name should be at least 3 letters and less than 31 letters long!"
    ),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required. Enter your valid Email address.")
    .isLowercase()
    .withMessage("Email must be in lowercase")
    .isEmail()
    .withMessage("Please enter a valid Email Address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required. Enter a strong password.")
    .isLength({ min: 6 })
    .withMessage(
      "Please enter a password at least 6 character and contain At least one uppercase.At least one lower case.At least one special character."
    )
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage(
      "Please enter a password at least 6 character and contain At least one uppercase.At least one lower case.At least one special character."
    ),
  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required. Enter your permanent address.")
    .isLength({ min: 3 })
    .withMessage("Address should be at least 3 letters long!"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required. Enter your valid Bangladesh phone number.")
    .isLength({ min: 11, max: 11 })
    .withMessage(
      "Bangladesh phone number must be at least 11 digit number support"
    ),
  body("image")
    .custom((value, { req }) => {
      if (!req.file || !req.file.buffer) {
        throw new Error("User Image is required");
      }
      return true;
    })
    .withMessage("User image is required"),
];
const userLoginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required. Enter your valid Email address.")
    .isLowercase()
    .withMessage("Email must be in lowercase")
    .isEmail()
    .withMessage("Please enter a valid Email Address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required. Enter a strong password.")
    .isLength({ min: 6 })
    .withMessage(
      "Please enter a password at least 6 character and contain At least one uppercase.At least one lower case.At least one special character."
    )
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage(
      "Please enter a password at least 6 character and contain At least one uppercase.At least one lower case.At least one special character."
    ),
];

//sing in user validation

module.exports = { userRegistrationValidation, userLoginValidation };
