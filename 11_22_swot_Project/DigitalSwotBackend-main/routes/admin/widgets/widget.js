const express = require("express");
const router = express.Router();

// importing the required functions
const { verifyToken, upload_images } = require("../../../commonMiddleWare");
const {
  createNewWidget,
  getwidget,
  getAllWidget,
  updateWidget,
  removewidget,
} = require("../../../controller/admin/widgets/widget");

// defining the routes
router.post(
  "/admin/addwidget",
  verifyToken,
  upload_images.array("acticlephoto", 1),
  createNewWidget
);

router.get("/admin/showawidget", verifyToken, getwidget);

router.get("/admin/showallwidget", verifyToken, getAllWidget);

router.put(
  "/admin/editwidget",
  verifyToken,
  upload_images.array("acticlephoto", 1),
  updateWidget
);

router.delete("/admin/removewidget", verifyToken, removewidget);

module.exports = router;
