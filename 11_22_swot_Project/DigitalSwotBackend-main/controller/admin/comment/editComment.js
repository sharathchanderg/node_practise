const commentModel = require("../../../model/comment");

// edit article comment by specific comment id
exports.editUserComments = async function (req, res) {
  try {
    const commentResult = await commentModel.findByIdAndUpdate(
      { _id: req.body._id },
      { text: req.body.text }
    );
    if(commentResult){
        res.status(200).json({ message: "Successfully edited the comment " })
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong..!" });
  }
};
