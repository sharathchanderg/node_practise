// importing the required libraries
const express = require("express");
const router = express.Router();

// importing the required functions
const { verifyToken } = require("../../../commonMiddleWare");
const {
  getCategoryWiseArticle,
} = require("../../../controller/app/getCategoryLatestNews/getCategoryLatestNews");

// defining the routes
router.post(
  "/app/user/getcategorywiselatestnews",
  verifyToken,
  getCategoryWiseArticle
);

module.exports = router;
