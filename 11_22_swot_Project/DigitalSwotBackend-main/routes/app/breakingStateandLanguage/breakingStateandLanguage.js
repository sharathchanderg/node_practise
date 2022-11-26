// importing the required libraries
const express = require("express");
const router = express.Router();

// importing the functions
const { verifyToken } = require("../../../commonMiddleWare");
const {
  getarticleStateLanguageAndBreak,
} = require("../../../controller/app/breakingStateandLanguage/breakingStateandLanguage");


// get the article by state language and breaking status
router.post(
  "/app/user/breakingstateandlanguage",
  verifyToken,
  getarticleStateLanguageAndBreak
);

module.exports = router;
