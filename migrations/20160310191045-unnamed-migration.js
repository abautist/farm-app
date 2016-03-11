'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    
      return queryInterface.addColumn(
        'products',
        'amountAvailable',
        {
          type: Sequelize.INTEGER
        }
      );
    
  },

  down: function (queryInterface, Sequelize) {
      
      return queryInterface.removeColumn('products','amountAvailable');
  }
};
