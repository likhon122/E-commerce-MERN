require("dotenv").config();

const SERVER_PORT = process.env.PORT;
const mongoUrl =
  process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/E-Commerce-Mern";
const userImagePath =
  process.env.USER_IMAGE_PATH || "public/images/userImage/default.JPG";

const jwtSecretKey = process.env.JWT_SECRET_KEY || "";
const jwtAccessKey = process.env.JWT_ACCESS_KEY || "";
const jwtRefreshKey = process.env.JWT_REFRESH_KEY || "";
const jwtForgetPasswordKey = process.env.JWT_FORGET_PASSWORD_KEY || "";
const smtpUsername = process.env.SMTP_USERNAME || "";
const smtpPassword = process.env.SMTP_PASSWORD || "";
const websiteURL = process.env.WEBSITE_URL || "";
const usersImagePath =
  process.env.USERS_IMAGE_PATH || "public/images/userImage";
const allowedFileType = process.env.ALLOWED_FILE_TYPES || [
  "image/jpg",
  "image/png",
  "image/jpeg"
];
const maxFileSize = Number(process.env.MAX_FILE_SIZE) || 2097152;

module.exports = {
  SERVER_PORT,
  mongoUrl,
  userImagePath,
  jwtSecretKey,
  smtpPassword,
  smtpUsername,
  websiteURL,
  usersImagePath,
  allowedFileType,
  maxFileSize,
  jwtAccessKey,
  jwtForgetPasswordKey,
  jwtRefreshKey
};
