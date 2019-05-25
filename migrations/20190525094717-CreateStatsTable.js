'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable(
            'stats',
           {
          id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
          },
          fecha: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
          usuarios: {
                type: Sequelize.INTEGER,
                validate: {
                  notEmpty: {msg: "Usuarios must not be empty."}
                }
            },
          tips: {
                type: Sequelize.INTEGER,
                validate: {
                notEmpty: {msg: "Tips must not be empty."}
                }
            },
          quizzes:{
                type: Sequelize.INTEGER,
                validate: {
                notEmpty: {msg: "Quizzes must not be empty."}
                }
          },
          createdAt: {
                  type: Sequelize.DATE,
                  allowNull: false
                },
          updatedAt: {
                  type: Sequelize.DATE,
                  allowNull: false
                }
          },
            {
                sync: {force: true}
            }
        );
    },

  down: (queryInterface, Sequelize) => {
   return queryInterface.dropTable('stats');
  }

};