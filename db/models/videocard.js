'use strict';
module.exports = (sequelize, DataTypes) => {
  const Videocard = sequelize.define('Videocard', {
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
    htmlUrl: DataTypes.STRING
  }, {});
  Videocard.associate = function({ History }) {
    Videocard.hasMany(History, { as: 'history'})
  };
  return Videocard;
};