const createError = require("http-errors");
const mongoose = require("mongoose");

const findWithId = async (id, model, option) => {
  try {
    const item = await model.findById({ _id: id }, option);

    if (!item) {
      throw createError(400, `${model.modelName} not Found with this id.`);
    }
    return item;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(400, `${model.modelName} not Found`);
    }
    throw error;
  }
};

module.exports = { findWithId };
