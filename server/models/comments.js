'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
  
    static associate(models) {
      Comments.belongsTo(models.User,{foreignKey:"userid",as:"commentuser"})
      Comments.belongsTo(models.User,{foreignKey:"idartwork",as:"commentartwork"})

    }
  }


  Comments.init({
    txt: DataTypes.STRING,
    userid: DataTypes.INTEGER,
    idartwork: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};