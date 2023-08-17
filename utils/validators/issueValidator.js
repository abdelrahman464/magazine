const { check } = require("express-validator");
const { Magazine } = require("../../models");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createIssueValidator = [
  check("title")
    .notEmpty()
    .withMessage("title required")
    .isLength({ min: 2 })
    .withMessage("too short title ")
    .isLength({ max: 41 })
    .withMessage("too long title"),
  check("MagazineId")
    .notEmpty()
    .withMessage("title required")
    .isUUID()
    .withMessage("Invalid id format")
    .custom((val) =>
      Magazine.findOne({ where: { id: val } }).then((magazine) => {
        if (!magazine) {
          return Promise.reject(new Error("Maginze Not Found"));
        }
      })
    ),
  validatorMiddleware,
];
exports.updateIssueValidator = [
  check("id").isUUID().withMessage("Invalid id format"),
  check("title")
    .optional()
    .isLength({ min: 2 })
    .withMessage("too short title ")
    .isLength({ max: 41 })
    .withMessage("too long title"),
  check("MagazineId")
    .optional()
    .isUUID()
    .withMessage("Invalid id format")
    .custom((val) =>
      Magazine.findOne({ where: { id: val } }).then((magazine) => {
        if (!magazine) {
          return Promise.reject(new Error("Maginze Not Found"));
        }
      })
    ),
  validatorMiddleware,
];
exports.idIssueValidator = [
  check("id").isUUID().withMessage("Invalid id format"),
  validatorMiddleware,
];
