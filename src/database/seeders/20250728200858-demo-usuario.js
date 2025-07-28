'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const senhaPadrao = 'Senha@123';
    const senhaHash = await bcrypt.hash(senhaPadrao, 10);

    await queryInterface.bulkInsert('usuario', [
      {
        id: uuidv4(),
        nome: 'João Silva',
        email: 'joao@exemplo.com',
        senha: senhaHash,
        tipo: 'paciente',
        criado_em: new Date(),
        atualizado_em: new Date()
      },
      {
        id: uuidv4(),
        nome: 'Maria Oliveira',
        email: 'maria@exemplo.com',
        senha: senhaHash,
        tipo: 'dentista',
        criado_em: new Date(),
        atualizado_em: new Date()
      },
      {
        id: uuidv4(),
        nome: 'Carlos Souza',
        email: 'carlos@exemplo.com',
        senha: senhaHash,
        tipo: 'administrador',
        criado_em: new Date(),
        atualizado_em:_
      }
      