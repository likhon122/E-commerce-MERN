const { body } = require("express-validator");

// Registration user validation

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
  body("image").optional()
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
    )
];

const userPasswordUpdateValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required. Enter your valid Email address.")
    .isLowercase()
    .withMessage("Email must be in lowercase")
    .isEmail()
    .withMessage("Please enter a valid Email Address"),
  body("oldPassword")
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
  body("newPassword")
    .trim()
    .notEmpty()
    .withMessage("New password is required. Please enter your new Password!")
    .isLength({ min: 6 })
    .withMessage(
      "Please enter a password at least 6 characters and contain At least one uppercase at least one lowercase at least one special character!"
    )
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage(
      "Please enter a password at least 6 characters and contain At least one uppercase at least one lowercase at least one special character!"
    ),
  body("confirmedPassword")
    .trim()
    .notEmpty()
    .withMessage("New password is required. Please enter your new Password!")
    .isLength({ min: 6 })
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Confirmed Password dose not match.");
      }
      return true;
    })
];

const userForgetPasswordValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required. Enter your valid Email address.")
    .isLowercase()
    .withMessage("Email must be in lowercase")
    .isEmail()
    .withMessage("Please enter a valid Email Address")
];
const userUpdateValidation = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name is Required. Name must be at least 3 characters Long!")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters Long!"),
  body("password")
    .optional()
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
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Address is required. Enter your permanent address.")
    .isLength({ min: 3 })
    .withMessage("Address should be at least 3 letters long!"),
  body("phone")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Phone is required. Enter your valid Bangladesh phone number.")
    .isLength({ min: 11, max: 11 })
    .withMessage(
      "Bangladesh phone number must be at least 11 digit number support"
    )
];
const userResetPasswordValidation = [
  body("token")
    .trim()
    .notEmpty()
    .withMessage("Something is missing. Please restart again!"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required. Enter a strong password.")
    .isLength({ min: 6 })
    .withMessage(
      "Please enter a password at least 6 character and contain At least one uppercase.At least one lower case.At least one special character."
    )
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
];

// sing in user validation

module.exports = {
  userRegistrationValidation,
  userLoginValidation,
  userPasswordUpdateValidation,
  userForgetPasswordValidation,
  userResetPasswordValidation,
  userUpdateValidation
};
