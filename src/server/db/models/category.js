module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    key: DataTypes.STRING,
    name: DataTypes.STRING,
  }, {});

  Category.associate = ({ Item }) => {
    Category.hasMany(Item, { as: 'items' });
  };

  return Category;
};
