const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/configDb');  

const Dentista = sequelize.define('Dentista', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  especialidade: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = Dentista;
// Sincronizando o modelo com o banco de dados