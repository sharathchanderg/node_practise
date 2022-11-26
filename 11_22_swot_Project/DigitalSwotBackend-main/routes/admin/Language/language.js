const express = require("express");
const router = express.Router();

//importing functions
const { verifyToken } = require("../../../commonMiddleWare");
const {
  createNewsLanguages,
  getLanguage,
  getAllLanguages,
  editLanguage,
  removeLanguage,
} = require("../../../controller/admin/Language/language");

// defining routes
router.post("/admin/addnewslang", verifyToken, createNewsLanguages);
router.get("/admin/getnewslangid", verifyToken, getLanguage);
router.get("/admin/getallnewslang", verifyToken, getAllLanguages);
router.put("/admin/editnewslang", verifyToken, editLanguage);
router.delete("/admin/removenewslang", verifyToken, removeLanguage);

module.exports = router;
