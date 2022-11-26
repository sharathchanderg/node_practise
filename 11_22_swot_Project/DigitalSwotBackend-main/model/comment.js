const mongoose = require("mongoose");

const comments = new mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
      required: true,
    },
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    articleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "articles",
      required: true,
    },
    approval: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Inactive",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", comments);
