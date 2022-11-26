// importing the required libraries
const jwt = require("jsonwebtoken");

// User importing required models
const User = require("../../model/userAuth");

// User registration/signup function
exports.userSignup = function (req, res) {
  User.findOne({ email: req.body.email }).exec(function (err, user) {
    if (user) {
      return res.status(400).json({ message: "user already exist" });
    }
    const { firstName, lastName, email, password, username, contactNumber } =
      req.body;
    const addUser = new User({
      firstName,
      lastName,
      email,
      password,
      username,
      contactNumber,
      role: "user",
    });
    addUser.save(function (err, data) {
      if (err) {
        console.log(err);
        if (err.keyPattern["username"]) {
          console.log(err.keyPattern["username"]);
          return res
            .status(400)
            .json({ message: "Username already exists. Try with different" });
        }
        if (err.keyPattern["contactNumber"]) {
          console.log(err.keyPattern["contactNumber"]);
          return res.status(400).json({
            message: "contactNumber already exists. Try with different",
          });
        }
        return res
          .status(400)
          .json({ message: "something went wrong", error: err });
      }
      if (data) {
        return res.status(201).json({ message: "User created successfully..!" });
      }
    });
  });
};

// user login/signin function
exports.userSignin = function (req, res) {
  let searchInputs = {};
  if (req.body.email) {
    searchInputs.email = req.body.email;
  }
  if (req.body.contactNumber) {
    searchInputs.contactNumber = req.body.contactNumber;
  }
  User.findOne(searchInputs).exec(function (err, user) {
    if (err) {
      return res.status(400).json({ error: err });
    }
    if (user) {
      if (user.authenticate(req.body.password) && user.role != "admin") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET_PASSWORD,
          { expiresIn: "20m" }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          message: "Successfully loggedin",
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        res.status(400).json({ message: "Invalid Password" });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong..!" });
    }
  });
};
