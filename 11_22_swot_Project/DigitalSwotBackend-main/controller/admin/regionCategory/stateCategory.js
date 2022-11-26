// importing the required model
const stateCategory = require("../../../model/stateCategory");
const articleModel = require("../../../model/articles");

// create a new state document/collection
exports.createStateCategories = function (req, res) {
  stateCategory
    .findOne({ stateName: req.body.stateName })
    .exec(function (err, state) {
      if (state) {
        res.status(400).json({ message: "State already exist" });
      } else {
        const stateCateg = new stateCategory({
          stateName: req.body.stateName,
          createdBy: req.userId,
          modifiedBy: req.userId,
        });
        stateCateg.save((err, cat) => {
          if (err) {
            res.status(400).json({ message: "Something went wrong..!" });
          }
          if (cat) {
            res.status(200).json({ message: "State created successfully" });
          }
        });
      }
    });
};

// get state document by _id
exports.getStateCategories = async function (req, res) {
  try {
    const stateResult = await stateCategory.findById({ _id: req.body._id });
    if (stateResult) {
      res.status(200).json({ message: "Success", stateResult });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// get all state documents in state collection
exports.getAllStateCategories = async function (req, res) {
  try {
    const stateResult = await stateCategory.find();
    if (stateResult) {
      res.status(200).json({ message: "Success", stateResult });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

//get all articles based on states
exports.getAggStateArticle = async function (req, res) {
  try {
    let state;
    const searchId = {};
    if (req.body.stateId) {
      searchId.stateId = req.body.stateId;
    }
    const stateArticleResult = await articleModel.find(searchId, {
      _id: 1,
      title: 1,
      stateId: 1,
      description: 1,
      image: 1,
    });
    const showState = await stateCategory.find({}, { _id: 1, stateName: 1 });
    showState.map((item) => {
      if (item._id == req.body.stateId) {
        state = item.stateName;
      }
    });
    if (stateArticleResult) {
      res.status(200).json({
        message: "Sucess",
        state: state,
        stateArticleResult,
      });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// update the state name by _id
exports.editStateCategories = async function (req, res) {
  try {
    const categori = await stateCategory.findByIdAndUpdate(
      { _id: req.body._id },
      { stateName: req.body.stateName }
    );
    if (categori) {
      res.status(200).json({ message: "State updated successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong..!" });
  }
};

// delete the state document by _id
exports.removeStateCategories = async function (req, res) {
  try {
    const categori = await stateCategory.findByIdAndDelete({
      _id: req.body._id,
    });
    if (categori) {
      return res.status(200).json({ message: "State deleted successfully" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Bad request" });
  }
};
