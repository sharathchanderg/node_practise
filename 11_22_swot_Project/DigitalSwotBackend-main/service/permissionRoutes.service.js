const express = require("express");
const router = express.Router();

// importing the required functions
const { verifyToken } = require("../commonMiddleWare");
const {
  createRolesAndPermissions,
  showRolesAndPermissions,
  updateRolesAndPermissions,
  removeRole,
} = require("./permissionController.service");

// defining the routes
router.post(
  "/admin/settings/addrolesandpermissions",
  verifyToken,
  createRolesAndPermissions
);

router.post(
  "/admin/settings/showallrolesandpermissions",
  verifyToken,
  showRolesAndPermissions
);

router.post(
  "/admin/settings/editrolesandpermissions",
  verifyToken,
  updateRolesAndPermissions
);

router.post(
  "/admin/settings/deleterolesandpermissions",
  verifyToken,
  removeRole
);

module.exports = router;
