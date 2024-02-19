const { body } = require("express-validator");

const categoryCreateValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category Name is Required!")
    .isLowercase()
    .withMessage("Category name is must be use all lowercase character!")
    .isLength({ min: 3 })
    .withMessage("Category Name must be at least 3 characters long!")
];

const updateCategoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category Name is Required!")
    .isLowercase()
    .withMessage("Category name is must be use all lowercase character!")
    .isLength({ min: 3 })
    .withMessage("Category Name must be at least 3 characters long!")
];

module.exports = { categoryCreateValidation, updateCategoryValidation };
