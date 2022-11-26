// importing the required model
const newsLanguage = require("../../../model/language");

// get the language by _id
exports.getNewsLanguage = async function (req, res) {
  const newsLang = await newsLanguage.findById({ _id: req.body._id });
  if (newsLang) {
    res.status(200).json({ data: newsLang });
  } else {
    res.status(400).json({ message: "No language selected" });
  }
};
