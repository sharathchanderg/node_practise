// importing the required module
const pageModel = require("../../../model/pages");

// create a page
exports.createPage = function (req, res) {
  const page = new pageModel({
    title: req.body.title,
    description: req.body.description,
    keywords: req.body.keywords,
    languageId: req.body.languageId,
    contentImage: "images/" + req.files[0].filename,
    contentDescription: req.body.contentDescription,
    createdBy: req.userId,
    modifiedBy: req.userId,
  });
  page.save(function (err, result) {
    if (err) {
      res.status(400).json({ message: "Something went wrong..!" });
    }
    if (result) {
      res.status(200).json({ message: "Page created successfully" });
    }
  });
};

// get list of all pages with data
exports.showPages = async function (req, res) {
  try {
    const pagesList = await pageModel.aggregate([
      {
        $lookup: {
          from: "languages",
          localField: "languageId",
          foreignField: "_id",
          as: "pagesLanguageJoin",
        },
      },
      { $unwind: "$pagesLanguageJoin" },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "userPagesJoin",
        },
      },
      { $unwind: "$userPagesJoin" },
      {
        $project: {
          _id: 1,
          title: 1,
          language: "$pagesLanguageJoin.langName",
          description: 1,
          contentImage: 1,
          contentDescription: 1,
          createdBy: "$userPagesJoin.role",
          createdAt: 1,
        },
      },
    ]);
    if (pagesList) {
      res.status(200).json({ message: "success", pagesList });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

exports.editPage = async function (req, res) {
  try {
    const pageEditResult = await pageModel.findByIdAndUpdate(
      { _id: req.body._id },
      {
        title: req.body.title,
        description: req.body.description,
        keywords: req.body.keywords,
        languageId: req.body.languageId,
        contentImage: "images/" + req.files[0].filename,
        contentDescription: req.body.contentDescription,
        modifiedBy: req.userId,
      }
    );
    if (pageEditResult) {
      res.status(200).json({ message: "Page updated successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong..!" });
  }
};

exports.deletePage = async function (req, res) {
  try {
    const pageDeleteResult = await pageModel.findByIdAndDelete({
      _id: req.body._id,
    });
    if (pageDeleteResult) {
      res.status(200).json({ message: "Page deleted successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};
