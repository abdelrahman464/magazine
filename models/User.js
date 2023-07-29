module.exports = (db, DataTypes) => {
  const User = db.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  function setImageURL(instance) {
    // Set image base URL + image name
    if (instance) {
      if (instance.image) {
        instance.image = `${process.env.BASE_URL}/users/${instance.image}`;
      }
    }
  }
  // Hook to set the image URL after finding a user
  User.afterFind((instances) => {
    if (Array.isArray(instances)) {
      instances.forEach((instance) => {
        setImageURL(instance);
      });
    } else {
      setImageURL(instances);
    }
  });

  // Hook to set the image URL after creating a new user
  User.afterCreate((instance) => {
    setImageURL(instance);
  });

  // Hook to set the image URL after updating a user
  User.afterUpdate((instance) => {
    setImageURL(instance);
  });

  return User;
};
