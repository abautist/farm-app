'use strict';
module.exports = function(sequelize, DataTypes) {
  var product = sequelize.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return product;
};