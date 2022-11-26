const express = require("express");
const Router = express.Router();
const {
  verifyToken,
  upload_images,
} = require("../../../commonMiddleWare");
const {
  createArticle,
  getArticle,
  getAllArticles,
  getAllRecentArticles,
  getAggreArticle,
  editArticle,
  removeArticle,
  updateLikesCount,
  changeToBreakingNews,
  publishTheArticle,
} = require("../../../controller/admin/Articles/article");

// defining routes
Router.post(
  "/admin/createnewarticle",
  verifyToken,
  upload_images.array("acticlephoto", 1),
  createArticle
);

Router.get("/admin/readarticle", verifyToken, getArticle);
Router.get("/admin/readallarticles", verifyToken, getAllArticles);
Router.get("/admin/readrecentarticles", verifyToken, getAllRecentArticles);
Router.get("/admin/readaggrearticles", verifyToken, getAggreArticle);
Router.post(
  "/admin/editarticle",
  verifyToken,
  upload_images.array("acticlephoto", 1),
  editArticle
);
Router.post("/admin/countnooflikes", updateLikesCount);
Router.post("/admin/changebreakingstatus", verifyToken, changeToBreakingNews);
Router.post("/admin/publishunpublish", verifyToken, publishTheArticle);
Router.delete("/admin/remove-article", verifyToken, removeArticle);

module.exports = Router;
