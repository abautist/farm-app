'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'products',
        'userId',
        {
          type: Sequelize.INTEGER
        }
      );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('products','userId');
  }
};
