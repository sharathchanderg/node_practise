// importing the required libraries
const express = require("express");
const router = express.Router();

// importing the required functions
const { verifyToken } = require("../../../commonMiddleWare");
const {
  createDistCategories,
  getDistCategories,
  getAllDistCategories,
  editDistCategories,
  removeDistCategories,
  getAllAggreDistCategories,
  getDistrictArticles,
} = require("../../../controller/admin/regionCategory/districtCategory");

// defining the routes
router.post("/admin/addnewdist", verifyToken, createDistCategories);
router.get("/admin/getnewdist", verifyToken, getDistCategories);
router.get("/admin/getallnewdist", verifyToken, getAllDistCategories);
router.get("/admin/getallaggrenewdist", verifyToken, getAllAggreDistCategories);
router.get("/admin/getdistrictarticle", verifyToken, getDistrictArticles);
router.put("/admin/editnewdist", verifyToken, editDistCategories);
router.delete("/admin/removenewdist", verifyToken, removeDistCategories);

module.exports = router;
