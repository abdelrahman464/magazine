const { v4: uuidv4 } = require("uuid");

module.exports = (db, DataTypes) => {
  const Issue = db.define("Issue", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    issueNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Issue.beforeCreate((issue) => {
    issue.id = uuidv4();
  });

  function setUrls(instance) {
    if (instance) {
      // Set image and PDF base URLs + file names
      if (instance.image) {
        instance.image = `${process.env.BASE_URL}/issues/${instance.image}`;
      }
    }
  }

  // Hook to set the image and PDF URLs after finding a record
  Issue.afterFind((instances) => {
    if (Array.isArray(instances)) {
      instances.forEach((instance) => {
        setUrls(instance);
      });
    } else {
      setUrls(instances);
    }
  });

  // Hook to set the image and PDF URLs after creating a new record
  Issue.afterCreate((instance) => {
    setUrls(instance);
  });

  // Hook to set the image and PDF URLs after updating a record
  Issue.afterUpdate((instance) => {
    setUrls(instance);
  });

  return Issue;
};
