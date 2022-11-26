const express = require("express");
const Router = express.Router();

const { userSignup, userSignin } = require("../../controller/user/userAuth");


Router.post("/user/signup", userSignup);

Router.post("/user/signin",  userSignin);


module.exports = Router;
