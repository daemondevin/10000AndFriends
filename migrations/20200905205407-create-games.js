"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.createTable("Games", {
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
        },
        name:{
          type: Sequelize.STRING
        },
				started: {
					type: Sequelize.DATE,
				},
				ended: {
					type: Sequelize.DATE,
        },
        turnIndex:{
          type: Sequelize.INTEGER
        },
        status:{
          type: Sequelize.JSONB
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }),
    queryInterface.createTable("GamesUsers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      GameId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      score: {
        type: Sequelize.INTEGER
      },
      isLeader:{
        type: Sequelize.BOOLEAN
      },
      isConnected:{
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
		]);
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
	},

	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
	},
};
