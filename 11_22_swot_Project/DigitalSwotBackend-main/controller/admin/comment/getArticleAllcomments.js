const articleModel = require("../../../model/articles");
const commentModel = require("../../../model/comment");

// get All Comments related to an article
exports.getAllComments = async function (req, res) {
  try {
    const articleResult = await articleModel.findById(
      { _id: req.body._id },
      {}
    );

    const showComments = await commentModel.find(
      { articleId: req.body._id },
      { _id: 1, text: 1, commentedBy: 1, updatedAt: 1 }
    );

    res
      .status(200)
      .json({ message: "Success", data: { articleResult, showComments } });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// get All Approved Comments
exports.getAllApprovedComments = async function (req, res) {
  try {
    let commentResult = [];
    const articleResult = await articleModel.findById(
      { _id: req.body._id },
      {}
    );

    const showComments = await commentModel.find(
      { articleId: req.body._id },
      {}
    );
    showComments.map((item) => {
      if (item.approval == "Active") {
        commentResult.push(item);
      }
    });
    res.status(200).json({ message: "Success", articleResult, commentResult });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};
