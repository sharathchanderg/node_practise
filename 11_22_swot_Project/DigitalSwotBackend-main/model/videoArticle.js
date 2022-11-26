const mongoose = require("mongoose");
const videoArticle = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    language: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "language",
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
    description: {
      type: String,
      required: true,
    },
    video: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
    Status: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("videoArticle", videoArticle);
