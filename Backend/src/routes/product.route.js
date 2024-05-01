const productRouter = require("express").Router();

const {
  createProduct,
  readAllProduct,
  readSingleProduct,
  deleteSingleProduct,
  updateProduct
} = require("../controllers/product.controller");
const { uploadProductImage } = require("../helper/uploadImage");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");
const { runValidation } = require("../validation");
const {
  createProductValidation,
  updateProductValidation
} = require("../validation/productValidation");

productRouter.post(
  "/",
  isLoggedIn,
  isAdmin,
  uploadProductImage.single("image"),
  createProductValidation,
  runValidation,
  createProduct
);
productRouter.get("/:slug", readSingleProduct);
productRouter.get("/", readAllProduct);
productRouter.delete("/:slug", isLoggedIn, isAdmin, deleteSingleProduct);
productRouter.put(
  "/:slug",
  isLoggedIn,
  isAdmin,
  uploadProductImage.single("image"),
  updateProductValidation,
  runValidation,
  updateProduct
);

module.exports = { productRouter };
