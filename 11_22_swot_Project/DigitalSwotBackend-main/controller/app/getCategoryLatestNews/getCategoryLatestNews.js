const articleModel = require("../../../model/articles");
const categoryModel = require("../../../model/category");

exports.getCategoryWiseArticle = async function (req, res) {
  try {
    let catgoryName;
    let articleResult = [];
    const showArticle = await articleModel.find(
      { categoryId: req.body.categoryId },
      {
        _id: 1,
        title: 1,
        image: 1,
        description: 1,
        updatedAt: 1,
      }
    );
    showArticle.map((element) => {
      let todayDate = new Date(Date.now()).toDateString();
      let latestArticleDate = element.updatedAt.toDateString();
      if (todayDate == latestArticleDate) {
        articleResult.push(element);
      }
    });
    const showCategory = await categoryModel.find({}, { _id: 1, name: 1 });
    showCategory.map((item) => {
      if (item._id == req.body.categoryId) {
        catgoryName = item.name;
      }
    });
    res.status(200).json({
      message: "Success",
      data: { catgoryName: catgoryName, articleResult },
    });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong..!" });
  }
};
