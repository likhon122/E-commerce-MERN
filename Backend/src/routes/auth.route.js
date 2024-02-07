const authRouter = require("express").Router();

const { userLogin, userLogout } = require("../controllers/auth.controller");
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");
const { runValidation } = require("../validation");
const { userLoginValidation } = require("../validation/auth");

authRouter.post(
  "/login",
  userLoginValidation,
  runValidation,
  isLoggedOut,
  userLogin
);
authRouter.post("/logout", isLoggedIn, userLogout);

module.exports = authRouter;
