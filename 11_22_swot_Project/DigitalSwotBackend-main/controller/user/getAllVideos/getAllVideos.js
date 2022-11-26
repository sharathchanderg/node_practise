// importing the required model
const videoArticle = require("../../../model/videoArticle");

// get all videos in a collection
exports.getAllVideos = async function (req, res) {
  try {
    const newsarticle = await videoArticle.find();
    if (newsarticle) {
      return res.status(200).json({ message: "Success", data: newsarticle });
    }
  } catch (err) {
    return res.status(400).json({ err });
  }
};
