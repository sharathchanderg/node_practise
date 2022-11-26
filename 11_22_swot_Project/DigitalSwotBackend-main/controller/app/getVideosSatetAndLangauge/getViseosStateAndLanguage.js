//
const videoModel = require("../../../model/videoArticle");
const stateModel = require("../../../model/stateCategory");
const languageModel = require("../../../model/language");

// getLatestVieosStateAndLanguage
exports.getLatestVieosStateAndLanguage = async function (req, res) {
  try {
    let stateResult;
    let languageResult;
    let videoResult = [];

    searchId = {};
    if (req.body.stateId) {
      searchId.stateId = req.body.stateId;
    }
    if (req.body.language) {
      searchId.language = req.body.language;
    }
    const showVideos = await videoModel.find(searchId, {});
    showVideos.map((item) => {
      let todayDate = new Date(Date.now()).toDateString();
      let latestVideoDate = item.updatedAt.toDateString();
      if (todayDate == latestVideoDate) {
        videoResult.push(item);
      }
    });

    const showState = await stateModel.find({}, { _id: 1, stateName: 1 });

    showState.map((item) => {
      if (item._id == req.body.stateId) {
        stateResult = item.stateName;
      }
    });

    const showLanguage = await languageModel.find({}, { _id: 1, langName: 1 });

    showLanguage.map((item) => {
      if (item._id == req.body.language) {
        languageResult = item.langName;
      }
    });

    res.status(200).json({
      message: "Success",
      data: { stateName: stateResult, langauge: languageResult, videoResult },
    });
    //  data:{statename : satetName, langaugeName: languageName, videoResult}
  } catch (err) {
    res.status(400).json({ message: "Bad request", Error: err });
  }
};
