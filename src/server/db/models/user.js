module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {},
  );

  User.associate = ({ Item }) => {
    User.belongsToMany(Item, {
      through: 'UserItems',
      as: 'items',
      foreignKey: 'userId',
      otherKey: 'itemId',
    });
  };

  return User;
};
