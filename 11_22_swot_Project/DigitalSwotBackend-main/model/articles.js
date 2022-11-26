const mongoose = require("mongoose");
const article = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "stateCategorySchema",
      required: true,
    },
    districtId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "districtCategorySchema",
      required: true,
    },
    languageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "language",
      required: true,
    },
    Status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Inactive",
    },
    breakingStatus: {
      type: Boolean,
      enum: [false, true],
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("articles", article);
