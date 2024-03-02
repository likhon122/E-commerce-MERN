const userRouter = require("express").Router();

const {
  getUsers,
  getUser,
  deleteUser,
  processRegister,
  verifyUser,
  updateUser,
  manageUser,
  updateUserPassword,
  forgetUserPassword,
  resetUserPassword
} = require("../controllers/user.controller");
const { uploadUserImage } = require("../helper/uploadImage");
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth");
// const upload = require("../middlewares/uploadImage");
const { runValidation } = require("../validation");
const {
  userRegistrationValidation,
  userPasswordUpdateValidation,
  userForgetPasswordValidation,
  userResetPasswordValidation,
  userUpdateValidation
} = require("../validation/auth");

userRouter.post(
  "/process-register",
  isLoggedOut,
  uploadUserImage.single("image"),
  userRegistrationValidation,
  runValidation,
  processRegister
);

userRouter.post("/verify-user", isLoggedOut, verifyUser);
userRouter.get("/", isLoggedIn, isAdmin, getUsers);
userRouter.get("/:id", isLoggedIn, getUser);
userRouter.post(
  "/forget-password",
  isLoggedOut,
  userForgetPasswordValidation,
  runValidation,
  forgetUserPassword
);

userRouter.put(
  "/reset-password",
  isLoggedOut,
  userResetPasswordValidation,
  runValidation,
  resetUserPassword
);

userRouter.delete("/:id", isLoggedIn, deleteUser);
userRouter.put(
  "/:id",
  uploadUserImage.single("image"),
  isLoggedIn,
  userUpdateValidation,
  runValidation,
  updateUser
);

userRouter.put("/manage-user/:id", isLoggedIn, isAdmin, manageUser);
userRouter.put(
  "/update-password/:id",
  userPasswordUpdateValidation,
  runValidation,
  isLoggedIn,
  updateUserPassword
);

module.exports = userRouter;
