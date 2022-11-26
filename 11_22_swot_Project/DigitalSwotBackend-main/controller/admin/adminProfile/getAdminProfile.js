// importing the required model
const userModel = require("../../../model/userAuth");

// defining the function
exports.getUserProfile = async function (req, res) {
  const userProfile = await userModel.findById({ _id: req.body._id }, {});
  if (userProfile) {
    res.status(200).json({ message: "Success", profile: userProfile });
  } else {
    res.status(400).json({ message: "Bad request" });
  }
};
