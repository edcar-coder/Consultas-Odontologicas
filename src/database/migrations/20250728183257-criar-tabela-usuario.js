'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuario', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.UUID(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.UUID(100),
        allowNull: false,
        unique: true,
      },
      senha: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.ENUM('dentista', 'administrador', 'paciente'),
        allowNull: false,
        defaultValue: 'paciente',
      },
      criado_em: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      atualizado_em: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });

  await queryInterface.addIndex("usuario", ["email"], )
  
},

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuario');
  }
};
