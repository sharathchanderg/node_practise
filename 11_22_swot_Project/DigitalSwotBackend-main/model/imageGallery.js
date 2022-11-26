const mongoose = require("mongoose");
const imageGal = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
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

imageGal.index({ title: "text" });

module.exports = mongoose.model("image_gallery", imageGal);
