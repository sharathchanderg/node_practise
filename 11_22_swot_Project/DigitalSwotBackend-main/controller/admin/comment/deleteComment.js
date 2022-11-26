const commentModel = require("../../../model/comment");
const articleModel = require("../../../model/articles");

// delete a comment
exports.deleteComment = async function (req, res) {
  try {
    await commentModel.findByIdAndDelete({
      _id: req.body._id,
    });
    res.status(200).json({ message: "Successfully deleted the comment" });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};
