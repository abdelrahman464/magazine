const { check } = require("express-validator");
const { Issue } = require("../../models");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createResearchValidator = [
  check("title")
    .notEmpty()
    .withMessage("title required")
    .isLength({ min: 2 })
    .withMessage("too short title ")
    .isLength({ max: 52 })
    .withMessage("too long title"),
  check("description")
    .notEmpty()
    .withMessage("description required")
    .isLength({ min: 7 })
    .withMessage("too short description ")
    .isLength({ max: 205 })
    .withMessage("too long description"),
  check("researcher")
    .notEmpty()
    .withMessage("researcher required")
    .isLength({ min: 2 })
    .withMessage("too short researcher")
    .isLength({ max: 100 })
    .withMessage("too long researcher"),
  check("IssueId")
    .notEmpty()
    .withMessage("title required")
    .isUUID()
    .withMessage("Invalid id format")
    .custom((val) =>
      Issue.findOne({ where: { id: val } }).then((issue) => {
        if (!issue) {
          return Promise.reject(new Error("Issue Not Found"));
        }
      })
    ),
  validatorMiddleware,
];
exports.updateResearchValidator = [
  check("id").isUUID().withMessage("Invalid id format"),
  check("title")
    .optional()
    .isLength({ min: 2 })
    .withMessage("too short title ")
    .isLength({ max: 41 })
    .withMessage("too long title"),
  check("description")
    .optional()
    .isLength({ min: 7 })
    .withMessage("too short description ")
    .isLength({ max: 205 })
    .withMessage("too long description"),
  check("researcher")
    .optional()
    .isLength({ min: 2 })
    .withMessage("too short researcher")
    .isLength({ max: 100 })
    .withMessage("too long researcher"),
  check("IssueId")
    .optional()
    .isUUID()
    .withMessage("Invalid id format")
    .custom((val) =>
      Issue.findOne({ where: { id: val } }).then((issue) => {
        if (!issue) {
          return Promise.reject(new Error("Issue Not Found"));
        }
      })
    ),
  validatorMiddleware,
];
exports.idResearchValidator = [
  check("id").isUUID().withMessage("Invalid id format"),
  validatorMiddleware,
];
