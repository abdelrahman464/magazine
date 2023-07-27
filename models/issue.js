module.exports = (sequelize, DataTypes) => {
  const Issue = sequelize.define("Issue", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    issueNumber: {  
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Issue.associate = (models) => {
    Issue.belongsTo(models.Magazine, {
      foreignKey: "magazineId",
      as: "magazine",
    });
    Issue.hasMany(models.Research, {
      foreignKey: "issueId",
      as: "researches",
    });
  };
  return Issue;
};
