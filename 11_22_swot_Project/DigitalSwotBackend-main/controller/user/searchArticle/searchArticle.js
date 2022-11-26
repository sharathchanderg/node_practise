// importing the required model
const articleModel = require("../../../model/articles");

// search functionality for an article
exports.getsearchArticles = async function (req, res) {
  try {
    const searchArticle = req.query.title;
    const articleResult = await articleModel.find({
      title: { $regex: searchArticle, $options: "$i" },
    });
    if (articleResult) {
      res.status(200).json({ message: "Success", articleResult });
    }
  } catch (err) {
    res.status(400).json({ message: "No result found..!" });
  }
};

// the find() function returns a promise, so .then().catch() functions are used to handle the promise else use async await
