const express = require("express");
const router = express.Router();

// importing the required functions
const { verifyToken, upload_images } = require("../../../commonMiddleWare");
const {
  createPage,
  showPages,
  editPage,
  deletePage,
} = require("../../../controller/admin/pages/pages");

// defining the routes
router.post(
  "/admin/pages/add-page",
  verifyToken,
  upload_images.array("acticlephoto", 1),
  createPage
);

router.get("/admin/pages/show-pageslist", verifyToken, showPages);

router.put(
  "/admin/pages/edit-page",
  verifyToken,
  upload_images.array("acticlephoto", 1),
  editPage
);

router.delete("/admin/pages/delete-page", verifyToken, deletePage);

module.exports = router;
