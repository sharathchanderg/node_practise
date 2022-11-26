const mongoose = require("mongoose");
const widgets = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    languageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "language",
    },
    order: {
      type: Number,
      required: true,
    },
    visibility: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Inactive",
    },
    content: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("widgets", widgets);
