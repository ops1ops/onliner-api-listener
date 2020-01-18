
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    typeId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    htmlUrl: DataTypes.STRING,
  }, {});

  Item.associate = ({ History, User }) => {
    Item.hasMany(History, { as: 'history' });
    Item.belongsToMany(User, {
      through: 'UserItems',
      as: 'users',
      foreignKey: 'itemId',
      otherKey: 'userId',
    });
  };

  return Item;
};
