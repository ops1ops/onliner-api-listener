
module.exports = (sequelize, DataTypes) => {
  const GroupUsers = sequelize.define('GroupUsers', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    itemId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Items',
        key: 'id',
      },
    },
  });
  return GroupUsers;
};
