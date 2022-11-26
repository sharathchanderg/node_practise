const express = require("express");
const router = express.Router();

// importing the functions
const { verifyToken, upload_videos } = require("../../../commonMiddleWare");
const {
  createVidoeArticle,
  getVideoArticle,
  getAllVideoArticles,
  getAggreVideoArticle,
  editVideoArticle,
  removeVideoArticle,
} = require("../../../controller/admin/videoArticles/videoArticle");

//defining the routes
router.post(
  "/admin/createvideoarticle",
  verifyToken,
  upload_videos.array("acticlevideo", 1),
  createVidoeArticle
);

router.get("/admin/readvideoarticle", verifyToken, getVideoArticle);
router.get("/admin/readallvideoarticle", verifyToken, getAllVideoArticles);
router.get("/admin/readvideoarticlesstatedist", verifyToken, getAggreVideoArticle);
router.put(
  "/admin/editvideoarticle",
  verifyToken,
  upload_videos.array("acticlevideo", 1),
  editVideoArticle
);
router.delete("/admin/removevideoarticles", verifyToken, removeVideoArticle);

module.exports = router;
