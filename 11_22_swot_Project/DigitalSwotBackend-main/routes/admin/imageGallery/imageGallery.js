const express = require("express");
const Router = express.Router();

// importing the functions
const { verifyToken, upload_images } = require("../../../commonMiddleWare");
const {
  createNewImage,
  getImage,
  getAllImages,
  updateImage,
  deleteImage,
} = require("../../../controller/admin/imageGallery/imagesGallery");

// defining the routes
Router.post(
  "/admin/createnewimagesgellery",
  verifyToken,
  upload_images.array("acticlephoto", 1),
  createNewImage
);
Router.get("/admin/getphoto", verifyToken, getImage);
Router.get("/admin/getallphotos", verifyToken, getAllImages);
Router.put(
  "/admin/updatephoto",
  verifyToken,
  upload_images.array("acticlephoto", 1),
  updateImage
);
Router.delete("/admin/deletephoto", verifyToken, deleteImage);

module.exports = Router;
