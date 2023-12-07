"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    static associate(models) {
     Artist.hasMany(models.Artwork, { foreignKey: "artistid", as: "artwork" });
     Artist.belongsTo(models.User, { foreignKey: "userid" ,as:"users"});
    }
  }

  Artist.init({
    biography: DataTypes.STRING,
    photo: DataTypes.STRING,
    fivestart: DataTypes.STRING,
    userid: DataTypes.INTEGER, // Corrected foreign key name
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: "Artist",
  });

  return Artist;
};
