'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('consulta', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      paciente_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      dentista_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false
      },
      procedimento: {
        type: Sequelize.STRING,
        allowNull: false
      },
      criado_em: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      atualizado_em: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('consulta');
  }
};