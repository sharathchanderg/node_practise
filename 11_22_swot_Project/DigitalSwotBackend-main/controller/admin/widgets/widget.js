// importing the required models
const { findByIdAndUpdate } = require("../../../model/widget");
const widgetModel = require("../../../model/widget");

// create a new widget collection/document
exports.createNewWidget = function (req, res) {
  widgetModel.findOne({ order: req.body.order }).exec(function (err, orders) {
    if (orders) {
      res.status(400).json({
        message: "order number exist, Please use a different order number",
      });
    } else {
      const widgetObj = new widgetModel({
        title: req.body.title,
        languageId: req.body.languageId,
        order: req.body.order,
        visibility: req.body.visibility,
        content: req.body.content,
        image: "images/" + req.files[0].filename,
      });

      widgetObj.save(function (err, result) {
        if (err) {
          res.status(400).json({ message: "Something went wrong..!" });
        }
        if (result) {
          res.status(200).json({ message: "Successfully added a widget" });
        }
      });
    }
  });
};

// get a widget by id
exports.getwidget = async function (req, res) {
  try {
    const widgetResult = await widgetModel.findById({ _id: req.body._id }, {});
    res.status(200).json({ message: "Success", widgetResult });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// get a widget by id
exports.getAllWidget = async function (req, res) {
  try {
    const widgetResult = await widgetModel.find();
    res.status(200).json({ message: "Success", widgetResult });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// edit a widget
exports.updateWidget = async function (req, res) {
  try {
    const widgetResult = await widgetModel.findByIdAndUpdate(
      { _id: req.body._id },
      {
        title: req.body.title,
        languageId: req.body.languageId,
        order: req.body.order,
        content: req.body.content,
        image: "images/" + req.files[0].filename,
      }
    );
    res.status(200).json({ message: "Widget updated successfully" });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong..!" });
  }
};

// delete a widget by id
exports.removewidget = async function (req, res) {
  try {
    await widgetModel.findByIdAndDelete({ _id: req.body._id });
    res.status(200).json({ message: "Widget removed successfully" });
  } catch (err) {
    res.status(400).json({ messgae: "Something went wrong..!" });
  }
};
