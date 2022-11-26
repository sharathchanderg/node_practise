const express = require("express");
const { verifyToken } = require("../../commonMiddleWare");
const {
  userSignup,
  userSignin,
  userPasswordChange,
  resetPasswordRequestController,
  resetPasswordController,
} = require("../../controller/admin/userAuth");
const Router = express.Router();

Router.post("/admin/signup", userSignup);

Router.post("/admin/signin", userSignin);

Router.post(
  "/admin/profile/settings/changepassword",
  verifyToken,
  userPasswordChange
);

Router.post(
  "/admin/profile/settings/resetpassrequest",
  verifyToken,
  resetPasswordRequestController
);

Router.post(
  "/admin/profile/settings/resetpass",
  verifyToken,
  resetPasswordController
);

module.exports = Router;
