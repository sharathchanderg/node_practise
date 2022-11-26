const express = require("express");
const router = express.Router();

// importing functions
const { verifyToken } = require("../../../commonMiddleWare");
const {
  getLatestImage,
} = require("../../../controller/user/getLatestImages/getLatestImages");

router.get("/user/getlatestimages", verifyToken, getLatestImage);

module.exports = router;
