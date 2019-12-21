'use strict';
module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    videocardId: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10,2)
  }, {});
  History.associate = function({ Videocard}) {
    History.belongsTo(Videocard, { as: 'history', foreignKey: 'videocardId' })
  };
  return History;
};