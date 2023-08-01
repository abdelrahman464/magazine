const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

module.exports = (db, DataTypes) => {
  const User = db.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordChangedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    passwordResetCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    passwordResetVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false, // Set the default value to false
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user", // Set default role to 'user'
    },
  });
  User.beforeSave(async (user) => {
    user.id = uuidv4();
    // If password field is not modified, move to the next hook/middleware
    if (!user.changed("password")) return;

    // Hashing user password
    user.password = await bcrypt.hash(user.password, 12);
  });

  return User;
};
