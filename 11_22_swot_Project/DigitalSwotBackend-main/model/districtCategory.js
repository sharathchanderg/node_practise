const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");
const districtCategorySchema = new mongoose.Schema(
  {
    districtName: {
      type: String,
      required: true,
      trim: true,
    },
    Status: {
      type: Boolean,
      enum: [false, true],
      default: false,
    },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "stateCategorySchema",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "districtCategorySchema",
  districtCategorySchema
);
