const express = require("express");
const {
  updateIssue,
  createIssue,
  getIssueById,
  getAllIssues,
  deleteIssue,
  uploadIssuesImage,
  resizeIssuesImage,
} = require("../services/issueServices");

const router = express.Router();

router
  .route("/")
  .get(getAllIssues)
  .post(uploadIssuesImage, resizeIssuesImage, createIssue);
router
  .route("/:id")
  .put(uploadIssuesImage, resizeIssuesImage, updateIssue)
  .delete(deleteIssue)
  .get(getIssueById);

module.exports = router;
