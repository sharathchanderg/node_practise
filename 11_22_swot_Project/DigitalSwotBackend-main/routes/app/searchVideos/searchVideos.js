// importing the required libraries
const express = require("express");
const router = express.Router();

// importing the required functions
const { verifyToken } = require("../../../commonMiddleWare");
const { getSearchVideos } = require("../../../controller/user/searchVideo/searchVideo");

// defining the routes
router.post("/app/user/searchvideos", verifyToken, getSearchVideos);

module.exports = router;
