const createError = require("http-errors");
const { validationResult } = require("express-validator");

const runValidation = (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(createError(422, errors.array()[0].msg));
    }
    next();
  } catch (error) {
    return next(createError(500, "Something Broke!"));
  }
};

module.exports = { runValidation };
