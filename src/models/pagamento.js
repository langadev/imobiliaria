'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class pagamentos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      pagamentos.belongsTo(models.reservas, { foreignKey: 'reserva_id' });
    }
  }

  pagamentos.init(
    {
      valor: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: {
            msg: 'O valor deve ser um número decimal válido',
          },
          min: {
            args: [0],
            msg: 'O valor deve ser maior ou igual a 0',
          },
        },
      },
      data_pagamentos: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: 'Data de pagamentos inválida',
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'O status não pode estar vazio',
          },
        },
      },
      metodo_pagamentos: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'O método de pagamentos não pode estar vazio',
          },
        },
      },
      reserva_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Reservas', // Nome da tabela relacionada
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'pagamentos',
    },
  );

  return pagamentos;
};
