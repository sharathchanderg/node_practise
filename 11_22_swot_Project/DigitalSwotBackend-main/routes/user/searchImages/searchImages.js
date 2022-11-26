const express = require("express");
const router = express.Router();

// importing functions
const { verifyToken } = require("../../../commonMiddleWare");
const {
  getSearchImages,
} = require("../../../controller/user/searchImages/searchImages");

router.get("/user/searchimages", verifyToken, getSearchImages);

module.exports = router;
