const express = require("express");
const router = express.Router();

// importing the required functions
const { verifyToken } = require("../../../commonMiddleWare");
const {
  addSeoTool,
  showallSeoTool,
  showSeoTool,
  updateSeoTool,
  removeSeoTool,
} = require("../../../controller/admin/seoTools/seoTools");

// defining the routes
router.post("/admin/tools/seo/settings/createseotool", verifyToken, addSeoTool);

router.get(
  "/admin/tools/seo/settings/showallseotools",
  verifyToken,
  showallSeoTool
);

router.get(
  "/admin/tools/seo/settings/showseotool",
  verifyToken,
  showSeoTool
);

router.put(
  "/admin/tools/seo/settings/editseotool",
  verifyToken,
  updateSeoTool
);

router.delete(
  "/admin/tools/seo/settings/removeseooption",
  verifyToken,
  removeSeoTool
);

module.exports = router;
