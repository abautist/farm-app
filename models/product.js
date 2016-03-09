'use strict';
module.exports = function(sequelize, DataTypes) {
  var product = sequelize.define('product', {
    vegetable: DataTypes.STRING,
    variety: DataTypes.STRING,
    price: DataTypes.FLOAT,
    image: DataTypes.TEXT,
    unit: DataTypes.STRING,
    plantingDate: DataTypes.DATE,
    plantingMethod: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return product;
};