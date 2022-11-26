const express = require("express");
const router = express.Router();

// importing functions
const { verifyToken } = require("../../../commonMiddleWare");
const {
  getsearchArticles,
} = require("../../../controller/user/searchArticle/searchArticle");

router.get("/admin/newstopics/searcharticle", verifyToken, getsearchArticles);

module.exports = router;
