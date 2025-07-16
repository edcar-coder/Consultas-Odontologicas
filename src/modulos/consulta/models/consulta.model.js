// src/modulos/consulta/models/consulta.model.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/configDb');  // <--- caminho corrigido

const Consulta = sequelize.define('Consulta', {
  paciente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  procedimento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'consultas',
  timestamps: false,
});

module.exports = Consulta;
