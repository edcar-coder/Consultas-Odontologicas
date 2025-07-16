const { DataTypes } = require("sequelize");
const { sequelize } = require('../../../config/configDb');  // <--- caminho corrigido

const Usuario = sequelize.define(
  "Usuario",
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
        isEmail: {
          msg: "Email inválido",
        },
      },
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          msg: "A senha deve ter no mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial.",
        },
      },
    },
    tipo: {
      type: DataTypes.ENUM("paciente"),
      allowNull: false,
      defaultValue: "paciente",
    },
  },
  {
    tableName: "usuario",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

module.exports = Usuario;
