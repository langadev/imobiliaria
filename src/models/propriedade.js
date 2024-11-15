'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class propriedades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      propriedades.belongsTo(models.proprietarios, {
        foreignKey: 'proprietario_id',
      });

      propriedades.hasOne(models.enderecos, { foreignKey: 'propriedade_id' });

      propriedades.hasMany(models.reservas, { foreignKey: 'propriedade_id' });

      propriedades.hasMany(models.avaliacaos, {
        foreignKey: 'propriedade_id',
      });
    }
  }

  propriedades.init(
    {
      nr_quartos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'O número de quartos deve ser um valor inteiro',
          },
        },
      },
      preco_por_dia: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: {
            msg: 'O preço por dia deve ser um valor decimal',
          },
          min: {
            args: [0],
            msg: 'O preço por dia deve ser maior ou igual a 0',
          },
        },
      },
      disponibilidade: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'A disponibilidade não pode estar vazia',
          },
          isIn: {
            args: [['disponível', 'indisponível']],
            msg: 'A disponibilidade deve ser "disponível" ou "indisponível"',
          },
        },
      },
      proprietario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'proprietarios', // Nome da tabela relacionada
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'propriedades',
    },
  );

  return propriedades;
};
