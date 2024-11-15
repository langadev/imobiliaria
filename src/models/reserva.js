'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class reservas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      reservas.belongsTo(models.arrendatarios, {
        foreignKey: 'arrendatario_id',
      });

      reservas.belongsTo(models.propriedades, { foreignKey: 'propriedade_id' });

      reservas.hasOne(models.pagamentos, { foreignKey: 'reserva_id' });
    }
  }

  reservas.init(
    {
      data_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: 'Data de início inválida. Por favor, insira uma data válida.',
          },
        },
      },
      data_fim: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: 'Data de fim inválida. Por favor, insira uma data válida.',
          },
          isAfter: {
            args: [sequelize.col('data_inicio')],
            msg: 'A data de fim deve ser posterior à data de início.',
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['pendente', 'confirmada', 'cancelada']],
            msg: 'Status inválido. Valores válidos: "pendente", "confirmada", "cancelada".',
          },
        },
      },
      arrendatario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'arrendatarios',
          key: 'id',
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
      modelName: 'reservas',
    },
  );

  return reservas;
};
