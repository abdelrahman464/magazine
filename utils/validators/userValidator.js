const bcrypt = require("bcryptjs");
const { check, body } = require("express-validator");
const { User } = require("../../models");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createUserValidator = [
  check("username")
    .notEmpty()
    .withMessage("name required")
    .isLength({ min: 2 })
    .withMessage("too short User name")
    .isLength({ max: 100 })
    .withMessage("too long User name"),
  check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom((val) =>
      User.findOne({ where: { email: val } }).then((user) => {
        if (user) {
          return Promise.reject(new Error("E-mail already in use"));
        }
      })
    ),

  check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters")
    .isLength({ max: 32 })
    .withMessage("password must be at least 8 characters")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error("password does not match");
      }
      return true;
    }),

  check("passwordConfirm").notEmpty().withMessage("password required"),

  check("role").optional(),
  validatorMiddleware,
];
exports.updateUserValidator = [
  check("id").isUUID().withMessage("Invalid id format"),
  body("username").optional(),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address")
    .custom((val) =>
      User.findOne({ where: { email: val } }).then((user) => {
        if (user) {
          return Promise.reject(new Error("E-mail already in user"));
        }
      })
    ),

  check("role").optional(),
  validatorMiddleware,
];
exports.updateLoggedUserValidator = [
  check("id").isUUID().withMessage("Invalid id format"),
  body("username").optional(),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address")
    .custom((val) =>
      User.findOne({ where: { email: val } }).then((user) => {
        if (user) {
          return Promise.reject(new Error("E-mail already in user"));
        }
      })
    ),

  validatorMiddleware,
];
exports.changeLoggedUserPasswordValidator = [
  check("id").isUUID().withMessage("Invalid id format"),
  body("currentPassword")
    .notEmpty()
    .withMessage("You must enter your current password"),
  body("passwordConfirm")
    .notEmpty()
    .withMessage("Please enter your new password confirm"),
  body("password")
    .notEmpty()
    .withMessage("Please enter your new password")
    .custom(async (val, { req }) => {
      // 1)verify current password
      const user = await User.findOne({ where: { id: req.user.id } });
      if (!user) {
        throw new Error("User not found");
      }
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isCorrectPassword) {
        throw new Error("Current password is incorrect");
      }
      // 2)verify  password confrim
      if (val !== req.body.passwordConfirm) {
        throw new Error("password does not match");
      }
      return true;
    }),
  validatorMiddleware,
];
