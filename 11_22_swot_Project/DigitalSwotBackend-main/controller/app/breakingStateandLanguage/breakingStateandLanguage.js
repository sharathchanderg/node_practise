// importing the required model
const articleModel = require("../../../model/articles");
const languageModel = require("../../../model/language");
const stateModel = require("../../../model/stateCategory");

// get breaking news based upon state and language
exports.getarticleStateLanguageAndBreak = async function (req, res) {
  try {
    let statename;
    let articlelanguage;

    let searchId = {};
    if (req.body.stateId) {
      searchId.stateId = req.body.stateId;
    }
    if (req.body.languageId) {
      searchId.languageId = req.body.languageId;
    }
    if (req.body.breakingStatus) {
      searchId.breakingStatus = req.body.breakingStatus;
    }
    const articleResult = await articleModel.find(searchId, {
      _id: 1,
      stateId: 1,
      title: 1,
      image: 1,
      languageId: 1,
      description: 1,
      breakingStatus: 1,
    });

    // figure out the state name
    const stateResult = await stateModel.find(
      {},
      {
        _id: 1,
        stateName: 1,
      }
    );

    // console.log(req.body.stateId);

    stateResult.map((item) => {
      if (item._id == req.body.stateId) {
        statename = item.stateName;
      }
    });

    // figure out the language name
    const languageResult = await languageModel.find(
      {},
      { _id: 1, langName: 1 }
    );

    languageResult.map((item) => {
      if (item._id == req.body.languageId) {
        articlelanguage = item.langName;
      }
    });

    // getting the final response
    res.status(200).json({
      message: "Sucees",
      data: {
        statename: statename,
        articlelanguage: articlelanguage,
        articleResult,
      },
    });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong..!" });
  }
};
