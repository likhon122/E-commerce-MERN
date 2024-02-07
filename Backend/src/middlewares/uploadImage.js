const multer = require("multer");
const { allowedFileType, maxFileSize } = require("../secret");


const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image file are allowed"), false);
  }
  if (file.size > maxFileSize) {
    return cb(
      new Error("Image size is exceed. Please select less then 2mb Image.")
    );
  }
  if (!allowedFileType.includes(file.mimetype)) {
    return cb(
      new Error("Image type is not supported. Please select a correct image")
    );
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter,
});

module.exports = upload;
