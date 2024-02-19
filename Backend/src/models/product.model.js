const mongoose = require("mongoose");

const { Schema } = mongoose;
const productSchema = Schema(
  {
    // name, slug, description, regular-price, percent-off, sold, shipping, quantity, image, category
    name: {
      type: String,
      unique: [true, "Product name must be use a unique name"],
      trim: true,
      required: [true, "Product name is required."],
      minlength: [3, "Product Name must be at least 3 characters long."],
      maxlength: [120, "Product Name must be use less than 120 characters"]
    },
    slug: {
      type: String,
      trim: true,
      required: [true, "Product slug is required."],
      minlength: [3, "Product slug must be at least 3 characters long."],
      maxlength: [120, "Product slug must be use less than 120 characters"]
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Product description is required."],
      minlength: [
        15,
        "Product description must be at least 15 characters long."
      ]
    },
    regularPrice: {
      type: Number,
      trim: true,
      required: [true, "Product normal price is required."],
      validate: {
        validator: (v) => {
          return v > 0;
        },
        message: (props) => {
          return `${props.value} is not a valid price. Normal Price must be grater than 0`;
        }
      }
    },
    percentOff: {
      type: Number,
      trim: true,
      required: true
    },
    sold: {
      type: Number,
      default: 0
    },
    quantity: {
      type: Number,
      trim: true,
      validate: {
        validator: (v) => {
          return v > 0;
        },
        message: (props) => {
          return `${props.value} is not a valid stock. Product stock must be grater than 0`;
        }
      }
    },
    image: {
      type: Buffer,
      contentType: String,
      required: [true, "Product image is required"]
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category id is required"]
    },
    shipping: {
      type: String,
      default: 0
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
