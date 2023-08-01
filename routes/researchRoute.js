const express = require("express");
const {
  createResearchValidator,
  updateResearchValidator,
  idResearchValidator,
} = require("../utils/validators/researchValidator");
const {
  updateResearch,
  createResearch,
  getResearchById,
  getAllResearches,
  deleteResearch,
  uploadResearchPdf,
  resizeResearchPdf,
  getAllResearchesFromIssue,
} = require("../services/researchServices");
const authServices = require("../services/authServices");

const router = express.Router();

router
  .route("/")
  .get(getAllResearches)
  .post(
    authServices.protect,
    authServices.allowedTo("admin"),
    uploadResearchPdf,
    resizeResearchPdf,
    createResearchValidator,
    createResearch
  );
router
  .route("/:id")
  .put(
    authServices.protect,
    authServices.allowedTo("admin"),
    uploadResearchPdf,
    resizeResearchPdf,
    updateResearchValidator,
    updateResearch
  )
  .delete(authServices.protect, authServices.allowedTo("admin"), deleteResearch)
  .get(idResearchValidator, getResearchById);
router.route("/:issueId/issues").get(getAllResearchesFromIssue);
module.exports = router;
