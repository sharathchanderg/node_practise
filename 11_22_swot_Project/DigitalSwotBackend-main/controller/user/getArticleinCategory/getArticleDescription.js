// importing the required model
const articleDesc = require("../../../model/articles");

// get an article document by _id
exports.getArticleDescription = async function (req, res) {
  try {
    const articleResult = await articleDesc.findById({ _id: req.body._id });
    if (articleResult) {
      res.status(200).json({ message: "Success", articleResult });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};
