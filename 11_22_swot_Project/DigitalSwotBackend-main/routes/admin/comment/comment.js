const express = require("express");
const router = express.Router();

// importing the required functions
const { verifyToken } = require("../../../commonMiddleWare");
const { userComment } = require("../../../controller/admin/comment/comment");
const {
  deleteComment,
  popCommentIdFromArticle,
} = require("../../../controller/admin/comment/deleteComment");
const {
  editUserComments,
} = require("../../../controller/admin/comment/editComment");
const {
  getAllComments,
  getAllApprovedComments,
} = require("../../../controller/admin/comment/getArticleAllcomments");

// defining routes
router.post("/admin/articlecomment", verifyToken, userComment);

router.put("/admin/editarticlecomment", verifyToken, editUserComments);

router.get("/admin/getallcommentsofanarticle", verifyToken, getAllComments);

router.get(
  "/admin/getallActivecommentsofanarticle",
  verifyToken,
  getAllApprovedComments
);

router.delete("/admin/deletecomment", verifyToken, deleteComment);

module.exports = router;
