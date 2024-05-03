const { body } = require("express-validator");

const createCartValidation = [
  body("userId").trim().notEmpty().withMessage("User Id is required!"),
  body("productId").trim().notEmpty().withMessage("Product Id is required!")
];

module.exports = { createCartValidation };
