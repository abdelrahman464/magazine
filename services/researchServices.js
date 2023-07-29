const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const asyncHandler = require("express-async-handler");

const { Issue, Research } = require("../models");

const {
  updateOne,
  createOne,
  getOne,
  getAll,
  deleteOne,
} = require("./handlerFactory");
const { uploadMixOfImages } = require("../middlewares/uploadImageMiddleware");

exports.uploadResearchPdf = uploadMixOfImages([
 
  {
    name: "pdf",
    maxCount: 1,
  },
]);

//image processing
exports.resizeResearchPdf = asyncHandler(async (req, res, next) => {

  if (req.files.pdf) {
    const pdfFile = req.files.pdf[0];
    const pdfFileName = `research-pdf-${uuidv4()}-${Date.now()}.pdf`;

    // Save the PDF file
    // await req.files.pdf[0].mv(`uploads/store/products/pdf/${pdfFileName}`);

    const pdfPath = `uploads/researches/pdfs/${pdfFileName}`;

    // Save the PDF file using fs
    fs.writeFileSync(pdfPath, pdfFile.buffer);
    // Save PDF into our db
    req.body.pdf = pdfFileName;
  }
  next();
});

// Update One Research
exports.updateResearch = updateOne(Research);

// Create One Research
exports.createResearch = createOne(Research);

// Get One Research
exports.getResearchById = getOne(Research);

// Get All Researches
exports.getAllResearches = getAll(Research, "Research");

// Delete One Research
exports.deleteResearch = deleteOne(Research);

//get all researches from issue
exports.getAllResearchesFromIssue = asyncHandler(async (req, res, next) => {
  const { issueId } = req.params;
  const issueResearches = await Research.findAll({
    where: {
      IssueId: issueId,
    },
    include: [Issue], // Include the associated Issue model
  });

  res.status(200).json({ data: issueResearches });
});
