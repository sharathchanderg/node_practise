const express = require("express");
const Router = express.Router();

// imorting the functions
const { verifyToken } = require("../../../commonMiddleWare");
const {
  createStateCategories,
  getStateCategories,
  getAllStateCategories,
  editStateCategories,
  removeStateCategories,
  getAggStateArticle,
} = require("../../../controller/admin/regionCategory/stateCategory");

// defining the routes
Router.post("/admin/addnewstate", verifyToken, createStateCategories);
Router.get("/admin/getnewstate", verifyToken, getStateCategories);
Router.get("/admin/getallnewstate", verifyToken, getAllStateCategories);
Router.get("/admin/getarticlebystate", verifyToken, getAggStateArticle);
Router.put("/admin/editnewstate", verifyToken, editStateCategories);
Router.delete("/admin/removenewstate", verifyToken, removeStateCategories);

module.exports = Router;
