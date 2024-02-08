const createHttpError = require("http-errors");
const fs = require("fs").promises;

const deleteImage = async (imagePath) => {
  try {
    await fs.access(imagePath);
    await fs.unlink(imagePath);
  } catch (error) {
    throw createHttpError(404, "Image path dose not exist.");
  }
};

module.exports = { deleteImage };
