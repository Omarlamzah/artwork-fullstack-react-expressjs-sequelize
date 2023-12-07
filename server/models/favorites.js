'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorites extends Model {
  


    static associate(models) {
      Favorites.belongsToMany(models.Favorites,{foreignKey:"Usersid",through:"Favoritesuser", 
      as: 'usersWhoFavorited', // Define an alias for the association
    })

    }
  }
  Favorites.init({
    name: DataTypes.STRING,
    Usersid: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
     updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Favorites',
  });
  return Favorites;
};