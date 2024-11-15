'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class proprietarios extends Model {
    static associate(models) {
      proprietarios.hasMany(models.propriedades, {
        foreignKey: 'proprietario_id',
      });
    }
  }

  proprietarios.init(
    {
      nome: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [4, 200],
            msg: 'O nome deve ter pelo menos 4 caracteres',
          },
        },
      },

      email: {
        type: DataTypes.STRING,
        unique: {
          msg: 'Este email já está cadastrado',
        },
        validate: {
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },

      telefone: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: [/^\(\d{2}\)\s\d{4,5}-\d{4}$/],
            msg: 'Telefone inválido. O formato deve ser (XX) XXXX-XXXX ou (XX) XXXXX-XXXX',
          },
        },
      },

      senha: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [6, 100],
            msg: 'A senha deve ter pelo menos 6 caracteres',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'proprietarios',
    },
  );

  return proprietarios;
};
