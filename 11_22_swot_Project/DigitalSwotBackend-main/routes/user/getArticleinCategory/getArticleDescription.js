const express = require("express");
const router = express.Router();

//importing functions
const { verifyToken } = require("../../../commonMiddleWare");
const {
  getArticleDescription,
} = require("../../../controller/user/getArticleinCategory/getArticleDescription");

router.get("/user/getspecificarticle", verifyToken, getArticleDescription);

module.exports = router

// search article by multiple categoryIds..
// {
//   "categoryId" : {
//     "$in" : 
//       [ObjectId("62220864225e15987af9147d"),ObjectId("62220928b70ea99c2aa2b648")
//       ]
//    }
// }