

module.exports = (sequelize,DataTypes) => {
  const Research = sequelize.define("Research", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pdf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Research.associate = (models) => {
    Research.belongsTo(models.Issue, {
      foreignKey: "issueId",
      as: "issue",
    });
    
  };
 


  function setUrls(instance) {
    if (instance) {
      // Set image and PDF base URLs + file names
      if (instance.image) {
        instance.image = `${process.env.BASE_URL}/researches/images/${instance.image}`;
      }
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

  return  Research;
};
