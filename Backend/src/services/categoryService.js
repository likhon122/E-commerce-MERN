const createError = require("http-errors");
const slugify = require("slugify");
const { Category } = require("../models/category.model");

const handleCreateCategory = async (name) => {
  try {
    if (!name) {
      throw createError(400, "Name is required!");
    }
    const slug = slugify(name);

    const newCategory = await Category.create({ name, slug });

    if (!newCategory) {
      throw createError(400, "Category is not created!");
    }
    return newCategory;
  } catch (error) {
    throw error;
  }
};

const handleGetAllCategories = async () => {
  try {
    const allCategories = await Category.find({}).select("name slug").lean();
    if (!allCategories) {
      throw createError(400, "Category fetch failed!");
    }
    return allCategories;
  } catch (error) {
    throw error;
  }
};

const handleGetCategory = async (slug) => {
  try {
    const selectedCategory = await Category.findOne({ slug });
    if (!selectedCategory) {
      throw createError(
        400,
        "Category fetch failed! Category not found for this slug!"
      );
    }
    return selectedCategory;
  } catch (error) {
    throw error;
  }
};

const handleUpdateCategory = async (name, slug) => {
  try {
    const categoryIsAlreadyExist = await Category.findOne({ slug });
    if (!categoryIsAlreadyExist) {
      throw createError(
        404,
        "Category is dose not exist with this slag. Please Enter params value a right slug name!"
      );
    }
    const updatedSlug = slugify(name);

    if (categoryIsAlreadyExist.slug === updatedSlug) {
      throw createError(
        403,
        "Category name is already exist. Please select another unique name!"
      );
    }

    const filter = { slug };
    const updates = { $set: { name, slug: updatedSlug } };
    const options = { new: true };

    let updatedCategory;
    try {
      updatedCategory = await Category.findOneAndUpdate(
        filter,
        updates,
        options
      );
    } catch (error) {
      throw createError(
        "User updated failed. Please ensure that you send a unique name."
      );
    }
    if (!updatedCategory) {
      throw createError(400, "Category update failed!");
    }
    return updatedCategory;
  } catch (error) {
    throw error;
  }
};

const handleDeleteCategory = async (slug) => {
  try {
    const deletedCategory = await Category.findOneAndDelete({ slug });
    if (!deletedCategory) {
      throw createError(
        404,
        "Category is dose not exist with this slag. Please Enter params value a right slug name!"
      );
    }

    return deletedCategory;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  handleCreateCategory,
  handleGetAllCategories,
  handleGetCategory,
  handleUpdateCategory,
  handleDeleteCategory
};
