// import the required libraries
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// importing general/Admin the Routes
const userRoutes = require("./routes/user/userAuth");
const adminRoutes = require("./routes/admin/userAuth");
const adminGetProfileRoutes = require("./routes/admin/adminProfile/getAdminProfile");
const adminUpdateProfileRoutes = require("./routes/admin/adminProfile/updateProfile");
const adminCategoryRoutes = require("./routes/admin/category/category");
const adminStateRegionRoutes = require("./routes/admin/regionCategory/stateCategory");
const adminDistRegionRoutes = require("./routes/admin/regionCategory/districtCategory");
const adminNewsLangRoutes = require("./routes/admin/Language/language");
const adminNewsArticleRoutes = require("./routes/admin/Articles/article");
const adminImgGalleryRoutes = require("./routes/admin/imageGallery/imageGallery");
const adminVideoArticleRoutes = require("./routes/admin/videoArticles/videoArticle");
const adminSearchArticleRoutes = require("./routes/admin/Articles/searchArticle");
const adminCreatePageRoutes = require("./routes/admin/pages/pages");
const adminCommentRoutes = require("./routes/admin/comment/comment");
const adminAdSpaceRoutes = require("./routes/admin/adSpace/adSpace");
const adminWidgetsRoutes = require("./routes/admin/widgets/widget");
const adminSeoToolsRoutes = require("./routes/admin/seoTools/seoTools");

// roles and permission services routes
const adminRolesAndPermissionsRoutes = require("./service/permissionRoutes.service");

// importing the user Routes
const userGetBreakingNewsRoutes = require("./routes/user/getBreakingNews/getBreakingNews");
const userGetNewsCategoryRoutes = require("./routes/user/getCategories/getCategories");
const userGetCategoryByLanguageRoutes = require("./routes/user/getCategories/getCategoryByLang");
const userGetDistInStateRoutes = require("./routes/user/getDistrict/getDistrict");
const userGetArticleInCatRoutes = require("./routes/user/getArticleinCategory/getArticleInCategory");
const userGetLanguageRoutes = require("./routes/user/getLanguage/getLanguage");
const userGetArticleDescRoutes = require("./routes/user/getArticleinCategory/getArticleDescription");
const userGetLatestImgRoutes = require("./routes/user/getLatestImages/getLatestImages");
const userGetLatestVidRoutes = require("./routes/user/getLatestVideos/getLatestVideos");
const userSearchImgsRoutes = require("./routes/user/searchImages/searchImages");
const userSearchvdoRoutes = require("./routes/user/searchVideo/searchVideo");
const userSearchArtRoutes = require("./routes/user/searchArticle/searchArticle");

// importing the user APP Side Routes
const appUserAuthRoutes = require("./routes/app/appAuth/userAuth");
const appGetBreakingStateLnaguageRoutes = require("./routes/app/breakingStateandLanguage/breakingStateandLanguage");
const appGetBreakingNewsRoutes = require("./routes/app/getBreakingNews/getBreakingNews");
const appGetCategWiseLatestNewsRoutes = require("./routes/app/getCategoryLatestNews/getCategoryLatestNews");
const appGetAllVideosRoutes = require("./routes/app/getAllVideos/getAllVideos");
const appSearchArticlesRoutes = require("./routes/app/searchArticle/searchArticle");
const appSearchImagesRoutes = require("./routes/app/searchImages/searchImages");
const appSearchVideosRoutes = require("./routes/app/searchVideos/searchVideos");
const appGetLatestVideosByStateAndLanguageRoutes = require("./routes/app/getVideosStateAndLanguage/getVideosStateAndLanguage");

// adding general/admin middlewares to the application
dotenv.config();
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api", adminGetProfileRoutes);
app.use("/api", adminUpdateProfileRoutes);
app.use("/api", adminCategoryRoutes);
app.use("/api", adminStateRegionRoutes);
app.use("/api", adminDistRegionRoutes);
app.use("/api", adminNewsLangRoutes);
app.use("/api", adminNewsArticleRoutes);
app.use("/api", adminImgGalleryRoutes);
app.use("/api", adminVideoArticleRoutes);
app.use("/api", adminSearchArticleRoutes);
app.use("/api", adminCreatePageRoutes);
app.use("/api", adminCommentRoutes);
app.use("/api", adminAdSpaceRoutes);
app.use("/api", adminWidgetsRoutes);
app.use("/api", adminSeoToolsRoutes);

// adding roles and permissions to the application
app.use("/api", adminRolesAndPermissionsRoutes);

// adding user middleware to the application
app.use("/api", userGetBreakingNewsRoutes);
app.use("/api", userGetNewsCategoryRoutes);
app.use("/api", userGetCategoryByLanguageRoutes);
app.use("/api", userGetDistInStateRoutes);
app.use("/api", userGetArticleInCatRoutes);
app.use("/api", userGetLanguageRoutes);
app.use("/api", userGetArticleDescRoutes);
app.use("/api", userGetLatestImgRoutes);
app.use("/api", userGetLatestVidRoutes);
app.use("/api", userSearchImgsRoutes);
app.use("/api", userSearchvdoRoutes);
app.use("/api", userSearchArtRoutes);

// adding App side middleware to the application
app.use("/api", appUserAuthRoutes);
app.use("/api", appGetBreakingStateLnaguageRoutes);
app.use("/api", appGetBreakingNewsRoutes);
app.use("/api", appGetCategWiseLatestNewsRoutes);
app.use("/api", appGetAllVideosRoutes);
app.use("/api", appSearchArticlesRoutes);
app.use("/api", appSearchImagesRoutes);
app.use("/api", appSearchVideosRoutes);
app.use("/api", appGetLatestVideosByStateAndLanguageRoutes);

// add cors to project
app.use(cors());

// MongoDB connection path
//mongodb+srv://indiaone2022:<password>@cluster0.zgkg3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose
  .connect(
    `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0-shard-00-00.zgkg3.mongodb.net:27017,cluster0-shard-00-01.zgkg3.mongodb.net:27017,cluster0-shard-00-02.zgkg3.mongodb.net:27017/${process.env.MONGO_DB_DATABASE}?ssl=true&replicaSet=atlas-k4nm3m-shard-0&authSource=admin&retryWrites=true&w=majority`
  )
  .then(function () {
    console.log(`connected to database`);
  })
  .catch(function (er) {
    console.log(er, `Database connection error`);
  });

app.get("/", function (req, res) {
  res.send("hello");
});

app.post("/data", function (req, res) {
  res.status(200).json({ message: req.body });
});

app.listen(process.env.PORT, function (err) {
  if (!err) {
    console.log(`server running on port ${process.env.PORT}`);
  }
});
