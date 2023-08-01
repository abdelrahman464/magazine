const express = require("express");
const {
  createIssueValidator,
  updateIssueValidator,
  idIssueValidator,
} = require("../utils/validators/issueValidator");
const {
  updateIssue,
  createIssue,
  getIssueById,
  getAllIssues,
  deleteIssue,
  uploadIssuesImage,
  resizeIssuesImage,
} = require("../services/issueServices");
const authServices = require("../services/authServices");

const router = express.Router();

router
  .route("/")
  .get(getAllIssues)
  .post(
    authServices.protect,
    authServices.allowedTo("admin"),
    uploadIssuesImage,
    resizeIssuesImage,
    createIssueValidator,
    createIssue
  );
router
  .route("/:id")
  .put(
    authServices.protect,
    authServices.allowedTo("admin"),
    uploadIssuesImage,
    resizeIssuesImage,
    updateIssueValidator,
    updateIssue
  )
  .delete(
    authServices.protect,
    authServices.allowedTo("admin"),
    idIssueValidator,
    deleteIssue
  )
  .get(idIssueValidator, getIssueById);

module.exports = router;
