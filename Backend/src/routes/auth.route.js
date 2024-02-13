const authRouter = require("express").Router();

const {
  userLogin,
  userLogout,
  refreshTokenRoute,
  protectedRoute
} = require("../controllers/auth.controller");
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
authRouter.get("/refresh-token", refreshTokenRoute);
authRouter.get("/protected", protectedRoute);

module.exports = authRouter;
