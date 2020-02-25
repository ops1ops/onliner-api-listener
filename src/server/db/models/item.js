
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    categoryKey: DataTypes.STRING,
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    htmlUrl: DataTypes.STRING,
  }, {});

  Item.associate = ({ History, User, Category }) => {
    Item.hasMany(History, { as: 'history' });
    Item.belongsTo(Category, { as: 'items', foreignKey: 'categoryKey' });
    Item.belongsToMany(User, {
      through: 'UserItems',
      as: 'users',
      foreignKey: 'itemId',
      otherKey: 'userId',
    });
  };

  return Item;
};
