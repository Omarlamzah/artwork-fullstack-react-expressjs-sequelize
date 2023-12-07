"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Artist, { foreignKey: "userid", as: "Artist" });
      User.hasMany(models.Comments, { foreignKey: "userid", as: "comments" });
      User.belongsToMany(models.Favorites, { foreignKey: "favoritesid", through: "userFavorites" });
      User.belongsToMany(models.Event, { foreignKey: "eventid", through: "userFavorites" });
      User.hasMany(models.Comments, { foreignKey: "userid", as: "Comments" });
      User.hasOne(models.Token,{foreignKey:"userid",as:"usertokens"})
      User.hasMany(models.Product, { foreignKey: "userid", as: "Products" });


      
    }
  }

  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    role:DataTypes.STRING,
    pic:DataTypes.STRING,
    country:DataTypes.STRING,
    countrycode:DataTypes.STRING,


    city:DataTypes.STRING,

   // favoritesid: DataTypes.INTEGER,
   // eventid: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
