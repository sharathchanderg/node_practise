const express = require("express");
const router = express.Router();

// importing functions
const { verifyToken } = require("../../../commonMiddleWare");
const {
  getCategoryByLang,
} = require("../../../controller/user/getCategory/getCategoryByLang");

router.get("/user/getcategorybylanguage", verifyToken, getCategoryByLang);

module.exports = router;
