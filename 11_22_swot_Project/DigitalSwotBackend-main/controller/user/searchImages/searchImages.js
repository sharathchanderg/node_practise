// importing the required model
const imageModel = require("../../../model/imageGallery");

// search the latest images
exports.getSearchImages = async function (req, res) {
  try {
    const searchImg = req.query.title;
    const imagesResult = await imageModel.find({
      title: { $regex: searchImg, $options: "$i" },
    }); // $i is to ignore any case sensitivity
    if (imagesResult) {
      res.status(200).json({ message: "Success", imagesResult });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// the find() function returns a promise, so .then().catch() functions are used to handle the promise
