'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class administradors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }

  administradors.init(
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
          msg: 'Email já está cadastrado',
        },
        validate: {
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },
      telefone: DataTypes.STRING,
      senha: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'administradors',
    },
  );

  return administradors;
};
