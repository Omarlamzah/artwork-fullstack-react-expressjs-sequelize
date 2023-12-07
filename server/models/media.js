'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Media.belongsTo(models.Artwork,{foreignKey:"idartwork",as:"mediworks"})
    }
  }
  Media.init({
    url: DataTypes.STRING,
    type: DataTypes.STRING,
    idartwork: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Media',
  });
  return Media;
};