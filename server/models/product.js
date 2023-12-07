'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Artwork,{foreignKey:"artworkid",as:"artwork"})
      Product.belongsTo(models.User,{foreignKey:"userid",as:"user"})


      
    }
  }
  Product.init({
    artworkid:DataTypes.INTEGER,
    userid:DataTypes.INTEGER,

    
 
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};