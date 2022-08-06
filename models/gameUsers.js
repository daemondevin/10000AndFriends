'use strict';
module.exports = (sequelize, DataTypes) => {
  const GamesUsers = sequelize.define('GamesUsers', {
    score: DataTypes.INTEGER,
    isLeader: DataTypes.BOOLEAN,
    isConnected: DataTypes.BOOLEAN
  }, {});
  return GamesUsers;
};