// importing the required model
const rolePermitModel = require("./permissionModel.service");

// create Roles And Permissions
exports.createRolesAndPermissions = function (req, res) {
  rolePermitModel.findOne({ role: req.body.role }).exec(function (err, role) {
    if (role) {
      res.status(400).json({ message: "Role already exist..!" });
    } else {
      const rolesAndPermitssionObj = new rolePermitModel({
        role: req.body.role,
        permissions: {
          adminPanel: req.body.adminPanel,
          addPost: req.body.addPost,
          manageAllPost: req.body.manageAllPost,
          pages: req.body.pages,
          categories: req.body.categories,
          widgets: req.body.widgets,
          gallery: req.body.gallery,
          comments: req.body.comments,
          adSpaces: req.body.adSpaces,
          settings: req.body.settings,
        },
      });
      rolesAndPermitssionObj.save(function (err, data) {
        if (err) {
          res.status(400).json({ message: "Something went wrong..!" });
        }
        if (data) {
          res.status(200).json({
            message: "Role and respective permissions added Successfully",
          });
        }
      });
    }
  });
};

// show Roles And Permissions
exports.showRolesAndPermissions = async function (req, res) {
  try {
    const rolePermitResult = await rolePermitModel.find();
    if (rolePermitResult) {
      res.status(200).json({ message: "Sucess", rolePermitResult });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// update Roles And Permissions
exports.updateRolesAndPermissions = async function (req, res) {
  try {
    await rolePermitModel.findByIdAndUpdate(
      { _id: req.body._id },
      { role: req.body.role, permissions: req.body.permissions }
    );
    res.status(200).json({
      message: "Successfully updated role and respective permissions",
    });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong..!" });
  }
};

// delete Role and it's respective permissions
exports.removeRole = async function (req, res) {
  try {
    await rolePermitModel.findByIdAndDelete({ _id: req.body._id });
    res.status(200).json({
      message: "Successfully deleted role and respective permissions",
    });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong..!" });
  }
};
