const mongoose = require("mongoose");
const adSpaces = new mongoose.Schema(
  {
    space: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    image: {
      type: String,
    },
    Status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Inactive",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("adspaces", adSpaces);
