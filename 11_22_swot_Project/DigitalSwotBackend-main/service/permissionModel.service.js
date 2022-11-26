const mongoose = require("mongoose");
const userRole = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      trim: true,
    },
    permissions: {
      adminPanel: {
        type: Boolean,
        enum: [false, true],
        default: false,
      },
      addPost: {
        type: Boolean,
        enum: [false, true],
        default: false,
      },
      manageAllPost: {
        type: Boolean,
        enum: [false, true],
        default: false,
      },
      pages: {
        type: Boolean,
        enum: [false, true],
        default: false,
      },
      categories: {
        type: Boolean,
        enum: [false, true],
        default: false,
      },
      widgets: {
        type: Boolean,
        enum: [false, true],
        default: false,
      },
      gallery: {
        type: Boolean,
        enum: [false, true],
        default: false,
      },
      comments: {
        type: Boolean,
        enum: [false, true],
        default: false,
      },
      adSpaces: {
        type: Boolean,
        enum: [false, true],
        default: false,
      },
      settings: {
        type: Boolean,
        enum: [false, true],
        default: false,
      },
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("user_roles", userRole);
