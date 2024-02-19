const categoryRouter = require("express").Router();

const {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/category.controller");

const { isLoggedIn, isAdmin } = require("../middlewares/auth");
const { runValidation } = require("../validation");
const {
  categoryCreateValidation,
  updateCategoryValidation
} = require("../validation/categoryValidation");

categoryRouter.post(
  "/",
  isLoggedIn,
  isAdmin,
  categoryCreateValidation,
  runValidation,
  createCategory
);

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:slug", getCategory);
categoryRouter.put(
  "/:slug",
  isLoggedIn,
  isAdmin,
  updateCategoryValidation,
  runValidation,
  updateCategory
);

categoryRouter.delete(
  "/:slug",
  isLoggedIn,
  isAdmin,
  updateCategoryValidation,
  runValidation,
  deleteCategory
);

module.exports = { categoryRouter };
