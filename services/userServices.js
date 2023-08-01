const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/apiError");
const generateToken = require("../utils/generateToken");
const { User } = require("../models");
const { createOne, getOne, getAll, deleteOne } = require("./handlerFactory");

//@desc update specific user
//@route PUT /api/v1/user/:id
//@access private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      email: req.body.email,
      image: req.body.image,
      role: req.body.role,
    },
    {
      new: true,
    }
  );
  if (!user) {
    return next(new ApiError(`User Not Found`, 404));
  }

  res.status(200).json({ data: user });
});

// Create One User
exports.createUser = createOne(User);
// Get One User
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
  // i will set the req,pararms.id because i will go to the next middleware =>>> (getUser)
  req.params.id = req.user.id;
  next();
});
exports.getUserById = getOne(User);

// Get All Users
exports.getAllUsers = getAll(User, "User");

// Delete One User
exports.deleteUser = deleteOne(User);
//@desc update logged user password
//@route PUT /api/v1/user/changeMyPassword
//@access private/protect
exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  const newPassword = await bcrypt.hash(req.body.password, 12);

  const [affectedRowCount] = await User.update(
    {
      password: newPassword,
      passwordChangedAt: new Date(),
    },
    {
      where: { id: req.user.id },
    }
  );

  if (affectedRowCount === 0) {
    return ApiError("User Not Found", 404);
  }
  //genrate token
  const token = generateToken(req.user.id);

  res.status(200).json({ token });
});
//@desc update logged user data without updating password or role
//@route PUT /api/v1/user/changeMyData
//@access private/protect
exports.updateLoggedUserData = asyncHandler(async (req, res, next) => {
  const [updatedRows, [updatedUser]] = await User.update(
    {
      username: req.body.name,
      email: req.body.email,
      image: req.body.image,
    },
    {
      where: { id: req.user.id },
      returning: true, // Get the updated user object in the response
    }
  );

  if (updatedRows === 0) {
    return ApiError("User Not Found", 404);
  }
  res.status(200).json({ data: updatedUser });
});
