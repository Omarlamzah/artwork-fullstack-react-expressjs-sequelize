'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Artworks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      oldprice: {
        type: Sequelize.STRING
      },
      

      desc: {
        type: Sequelize.STRING
      },
     
     

      artistid:{type:Sequelize.INTEGER,references:{model:"Artists",key:"id"},
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',},

      Artworkcategoriesid:{type:Sequelize.INTEGER,references:{model:"Artworkcategories",key:"id"},
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',},


      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Artworks');
  }
};