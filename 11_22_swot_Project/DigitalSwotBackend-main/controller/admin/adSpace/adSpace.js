// importing the required models
const adSpaceModel = require("../../../model/adSpace");

// create ad banner
exports.newAdBanner = function (req, res) {
  adSpaceModel.findOne({ space: req.body.space }).exec(function (err, spaces) {
    if (spaces) {
      return res.status(400).json({ message: "Ad banner space already exist" });
    }

    const adSpaceObj = new adSpaceModel({
      space: req.body.space,
      url: req.body.url
    });
    adSpaceObj.save(function (err, data) {
      if (err) {
        if (err.keyPattern["space"]) {
          res.status(400).json({ message: "This Space already exist" });
        }
        res.status(400).json({ message: "Something went wrong..!" });
      }
      if (data) {
        res
          .status(200)
          .json({ message: "Ad banner space created successfully" });
      }
    });
  });
};

// get the space detail by space name
exports.getSpace = async function (req, res) {
  try {
    const spaceName = await adSpaceModel.findOne({ space: req.body.space }, {});
    if (spaceName) {
      res.status(200).json({ message: "Success", spaceName });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// update the banner
exports.updateAdSpaceBanner = async function (req, res) {
  try {
    const bannerEditResult = await adSpaceModel.findOneAndUpdate(
      { space: req.body.space },
      {
        image: req.files[0].filename,
        url: req.body.url,
      }
    ); 
    res.status(200).json({ message: "Successfully updated " });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// delete an Ad space
exports.removeAdSpace = async function (req, res) {
  try {
    const removeAdBanner = await adSpaceModel.findOneAndDelete({
      space: req.body.space,
    });
    res.status(200).json({ message: "Successfully deleted the Ad space" });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};
