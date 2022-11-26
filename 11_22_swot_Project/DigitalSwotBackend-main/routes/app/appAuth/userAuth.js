const express = require("express");
const Router = express.Router();

const {userSignup, userSignin} = require('../../../controller/user/userAuth')


Router.post("/app/user/signup", userSignup);

Router.post("/app/user/signin",  userSignin);


module.exports = Router;
