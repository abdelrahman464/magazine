const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json");

const sequelize = new Sequelize(config.development);

const Issue = require("../models/issue")(sequelize, DataTypes);

sequelize.sync();
const {
  updateOne,
  createOne,
  getOne,
  getAll,
  deleteOne,
} = require("./handlerFactory");

// Update One Issue
exports.updateIssue = updateOne(Issue);

// Create One Issue
exports.createIssue = createOne(Issue);

// Get One Issue
exports.getIssueById = getOne(Issue);

// Get All Issues
exports.getAllIssues = getAll(Issue, "Issue");

// Delete One Issue
exports.deleteIssue = deleteOne(Issue);
