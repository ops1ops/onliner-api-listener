module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    key: DataTypes.STRING,
    name: DataTypes.STRING,
  }, {});

  return Category;
};
