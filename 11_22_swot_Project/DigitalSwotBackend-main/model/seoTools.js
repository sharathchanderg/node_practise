const mongoose = require("mongoose");
const seoTools = new mongoose.Schema(
  {
    settingsLanguageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "language",
    },
    siteTitle: {
      type: String,
      required: true,
    },
    homeTitle: {
      type: String,
    },
    siteDescription: {
      type: String,
    },
    keywords: {
        type: Array
    },
    googleAnalytics: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("seotools", seoTools);
