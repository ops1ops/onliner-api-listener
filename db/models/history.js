'use strict';
module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    itemId: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10,2)
  }, {});

  History.associate = function({ Item }) {
    History.belongsTo(Item, { as: 'history', foreignKey: 'itemId' })
  };

  return History;
};