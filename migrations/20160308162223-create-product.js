'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vegetable: {
        type: Sequelize.STRING
      },
      variety: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      image: {
        type: Sequelize.TEXT
      },
      unit: {
        type: Sequelize.STRING
      },
      plantingDate: {
        type: Sequelize.DATE
      },
      plantingMethod: {
        type: Sequelize.STRING
      },
      available: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('products');
  }
};