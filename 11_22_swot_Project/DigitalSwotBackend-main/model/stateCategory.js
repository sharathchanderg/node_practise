const mongoose = require("mongoose");
const stateCategorySchema = new mongoose.Schema(
  {
    stateName: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Status: {
      type: Boolean,
      enum: [false, true],
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("stateCategorySchema", stateCategorySchema);
