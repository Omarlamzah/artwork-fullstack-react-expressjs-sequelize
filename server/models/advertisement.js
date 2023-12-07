'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Advertisement extends Model {
  
    static associate(models) {
      // define association here
    }
  }
  Advertisement.init({
    Name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Advertisement',
  });
  return Advertisement;
};