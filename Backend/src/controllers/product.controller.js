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
    const imageBufferString = image.buffer.toString("base64");

    const productData = {
      name,
      slug: slugify(name),
      description,
      regularPrice,
      percentOff,
      quantity,
      image: imageBufferString,
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const { count, products } = await handleReadAllProductService(page, limit);

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

    console.log(req.body);

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
    const image = req.file;
    if (image) {
      if (image.size > 1024 * 1024 * 2) {
        next(
          createError(
            "400",
            "Image size too large. Please select less then 2mb image."
          )
        );
        return;
      }
      updates.image = image.buffer;
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { slug },
      updates,
      updateOptions
    ).select("-image");

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
