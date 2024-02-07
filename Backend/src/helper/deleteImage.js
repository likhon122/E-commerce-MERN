const fs = require("fs").promises;
const createHttpError = require("http-errors");
const deleteImage = async (imagePath) => {
  try {
    console.log(imagePath);
    await fs.access(imagePath);
    await fs.unlink(imagePath);
    console.log("Image is deleted successfuly");
  } catch (error) {
    console.error(error);
    throw createHttpError(404, "Image path dosenot exist.");
  }
};

module.exports = { deleteImage };
