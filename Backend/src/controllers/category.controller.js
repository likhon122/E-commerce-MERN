const slugify = require("slugify");

const createError = require("http-errors");
const { successResponse } = require("../helper/responseHelper");
const { Category } = require("../models/category.model");
const {
  handleCreateCategory,
  handleGetAllCategories,
  handleGetCategory,
  handleUpdateCategory,
  handleDeleteCategory
} = require("../services/categoryService");

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const newCategory = await handleCreateCategory(name);

    successResponse(res, {
      statusCode: 201,
      message: "Category is successfully created.",
      payload: { newCategory }
    });
  } catch (error) {
    next(error);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const allCategories = await handleGetAllCategories();
    successResponse(res, {
      statusCode: 200,
      message: "All categories fetched successfully!",
      payload: { allCategories }
    });
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      throw createError(400, "Slug is not received!");
    }
    const allCategories = await handleGetCategory(slug);
    successResponse(res, {
      statusCode: 200,
      message: "Single category fetched successfully!",
      payload: { allCategories }
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { name } = req.body;
    if (!slug) {
      throw createError(400, "Slug is not received!");
    } else if (!name) {
      throw createError(400, "Update Category name is required!");
    }

    const updatedCategory = await handleUpdateCategory(name, slug);
    successResponse(res, {
      statusCode: 200,
      message: "Category was updated successfully!",
      payload: { updatedCategory }
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      throw createError(400, "Slug is not received!");
    }

    const deletedCategory = await handleDeleteCategory(slug);
    successResponse(res, {
      statusCode: 200,
      message: "Category was deleted successfully!",
      payload: { deletedCategory }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory
};
