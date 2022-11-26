// importing the required model
const User = require("../../../model/userAuth");

// update the profile picture of admin profile
exports.updateProfile = async function (req, res) {
  let result = await User.findByIdAndUpdate(
    { _id: req.body._id },
    {
      profilePicture: "images/" + req.files[0].filename,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      address: req.body.address,
      contactNumber: req.body.contactNumber,
      username: req.body.username,
      email: req.body.email,
      aboutMe: req.body.aboutMe,
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      youtube: req.body.youtube,
      linkedin: req.body.linkedin,
    }
  );
  if (result) {
    res.status(200).json({ message: `profile updated successfully!` });
  } else {
    res.status(400).json({ message: `Unable to update profile!` });
  }
};

// delete the admin profile picture
exports.removeProfilePic = async function (req, res) {
  const remPflPic = await User.findByIdAndUpdate(
    { _id: req.body._id },
    { profilePicture: "images/" + req.files[0].filename }
  );

  if (remPflPic) {
    res
      .status(200)
      .json({ message: "Successfully removed the profile picture" });
  } else {
    res.status(400).json({ message: "Something went wrong..!" });
  }
};

exports.deleteProfile = async function (req, res) {
  const deletePrfileResult = await User.findByIdAndDelete({
    _id: req.body._id,
  });
  if (deletePrfileResult) {
    res.status(200).json({ message: "Successfully removed the profile" });
  } else {
    res.status(400).json({ message: "Bad request" });
  }
};
