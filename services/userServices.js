const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json");

const sequelize = new Sequelize(config.development);
const  User  = require("../models/user")(sequelize, DataTypes);

sequelize.sync();
const {
  updateOne,
  createOne,
  getOne,
  getAll,
  deleteOne,
} = require("./handlerFactory");

// Update One User
exports.updateUser = updateOne(User);

// Create One User
exports.createUser = createOne(User);

// Get One User
exports.getUserById = getOne(User);

// Get All Users
exports.getAllUsers = getAll(User, "User");

// Delete One User
exports.deleteUser = deleteOne(User);
