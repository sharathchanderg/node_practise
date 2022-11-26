// importing the required model
const districtinstate = require('../../../model/districtCategory')

// get district based upon the state
exports.getDistrict = async function (req, res) {
    const getcon = await districtinstate
      .aggregate([
        {
          $lookup: {
            from: "statecategoryschemas", 
            localField: "stateId", 
            foreignField: "_id", 
            as: "distStateJoin", 
          },
        },
        { $unwind: "$distStateJoin" }, 
        {
          $project: {
            _id: 1,
            districtName: 1,
            stateName: "$distStateJoin.stateName",
            stateId: 1,
            Status: true,
          },
        },
      ])
      .exec();
    return res.status(200).json({ message: "Success", data: getcon });
  };