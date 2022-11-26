// import the required models
const articleModel = require("../../../model/articles");

// create new article/ article collection
exports.createArticle = function (req, res) {
  const newArt = new articleModel({
    title: req.body.title,
    image: "images/" + req.files[0].filename,
    categoryId: req.body.categoryId,
    stateId: req.body.stateId,
    districtId: req.body.districtId,
    languageId: req.body.languageId,
    description: req.body.description,
    createdBy: req.userId,
    modifiedBy: req.userId,
  });
  newArt.save(function (err, article) {
    if (err) {
      res.status(400).json({ message: "Something went wrong..!" });
    }
    if (article) {
      res.status(200).json({ message: "New article created successfully" });
    }
  });
};

// get an article by _id
exports.getArticle = async function (req, res) {
  let updatedViewCount = 0;
  try {
    const articleResult = await articleModel.findById({ _id: req.body._id });
    updatedViewCount = articleResult.viewsCount + 1;
    console.log(updatedViewCount);
    const viewArticle = await articleModel.findByIdAndUpdate(
      { _id: req.body._id },
      { viewsCount: updatedViewCount }
    );
    if (viewArticle) {
      res.status(200).json({ message: "Success", articleResult });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// get all the articles from article collection
exports.getAllArticles = async function (req, res) {
  try {
    const articleResult = await articleModel.find();
    if (articleResult) {
      return res.status(200).json({
        message: "Success",
        articleResult,
        numberOfArticles: articleResult.length,
      });
    }
  } catch (err) {
    return res.status(400).json({ err });
  }
};

// get all the recent articles from article collection
exports.getAllRecentArticles = async function (req, res) {
  try {
    let articleResult = [];

    const newsarticle = await articleModel.find();

    newsarticle.map((item) => {
      let todayDate = new Date(Date.now()).toDateString();
      let recentCreatedArticle = item.createdAt.toDateString();
      let recentUpdatedArticle = item.updatedAt.toDateString();

      if (
        recentCreatedArticle == todayDate ||
        recentUpdatedArticle == todayDate
      ) {
        articleResult.push(item);
      }
    });
    return res.status(200).json({ message: "Success", articleResult });
  } catch (err) {
    return res.status(400).json({ err });
  }
};

// get articles based on district in a state
exports.getAggreArticle = async function (req, res) {
  try {
    const articleResult = await articleModel.aggregate([
      {
        $lookup: {
          from: "statecategoryschemas",
          localField: "stateId",
          foreignField: "_id",
          as: "stateArtJoin",
        },
      },
      { $unwind: "$stateArtJoin" },
      {
        $lookup: {
          from: "districtcategoryschemas",
          localField: "districtId",
          foreignField: "_id",
          as: "distArtJoin",
        },
      },
      { $unwind: "$distArtJoin" },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          image: 1,
          stateName: "$stateArtJoin.stateName",
          districtName: "$distArtJoin.districtName",
        },
      },
    ]);
    if (articleResult) {
      return res.status(200).json({ message: "Success", articleResult });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// update an article
exports.editArticle = async function (req, res) {
  try {
    let view;
    let like;
    const showArticle = await articleModel.find(
      {},
      { _id: 1, likesCount: 1, viewsCount: 1 }
    );

    showArticle.map((item) => {
      if (item._id == req.body._id) {
        view = item.viewsCount;
        like = item.likesCount;
      }
    });

    const newsarticle = await articleModel.findByIdAndUpdate(
      { _id: req.body._id },
      {
        title: req.body.title,
        image: req.files[0].filename,
        Status: req.body.Status,
        categoryId: req.body.categoryId,
        stateId: req.body.stateId,
        districtId: req.body.districtId,
        languageId: req.body.languageId,
        description: req.body.description,
        modifiedBy: req.userId,
        viewsCount: view,
        likesCount: like,
        breakingStatus: req.body.breakingStatus,
      }
    );
    if (newsarticle) {
      res.status(200).json({ message: "Successfully updated the article" });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

// delete an article
exports.removeArticle = async function (req, res) {
  try {
    const articleResult = await articleModel.findByIdAndRemove({
      _id: req.body._id,
    });
    if (articleResult) {
      res.status(200).json({ message: "Successfully removed the article" });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// like counts for an article
exports.updateLikesCount = async function (req, res) {
  let updatedLikeCount = 0;
  try {
    const newarticle = await articleModel.findById({ _id: req.body._id });
    updatedLikeCount = newarticle.likesCount + 1;
    const updatelike = await articleModel.findByIdAndUpdate(
      { _id: req.body._id },
      { likesCount: updatedLikeCount }
    );
    if (updatelike) {
      res.status(200).json({ message: "Likes count updated successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// breaking news or Highlighted articles..
exports.changeToBreakingNews = async function (req, res) {
  try {
    const articleResult = await articleModel.findByIdAndUpdate(
      { _id: req.body._id },
      {
        breakingStatus: req.body.breakingStatus,
      }
    );
    if (articleResult) {
      res.status(200).json({ message: "Breaking news status updated" });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

// publish The Article or unpublish
exports.publishTheArticle = async function (req, res) {
  try {
    const showArticle = await articleModel.findOneAndUpdate(
      { _id: req.body._id },
      { Status: req.body.Status }
    );

    res
      .status(200)
      .json({ message: "Successfully updated the Publish Status" });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};
