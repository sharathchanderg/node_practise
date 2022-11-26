// importing the required model
const Category = require("../../../model/category");

// get a category by _id
exports.getCategory = async function (req, res) {
  const showCategory = await Category.findById({ _id: req.body._id });
  if (showCategory) {
    res.status(200).json({ data: showCategory });
  } else {
    res.status(400).json({ message: "No Category selected" });
  }
};