const { body } = require("express-validator");

const createProductValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product Name is Required.")
    .isLength({ min: 3, max: 150 })
    .withMessage("Product name must be use 3-150 characters long"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Product description is Required.")
    .isLength({ min: 15 })
    .withMessage("Product description must be at least 15 characters long"),
  body("regularPrice")
    .trim()
    .notEmpty()
    .withMessage("Product regular price is Required.")
    .isFloat({ gt: 0 })
    .withMessage(
      "Product regular price must be an positive number and grater than 0"
    ),
  body("quantity")
    .trim()
    .notEmpty()
    .withMessage("Product quantity is Required.")
    .isInt({ min: 1 })
    .withMessage(
      "Product quantity must be an positive number and grater than 0"
    ),
  body("percentOff")
    .trim()
    .notEmpty()
    .withMessage("Product regular price is Required."),
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Product category id is Required."),
  body("image").isEmpty().withMessage("Product image is required")
];

const updateProductValidation = [
  body("name")
    .trim()
    .optional()
    .isLength({ min: 3, max: 150 })
    .withMessage("Product name must be use 3-150 characters long"),
  body("description")
    .trim()
    .optional()
    .isLength({ min: 15 })
    .withMessage("Product description must be at least 15 characters long"),
  body("regularPrice")
    .trim()
    .optional()
    .isFloat({ gt: 0 })
    .withMessage(
      "Product regular price must be an positive number and grater than 0"
    ),
  body("quantity")
    .trim()
    .optional()
    .isInt({ min: 1 })
    .withMessage(
      "Product quantity must be an positive number and grater than 0"
    ),
  body("percentOff").trim().optional(),
  body("category").trim().optional(),
  body("image").optional()
];

module.exports = { createProductValidation, updateProductValidation };
