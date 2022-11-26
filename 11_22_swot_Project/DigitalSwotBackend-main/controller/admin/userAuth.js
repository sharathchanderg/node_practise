// importing the required libraries
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// importing the required model
const User = require("../../model/userAuth");

// admin registeration/signup function
exports.userSignup = function (req, res) {
  User.findOne({ email: req.body.email }).exec(function (err, user) {
    if (user) {
      return res.status(400).json({ message: "Admin already exist" });
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
      role: "admin",
    });
    addUser.save(function (err, data) {
      if (err) {
        console.log(err);
        if (err.keyPattern["username"]) {
          console.log(err.keyPattern["username"]);
          return res.status(400).json({
            message: "AdminName already exists. Try with different name",
          });
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
        return res.status(201).json({ message: "Admin created successfully!" });
      }
    });
  });
};

// admin login/signin function
exports.userSignin = function (req, res) {
  User.findOne({ email: req.body.email }).exec(function (err, user) {
    if (err) {
      return res.status(400).json({ error: err });
    }

    if (user) {
      if (user.authenticate(req.body.password) && user.role === "admin") {
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
        // console.log(token);
      } else {
        res.status(400).json({ message: "Invalid Password" });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong..!" });
    }
  });
};

// admin change password function
exports.userPasswordChange = async function (req, res) {
  const { newPlainPassword, password } = req.body;
  if (newPlainPassword == password) {
    const bcruptedPassword = bcrypt.hashSync(newPlainPassword, 10);
    console.log(bcruptedPassword);
    try {
      await User.updateOne(
        { _id: req.body._id },
        { $set: { hash_password: bcruptedPassword } },
        { new: true }
      );
      res.status(200).json({ message: "Password changed" });
    } catch {
      res.status(400).json({ message: "Invalid Request" });
    }
  } else {
    res.status(400).json({ message: "Password not match" });
  }
};

exports.resetPasswordRequestController = async function (req, res, next) {
  const requestPasswordResetService = await requestPasswordReset(
    req.body.email
  );
  return res.json(requestPasswordResetService);
};

exports.resetPasswordController = async function (req, res, next) {
  const resetPasswordService = await resetPassword(
    req.body.userId,
    req.body.password
  );
  return res.json(resetPasswordService);
};
