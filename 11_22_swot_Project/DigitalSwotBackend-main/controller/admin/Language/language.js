// importing the required model
const language = require("../../../model/language");

// create new language document/collection
exports.createNewsLanguages = function (req, res) {
  const languageName = new language({
    langName: req.body.langName,
    createdBy: req.userId,
    modifiedBy: req.userId,
  });
  languageName.save((err, lang) => {
    if (err) {
      res.status(400).json({ message: "Something went wrong..!" });
    }
    if (lang) {
      res.status(200).json({ message: "Successfully added a new language" });
    }
  });
};

// get a language by _id
exports.getLanguage = async function (req, res) {
  try {
    const languageResult = await language.findById({ _id: req.body._id });
    if (languageResult) {
      res.status(200).json({ message: "Success", languageResult });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// get all the languages in the language collection
exports.getAllLanguages = async function (req, res) {
  try {
    const languagesResult = await language.find();
    if (languagesResult) {
      res.status(200).json({ message: "Success", languagesResult });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// update a language document
exports.editLanguage = async function (req, res) {
  try {
    const editLang = await language.findByIdAndUpdate(
      { _id: req.body._id },
      { langName: req.body.langName }
    );
    if (editLang) {
      res.status(200).json({ message: "Successfully updated the language" });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong..!" });
  }
};

// delete a language document
exports.removeLanguage = async function (req, res) {
  try {
    const remLang = await language.findByIdAndRemove({ _id: req.body._id });
    if (remLang) {
      res.status(200).json({ message: "Successfully removed the language" });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};
