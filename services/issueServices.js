const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const { Issue } = require("../models");

const {
  updateOne,
  createOne,
  getOne,
  getAll,
  deleteOne,
} = require("./handlerFactory");
const { uploadMixOfImages } = require("../middlewares/uploadImageMiddleware");

exports.uploadIssuesImage = uploadMixOfImages([
  {
    name: "image",
    maxCount: 1,
  },
]);
exports.resizeIssuesImage = asyncHandler(async (req, res, next) => {
  if (req.files.image) {
    const imageFile = req.files.image[0];
    const imageFileName = `issue-${uuidv4()}-${Date.now()}.jpeg`;

    const pdfPath = `uploads/issues/${imageFileName}`;
    // Save the PDF file using fs
    fs.writeFileSync(pdfPath, imageFile.buffer);
    // Save PDF into our db
    req.body.image = imageFileName;
  }
  next();
});
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
