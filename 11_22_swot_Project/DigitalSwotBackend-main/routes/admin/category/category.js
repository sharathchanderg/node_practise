const express = require("express");
const Router = express.Router();

const { verifyToken } = require("../../../commonMiddleWare");
const {
  createCategories,
  getCategories,
  editCategories,
  removeCategories,
  getAllCategories,
} = require("../../../controller/admin/category/category_controller");

// defining the routes
Router.post("/admin/create-categories", verifyToken, createCategories);
Router.get("/admin/get-categories", verifyToken, getCategories);
Router.get("/admin/getall-categories", verifyToken, getAllCategories);
Router.put("/admin/update-categorie", verifyToken, editCategories);
Router.delete("/admin/delete-categories", verifyToken, removeCategories);

module.exports = Router;
