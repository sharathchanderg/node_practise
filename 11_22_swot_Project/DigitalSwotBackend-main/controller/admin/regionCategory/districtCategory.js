// importing the required model
const districtModel = require("../../../model/districtCategory");
const articleModel = require("../../../model/articles");

// create a new district document/collection
exports.createDistCategories = function (req, res) {
  const distCateg = new districtModel({
    districtName: req.body.districtName,
    stateId: req.body.stateId,
  });
  distCateg.save((err, cat) => {
    if (err) {
      res.status(400).json({ message: "Something went wrong..!" });
    }
    if (cat) {
      res.status(200).json({ message: "District added successfully" });
    }
  });
};

// get a district by _id
exports.getDistCategories = async function (req, res) {
  try {
    const districtResult = await districtModel.findById({ _id: req.body._id });
    if (districtResult) {
      res.status(200).json({ message: "Success", districtResult });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// get all the district in district collection
exports.getAllDistCategories = async function (req, res) {
  try {
    const districtResult = await districtModel.find();
    if (districtResult) {
      res.status(200).json({ message: "Success", districtResult });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// get district based upon the state
exports.getAllAggreDistCategories = async function (req, res) {
  try {
    const districtResult = await districtModel.aggregate([
      {
        $lookup: {
          from: "statecategoryschemas", //the document from where we are getting the information or the parent model name. In this case we are intrested in state Id and state name (Id & name from state collection)
          localField: "stateId", // common field(id of state) between district and state documents. This Id is inserted in dist document with name as "stateId" at the time of creation of dist document/collection.
          foreignField: "_id", // this is the Id of state which is generated randomly at the time of state creation.
          as: "distStateJoin", //any random name to the process. this name is used to get the aggregated information of the state and dist.
        },
      },
      { $unwind: "$distStateJoin" }, //here we are fetching the aggregated data of respective state and dist.
      {
        $project: {
          _id: 1,
          districtName: 1,
          stateName: "$distStateJoin.stateName", // in "$distStateJoin.stateName", the stateName is the foreign collection element.
          stateId: 1,
          Status: true,
        },
      },
    ]);
    if (districtResult) {
      res.status(200).json({ message: "Success", districtResult });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// get articles on the basis of districts.
exports.getDistrictArticles = async function (req, res) {
  try {
    const searchId = {};
    let district;
    if (req.body.districtId) {
      searchId.districtId = req.body.districtId;
    }
    const districtArticleResult = await articleModel.find(searchId, {});

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
      district: district,
      districtArticleResult,
    });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// update the district document by _id
exports.editDistCategories = async function (req, res) {
  try {
    const categori = await districtModel.findByIdAndUpdate(
      { _id: req.body._id },
      { districtName: req.body.districtName }
    );
    if (categori) {
      res.status(200).json({ message: "District updated successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong..!" });
  }
};

// delete a district document
exports.removeDistCategories = async function (req, res) {
  try {
    const categori = await districtModel.findByIdAndDelete({
      _id: req.body._id,
    });
    if (categori) {
      res.status(200).json({ message: "District removed successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};
