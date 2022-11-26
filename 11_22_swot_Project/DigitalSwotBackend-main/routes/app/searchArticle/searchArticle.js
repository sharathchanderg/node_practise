// importing the required libraries
const express = require("express");
const router = express.Router();

// importing the required functions
const { verifyToken } = require("../../../commonMiddleWare");
const {
  getsearchArticles,
} = require("../../../controller/user/searchArticle/searchArticle");

// defining the routes
router.post("/app/user/searcharticles", verifyToken, getsearchArticles);

module.exports = router;
