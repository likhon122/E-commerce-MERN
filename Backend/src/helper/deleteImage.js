const createHttpError = require("http-errors");
const fs = require("fs").promises;

const deleteImage = async (imagePath) => {
  try {
    await fs.access(imagePath);
    await fs.unlink(imagePath);
    console.log("User Image is deleted successfully");
  } catch (error) {
    throw createHttpError(404, "Image path dose not exist.");
  }
};

module.exports = { deleteImage };
