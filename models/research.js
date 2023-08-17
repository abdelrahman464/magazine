const { v4: uuidv4 } = require("uuid");

module.exports = (db, DataTypes) => {
  const Research = db.define("Research", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    researcher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pdf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Research.beforeCreate((research) => {
    research.id = uuidv4();
  });

  function setUrls(instance) {
    if (instance) {
      if (instance.pdf) {
        instance.pdf = `${process.env.BASE_URL}/researches/pdfs/${instance.pdf}`;
      }
    }
  }

  // Hook to set the image and PDF URLs after finding a record
  Research.afterFind((instances) => {
    if (Array.isArray(instances)) {
      instances.forEach((instance) => {
        setUrls(instance);
      });
    } else {
      setUrls(instances);
    }
  });

  // Hook to set the image and PDF URLs after creating a new record
  Research.afterCreate((instance) => {
    setUrls(instance);
  });

  // Hook to set the image and PDF URLs after updating a record
  Research.afterUpdate((instance) => {
    setUrls(instance);
  });

  return Research;
};
