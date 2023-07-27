const express = require("express");
const {
  updateResearch,
  createResearch,
  getResearchById,
  getAllResearches,
  deleteResearch,
  uploadResearchImages,
  resizeResearchImages,
} = require("../services/researchServices");

const router = express.Router();

router
  .route("/")
  .get(getAllResearches)
  .post(uploadResearchImages, resizeResearchImages, createResearch);
router
  .route("/:id")
  .put(uploadResearchImages, resizeResearchImages, updateResearch)
  .delete(deleteResearch)
  .get(getResearchById);

module.exports = router;
