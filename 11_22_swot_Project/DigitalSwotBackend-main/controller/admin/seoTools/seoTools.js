const seoModel = require("../../../model/seoTools");

// add Seo Tool
exports.addSeoTool = function (req, res) {
  const seoToolObj = new seoModel({
    settingsLanguageId: req.body.settingsLanguageId,
    siteTitle: req.body.siteTitle,
    homeTitle: req.body.homeTitle,
    siteDescription: req.body.siteDescription,
    keywords: req.body.keywords,
    googleAnalytics: req.body.googleAnalytics,
  });
  seoToolObj.save(function (err, seo) {
    if (err) {
      res.status(400).json({ message: "Something went wrong..!" });
    }
    if (seo) {
      res.status(200).json({ message: "Seo options successfully added" });
    }
  });
};

// getting all seo options
exports.showallSeoTool = async function (req, res) {
  try {
    const seoToolsResult = await seoModel.find();
    if (seoToolsResult) {
      res.status(200).json({ message: "success", seoToolsResult });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// show Seo Tool
exports.showSeoTool = async function (req, res) {
  try {
    const seoToolResult = await seoModel.find({ _id: req.body._id });
    if (seoToolResult) {
      res.status(200).json({ message: "Success", seoToolResult });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// update Seo Tool
exports.updateSeoTool = async function (req, res) {
  try {
    await seoModel.findByIdAndUpdate(
      { _id: req.body._id },
      {
        settingsLanguageId: req.body.settingsLanguageId,
        siteTitle: req.body.siteTitle,
        homeTitle: req.body.homeTitle,
        siteDescription: req.body.siteDescription,
        keywords: req.body.keywords,
        googleAnalytics: req.body.googleAnalytics,
      }
    );

    res.status(200).json({ message: "Seo options successfully upadated" });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong..!" });
  }
};

// remove Seo Tool
exports.removeSeoTool = async function (req, res) {
  try {
    await seoModel.findOneAndDelete({ _id: req.body._id });
    res.status(200).json({ message: "Seo option successfully deleted" });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};
