// src/modulos/consulta/models/consulta.model.js
const { DataTypes } = require('sequelize');
const  sequelize  = require('../../../config/configDb');  // <--- caminho corrigido

const Consulta = sequelize.define('Consulta', {
  id: {
    type: DataTypes.STRING(255),
    primaryKey: true,
  },
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
}, 
{
  tableName: 'consultas',
  createdAt:'criado_em',
  updatedAt:'atualizado_em'

});

module.exports = Consulta;
