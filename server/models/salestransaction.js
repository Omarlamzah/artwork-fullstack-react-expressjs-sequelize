'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SalesTransaction.init({
    Name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SalesTransaction',
  });
  return SalesTransaction;
};