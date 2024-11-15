'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class enderecos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      enderecos.belongsTo(models.propriedades, {
        foreignKey: 'propriedade_id',
      });
    }
  }

  enderecos.init(
    {
      distrito: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'O distrito não pode estar vazio',
          },
        },
      },
      bairro: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'O bairro não pode estar vazio',
          },
        },
      },
      quateirao: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: 'O quarteirão deve ser um número inteiro',
          },
        },
      },
      propriedade_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'propriedades',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'enderecos',
    },
  );

  return enderecos;
};
