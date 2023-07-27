const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json");

const sequelize = new Sequelize(config.development);

const  Issue  = require("../models/issue")(sequelize, DataTypes);
const  Research  = require("../models/research")(sequelize, DataTypes);

sequelize.sync();
const {
  updateOne,
  createOne,
  getOne,
  getAll,
  deleteOne,
} = require("./handlerFactory");
const { uploadMixOfImages } = require("../middlewares/uploadImageMiddleware");

exports.uploadResearchImages = uploadMixOfImages([
  {
    name: "image",
    maxCount: 1,
  },
  {
    name: "pdf",
    maxCount: 1,
  },
]);

//image processing
exports.resizeResearchImages = asyncHandler(async (req, res, next) => {
  //1- Image processing for imageCover
  if (req.files.image) {
    const imageFileName = `research-${uuidv4()}-${Date.now()}.jpeg`;

    await sharp(req.files.image[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/researches/images/${imageFileName}`);

    // Save image into our db
    req.body.image = imageFileName;
  }

  // 2. PDF processing
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
