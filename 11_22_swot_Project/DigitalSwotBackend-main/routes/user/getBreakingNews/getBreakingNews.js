const express = require("express");
const router = express.Router();

// import function
const { verifyToken } = require("../../../commonMiddleWare");
const {
  getBreakingNews,
} = require("../../../controller/user/getBreakingNews/getBreakingNews");

router.get("/user/breakingnews", verifyToken, getBreakingNews);

module.exports = router;
