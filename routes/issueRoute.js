const express = require("express");
const {
  updateIssue,
  createIssue,
  getIssueById,
  getAllIssues,
  deleteIssue,
} = require("../services/issueServices");

const router = express.Router();

router.route("/").get(getAllIssues).post(createIssue);
router.route("/:id").put(updateIssue).delete(deleteIssue).get(getIssueById);

module.exports = router;
