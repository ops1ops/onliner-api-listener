module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      key: { type: DataTypes.STRING, primaryKey: true },
      name: DataTypes.STRING,
    },
    {},
  );

  Category.associate = ({ Item }) => {
    Category.hasMany(Item, { as: 'items', foreignKey: 'categoryKey' });
  };

  return Category;
};
