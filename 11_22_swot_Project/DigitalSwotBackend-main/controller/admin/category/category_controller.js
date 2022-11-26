// importing the required libraries
const slugify = require("slugify");

// importing the required model
const Category = require("../../../model/category");
const languageModel = require("../../../model/language");

// create new category collection or insert a new category
exports.createCategories = function (req, res) {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
    languageId: req.body.languageId,
  };
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  const categ = new Category(categoryObj);
  categ.save((err, category) => {
    if (err) {
      res.status(400).json({ message: "Something went wrong..!" });
    }
    if (category) {
      res.status(200).json({ Status: "Successfully created a category" });
    }
  });
};

// get a category based upon _id
exports.getCategories = async function (req, res) {
  try {
    let defaultLanguage;

    const showLanguage = await languageModel.find({}, { _id: 1, langName: 1 });

    let defaultLanguageId = showLanguage[1]._id.toString();

    searchId = {};

    if (req.body._id) {
      searchId._id = req.body._id;
    }

    if (req.body.languageId) {
      searchId.languageId = req.body.languageId;
    } else {
      searchId.languageId = defaultLanguageId; // English
    }

    const getCategoryResult = await Category.find(searchId, {});

    showLanguage.map((item) => {
      if (item._id == searchId.languageId) {
        defaultLanguage = item.langName;
      }
    });

    res.status(200).json({
      message: "Success",
      data: { language: defaultLanguage, getCategoryResult },
    });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// get all the categories in categories collection
exports.getAllCategories = async function (req, res) {
  try {
    const categoryResult = await Category.find();
    if (categoryResult) {
      res.status(200).json({ message: "Success", categoryResult });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// update the category name
exports.editCategories = async function (req, res) {
  try {
    const categoryResult = await Category.findByIdAndUpdate(
      { _id: req.body._id },
      { name: req.body.name, slug: req.body.name }
    );
    if (categoryResult) {
      res.status(200).json({ message: "Successfully updated the category" });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// remove/delete a category document
exports.removeCategories = async function (req, res) {
  try {
    const categori = await Category.findByIdAndRemove({ _id: req.body._id });
    if (categori) {
      res.status(200).json({ Status: "Successfully removed the category" });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};
