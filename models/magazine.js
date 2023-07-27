module.exports = (sequelize, DataTypes) => {
  const Magazine = sequelize.define("Magazine", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Magazine.associate = (models) => {
    Magazine.hasMany(models.Issue, {
      foreignKey: "magazineId",
      as: "issues",
    });
  };

  return Magazine;
};
