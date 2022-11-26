// importing the required libraries
const express = require("express");
const router = express.Router();

// importing the required functions
const { verifyToken } = require("../../../commonMiddleWare");
const { getSearchImages } = require("../../../controller/user/searchImages/searchImages");

// defining the routes
router.post("/app/user/searchimages", verifyToken, getSearchImages);

module.exports = router;
