const article = require("../../../model/articles");

exports.getBreakingNews = async function (req, res) {
  try {
    let breakingNews = [];
    const news = await article.find();
    news.map((item) => {
      if (item.breakingStatus == "Yes") {
        breakingNews.push(item);
      } else {
        console.error("Bad request");
      }
    });
    res.status(200).json({ message: "Sucess", breakingNews });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong..!" });
  }
};
