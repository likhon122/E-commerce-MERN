const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required!"],
      trim: true,
      tolowerCase: true,
      unique: [true, "Category Name is always use unique!"],
      minlength: [3, "Category name must be at least 3 characters long!"]
    },
    slug: {
      type: String,
      required: [true, "slug is required!"],
      trim: true,
      unique: [true, "slug name is always use unique!"],
      tolowerCase: true
    }
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = { Category };
