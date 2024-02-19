const createError = require("http-errors");

const { Product } = require("../models/product.model");

const handleCreateProductService = async (productData) => {
  try {
    const existingProduct = await Product.findOne({ name: productData.name });

    if (existingProduct) {
      throw createError(400, "Product is already exist.");
    }

    const product = await Product.create(productData);
    return product;
  } catch (error) {
    throw error;
  }
};

const handleReadAllProductService = async (page, limit) => {
  try {
    const products = await Product.find({})
      .select("-image")
      .populate("category")
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    if (!products) {
      throw createError(400, "Products Not found.");
    }

    const count = await Product.find({}).countDocuments();
    if (!count) {
      throw createError(400, "Products Not found.");
    }
    return { count, products };
  } catch (error) {
    throw error;
  }
};

const handleReadSingleProductService = async (slug) => {
  try {
    const product = await Product.findOne({ slug }).select("-image");
    if (!product) {
      throw createError(400, "Product is Not found with this slug.");
    }
    return { product };
  } catch (error) {
    throw error;
  }
};

const handleDeleteSingleProductService = async (slug) => {
  try {
    const product = await Product.findOneAndDelete({ slug });
    if (!product) {
      throw createError(400, "Product is Not found with this slug.");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  handleCreateProductService,
  handleReadAllProductService,
  handleReadSingleProductService,
  handleDeleteSingleProductService
};
