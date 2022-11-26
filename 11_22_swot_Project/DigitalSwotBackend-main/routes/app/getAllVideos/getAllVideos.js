// importing the libraries
const express = require("express");
const router = express.Router();

// importing the functions
const { verifyToken } = require("../../../commonMiddleWare");
const {
  getAllVideos,
} = require("../../../controller/user/getAllVideos/getAllVideos");

// defining the routes
router.post("/app/user/getAllvideos", verifyToken, getAllVideos);

module.exports = router;
