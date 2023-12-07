const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Artwork extends Model {
    static associate(models) {
      Artwork.belongsTo(models.Artist, {foreignKey: 'artistid', as: 'artist',});
      Artwork.belongsTo(models.Artworkcategory, {foreignKey: 'Artworkcategoriesid', as: 'artworkcategory',});
      Artwork.hasMany(models.Comments,{foreignKey:"idartwork",as:"comments_of_artwork"})
      Artwork.hasMany(models.Media,{foreignKey:"idartwork",as:"media_of_artwork"})
      Artwork.hasMany(models.Product,{foreignKey:"artworkid",as:"product_of_artwork"})
      
    }
  }

  Artwork.init({
    name: DataTypes.STRING,
    artistid: DataTypes.INTEGER,
    Artworkcategoriesid: DataTypes.INTEGER,
    desc: DataTypes.STRING,
    price: DataTypes.STRING, 
    oldprice: DataTypes.STRING,
    createdAt: DataTypes.DATE, 
    updatedAt: DataTypes.DATE, 
  }, {
    sequelize,
    modelName: 'Artwork',
  });

  return Artwork;
};
