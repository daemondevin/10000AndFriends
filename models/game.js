'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    name: DataTypes.STRING,
    turnIndex: DataTypes.INTEGER,
    started: DataTypes.DATE,
    ended: DataTypes.DATE
  }, {});
  Game.associate = function(models) {
    // associations can be defined here
    Game.belongsToMany(models.User,{
      through: models.GamesUsers,
      as: "users",
      foreignKey: "GameId",
      otherKey: "UserId"
    })
  };
  return Game;
};