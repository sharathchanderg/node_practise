const mongoose = require("mongoose");
const pages = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    keywords: [String],
    languageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "language",
    },
    contentImage: {
      type: String,
    },
    contentDescription: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("pages", pages);
