const productRouter = require("express").Router();

const {
  createProduct,
  readAllProduct,
  readSingleProduct,
  deleteSingleProduct,
  updateProduct
} = require("../controllers/product.controller");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");
const upload = require("../middlewares/uploadImage");
const { runValidation } = require("../validation");
const {
  createProductValidation,
  updateProductValidation
} = require("../validation/productValidation");

productRouter.post(
  "/",
  upload.single("image"),
  isLoggedIn,
  isAdmin,
  createProductValidation,
  runValidation,
  createProduct
);

productRouter.get("/:slug", readSingleProduct);
productRouter.get("/", readAllProduct);
productRouter.delete("/:slug", isLoggedIn, isAdmin, deleteSingleProduct);
productRouter.put(
  "/:slug",
  upload.single("image"),
  isLoggedIn,
  isAdmin,
  updateProductValidation,
  runValidation,
  updateProduct
);

module.exports = { productRouter };
