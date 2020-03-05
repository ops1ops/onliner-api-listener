
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    categoryKey: DataTypes.STRING,
    key: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
  }, {});

  Item.associate = ({ History, User, Category }) => {
    Item.hasMany(History, { as: 'history', foreignKey: 'itemId' });
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
