const express = require("express");

const {
  loginValidator,
  verifyresetPasswordValidator,
} = require("../utils/validators/authValidator");
const {
  login,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
} = require("../services/authServices");

const router = express.Router();

router.route("/login").post(loginValidator, login);
router.route("/forgotPassword").post(forgotPassword);
router
  .route("/verifyResetCode")
  .post(verifyresetPasswordValidator, verifyPassResetCode);
router.route("/resetPassword").put(resetPassword);

module.exports = router;
