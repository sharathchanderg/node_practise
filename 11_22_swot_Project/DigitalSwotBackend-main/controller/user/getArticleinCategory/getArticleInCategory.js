// importing the required model
const articleModel = require("../../../model/articles");
const categoryModel = require("../../../model/category");

// get article by category
exports.getArticleListInCategory = async function (req, res) {
  try {
    const searchId = {};
    let category;
    let slug;
    if (req.body.categoryId) {
      searchId.categoryId = req.body.categoryId;
    }
    const articleResult = await articleModel.find(searchId, {});

    const showCategory = await categoryModel.find(
      {},
      { _id: 1, name: 1, slug: 1 }
    );

    showCategory.map((item) => {
      if (item._id == req.body.categoryId) {
        category = item.name;
        slug = item.slug;
      }
    });

    res.status(200).json({
      message: "Success",
      category: category,
      slug: slug,
      articleResult,
    });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};
