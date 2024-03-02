const createError = require("http-errors");
const slugify = require("slugify");

const { Product } = require("../models/product.model");
const { successResponse } = require("../helper/responseHelper");
const {
  handleCreateProductService,
  handleReadAllProductService,
  handleReadSingleProductService,
  handleDeleteSingleProductService
} = require("../services/productService");
// const { deleteImage } = require("../helper/deleteImage");
const cloudinary = require("../config/cloudinary");
const { imagePublicUrlWithoutExtention } = require("../helper/cloudinary");

const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      regularPrice,
      percentOff,
      shipping,
      quantity,
      category
    } = req.body;

    if (
      !name ||
      !description ||
      !regularPrice ||
      !percentOff ||
      !shipping ||
      !quantity ||
      !category
    ) {
      throw createError(400, "Value is undefined. Please input full value.");
    }

    const image = req.file;

    if (!image) {
      throw createError(400, "Product image is required.");
    }

    if (image.size > 1024 * 1024 * 2) {
      throw createError(
        400,
        "Image size is too large. Please select less than 2mb Product image."
      );
    }
    const productData = {
      name,
      slug: slugify(name),
      description,
      regularPrice,
      percentOff,
      quantity,
      image: image.path,
      category
    };

    const product = await handleCreateProductService(productData);

    return successResponse(res, {
      statusCode: 200,
      message: "Product is created successfully",
      payload: { product }
    });
  } catch (error) {
    next(error);
  }
};

const readAllProduct = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const searchRegEx = new RegExp(".*" + search + ".*", "i");
    const filter = {
      $or: [{ name: { $regex: searchRegEx } }]
    };
    const { count, products } = await handleReadAllProductService(
      page,
      limit,
      filter
    );

    return successResponse(res, {
      statusCode: 200,
      message: "All Product are returned successfully",
      payload: {
        products,
        pagination: {
          totalProduct: count,
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
          totalPage: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const readSingleProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { product } = await handleReadSingleProductService(slug);

    return successResponse(res, {
      statusCode: 200,
      message: "Single Product returned successfully",
      payload: { product }
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;
    await handleDeleteSingleProductService(slug);

    return successResponse(res, {
      statusCode: 200,
      message: "Single Product was deleted successfully",
      payload: {}
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const updateOptions = { new: true, runValidators: true, context: "query" };

    const productExist = await Product.findOne({ slug });
    if (!productExist) {
      throw createError(400, "Product is not found with this slug");
    }
    const updates = {};

    for (const key in req.body) {
      if (
        [
          "name",
          "description",
          "regularPrice",
          "percentOff",
          "shipping",
          "quantity",
          "category"
        ].includes(key)
      ) {
        updates[key] = req.body[key];
      }
    }

    if (req.body.name) {
      const isProductExist = await Product.findOne({ name: req.body.name });
      if (isProductExist) {
        throw createError(
          400,
          "Product is already exist with this name please select another name!"
        );
      }
      updates.slug = slugify(req.body.name);
    }

    const image = req.file;
    if (image) {
      if (image.size > 1024 * 1024 * 2) {
        throw createError(
          400,
          "Image size too large. Please select less then 2mb image."
        );
      }

      const imagePathWihoutExtention = imagePublicUrlWithoutExtention(
        productExist.image
      );
      const { result } = await cloudinary.uploader.destroy(
        `e-commerce-mern/products/${imagePathWihoutExtention}`
      );
      if (result !== "ok") {
        throw createError(400, "User Image is not updated. Please try again!");
      }

      const response = await cloudinary.uploader.upload(image.path, {
        folder: "e-commerce-mern/products"
      });
      if (!response) {
        throw createError(400, "User image is not uploaded. Please try again!");
      }

      updates.image = response.secure_url;
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { slug },
      updates,
      updateOptions
    );

    if (!updatedProduct) {
      throw createError(400, "Product Update failed.");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "Single Product was updated successfully",
      payload: { updatedProduct }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  readAllProduct,
  readSingleProduct,
  deleteSingleProduct,
  updateProduct
};
