const express = require("express");
const router = express.Router();

// importing functions
const { verifyToken } = require("../../../commonMiddleWare");
const {
  getLatestVideo,
} = require("../../../controller/user/getLatestVideos/getLatestVideos");

router.get("/user/getlatestvideos", verifyToken, getLatestVideo);

module.exports = router;
