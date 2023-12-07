'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
   
    static associate(models) {
     Event.belongsToMany(models.User,{foreignKey:"Usersid",through :"usersevent"})
    }
  }
  Event.init({
    name: DataTypes.STRING,
    Usersid: DataTypes.INTEGER,
    
    createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};