const express = require("express");
const router = express.Router();

// import functions
const { verifyToken } = require("../../../commonMiddleWare");
const {
  getArticleListInCategory,
} = require("../../../controller/user/getArticleinCategory/getArticleInCategory");

router.post(
  "/user/getarticlebaseduponcategory",
  verifyToken,
  getArticleListInCategory
);

module.exports = router;
