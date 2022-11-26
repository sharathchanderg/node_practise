// importing the required model
const videoModel = require("../../../model/videoArticle");

exports.getSearchVideos = async function (req, res) {
  try {
    const searchvdo = req.query.title;
    const videoResult = await videoModel.find({
      title: { $regex: searchvdo, $options: "$i" },
    }); // $i is to ignore any case sensitivity in the query params
    if (videoResult) {
      res.status(200).json({ message: "Success", videoResult });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// the find() function returns a promise, so .then().catch() functions are used to handle the promise
