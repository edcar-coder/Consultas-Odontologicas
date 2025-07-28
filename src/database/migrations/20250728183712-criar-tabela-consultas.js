'use strict';

const { Sequelize } = require('sequelize');

 /**@type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.createTable('usuario',
      {
        id: {
          type: Sequelize.STRING,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
      paciente: {
         type: Sequelize.STRING,
         allowNull: false,
       },
       data: {
         type: Sequelize.DATE,
         allowNull: false,
       },
       procedimento: {
         type: Sequelize.STRING,
         allowNull: false,
       },
     }, 
     
       tableName: 'consultas',
       timestamps: false,
     });
     
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.dropTable('usuario');
     
  }
};
