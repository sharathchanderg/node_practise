const express = require("express");
const router = express.Router();

// importing the required functions
const { verifyToken, upload_images } = require("../../../commonMiddleWare");
const {
  newAdBanner,
  getSpace,
  updateAdSpaceBanner,
  removeAdSpace,
} = require("../../../controller/admin/adSpace/adSpace");

// defining the routes
router.post(
  "/admin/createadbanner",
  verifyToken,
  upload_images.array("acticlephoto", 1),
  newAdBanner
);

router.get("/admin/getspacename", verifyToken, getSpace);

router.post(
  "/admin/updateandgenerateurl",
  verifyToken,
  upload_images.array("acticlephoto", 1),
  updateAdSpaceBanner
);

router.post("/admin/removespace", verifyToken, removeAdSpace);

module.exports = router;
