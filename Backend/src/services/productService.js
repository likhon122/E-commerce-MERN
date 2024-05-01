const createError = require("http-errors");

const { Product } = require("../models/product.model");
const cloudinary = require("../config/cloudinary");
const { imagePublicUrlWithoutExtention } = require("../helper/cloudinary");

const handleCreateProductService = async (productData) => {
  try {
    const ExistingProduct = productData;

    const response = await cloudinary.uploader.upload(ExistingProduct.image, {
      folder: "e-commerce-mern/products"
    });
    if (!response.secure_url) {
      throw createError(400, "Product image is not uploaded!");
    }
    if (response.secure_url) {
      ExistingProduct.image = response.secure_url;
    }

    const product = await Product.create(ExistingProduct);
    return product;
  } catch (error) {
    throw error;
  }
};

const handleReadAllProductService = async (page, limit, filter) => {
  try {
    const productsQuery = Product.find(filter).populate("category");

    const products = await productsQuery
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    if (!products || products.length === 0) {
      throw createError(400, "Products Not found.");
    }

    const count = await Product.find(filter).countDocuments();

    if (!count) {
      throw createError(400, "Products Not found.");
    }

    return { count, products };
  } catch (error) {
    throw error;
  }
};

const handleCategoryProductService = async (page, limit, categoryId) => {
  try {
    const productsQuery = Product.find({ category: categoryId }).populate(
      "category"
    );

    const products = await productsQuery
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    if (!products || products.length === 0) {
      throw createError(400, "Products Not found.");
    }

    const count = await Product.find({ category: categoryId }).countDocuments();

    if (!count) {
      throw createError(400, "Products Not found.");
    }

    return { count, products };
  } catch (error) {
    throw error;
  }
};

const handleCategoryAccordingService = async (page, limit, filter) => {
  try {
    const productsQuery = Product.find(filter).populate("category");

    const products = await productsQuery
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    if (!products || products.length === 0) {
      throw createError(400, "Products Not found.");
    }

    const count = await Product.find(filter).countDocuments();

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
    const product = await Product.findOne({ slug });
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
    const productData = await Product.findOne({ slug });
    if (!productData) {
      throw createError(400, "Product is not found with this Slug");
    }
    const productImageWithoutExtention = imagePublicUrlWithoutExtention(
      productData.image
    );
    const { result } = await cloudinary.uploader.destroy(
      `e-commerce-mern/products/${productImageWithoutExtention}`
    );
    if (result !== "ok") {
      throw createError(400, "Product image is not deleted. Please try again!");
    }
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
  handleDeleteSingleProductService,
  handleCategoryAccordingService,
  handleCategoryProductService
};
