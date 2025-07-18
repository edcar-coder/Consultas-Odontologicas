const { DataTypes } = require("sequelize");
const { sequelize } = require('../../../config/configDb');  // <--- caminho corrigido

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
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
        notempty: {
          msg: "A senha não pode ser vazia.",
        },
      },
    },
    tipo: {
      type: DataTypes.ENUM("Dentista", "funcionário", "paciente"),
      allowNull: false,
      defaultValue: "paciente",
      validate: {
        isIn: {
          args: [["Dentista", "funcionário", "paciente"]],
          msg: "O tipo deve ser 'Dentista', 'funcionário' ou 'paciente'"
        },
      },
    },
  },
  {
    tableName: "usuario",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

module.exports = User;
