'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artworkcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Artworkcategory.hasMany(models.Artwork,{foreignKey:"Artworkcategoriesid",as:"Artworks"})
    }
  }
  Artworkcategory.init({
      name: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Artworkcategory',
  });
  return Artworkcategory;
};