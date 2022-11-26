//required libraries
const express = require("express");
const multer = require("multer");

// required middlewars
const {
  updateProfile,
  removeProfilePic,
  deleteProfile,
} = require("../../../controller/admin/adminProfile/updateProfile");
const { verifyToken } = require("../../../commonMiddleWare");

// defining the route app for profilePic express
const profilePicRoute = express.Router();

// storage for uploading files
const storage = multer.diskStorage({
  // defining the path of destination folder
  destination: function (req, file, cb) {
    cb(null, "./images");
  },

  // defining the filename
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const maxSize = 1 * 1024 * 1024;
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("This file extension is not allowed"));
    }
  },
  limits: { fileSize: maxSize },
});

// defining the routes
profilePicRoute.post(
  "/admin/profile/home/settings/update-profile",
  verifyToken,
  upload.array("photos", 1),
  updateProfile
);

profilePicRoute.post(
  "/admin/profile/home/settings/delete-profilepic",
  verifyToken,
  upload.array("photos", 1),
  removeProfilePic
);

profilePicRoute.post(
  "/admin/profile/home/settings/remove-completeprofile",
  verifyToken,
  deleteProfile
);

module.exports = profilePicRoute;
