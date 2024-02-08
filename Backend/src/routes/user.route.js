const userRouter = require("express").Router();
const {
  getUsers,
  getUser,
  deleteUser,
  processRegister,
  verifyUser,
  updateUser,
  manageUser
} = require("../controllers/user.controller");
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth");
const upload = require("../middlewares/uploadImage");
const { runValidation } = require("../validation");
const { userRegistrationValidation } = require("../validation/auth");

userRouter.post(
  "/process-register",
  upload.single("image"),
  isLoggedOut,
  userRegistrationValidation,
  runValidation,
  processRegister
);

userRouter.post("/verify", isLoggedOut, verifyUser);
userRouter.get("/", isLoggedIn, isAdmin, getUsers);
userRouter.get("/:id", isLoggedIn, getUser);
userRouter.delete("/:id", isLoggedIn, deleteUser);
userRouter.put("/:id", upload.single("image"), isLoggedIn, updateUser);
userRouter.put("/manage-user/:id", isLoggedIn, isAdmin, manageUser);

module.exports = userRouter;
