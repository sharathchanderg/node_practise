// importing the required model
const getCat = require("../../../model/category");

// get a category by language
exports.getCategoryByLang = async function (req, res) {
  try {
    const categoryResult = await getCat.aggregate([
      {
        $lookup: {
          from: "languages",
          localField: "languageId",
          foreignField: "_id",
          as: "categoryLanguageJoin",
        },
      },
      { $unwind: "$categoryLanguageJoin" },
      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          language: "$categoryLanguageJoin.langName"
        },
      },
    ]);

    if (categoryResult) {
      res.status(200).json({ message: "Success", categoryResult });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};
