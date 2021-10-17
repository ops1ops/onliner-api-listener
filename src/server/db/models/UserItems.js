module.exports = (sequelize, DataTypes) => {
  const UserItems = sequelize.define("UserItems", {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    itemId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Items",
        key: "id",
      },
    },
  });

  return UserItems;
};
