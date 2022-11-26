// importing required libraries
const express = require("express");
const router = express.Router();

// importing required functions
const { verifyToken } = require("../../../commonMiddleWare");
const {
  getUserProfile,
} = require("../../../controller/admin/adminProfile/getAdminProfile");

// defining the routes
router.get("/admin/settings/show-profile", verifyToken, getUserProfile);

module.exports = router;
