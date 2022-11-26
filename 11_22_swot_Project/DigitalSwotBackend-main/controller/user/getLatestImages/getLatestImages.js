// importing the required module
const articleModel = require("../../../model/imageGallery");

// get the latest images
exports.getLatestImage = async function (req, res) {
  try {
    // fetch all the latest documents in the collection
    const latestPhotos = await articleModel.find().sort({ createdAt: -1 });
    if (latestPhotos) {
      res.status(200).json({ message: "success", latestPhotos });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};
