'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    vendorId: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    picture: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Game,{
      through: models.GamesUsers,
      as: "games",
      foreignKey: "UserId",
      otherKey: "GameId"
    })
  };
  return User;
};