// importing the required libraries
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// importing the required model
const User = require("../../model/userAuth");

// importing required functions
const sendEmail = require("../../email/sendEmail");

exports.requestPasswordReset = async function (email) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User does not exist");
  }
  if (user) {
    const link = `${clientURL}/passwordReset?&id=${user._id}`;
    sendEmail(
      user.email,
      "Password Reset Request",
      { name: user.name, link: link },
      "./template/requestResetPassword.handlebars"
    );
    return link;
  }
};

exports.resetPassword = async function (userId, password) {
  const hash = await bcrypt.hash(password, 10);
  await User.updateOne(
    { _id: userId },
    { $set: { hash_password: hash } },
    { new: true }
  );
  const user = await User.findById({ _id: userId });
  sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.name,
    },
    "./template/resetPassword.handlebars"
  );
  return true;
};
