// importing required libraries
const express = require("express");
const router = express.Router();

// importing required functions
const { verifyToken } = require("../../../commonMiddleWare");
const {
  getBreakingNews,
} = require("../../../controller/app/getBreakingNews/getBreakingNews");

// defining the routes
router.get("/app/user/getbreakingnews", verifyToken, getBreakingNews);


module.exports = router
