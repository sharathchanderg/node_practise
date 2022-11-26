// importing the required model
const articles = require("../../../model/articles");

// get the breaking news based upon the status
exports.getBreakingNews = async function (req, res) {
  try {
    const breakingNews = await articles.findById({ _id: req.body._id });
    // console.log(breakingNews.)
    if (breakingNews.breakingStatus == true) {
      res.status(200).json({ message: "Success", breakingNews });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};
