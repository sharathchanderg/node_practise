const express = require("express");
const router = express.Router();

// importing functions
const { verifyToken } = require("../../../commonMiddleWare");
const {
  getSearchVideos,
} = require("../../../controller/user/searchVideo/searchVideo");

router.get("/user/searchvideos", verifyToken , getSearchVideos);

module.exports = router;
