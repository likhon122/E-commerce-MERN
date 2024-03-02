const multer = require("multer");
const {
  allowedFileType,
  maxFileSize,
  usersImagePath,
  productsImagePath
} = require("../secret");

// const storage = multer.memoryStorage();

const userStorage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, usersImagePath);
  // },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const productStorage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, productsImagePath);
  // },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image file are allowed"), false);
  }
  if (!allowedFileType.includes(file.mimetype)) {
    return cb(
      new Error("Image type is not supported. Please select a correct image")
    );
  }
  cb(null, true);
};

const uploadUserImage = multer({
  storage: userStorage,
  limits: { fileSize: maxFileSize },
  fileFilter
});

const uploadProductImage = multer({
  storage: productStorage,
  limits: { fileSize: maxFileSize },
  fileFilter
});

module.exports = { uploadUserImage, uploadProductImage };
