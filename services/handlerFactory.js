const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const ApiError = require("../utils/apiError");

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const [affectedRowCount] = await Model.update(req.body, {
      where: { id },
    });

    if (affectedRowCount === 0) {
      return next(new ApiError(`Document Not Found`, 404));
    }

    // Fetch the updated document after the update
    const updatedDocument = await Model.findByPk(id);

    if (!updatedDocument) {
      return next(new ApiError(`Document Not Found`, 404));
    }

    const updatedData = updatedDocument.get();
    res.status(200).json({ data: updatedData });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    console.log(req.body);
    const document = await Model.create(req.body);
    res.status(201).json({ data: document });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const query = { where: { id } };

    const document = await Model.findOne(query);

    if (!document) {
      return next(new ApiError(`Document Not Found`, 404));
    }

    res.status(200).json({ data: document });
  });

exports.getAll = (Model, modelName) =>
  asyncHandler(async (req, res) => {
    const searchQuery = req.query.keyword; // Assuming the search term is passed in the 'q' query parameter
    const {year} = req.query;

    let filter = {};
    if (searchQuery) {
      if (modelName === "User") {
        filter = {
          [Op.or]: [{ username: { [Op.like]: `%${searchQuery}%` } }],
        };
      } else {
        filter = {
          [Op.or]: [
            { title: { [Op.like]: `%${searchQuery}%` } }, // Case-insensitive partial match on the 'name' field
            // Add more fields here if you want to search on additional fields
          ],
        };
      }
    }
    if (year) {
      filter.createdAt = {
        [Op.between]: [`${year}-01-01T00:00:00.000Z`, `${year}-12-31T23:59:59.999Z`],
      };
    }
    const documents = await Model.findAll({ where: filter });
    res.status(200).json({ data: documents });
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const deletedRows = await Model.destroy({ where: { id } });

    if (deletedRows === 0) {
      return next(new ApiError(`Document Not Dound`, 404));
    }

    res.status(204).send();
  });
