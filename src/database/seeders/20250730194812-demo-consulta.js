'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const agora = new Date();

    await queryInterface.bulkInsert('consultas', [
      {
        id: uuidv4(),
        paciente: 'João Silva',
        data: new Date('2025-08-10T10:00:00'),
        procedimento: 'Limpeza',
        criado_em: agora,
        atualizado_em: agora,
      },
      {
        id: uuidv4(),
        paciente: 'Maria Oliveira',
        data: new Date('2025-08-12T14:30:00'),
        procedimento: 'Extração de dente',
        criado_em: agora,
        atualizado_em: agora,
      },
      {
        id: uuidv4(),
        paciente: 'Carlos Souza',
        data: new Date('2025-08-15T09:00:00'),
        procedimento: 'Canal',
        criado_em: agora,
        atualizado_em: agora,
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('consultas', {
      paciente: ['João Silva', 'Maria Oliveira', 'Carlos Souza']
    });
  }
};