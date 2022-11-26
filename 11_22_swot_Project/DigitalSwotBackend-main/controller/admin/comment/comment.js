// importing required model
const commentModel = require("../../../model/comment");

// defining the function
exports.userComment = async function (req, res) {
  try {
    const commentObj = new commentModel({
      text: req.body.text,
      commentedBy: req.userId,
      articleId: req.body.articleId,
      approval: req.body.approval,
    });

    await commentObj.save(function (err, comment) {
      if (comment) {
        res.status(200).json({ message: "Successfully created a comment" });
      }
    });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong..!" });
  }
};
