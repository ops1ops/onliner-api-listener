'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    typeId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
    htmlUrl: DataTypes.STRING
  }, {});

  Item.associate = function({ History }) {
    Item.hasMany(History, { as: 'history' })
  };

  return Item;
};