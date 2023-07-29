module.exports = (db, DataTypes) => {
  const Magazine = db.define("Magazine", {
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
 

  return Magazine;
};
