const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/configDb");

const Consulta = sequelize.define(
  "Consulta",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Email inválido" },
      },
    },
  },
  {
    tableName: "consulta", 
    createdAt: "criado_em", 
    updatedAt: "atualizado_em", 
  }
);

module.exports = Consulta;
