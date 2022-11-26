// importing the required libraries..
const User = require("../model/userAuth");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Admin/User common signin function
exports.requireSignin = function (req, res, next) {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET_PASSWORD);
      req.user = user;
    }
  } catch (err) {
    res.status(400).json({ message: "Invalid Authoriztion" });
  }
  next();
};

// Admin/User common verify token
exports.verifyToken = function (req, res, next) {
  let expired = null;
  const bearerHeader = req.headers["authorization"];

  if (bearerHeader) {
    bearerToken = bearerHeader.split(" ")[1];
  }
  if (bearerToken) {
    jwt.verify(
      bearerToken,
      process.env.JWT_SECRET_PASSWORD,
      function (err, decoded) {
        
        if (decoded) {
          req.userId = decoded._id;
          next();
        }
      }
    );
  }
 
};

// middleware for uploading the images and videos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// function for uploading the images
const maxImgSize = 1 * 1024 * 1024;
exports.upload_images = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/\.(png|PNG|jpg|jpeg|mp4)$/)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("This file extension is not allowed"));
    }
  },
  limits: { fileSize: maxImgSize },
});

// function for uploading the videos
const maxvdoSize = 10 * 1024 * 1024;
exports.upload_videos = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/\.(mp4)$/)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("This file extension is not allowed"));
    }
  },
  limits: { fileSize: maxvdoSize },
});
