// importing the required model
const videoArticle = require("../../../model/videoArticle");
const districtModel = require("../../../model/districtCategory");
const stateModel = require("../../../model/stateCategory");

// create the video article
exports.createVidoeArticle = function (req, res) {
  const newVideo = new videoArticle({
    title: req.body.title,
    category: req.body.category,
    language: req.body.language,
    stateId: req.body.stateId,
    districtId: req.body.districtId,
    description: req.body.description,
    createdBy: req.userId,
    modifiedBy: req.userId,
    video: "images/" + req.files[0].filename,
    Status: req.body.Status,
  });
  newVideo.save(function (err, article) {
    if (err) {
      res.status(400).json({ Error: "Something went wrong..!" });
    }
    if (article) {
      res
        .status(200)
        .json({ message: "New video article created successfully" });
    }
  });
};

// get a video by it's _id
exports.getVideoArticle = async function (req, res) {
  try {
    const videoResult = await videoArticle.findById({ _id: req.body._id });
    if (videoResult) {
      res.status(200).json({ message: "Success", videoResult });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// get all videos in a collection
exports.getAllVideoArticles = async function (req, res) {
  try {
    const videoResult = await videoArticle.find();
    if (videoResult) {
      res.status(200).json({ message: "Success", videoResult });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// get video based upon district in a state
exports.getAggreVideoArticle = async function (req, res) {
  try {
    const searchId = {};
    let state;
    let district;
    if (req.body.stateId) {
      searchId.stateId = req.body.stateId;
    }
    if (req.body.districtId) {
      searchId.districtId = req.body.districtId;
    }
    const videoResult = await videoArticle.find(searchId, {});

    const showState = await stateModel.find({}, { _id: 1, stateName: 1 });

    showState.map((item) => {
      if (item._id == req.body.stateId) {
        state = item.stateName;
      }
    });

    const showDistrict = await districtModel.find(
      {},
      { _id: 1, districtName: 1 }
    );

    showDistrict.map((item) => {
      if (item._id == req.body.districtId) {
        district = item.districtName;
      }
    });

    res.status(200).json({
      message: "Success",
      state: state,
      district: district,
      videoResult,
    });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// update a video article document
exports.editVideoArticle = async function (req, res) {
  try {
    const newsarticle = await videoArticle.findByIdAndUpdate(
      { _id: req.body._id },
      {
        title: req.body.title,
        video: "images/" + req.files[0].filename,
        Status: req.body.Status,
        categoryId: req.body.categoryId,
        languageId: req.body.languageId,
        description: req.body.description,
        modifiedBy: req.userId,
      }
    );
    if (newsarticle) {
      res.status(200).json({ message: "Video updated successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

// delete a video document from the collection
exports.removeVideoArticle = async function (req, res) {
  try {
    const newsArt = await videoArticle.findByIdAndRemove({ _id: req.body._id });
    if (newsArt) {
      return res.status(200).json({ message: "Video removed successfully" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Bad request" });
  }
};
