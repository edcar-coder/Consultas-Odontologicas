'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword1 = await bcrypt.hash('SenhaForte@123', 10);
    const hashedPassword2 = await bcrypt.hash('OutroForte@456', 10);
    const hashedPassword3 = await bcrypt.hash('Admin@789', 10);

    return queryInterface.bulkInsert('usuario', [
      {
        id: uuidv4(),
        nome: 'João da Silva',
        email: 'joao@example.com',
        senha: hashedPassword1,
        tipo: 'paciente',
        criado_em: new Date(),
        atualizado_em: new Date(),
      },
      {
        id: uuidv4(),
        nome: 'Dra. Maria Souza',
        email: 'maria@example.com',
        senha: hashedPassword2,
        tipo: 'dentista',
        criado_em: new Date(),
        atualizado_em: new Date(),
      },
      {
        id: uuidv4(),
        nome: 'Admin do Sistema',
        email: 'admin@example.com',
        senha: hashedPassword3,
        tipo: 'administrador',
        criado_em: new Date(),
        atualizado_em: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuario', null, {});
  }
};
