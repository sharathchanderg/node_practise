// importing the required model
const videoModel = require("../../../model/videoArticle");

// get the latest videos
exports.getLatestVideo = async function (req, res) {
  try {
    // fetch all the documents in the collection
    const latestVideos = await videoModel.find().sort({ createdAt: -1 });

    if (latestVideos) {
      res.status(200).json({ message: "Success", latestVideos });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};
