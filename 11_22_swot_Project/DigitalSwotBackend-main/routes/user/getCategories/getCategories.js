const express = require("express");
const router = express.Router();

//import the function from controller and common middleware
const { verifyToken } = require("../../../commonMiddleWare");
const {
  getCategory,
} = require("../../../controller/user/getCategory/getCategory");

router.get("/user/newscategory", verifyToken, getCategory);

module.exports = router;
