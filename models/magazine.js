const { v4: uuidv4 } = require("uuid");

module.exports = (db, DataTypes) => {
  const Magazine = db.define("Magazine", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Magazine.beforeCreate((magazine) => {
    magazine.id = uuidv4();
  });

  return Magazine;
};
