const express = require("express");
const {
  updateResearch,
  createResearch,
  getResearchById,
  getAllResearches,
  deleteResearch,
  uploadResearchPdf,
  resizeResearchPdf,
} = require("../services/researchServices");

const router = express.Router();

router
  .route("/")
  .get(getAllResearches)
  .post(uploadResearchPdf, resizeResearchPdf, createResearch);
router
  .route("/:id")
  .put(uploadResearchPdf, resizeResearchPdf, updateResearch)
  .delete(deleteResearch)
  .get(getResearchById);

module.exports = router;
